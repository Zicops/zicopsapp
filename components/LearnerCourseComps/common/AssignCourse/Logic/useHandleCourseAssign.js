// components\CourseComps\Logic\useHandleCourseAssign.js

import {
  ADD_USER_COURSE,
  ADD_USER_COURSE_PROGRESS,
  UPDATE_USER_COURSE,
  userClient,
} from '@/api/UserMutations';
import { GET_USER_COURSE_MAPS_BY_COURSE_ID, GET_USER_COURSE_PROGRESS_ID } from '@/api/UserQueries';
import { IsDataPresentAtom } from '@/components/common/PopUp/Logic/popUp.helper';
import {
  getUserCourseMapDataObj,
  UserCourseMapDataAtom,
} from '@/components/LearnerCourseComps/atoms/learnerCourseComps.atom';
import { loadAndCacheDataAsync, sendEmail, sendNotificationWithLink } from '@/helper/api.helper';
import { getNotificationMsg } from '@/helper/common.helper';
import {
  COURSE_MAP_STATUS,
  COURSE_PROGRESS_STATUS,
  EMAIL_TEMPLATE_IDS,
  NOTIFICATION_TITLES,
} from '@/helper/constants.helper';
import { getUnixFromDate, parseJson } from '@/helper/utils.helper';
import { FcmTokenAtom } from '@/state/atoms/notification.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';
import { useMutation } from '@apollo/client';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getCourseAssignDataObj, getMinCourseAssignDate } from './assignCourse.helper';

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
  courseName = null,
  userIsVerified = true,
}) {
  const [addUserCourse] = useMutation(ADD_USER_COURSE, { client: userClient });
  const [updateUserCouse] = useMutation(UPDATE_USER_COURSE, { client: userClient });
  const [addUserCourseProgress] = useMutation(ADD_USER_COURSE_PROGRESS, { client: userClient });

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [isPopUpDataPresent, setIsPopUpDataPresent] = useRecoilState(IsDataPresentAtom);
  const [userCourseMapData, setUserCourseMapData] = useRecoilState(UserCourseMapDataAtom);

  const userData = useRecoilValue(UserStateAtom);
  const userOrgData = useRecoilValue(UsersOrganizationAtom);
  const fcmToken = useRecoilValue(FcmTokenAtom);

  const endDate = getMinCourseAssignDate(suggestedCompletionDays);

  const currentUserId = userData?.id;
  const userIdForCourseAssign = userId || currentUserId;

  const [isSaveDisabled, setisSaveDisabled] = useState(false);
  const [courseAssignData, setCourseAssignData] = useState(
    getCourseAssignDataObj({ endDate, isMandatory: false, courseId, courseType }),
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
      endDate: getUnixFromDate(courseAssignData?.endDate)?.toString(),
    };

    let isError = false;

    // load course map for current course for updating if map is already created
    let data = null;
    if (!!userCourseMapData?.userCourseId) data = structuredClone(userCourseMapData);
    if (!data) data = await getAssignCourseData(userIdForCourseAssign, courseAssignData?.courseId);

    let _courseMapData = {};
    // let userCourseProgress = userCourseData?.userCourseProgress;

    // update user course map
    if (data) {
      const progressRes = await loadAndCacheDataAsync(
        GET_USER_COURSE_PROGRESS_ID,
        { userId: userData?.id, userCourseId: [data?.userCourseId] },
        {},
        userClient,
      );
      const isCourseStarted = progressRes?.getUserCourseProgressByMapId?.length > 0;

      let isCompleted = false;
      let courseStatus = COURSE_MAP_STATUS?.assign;

      if (!!isCourseStarted) {
        let cpLength = 0;
        progressRes?.getUserCourseProgressByMapId?.forEach((courseProgress) => {
          if (courseProgress?.status === COURSE_PROGRESS_STATUS[2]) cpLength++;
        });
        isCompleted = cpLength === progressRes?.getUserCourseProgressByMapId?.length ? true : false;
        if (isCompleted) courseStatus = COURSE_MAP_STATUS?.completed;
        else courseStatus = COURSE_MAP_STATUS?.started;
      }

      sendData.userCourseId = data?.userCourseId;
      // const courseStatus = isCourseStarted
      //   ? isCompleted
      //     ? COURSE_MAP_STATUS.completed
      //     : COURSE_MAP_STATUS?.started
      //   : COURSE_MAP_STATUS?.assign;
      sendData.courseStatus = courseStatus;
      const userCourseMapRes = await updateUserCouse({ variables: sendData }).catch(
        (err) => (isError = !!err),
      );
      if (isError) {
        closePopUp();
        return setToastMsg({ type: 'danger', message: 'Course Maps update Error' });
      }

      _courseMapData = userCourseMapRes?.data?.updateUserCourse || {};
    } else {
      // add user course map
      const userCourseMapRes = await addUserCourse({ variables: sendData }).catch(
        (err) => (isError = !!err),
      );

      if (isError || userCourseMapRes?.errors) {
        closePopUp();
        return setToastMsg({ type: 'danger', message: 'Course Assign Error' });
      }
      _courseMapData = userCourseMapRes?.data?.addUserCourse?.[0];
    }

    setUserCourseMapData(
      getUserCourseMapDataObj({
        ...userCourseMapData,
        userCourseId: _courseMapData?.user_course_id,
        userId: _courseMapData?.user_id,
        userLspId: _courseMapData?.user_lsp_id,
        courseId: _courseMapData?.course_id,
        courseType: _courseMapData?.course_type,
        addedBy: _courseMapData?.added_by,
        isMandatory: _courseMapData?.is_mandatory,
        endDate: _courseMapData?.end_date,
        courseStatus: _courseMapData?.course_status,

        createdAt: _courseMapData?.created_at,
        updatedAt: _courseMapData?.updated_at,
        createdBy: _courseMapData?.created_by,
        updatedBy: _courseMapData?.updated_by,
      }),
    );
    onCourseAssign({ _courseMapData });
    closePopUp();
    setToastMsg({
      type: 'success',
      message: `Course ${
        courseName || ''
      } added successfully. It's end date is ${courseAssignData?.endDate?.toDateString()}`,
    });

    sendCourseAssignNotificationAndEmail();
  }

  async function sendCourseAssignNotificationAndEmail() {
    const user = parseJson(sessionStorage?.getItem('loggedUser'));

    let email = !!userEmail ? userEmail : user?.email;
    let name = !!userName ? userName : userData?.first_name;

    const notificationBody = getNotificationMsg('courseAssign', {
      courseName: courseName || '',
      endDate: moment(courseAssignData?.endDate?.valueOf()).format('D MMM YYYY'),
    });

    const origin = window?.location?.origin || '';

    const bodyData = {
      user_name: name || '',
      lsp_name: sessionStorage?.getItem('lsp_name'),
      course_name: courseName || '',
      end_date: moment(courseAssignData?.endDate?.valueOf()).format('D MMM YYYY'),
      link: `${origin}/self-landing`,
    };

    const sendMailData = {
      to: [email],
      sender_name: sessionStorage?.getItem('lsp_name'),
      user_name: userName || '',
      body: JSON.stringify(bodyData),
      template_id: courseAssignData?.isMandatory
        ? EMAIL_TEMPLATE_IDS?.courseAssignMandatory
        : EMAIL_TEMPLATE_IDS?.courseAssignNotMandatory,
    };

    const apiContextObj = {
      context: { headers: { 'fcm-token': fcmToken || sessionStorage.getItem('fcm-token') } },
    };

    await sendNotificationWithLink(
      {
        title: NOTIFICATION_TITLES?.courseAssign,
        body: notificationBody,
        user_id: [userIdForCourseAssign],
        link: `/course/${courseAssignData?.courseId}`,
      },
      apiContextObj,
    );
    await sendEmail(sendMailData, apiContextObj);
  }

  async function getAssignCourseData(userId, courseId) {
    // load course map for current course for updating if map is already created
    const userCourse = await loadAndCacheDataAsync(
      GET_USER_COURSE_MAPS_BY_COURSE_ID,
      { userId, courseId },
      {},
      userClient,
    );
    if (userCourse?.error) {
      closePopUp();
      setToastMsg({ type: 'danger', message: 'Course Maps Load Error' });
      return null;
    }

    const mapData = userCourse?.getUserCourseMapByCourseID?.[0] || null;
    if (!mapData) return null;

    return {
      userCourseId: mapData?.user_course_id,
      userId: mapData?.user_id,
      userLspId: mapData?.user_lsp_id,
      courseId: mapData?.course_id,
      courseType: mapData?.course_type,
      addedBy: mapData?.added_by,
      isMandatory: mapData?.is_mandatory,
      endDate: mapData?.end_date,
      courseStatus: mapData?.course_status,

      createdAt: mapData?.created_at,
      updatedAt: mapData?.updated_at,
      createdBy: mapData?.created_by,
      updatedBy: mapData?.updated_by,
    };
  }

  return { courseAssignData, setCourseAssignData, assignCourseToUser, isSaveDisabled };
}
