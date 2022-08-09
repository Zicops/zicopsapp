import { GET_COURSE } from '@/api/Queries';
import { ADD_USER_COURSE, userClient } from '@/api/UserMutations';
import { IsDataPresentAtom } from '@/components/common/PopUp/Logic/popUp.helper';
import { getQueryData } from '@/helper/api.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { getVideoObject, UserCourseDataAtom, VideoAtom } from '@/state/atoms/video.atom';
import { courseContext } from '@/state/contexts/CourseContext';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function useHandleCourseHero() {
  const [addUserCourse] = useMutation(ADD_USER_COURSE, {
    client: userClient
  });

  const router = useRouter();

  const { updateCourseMaster, isDataLoaded, setIsDataLoaded, fullCourse } =
    useContext(courseContext);

  const [userCourseData, setUserCourseData] = useRecoilState(UserCourseDataAtom);

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
    const data = {
      activeModule: { id: null, index: null },
      activeTopic: { id: null, index: null },
      activeTopicContent: { id: null, index: null }
    };
    let isTopicFound = false;

    userCourseData?.allModules?.some((mod, modIndex) => {
      mod?.topicData?.some((topic, topicIndex) => {
        if (topic?.type !== 'Content' || isTopicFound) return isTopicFound;

        data.activeModule = { index: modIndex, id: mod?.id };
        data.activeTopic = { index: topicIndex, id: topic?.id };
        data.activeTopicContent = { index: 0, id: topic?.topicContentData[0]?.id };
        isTopicFound = true;
        console.log(123, data);
      });

      return isTopicFound;
    });
    console.log(data);

    setUserCourseData({
      ...userCourseData,
      ...data
    });
    // setVideoData({
    //   ...videoData,
    //   videoSrc: validTopicContent?.contentUrl,
    //   type: validTopicContent?.type,
    //   startPlayer: true
    // });
  }

  async function assignCourseToUser() {
    setIsPopUpDataPresent(false);
    const sendData = {
      userId: userData?.id,
      userLspId: 'Zicops',
      courseId: fullCourse?.id,
      addedBy: JSON.stringify({ userId: userData.id, role: 'self' }),
      courseType: fullCourse?.type,
      isMandatory: courseAssignData?.isMandatory,
      courseStatus: 'open',
      endDate: courseAssignData?.endDate
    };

    const res = await addUserCourse({ variables: sendData }).catch((err) => {
      console.log(err);
      return setToastMsg({ type: 'danger', message: 'Course Assign Error' });
    });
    console.log(res);
    setCourseAssignData({ ...courseAssignData, isCourseAssigned: true });
    setIsAssignPopUpOpen(false);
  }

  return {
    courseAssignData,
    setCourseAssignData,
    isAssignPopUpOpen,
    setIsAssignPopUpOpen,
    activateVideoPlayer,
    assignCourseToUser,
    showPreviewVideo
  };
}
