import { GET_QUESTION_OPTIONS_WITH_ANSWER } from '@/api/Queries';
import {
  ADD_USER_QUIZ_ATTEMPT,
  UPDATE_USER_COURSE_PROGRESS,
  userClient,
} from '@/api/UserMutations';
import { COURSE_PROGRESS_STATUS, TOPIC_CONTENT_TYPES } from '@/constants/course.constants';
import { loadQueryDataAsync, mutateData } from '@/helper/api.helper';
import { limitValueInRange } from '@/helper/utils.helper';
import { TopicQuizAtom } from '@/state/atoms/courses.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { useEffect, useRef, useState } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import {
  ActiveCourseDataAtom,
  ActiveCourseHeroAtom,
  CourseTopicContentAtomFamily,
  CourseTopicsAtomFamily,
  TopicQuizAttemptsAtom,
  UserCourseMapDataAtom,
  UserTopicProgressDataAtom,
  courseHeroObj,
} from '../atoms/learnerCourseComps.atom';
import useHandleTopicSwitch from './useHandleTopicSwitch';

export default function useHandleTopicProgress(videoState = {}) {
  const containerRef = useRef();

  const setToastMessage = useRecoilCallback(({ set }) => (message = '', type = 'danger') => {
    set(ToastMsgAtom, { type, message });
  });
  const [activeHero, setActiveHero] = useRecoilState(ActiveCourseHeroAtom);
  const [activeCourseData, setActiveCourseData] = useRecoilState(ActiveCourseDataAtom);
  const [topicProgressData, setTopicProgressData] = useRecoilState(UserTopicProgressDataAtom);
  const [quizAttempts, setQuizAttempts] = useRecoilState(TopicQuizAttemptsAtom);
  const quizData = useRecoilValue(TopicQuizAtom);
  const topicData = useRecoilValue(CourseTopicsAtomFamily(activeCourseData?.topicId));
  const topicContent = useRecoilValue(CourseTopicContentAtomFamily(activeCourseData?.topicId));
  const userCourseMapData = useRecoilValue(UserCourseMapDataAtom);
  const userData = useRecoilValue(UserStateAtom);

  const [videoStartTime, setVideoStartTime] = useState(null);
  const [moveTimeBy, setMoveTimeBy] = useState(null);
  const [isSyncing, setIsSyncing] = useState(null);
  const [syncCount, setSyncCount] = useState(null);
  const [showSkipIntroButton, setShowSkipIntroButton] = useState(false);
  const [showBingeButton, setShowBingeButton] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const { getNextTopicId, getPreviousTopicId } = useHandleTopicSwitch();
  const { topicId: nextTopicId, moduleId: nextModuleId } = getNextTopicId();
  const { topicId: previousTopicId, moduleId: previousModuleId } = getPreviousTopicId();

  const selectedTopicContent =
    topicContent?.find((tc) => tc?.id === activeCourseData?.topicContentId) || {};
  const isTypeVideo = selectedTopicContent?.type === TOPIC_CONTENT_TYPES.mp4;

  // set time from which the video should start initially
  useEffect(() => {
    if (!isTypeVideo) return;
    if (!activeCourseData?.topicContentId) return;
    if (!selectedTopicContent?.duration) return;
    if (!currentTopicProgress?.videoProgress) return setVideoStartTime(0);

    setVideoStartTime((selectedTopicContent?.duration * currentTopicProgress?.videoProgress) / 100);
  }, [
    activeCourseData?.topicContentId,
    selectedTopicContent?.duration,
    currentTopicProgress?.videoProgress,
  ]);

  // set other data if only topic id is set
  useEffect(() => {
    if (!activeCourseData?.topicId) return;
    if (!topicData) return;

    const _activeData = structuredClone(activeCourseData);
    const { moduleId, chapterId, topicContentId, language, subTitle } = _activeData;
    const { id, contentUrl, language: selectedLang, subTitleUrl } = selectedTopicContent;
    const { chapterId: selectedChapId, moduleId: selectedModId } = topicData;

    const tcId = id || topicContent?.[0]?.id;

    if (!topicContentId) return;

    if (!!tcId && topicContentId !== tcId) _activeData.topicContentId = tcId;
    if (!!selectedChapId && chapterId !== selectedChapId) _activeData.chapterId = selectedChapId;
    if (!!selectedModId && moduleId !== selectedModId) _activeData.moduleId = selectedModId;
    if (!!selectedLang && language !== selectedLang) _activeData.language = selectedLang;
    if (!!subTitleUrl?.[0]?.url && subTitle?.url !== subTitleUrl?.[0]?.url)
      _activeData.subTitle = subTitleUrl;

    setActiveCourseData(_activeData);
  }, [activeCourseData?.topicId, selectedTopicContent]);

  useEffect(() => {
    if (!isTypeVideo) return;
    if (!topicData?.id) return;
    const _topicProgressData = structuredClone(topicProgressData);
    const topicProgressIndex = _topicProgressData?.findIndex((tp) => tp?.topicId === topicData?.id);

    if (topicProgressIndex < 0) return;

    _topicProgressData[topicProgressIndex].videoProgress = Math.ceil(videoState?.progressPercent);
    setTopicProgressData(_topicProgressData);
  }, [videoState?.progressPercent]);

  // sync on video play
  useEffect(() => {
    if (!isTypeVideo) return;
    if (!videoState?.isPlaying) return;

    setSyncCount(+syncCount + 1);
    if (syncCount !== null && syncCount < 20) return;

    syncTopicProgress().then(() => setSyncCount(0));
  }, [videoState?.progressPercent]);

  // binge next topic button logic
  useEffect(() => {
    if (!isTypeVideo) return;
    if (!selectedTopicContent?.duration) return resetBinge();
    if (!videoState?.isVideoLoaded) return resetBinge();
    if (!nextTopicId) return resetBinge();
    if (showBingeButton == null) return;

    const nextTopicBingeTime =
      selectedTopicContent?.nextShowTime ||
      selectedTopicContent?.duration - selectedTopicContent?.fromEndTime;
    const displayNextTopicBtn = videoState?.currentTime >= nextTopicBingeTime;
    if (!displayNextTopicBtn && !!showBingeButton) return resetBinge();
    if (displayNextTopicBtn === !!showBingeButton) return;

    const fiveSecondsTimer = 1000 * 5;
    const timer = setTimeout(() => {
      setActiveCourseData((prev) => ({ ...prev, topicId: nextTopicId, moduleId: nextModuleId }));
    }, fiveSecondsTimer);

    setShowBingeButton(timer);
  }, [
    selectedTopicContent?.duration,
    videoState?.isVideoLoaded,
    nextTopicId,
    videoState?.currentTime,
  ]);

  // sync progress at every 15 seconds
  // const cancel = useTimeInterval(syncTopicProgress, SYNC_DATA_IN_SECONDS * 1000, [
  //   videoState?.isPlaying,
  // ]);

  const currentTopicProgress = topicProgressData?.find(
    (progress) => progress?.topicId === activeCourseData?.topicId,
  );

  // display button when video current time is between startTime and skip intro duration time
  const displaySkipIntroBtn =
    videoState?.currentTime >= selectedTopicContent?.startTime &&
    videoState?.currentTime <
      selectedTopicContent?.startTime + selectedTopicContent?.skipIntroDuration;
  if (
    isTypeVideo &&
    displaySkipIntroBtn !== showSkipIntroButton &&
    showSkipIntroButton != null &&
    videoState?.isVideoLoaded
  )
    setShowSkipIntroButton(displaySkipIntroBtn);

  function handleSkipIntroClick() {
    setVideoStartTime(selectedTopicContent?.startTime + selectedTopicContent?.skipIntroDuration);
    setShowSkipIntroButton(null);
  }

  function handleWatchCreditClick() {
    clearTimeout(showBingeButton);
    setShowBingeButton(null);
  }

  async function syncTopicProgress(topicProgress = null) {
    if (isSyncing) return;
    if (!videoState) return;
    if (!topicProgressData?.length) return;

    setIsSyncing(true);

    const { currentTime, progressPercent } = videoState;
    const _topicProgressData = structuredClone(topicProgressData);
    const topicProgressIndex = _topicProgressData?.findIndex((tp) => tp?.topicId === topicData?.id);
    const currentTopicProgress = _topicProgressData?.[topicProgressIndex];

    // this error should not occur as topic progress should always be created at the time of course assign
    if (!currentTopicProgress?.userCpId) {
      setIsSyncing(false);
      setToastMessage('Topic Progress Not Found');
      return;
    }

    const { status, videoProgress } = currentTopicProgress;
    const { started, completed } = COURSE_PROGRESS_STATUS;
    const progress = limitValueInRange(Math.ceil(progressPercent), 0, 100);

    const sendData = {
      userCpId: currentTopicProgress?.userCpId,
      userId: userData.id,
      userCourseId: userCourseMapData?.userCourseId,
      topicId: topicData?.id,
      topicType: topicData?.type,
      videoProgress: progress || '0',
      timestamp: `${currentTime || 0}-${selectedTopicContent?.duration || 0}`,
      status: status || started,
    };

    // override the state value (stale) with arguments (latest)
    if (topicProgress?.time || topicProgress?.videoProgress) {
      const { videoProgress, time } = topicProgress;
      if (videoProgress) sendData.videoProgress = videoProgress;
      if (time) sendData.timestamp = `${time || 0}-${selectedTopicContent?.duration || 0}`;
    }

    // skip update if the topic progress is not completed and progress is less then updated progress
    if (sendData?.status !== completed && +videoProgress < progress) return setIsSyncing(false);
    if (progress >= 99) {
      sendData.status = completed;
      sendData.videoProgress = '100';
    }

    const isQuizCompleted = isTopicQuizCompleted(
      topicData?.id,
      topicProgress?.quizAttempts || quizAttempts,
    );

    if (!isQuizCompleted) sendData.status = started;

    const res = await mutateData(UPDATE_USER_COURSE_PROGRESS, sendData, {}, userClient).catch(() =>
      setToastMessage('Add Course Progress Error'),
    );

    const progressRes = res?.updateUserCourseProgress;

    if (!progressRes) return setIsSyncing(false);

    _topicProgressData[topicProgressIndex] = {
      ..._topicProgressData[topicProgressIndex],
      ...(progressRes || {}),
    };

    setTopicProgressData(_topicProgressData);
    setIsSyncing(false);
  }

  function handleSelectQuiz(quizData) {
    setSelectedQuiz(quizData);
  }

  function isTopicQuizCompleted(topicId = topicData?.id, quizProgress = quizAttempts) {
    const isCompleted = !quizData
      ?.filter((quiz) => quiz?.topicId === topicId)
      ?.some((quiz) => {
        const isAttempted = quizProgress?.find((qp) => qp?.quiz_id === quiz?.id);
        return !isAttempted;
      });

    return isCompleted;
  }

  async function handleQuizSubmit(e, selectedOption) {
    if (!selectedOption) return setToastMessage('Select option first');
    if (!selectedQuiz?.id) return setToastMessage('No Quiz Id present');
    e.target.disabled = true;

    const optionRes = await loadQueryDataAsync(GET_QUESTION_OPTIONS_WITH_ANSWER, {
      question_id: selectedQuiz?.questionId,
    });
    if (!optionRes?.getOptionsForQuestions) return setToastMessage('Option Load Error');

    const _option = optionRes?.getOptionsForQuestions[0]?.options;

    const topicId = topicData?.id;

    const sendData = {
      user_id: userData?.id,
      user_cp_id: currentTopicProgress?.userCpId,
      user_course_id: userCourseMapData?.userCourseId,
      quiz_id: selectedQuiz?.id,
      quiz_attempt: quizAttempts?.filter((quiz) => quiz?.quiz_id === selectedQuiz?.id)?.length || 1,
      topic_id: topicId,
      result: _option?.find((op) => op?.id === selectedQuiz?.id)?.IsCorrect ? 'passed' : 'failed',
      is_active: true,
    };

    if (!sendData?.user_cp_id) return setToastMessage('No Course Progress Id Present');

    let isError = false;
    const quizAttemptRes = await mutateData(ADD_USER_QUIZ_ATTEMPT, sendData, {}, userClient).catch(
      (err) => {
        console.log(err);
        isError = !!err;
        if (err) setToastMessage('Quiz Attempt Add Error');
      },
    );

    if (isError) return;

    const _quizProgress = [...quizAttempts, quizAttemptRes?.addUserQuizAttempt[0]];
    setQuizAttempts(_quizProgress);

    if (+currentTopicProgress?.videoProgress > 98 && isTopicQuizCompleted(topicId, _quizProgress)) {
      syncTopicProgress({ quizAttempts: _quizProgress });
    }

    const isCorrect = sendData?.result === 'passed';

    return isCorrect;
  }

  const handleNextClick = !nextTopicId
    ? null
    : function () {
        setActiveCourseData((prev) => ({ ...prev, topicId: nextTopicId, moduleId: nextModuleId }));
      };

  const handlePreviousClick = !previousTopicId
    ? null
    : function () {
        setActiveCourseData((prev) => ({
          ...prev,
          topicId: previousTopicId,
          moduleId: previousModuleId,
        }));
      };

  function resetBinge() {
    clearTimeout(showBingeButton);
    if (!!showBingeButton) setShowBingeButton(false);
  }

  function closePlayer() {
    resetBinge();
    setActiveHero(courseHeroObj.courseMetaPreview);
    setActiveCourseData((prev) => ({ ...prev, topicId: null, topicContentId: null }));
  }

  return {
    containerRef,
    selectedTopicContent,
    currentTopicProgress,
    videoStartTime,
    moveTimeBy,
    setMoveTimeBy,
    handleNextClick,
    handlePreviousClick,

    showSkipIntroButton,
    handleSkipIntroClick,

    showBingeButton,
    handleWatchCreditClick,

    syncTopicProgress,
    closePlayer,

    selectedQuiz,
    setSelectedQuiz,
    handleSelectQuiz,
    handleQuizSubmit,
  };
}
