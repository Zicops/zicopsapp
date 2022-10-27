import { GET_COURSE } from '@/api/Queries';
import { ADD_USER_COURSE, UPDATE_USER_COURSE, userClient } from '@/api/UserMutations';
import { IsDataPresentAtom } from '@/components/common/PopUp/Logic/popUp.helper';
import { getQueryData } from '@/helper/api.helper';
import { USER_STATUS } from '@/helper/constants.helper';
import { getUnixFromDate } from '@/helper/utils.helper';
import { UserDataAtom } from '@/state/atoms/global.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { getVideoObject, UserCourseDataAtom, VideoAtom } from '@/state/atoms/video.atom';
import { courseContext } from '@/state/contexts/CourseContext';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function useHandleCourseHero(isPreview) {
  const [addUserCourse] = useMutation(ADD_USER_COURSE, { client: userClient });
  const [updateUserCouse] = useMutation(UPDATE_USER_COURSE, { client: userClient });

  const router = useRouter();

  const { updateCourseMaster, isDataLoaded, setIsDataLoaded, fullCourse } =
    useContext(courseContext);

  const [userCourseData, setUserCourseData] = useRecoilState(UserCourseDataAtom);

  const userDataGlobal = useRecoilValue(UserDataAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [videoData, setVideoData] = useRecoilState(VideoAtom);
  const [isPopUpDataPresent, setIsPopUpDataPresent] = useRecoilState(IsDataPresentAtom);
  const userData = useRecoilValue(UserStateAtom);

  const [courseAssignData, setCourseAssignData] = useState({
    endDate: new Date(),
    isMandatory: false,
    isCourseAssigned: false
  });
  const [isAssignPopUpOpen, setIsAssignPopUpOpen] = useState(false);

  // reset video data
  useEffect(() => {
    setVideoData(getVideoObject());
  }, []);

  const {
    data: courseData,
    loading,
    error
  } = getQueryData(GET_COURSE, { course_id: router?.query?.courseId }, { fetchPolicy: 'no-cache' });

  useEffect(() => {
    if (courseData?.getCourse && !isDataLoaded) {
      updateCourseMaster(courseData.getCourse);

      setIsDataLoaded(true);
    }
  }, [courseData]);

  useEffect(() => {
    if (isPreview) return;

    let isAssigned = false;

    const courseMap = userCourseData?.userCourseMapping;

    if (!courseMap?.user_course_id) {
      isAssigned = false;
    } else {
      isAssigned = courseMap?.course_status?.toLowerCase() !== 'disabled' ? true : false;
    }
    setCourseAssignData({
      ...courseAssignData,
      isCourseAssigned: isAssigned
    });
  }, [userCourseData]);

  function showPreviewVideo() {
    setVideoData({
      ...videoData,
      videoSrc: fullCourse?.previewVideo,
      type: 'mp4',
      startPlayer: true,
      isPreview: true
    });
  }

  async function activateVideoPlayer() {
    // if (courseAssignData?.isCourseAssigned) alert('Start the course');
    let data = {
      activeModule: { id: null, index: null },
      activeTopic: { id: null, index: null },
      activeTopicContent: { id: null, index: null },
      triggerPlayerToStartAt: null
    };
    let isTopicFound = false;
    let fallBack = null;
    let firstIncompletedTopicData = null;
    let firstNotStartedTopicData = null;

    userCourseData?.allModules?.some((mod, modIndex) => {
      mod?.topicData?.some((topic, topicIndex) => {
        if (topic?.type !== 'Content') return false;
        if (isTopicFound) return true;

        if (!fallBack) {
          fallBack = {
            activeModule: { index: modIndex, id: mod?.id },
            activeTopic: { index: topicIndex, id: topic?.id },
            activeTopicContent: { index: 0, id: topic?.topicContentData[0]?.id },
            triggerPlayerToStartAt: +topicProgress?.video_progress || 0
          };
        }

        const topicProgress = userCourseData?.userCourseProgress?.find(
          (obj) => obj?.topic_id === topic?.id
        );
        // console.log(topic);
        // console.log(topicProgress);

        if (topicProgress?.status === 'not-started' && !firstNotStartedTopicData) {
          firstNotStartedTopicData = {
            activeModule: { index: modIndex, id: mod?.id },
            activeTopic: { index: topicIndex, id: topic?.id },
            activeTopicContent: { index: 0, id: topic?.topicContentData[0]?.id },
            triggerPlayerToStartAt: +topicProgress?.video_progress || 0
          };
        }

        if (
          (!topicProgress || +topicProgress?.video_progress < 100) &&
          !firstIncompletedTopicData
        ) {
          firstIncompletedTopicData = {
            activeModule: { index: modIndex, id: mod?.id },
            activeTopic: { index: topicIndex, id: topic?.id },
            activeTopicContent: { index: 0, id: topic?.topicContentData[0]?.id },
            triggerPlayerToStartAt: +topicProgress?.video_progress || 0
          };
        }

        if (topicProgress?.status !== 'in-progress') return;

        data.activeModule = { index: modIndex, id: mod?.id };
        data.activeTopic = { index: topicIndex, id: topic?.id };
        data.activeTopicContent = { index: 0, id: topic?.topicContentData[0]?.id };
        data.triggerPlayerToStartAt = topicProgress?.video_progress || 0;
        isTopicFound = true;
      });

      return isTopicFound;
    });

    if (!isTopicFound)
      data = firstNotStartedTopicData
        ? { ...firstNotStartedTopicData }
        : { ...firstIncompletedTopicData };

    if (!data?.activeTopic?.id) data = { ...fallBack };

    // return;
    setUserCourseData({ ...userCourseData, ...data, switchModule: true });
    // setVideoData({
    //   ...videoData,
    //   videoSrc: validTopicContent?.contentUrl,
    //   type: validTopicContent?.type,
    //   startPlayer: true
    // });
  }

  async function assignCourseToUser() {
    setIsPopUpDataPresent(false);
    const { userCourseMapping } = userCourseData;
    const sendData = {
      userId: userData?.id,
      userLspId: userDataGlobal?.userDetails?.user_lsp_id,
      courseId: fullCourse?.id,
      addedBy: JSON.stringify({ userId: userData.id, role: 'self' }),
      courseType: fullCourse?.type,
      isMandatory: courseAssignData?.isMandatory,
      courseStatus: 'open',
      endDate: getUnixFromDate(courseAssignData?.endDate)?.toString()
    };

    // update course if user is reassigning this course to himself again
    if (userCourseMapping?.user_course_id) {
      
      sendData.userCourseId = userCourseMapping?.user_course_id;

      let isError = false;
      const res = await updateUserCouse({ variables: sendData }).catch((err) => (isError = !!err));
      if (isError) return setToastMsg({ type: 'danger', message: 'Course Maps update Error' });
      console.log( res?.data?.updateUserCourse, 'userCourseMap');

      setUserCourseData({
        ...userCourseData,
        userCourseMapping: res?.data?.updateUserCourse || {}
      });
      setCourseAssignData({ ...courseAssignData, isCourseAssigned: true });
      setIsAssignPopUpOpen(false);
      return;
    }

    let isError = false;
    const res = await addUserCourse({ variables: sendData }).catch((err) => {
      console.log(err);
      isError = true;
      return setToastMsg({ type: 'danger', message: 'Course Assign Error' });
    });
    // console.log(res);
    if (isError) return;
    if (res?.errors) return setToastMsg({ type: 'danger', message: 'Course Assign Error' });

    setUserCourseData({
      ...userCourseData,
      userCourseMapping: res?.data?.addUserCourse[0] || {}
    });
    setCourseAssignData({ ...courseAssignData, isCourseAssigned: true });
    setIsAssignPopUpOpen(false);
  }

  async function unassignCourseFromUser() {
    const { userCourseMapping } = userCourseData;
    // console.log()
    if (!userCourseMapping) return;
    const sendData = {
      userCourseId: userCourseMapping?.user_course_id,
      userId: userCourseMapping?.user_id,
      userLspId: userCourseMapping?.user_lsp_id,
      courseId: userCourseMapping?.course_id,
      addedBy: JSON.stringify({ userId: userData?.id, role: userData?.role }),
      courseType: userCourseMapping?.course_type,
      isMandatory: userCourseMapping?.is_mandatory,
      courseStatus: USER_STATUS?.disable,
      endDate: userCourseMapping?.end_date
    };

    // console.log(sendData,'chohrotdata');
    let isError = false;
    const res = await updateUserCouse({ variables: sendData }).catch((err) => (isError = !!err));
    if (isError) return setToastMsg({ type: 'danger', message: 'Course Maps update Error' });
    setCourseAssignData({ ...courseAssignData, isCourseAssigned: false });
    setToastMsg({ type: 'success', message: 'Course Removed Successfully!' });
    return;
  }

  return {
    courseAssignData,
    setCourseAssignData,
    isAssignPopUpOpen,
    setIsAssignPopUpOpen,
    activateVideoPlayer,
    assignCourseToUser,
    showPreviewVideo,
    unassignCourseFromUser
  };
}
