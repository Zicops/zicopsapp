import { UPDATE_USER_COURSE_PROGRESS, userClient } from '@/api/UserMutations';
import { COURSE_PROGRESS_STATUS, TOPIC_CONTENT_TYPES } from '@/constants/course.constants';
import { mutateData } from '@/helper/api.helper';
import { SYNC_DATA_IN_SECONDS } from '@/helper/constants.helper';
import { useTimeInterval } from '@/helper/hooks.helper';
import { limitValueInRange } from '@/helper/utils.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { useEffect, useRef, useState } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import {
  ActiveCourseDataAtom,
  CourseTopicContentAtomFamily,
  CourseTopicsAtomFamily,
  UserCourseMapDataAtom,
  UserTopicProgressDataAtom,
} from '../atoms/learnerCourseComps.atom';
import useHandleTopicSwitch from './useHandleTopicSwitch';

export default function useHandleTopicProgress(videoState = {}) {
  const containerRef = useRef();

  const setToastMessage = useRecoilCallback(({ set }) => (message = '', type = 'danger') => {
    set(ToastMsgAtom, { type, message });
  });
  const [activeCourseData, setActiveCourseData] = useRecoilState(ActiveCourseDataAtom);
  const [topicProgressData, setTopicProgressData] = useRecoilState(UserTopicProgressDataAtom);
  const topicData = useRecoilValue(CourseTopicsAtomFamily(activeCourseData?.topicId));
  const topicContent = useRecoilValue(CourseTopicContentAtomFamily(activeCourseData?.topicId));
  const userCourseMapData = useRecoilValue(UserCourseMapDataAtom);
  const userData = useRecoilValue(UserStateAtom);

  const [videoStartTime, setVideoStartTime] = useState(null);
  const [isSyncing, setIsSyncing] = useState(null);
  const [syncCount, setSyncCount] = useState(null);
  const [showSkipIntroButton, setShowSkipIntroButton] = useState(false);
  const [showBingeButton, setShowBingeButton] = useState(false);

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

    if (syncCount < 20) return setSyncCount(+syncCount + 1);

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

  async function syncTopicProgress() {
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

    // skip update if the topic progress is not completed and progress is less then updated progress
    if (status !== completed && +videoProgress < progress) return setIsSyncing(false);

    if (progress >= 99) {
      sendData.status = completed;
      sendData.videoProgress = '100';
    }

    const res = await mutateData(UPDATE_USER_COURSE_PROGRESS, sendData, {}, userClient).catch(() =>
      setToastMessage('Add Course Progress Error'),
    );

    const progressRes = res?.addUserCourseProgress?.[0];

    if (!progressRes) return setIsSyncing(false);

    _topicProgressData[topicProgressIndex] = {
      ..._topicProgressData[topicProgressIndex],
      ...(progressRes || {}),
    };

    setTopicProgressData(_topicProgressData);
    setIsSyncing(false);
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

  return {
    containerRef,
    selectedTopicContent,
    currentTopicProgress,
    videoStartTime,
    handleNextClick,
    handlePreviousClick,

    showSkipIntroButton,
    handleSkipIntroClick,

    showBingeButton,
    handleWatchCreditClick,

    syncTopicProgress,
    resetBinge,
  };
}
