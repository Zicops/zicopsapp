// components\CourseComps\Logic\useHandleCourseAssign.js

import { GET_ALL_COURSE_TOPICS_ID } from '@/api/Queries';
import {
  ADD_USER_COURSE,
  ADD_USER_COURSE_PROGRESS,
  UPDATE_USER_COURSE,
  userClient
} from '@/api/UserMutations';
import { GET_USER_COURSE_MAPS_BY_COURSE_ID, GET_USER_COURSE_PROGRESS_ID } from '@/api/UserQueries';
import { IsDataPresentAtom } from '@/components/common/PopUp/Logic/popUp.helper';
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
import { getUnixFromDate } from '@/helper/utils.helper';
import { FcmTokenAtom } from '@/state/atoms/notification.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';
import { UserCourseDataAtom } from '@/state/atoms/video.atom';
import { useMutation } from '@apollo/client';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getCourseAssignDataObj, getMinCourseAssignDate } from './courseComps.helper';

export default function useHandleCourseAssign({
  courseId = null,
  courseType = null,
  suggestedCompletionDays = 1,
  setIsAssignPopUpOpen = () => {},
  assignBy = 'self',
  onCourseAssign = () => {},
  userId = null,
  lspId = null,
  userLspId = null,
  userName = null,
  userEmail = null,
  courseName = null
}) {
  const [addUserCourse] = useMutation(ADD_USER_COURSE, { client: userClient });
  const [updateUserCouse] = useMutation(UPDATE_USER_COURSE, { client: userClient });
  const [addUserCourseProgress] = useMutation(ADD_USER_COURSE_PROGRESS, { client: userClient });

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [isPopUpDataPresent, setIsPopUpDataPresent] = useRecoilState(IsDataPresentAtom);
  const [userCourseData, setUserCourseData] = useRecoilState(UserCourseDataAtom);

  const userData = useRecoilValue(UserStateAtom);
  const userOrgData = useRecoilValue(UsersOrganizationAtom);
  const fcmToken = useRecoilValue(FcmTokenAtom);

  const endDate = getMinCourseAssignDate(suggestedCompletionDays);

  const currentUserId = userData?.id;
  const userIdForCourseAssign = userId || currentUserId;

  const [isSaveDisabled, setisSaveDisabled] = useState(false);
  const [courseAssignData, setCourseAssignData] = useState(
    getCourseAssignDataObj({ endDate, isMandatory: false, courseId, courseType })
  );

  // udpate state if prop changes
  useEffect(() => {
    setCourseAssignData({ ...courseAssignData, courseId, courseType, endDate });
  }, [courseId, courseType, suggestedCompletionDays]);

  function closePopUp() {
    setCourseAssignData(getCourseAssignDataObj({ endDate, courseId, courseType }));
    setIsPopUpDataPresent(false, setIsAssignPopUpOpen(false));
  }

  async function assignCourseToUser() {
    const _userLspId =
      userLspId || userOrgData?.user_lsp_id || sessionStorage?.getItem('user_lsp_id');

    if (!_userLspId || !courseAssignData?.courseId || !courseAssignData?.courseType || !lspId) {
      closePopUp();
      return setToastMsg({ type: 'danger', message: 'Something Went Wrong! Please Try Again.' });
    }

    setisSaveDisabled(false);
    setIsPopUpDataPresent(false);

    const sendData = {
      userId: userIdForCourseAssign,
      userLspId: _userLspId,
      lspId: lspId,
      courseId: courseAssignData?.courseId,
      addedBy: JSON.stringify({ userId: currentUserId, role: assignBy }),
      courseType: courseAssignData?.courseType,
      isMandatory: courseAssignData?.isMandatory,
      courseStatus: COURSE_MAP_STATUS.assign,
      endDate: getUnixFromDate(courseAssignData?.endDate)?.toString()
    };

    let isError = false;

    // load course map for current course for updating if map is already created
    const data = await getAssignCourseData(userIdForCourseAssign, courseAssignData?.courseId);

    let userCourseMapping = {};
    // let userCourseProgress = userCourseData?.userCourseProgress;

    // update user course map
    if (data) {
      const progressRes = await loadQueryDataAsync(
        GET_USER_COURSE_PROGRESS_ID,
        {
          userId: userData?.id,
          userCourseId: [data?.user_course_id]
        },
        {},
        userClient
      );
      const isCourseStarted = progressRes?.getUserCourseProgressByMapId?.length > 0;

      sendData.userCourseId = data?.user_course_id;
      sendData.courseStatus = isCourseStarted
        ? COURSE_MAP_STATUS.started
        : COURSE_MAP_STATUS.assign;
      const userCourseMapRes = await updateUserCouse({ variables: sendData }).catch(
        (err) => (isError = !!err)
      );
      if (isError) {
        closePopUp();
        return setToastMsg({ type: 'danger', message: 'Course Maps update Error' });
      }

      userCourseMapping = userCourseMapRes?.data?.updateUserCourse || {};
    } else {
      // add user course map
      const userCourseMapRes = await addUserCourse({ variables: sendData }).catch((err) => {
        isError = !!err;
      });

      if (isError || userCourseMapRes?.errors) {
        closePopUp();
        return setToastMsg({ type: 'danger', message: 'Course Assign Error' });
      }
      userCourseMapping = userCourseMapRes?.data?.addUserCourse?.[0];
      // userCourseProgress = await createUserTopicProgress(
      //   userCourseMapping?.user_course_id,
      //   userIdForCourseAssign
      // );
    }

    setUserCourseData({
      ...userCourseData,
      userCourseMapping: userCourseMapping || {},
      isCourseAssigned: true
      // userCourseProgress: userCourseProgress || []
    });
    onCourseAssign({
      userCourseMapping
      // userCourseProgress
    });
    closePopUp();
    setToastMsg({ 
      type: 'success', 
      message: `You have added a new course to your learning folder. End date for completing ${courseName || ''} is ${
        courseAssignData?.endDate?.toDateString()
      }` });

    if (assignBy !== 'self') sendCourseAssignNotificationAndEmail();
  }

  async function sendCourseAssignNotificationAndEmail() {
    if (!userIdForCourseAssign || !userEmail) {
      return setToastMsg({
        type: 'danger',
        message: 'Something went wrong while sending user Notification.'
      });
    }

    const notificationBody = getNotificationMsg('courseAssign', {
      courseName: courseName || '',
      endDate: moment(courseAssignData?.endDate?.valueOf()).format('D MMM YYYY')
    });

    const origin = window?.location?.origin || '';

    const bodyData = {
      user_name: userName || '',
      lsp_name: sessionStorage?.getItem('lsp_name'),
      course_name: courseName || '',
      end_date: moment(courseAssignData?.endDate?.valueOf()).format('D MMM YYYY'),
      link: `${origin}/self-landing`
    };

    const sendMailData = {
      to: [userEmail],
      sender_name: sessionStorage?.getItem('lsp_name'),
      user_name: userName || '',
      body: JSON.stringify(bodyData),
      template_id: courseAssignData?.isMandatory
        ? EMAIL_TEMPLATE_IDS?.courseAssignMandatory
        : EMAIL_TEMPLATE_IDS?.courseAssignNotMandatory
    };

    const apiContextObj = {
      context: { headers: { 'fcm-token': fcmToken || sessionStorage.getItem('fcm-token') } }
    };

    await sendNotificationWithLink(
      {
        title: NOTIFICATION_TITLES?.courseAssign,
        body: notificationBody,
        user_id: [userIdForCourseAssign],
        link: `/course/${courseAssignData?.courseId}`
      },
      apiContextObj
    );
    await sendEmail(sendMailData, apiContextObj);
  }

  async function getAssignCourseData(userId, courseId) {
    // load course map for current course for updating if map is already created
    const userCourse = await loadQueryDataAsync(
      GET_USER_COURSE_MAPS_BY_COURSE_ID,
      { userId, courseId },
      {},
      userClient
    );
    if (userCourse?.error) {
      closePopUp();
      return setToastMsg({ type: 'danger', message: 'Course Maps Load Error' });
    }

    return userCourse?.getUserCourseMapByCourseID?.[0] || null;
  }

  async function createUserTopicProgress(userCourseId, userId) {
    const userCourseProgressArr = [];
    const courseTopicRes = await loadAndCacheDataAsync(GET_ALL_COURSE_TOPICS_ID, {
      course_id: courseAssignData?.courseId
    });

    if (courseTopicRes?.error || !courseTopicRes?.getTopics?.length) return userCourseProgressArr;
    const allTopics = courseTopicRes?.getTopics;

    for (let i = 0; i < allTopics.length; i++) {
      const topic = allTopics[i];

      const sendData = {
        userId,
        userCourseId,
        topicId: topic?.id,
        topicType: topic?.type,
        status: 'not-started',
        videoProgress: '',
        timestamp: ''
      };

      const progressRes = await addUserCourseProgress({ variables: sendData }).catch((err) => {
        console.log(err);
        return setToastMsg({ type: 'danger', message: 'Add Course Progress Error' });
      });

      const topicProgress = progressRes?.data?.addUserCourseProgress[0];
      if (topicProgress) userCourseProgressArr.push(topicProgress);
    }

    return userCourseProgressArr;
  }

  return { courseAssignData, setCourseAssignData, assignCourseToUser, isSaveDisabled };
}
