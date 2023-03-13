import { GET_COURSE } from '@/api/Queries';
import { ADD_USER_COURSE, UPDATE_USER_COURSE, userClient } from '@/api/UserMutations';
import { GET_USER_COURSE_MAPS_BY_COURSE_ID, userQueryClient } from '@/api/UserQueries';
import { IsDataPresentAtom } from '@/components/common/PopUp/Logic/popUp.helper';
import { ActiveCourseTabAtom, tabs } from '@/components/CourseBody/Logic/courseBody.helper';
import {
  loadAndCacheDataAsync,
  loadQueryDataAsync,
  sendEmail,
  sendNotificationWithLink
} from '@/helper/api.helper';
import { getNotificationMsg } from '@/helper/common.helper';
import {
  COURSE_MAP_STATUS,
  EMAIL_TEMPLATE_IDS,
  NOTIFICATION_TITLES
} from '@/helper/constants.helper';
import { getMinCourseAssignDate } from '@/helper/utils.helper';
import { UserDataAtom } from '@/state/atoms/global.atom';
import { FcmTokenAtom } from '@/state/atoms/notification.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';
import {
  getUserCourseDataObj,
  getVideoObject,
  UserCourseDataAtom,
  VideoAtom
} from '@/state/atoms/video.atom';
import { courseContext } from '@/state/contexts/CourseContext';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function useHandleCourseHero(isPreview) {
  const [addUserCourse] = useMutation(ADD_USER_COURSE, { client: userClient });
  const [updateUserCouse] = useMutation(UPDATE_USER_COURSE, { client: userClient });

  const minDate = getMinCourseAssignDate();

  const [loadUserCourseMaps, { error: errorCourseMapsLoad, loading: loadingCourseMaps }] =
    useLazyQuery(GET_USER_COURSE_MAPS_BY_COURSE_ID, {
      client: userQueryClient
    });

  const router = useRouter();
  const courseId = router?.query?.courseId;

  const { updateCourseMaster, isDataLoaded, setIsDataLoaded, fullCourse } =
    useContext(courseContext);
  const [userCourseData, setUserCourseData] = useRecoilState(UserCourseDataAtom);

  const [activeCourseTab, setActiveCourseTab] = useRecoilState(ActiveCourseTabAtom);
  const userDataGlobal = useRecoilValue(UserDataAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [videoData, setVideoData] = useRecoilState(VideoAtom);
  const [isPopUpDataPresent, setIsPopUpDataPresent] = useRecoilState(IsDataPresentAtom);
  const userData = useRecoilValue(UserStateAtom);
  const userOrgData = useRecoilValue(UsersOrganizationAtom);
  const fcmToken = useRecoilValue(FcmTokenAtom);

  const [courseAssignData, setCourseAssignData] = useState({
    endDate: minDate,
    isMandatory: false,
    isCourseAssigned: false
  });
  const [isAssignPopUpOpen, setIsAssignPopUpOpen] = useState(false);

  // reset video data
  useEffect(() => {
    setVideoData(getVideoObject());
  }, []);

  // const {
  //   data: courseData,
  //   loading,
  //   error
  // } = getQueryData(GET_COURSE, { course_id: router?.query?.courseId }, { fetchPolicy: 'no-cache' });

  useEffect(async () => {
    if (!courseId) return;

    const loadFullCourseData = isPreview ? loadQueryDataAsync : loadAndCacheDataAsync;
    const courseData = await loadFullCourseData(GET_COURSE, {
      course_id: [courseId]
    });
    // if (!isPreview) {
    // courseData = await loadAndCacheDataAsync(GET_COURSE, {
    //   course_id: courseId
    // });
    // } else {
    //   courseData = await loadQueryDataAsync(GET_COURSE, {
    //     course_id: courseId
    //   });
    // }

    if (courseData?.getCourse && isDataLoaded !== courseId) {
      updateCourseMaster(courseData.getCourse?.[0]);

      setIsDataLoaded(courseId);
    }
  }, [courseId]);

  useEffect(async () => {
    if (!userData?.id) return;
    if (!fullCourse?.id) return;
    // user course progress
    const mapRes = await loadUserCourseMaps({
      variables: { userId: userData?.id, courseId: fullCourse?.id },
      fetchPolicy: 'no-cache'
    }).catch((err) => {
      if (err?.message?.includes('no user course found')) return;
      if (err) setToastMsg({ type: 'danger', message: 'Course Map Load Error' });
    });
    // console.log(mapRes);
    if (mapRes?.error && !mapRes?.error?.message?.includes('no user course found'))
      return setToastMsg({ type: 'danger', message: 'user course maps load error' });

    const _mapRes = mapRes?.data?.getUserCourseMapByCourseID?.filter(
      (course) => course?.course_status?.toLowerCase() !== COURSE_MAP_STATUS?.disable
    );

    const userCourseMapping = _mapRes?.[0] || {};

    setUserCourseData({
      ...userCourseData,
      userCourseMapping: userCourseMapping || {},
      isCourseAssigned:
        !!Object.keys(userCourseMapping).length &&
        userCourseMapping?.course_status?.toLowerCase() !== 'disabled'
    });
  }, [fullCourse, userData]);

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
        // if (topic?.type !== 'Content') return false;
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

        if (
          (!topicProgress || topicProgress?.status === 'not-started') &&
          !firstNotStartedTopicData
        ) {
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
    if (activeCourseTab !== tabs?.[0]?.name) setActiveCourseTab(tabs?.[0]?.name);
    // setVideoData({
    //   ...videoData,
    //   videoSrc: validTopicContent?.contentUrl,
    //   type: validTopicContent?.type,
    //   startPlayer: true
    // });
  }

  function sendCourseUnAssignNotification() {
    const notificationBody = getNotificationMsg('unassignSelfCourse', {
      courseName: fullCourse?.name
    });

    sendNotificationWithLink(
      {
        title: NOTIFICATION_TITLES?.courseUnssigned,
        body: notificationBody,
        user_id: [userData?.id || ''],
        link: ''
      },
      { context: { headers: { 'fcm-token': fcmToken || sessionStorage.getItem('fcm-token') } } }
    );
    // console.log(userCourseData,'sd')

    const origin = window?.location?.origin || '';
    const userName = `${userData?.first_name || ''} ${userData?.last_name || ''}`;
    const bodyData = {
      user_name: userName,
      lsp_name: sessionStorage?.getItem('lsp_name'),
      course_name: fullCourse?.name,
      link: `${origin}/self-landing`
    };
    const sendMailData = {
      to: [userData?.email],
      sender_name: sessionStorage?.getItem('lsp_name'),
      user_name: userName,
      body: JSON.stringify(bodyData),
      template_id: EMAIL_TEMPLATE_IDS?.courseUnassign
    };
    //#IMPORTANT : need template for course self unassign mail
    sendEmail(sendMailData, {
      context: { headers: { 'fcm-token': fcmToken || sessionStorage.getItem('fcm-token') } }
    });
  }

  async function unassignCourseFromUser() {
    const { userCourseMapping } = userCourseData;

    if (!userCourseMapping) return;
    const sendData = {
      userCourseId: userCourseMapping?.user_course_id,
      userId: userCourseMapping?.user_id,
      userLspId: userCourseMapping?.user_lsp_id,
      courseId: userCourseMapping?.course_id,
      addedBy: JSON.stringify({ userId: userData?.id, role: 'self' }),
      courseType: userCourseMapping?.course_type,
      isMandatory: userCourseMapping?.is_mandatory,
      courseStatus: COURSE_MAP_STATUS?.disable,
      endDate: userCourseMapping?.end_date
    };

    // console.log(sendData,'chohrotdata');
    let isError = false;
    const res = await updateUserCouse({ variables: sendData }).catch((err) => (isError = !!err));
    if (isError) return setToastMsg({ type: 'danger', message: 'Course Maps update Error' });
    setCourseAssignData({ ...courseAssignData, isCourseAssigned: false });
    setUserCourseData(getUserCourseDataObj());
    setToastMsg({ type: 'success', message: `You have removed course ${fullCourse?.name}` });
    sendCourseUnAssignNotification();

    return;
  }

  return {
    courseAssignData,
    setCourseAssignData,
    isAssignPopUpOpen,
    setIsAssignPopUpOpen,
    activateVideoPlayer,
    showPreviewVideo,
    unassignCourseFromUser
  };
}
