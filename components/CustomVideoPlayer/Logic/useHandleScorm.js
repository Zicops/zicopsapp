import {
  ADD_USER_COURSE_PROGRESS,
  UPDATE_USER_COURSE_PROGRESS,
  userClient
} from '@/api/UserMutations';
import { COURSE_TOPIC_STATUS } from '@/helper/constants.helper';
import { limitValueInRange } from '@/helper/utils.helper';
import { QuizAtom } from '@/state/atoms/module.atoms';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { QuizProgressDataAtom, UserCourseDataAtom, VideoAtom } from '@/state/atoms/video.atom';
import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ShowQuizAtom } from './customVideoPlayer.helper';

// (78 * 100) / 300
export default function useHandleScorm() {
  const [addUserCourseProgress, { error: addUserCourseProgressErr }] = useMutation(
    ADD_USER_COURSE_PROGRESS,
    { client: userClient }
  );
  const [updateUserCourseProgress, { error: updateUserCourseProgressErr }] = useMutation(
    UPDATE_USER_COURSE_PROGRESS,
    { client: userClient }
  );

  const [timer, setTimer] = useState(0);

  const [showQuiz, setShowQuiz] = useRecoilState(ShowQuizAtom);
  const [userCourseData, setUserCourseData] = useRecoilState(UserCourseDataAtom);
  const [videoData, updateVideoData] = useRecoilState(VideoAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const userData = useRecoilValue(UserStateAtom);
  const quizData = useRecoilValue(QuizAtom);
  const quizProgressData = useRecoilValue(QuizProgressDataAtom);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (isNaN(prev)) return 0;

        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer % SYNC_DATA_IN_SECONDS !== 0) return;
    syncVideoProgress();
  }, [timer]);

  async function syncVideoProgress(isTopicCompleted = false) {
    if (!userCourseData?.userCourseMapping?.user_course_id) return;

    const userCourseMapData = structuredClone(userCourseData);
    const currentProgressIndex = userCourseMapData?.userCourseProgress?.findIndex(
      (obj) => obj?.topic_id === videoData?.topicContent[0]?.topicId
    );

    if (currentProgressIndex < 0) {
      const currentTime = timer;
      const duration = videoData?.topicContent?.[0]?.duration;

      const sendData = {
        userId: userData.id,
        userCourseId: userCourseMapData?.userCourseMapping?.user_course_id,
        topicId: videoData?.topicContent?.[0]?.topicId,
        topicType: 'Content',
        status: isTopicCompleted ? COURSE_TOPIC_STATUS.completed : COURSE_TOPIC_STATUS.started,
        videoProgress: isTopicCompleted
          ? '100'
          : ((timer * 100) / videoData?.topicContent?.[0]?.duration).toString(),
        timestamp: `${currentTime}-${duration}`
      };

      if (
        userCourseMapData?.userCourseProgress?.filter(
          (cp) => cp?.topic_id === videoData?.topicContent[0]?.topicId
        )?.length > 0
      )
        return;

      console.log(sendData, 'add progress');
      //   return;

      const progressRes = await addUserCourseProgress({ variables: sendData }).catch((err) => {
        console.log(err);
        return setToastMsg({ type: 'danger', message: 'Add Course Progress Error' });
      });
      const userCourseProgressData = progressRes?.data?.addUserCourseProgress[0];
      if (userCourseProgressData) userCourseMapData.userCourseProgress.push(userCourseProgressData);
      setUserCourseData({ ...userCourseData, ...userCourseMapData });
      return;
    }

    const currentTopicProgress = userCourseMapData?.userCourseProgress[currentProgressIndex];

    if (!isTopicCompleted && +currentTopicProgress?.video_progress >= 100) return;

    const savedProgress =
      (videoData?.topicContent?.[0]?.duration * (+currentTopicProgress?.video_progress || 0)) / 100;

    const timeSpent = savedProgress + timer;
    const videoProgress = (timeSpent * 100) / videoData?.topicContent?.[0]?.duration;

    let isCompleted = currentTopicProgress?.status === 'completed';
    if (!isCompleted) isCompleted = videoProgress === 100;

    if (isTopicCompleted) isCompleted = true;
    if (isCompleted) {
      isCompleted = isTopicQuizCompleted(currentTopicProgress?.topic_id, quizProgressData);
    }

    // status: isCompleted ? COURSE_TOPIC_STATUS.completed : COURSE_TOPIC_STATUS.started,
    // videoProgress: isCompleted
    //   ? '100'
    //   : ((timer * 100) / videoData?.topicContent?.[0]?.duration).toString(),

    // const { currentTime, duration } = videoElement.current;
    const currentTime = timer;
    const duration = videoData?.topicContent?.[0]?.duration;
    const sendData = {
      userCpId: currentTopicProgress?.user_cp_id,
      userId: userData.id,
      userCourseId: userCourseMapData?.userCourseMapping?.user_course_id,
      topicId: currentTopicProgress?.topic_id,
      topicType: 'Content',
      status: isCompleted ? 'completed' : 'in-progress',
      videoProgress: isTopicCompleted
        ? '100'
        : limitValueInRange(
            (timeSpent * 100) / videoData?.topicContent?.[0]?.duration,
            0,
            100
          ).toString(),
      timestamp: `${currentTime}-${duration}`
    };
    console.log(sendData, 'update progress');
    // return;
    const progressRes = await updateUserCourseProgress({ variables: sendData }).catch((err) => {
      console.log(err);
      return setToastMsg({ type: 'danger', message: 'Add Course Progress Error' });
    });
    const userCourseProgressData = progressRes?.data?.updateUserCourseProgress;

    userCourseMapData.userCourseProgress[currentProgressIndex] = userCourseProgressData;

    if (isCompleted) {
      userCourseMapData.activeModule = { index: null, id: null };
      userCourseMapData.activeTopic = { index: null, id: null };
      userCourseMapData.activeTopicContent = { index: null, id: null };
      userCourseMapData.activeTopicSubtitle = { index: null, id: null };
    }

    setUserCourseData({ ...userCourseData, ...userCourseMapData });
  }

  function isTopicQuizCompleted(topicId, quizProgress) {
    const isCompleted = !quizData
      ?.filter((quiz) => quiz?.topicId === topicId)
      ?.some((quiz) => {
        const isAttempted = quizProgress?.find((qp) => qp?.quiz_id === quiz?.id);

        console.log(isAttempted);
        if (!isAttempted) setShowQuiz(quiz);
        return !isAttempted;
      });

    return isCompleted;
  }

  return { syncVideoProgress };
}
