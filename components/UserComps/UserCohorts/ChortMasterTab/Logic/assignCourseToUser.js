import { queryClient } from '@/api/Queries';
import { ADD_USER_COURSE, UPDATE_USER_COURSE, userClient } from '@/api/UserMutations';
import {
  GET_USER_COURSE_MAPS_BY_COURSE_ID,
  GET_USER_DETAIL,
  GET_USER_LEARNINGSPACES_DETAILS,
  userQueryClient
} from '@/api/UserQueries';
import {
  loadQueryDataAsync,
  sendEmail,
  sendNotification,
  sendNotificationWithLink
} from '@/helper/api.helper';
import { getCurrentEpochTime, getNotificationMsg } from '@/helper/common.helper';
import { EMAIL_TEMPLATE_IDS, NOTIFICATION_TITLES } from '@/helper/constants.helper';
import { getUserData } from '@/helper/loggeduser.helper';
import { getUnixFromDate } from '@/helper/utils.helper';
import { FcmTokenAtom } from '@/state/atoms/notification.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useMutation } from '@apollo/client';
import { async } from '@firebase/util';
import moment from 'moment';
import { useRecoilState, useRecoilValue } from 'recoil';
import useCohortUserData from './useCohortUserData';

export default function assignCourseToUser() {
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const fcmToken = useRecoilValue(FcmTokenAtom);

  const { getCohortUser } = useCohortUserData();

  const [addUserCourse, { loading }] = useMutation(ADD_USER_COURSE, {
    client: userClient
  });
  const [updateUserCouse] = useMutation(UPDATE_USER_COURSE, { client: userClient });

  //get user course send data
  async function getUserCourseData(course_data = null, user_id = null) {
    const { id } = getUserData();
    const lspId = sessionStorage.getItem('lsp_id');
    if (!user_id) return setToastMsg({ type: 'danger', message: 'Need user_id to add course!' });
    const resLsp = await loadQueryDataAsync(
      GET_USER_LEARNINGSPACES_DETAILS,
      { user_id: user_id, lsp_id: lspId },
      {},
      userQueryClient
    );

    if (resLsp?.errors)
      return setToastMsg({ type: 'danger', message: 'Error while loading user lsp id!' });
    if (!resLsp?.getUserLspByLspId)
      return setToastMsg({ type: 'danger', message: 'Error while loading user lsp id!' });

    const sendData = {
      userId: user_id,
      userLspId: resLsp?.getUserLspByLspId?.user_lsp_id,
      courseId: course_data?.id,
      addedBy: JSON.stringify({ userId: id, role: 'cohort' }),
      courseType: course_data?.type,
      isMandatory: course_data?.isMandatory,
      courseStatus: 'open',
      endDate: getUnixFromDate(course_data?.endDate)?.toString(),
      lspId: course_data?.lspId
    };
    return sendData;
  }

  //assign the course to user
  async function assignCourseToUser(course_data = null, user_id = null) {
    if (!user_id) return setToastMsg({ type: 'danger', message: 'Need user_id to add course!' });

    const sendData = await getUserCourseData(course_data, user_id);
    // console.log(sendData);
    const res = await addUserCourse({ variables: sendData }).catch((err) => {
      if (err)
        return setToastMsg({ type: 'danger', message: 'Error while adding course to user!' });
    });
    console.log(res);
    return true;
  }

  //check if the course is assigned to user or not
  async function isCourseAssigned(course_id = null, user_id = null) {
    if (!course_id) return;
    if (!user_id) return setToastMsg({ type: 'danger', message: 'Need user_id to add course!' });
    const res = await loadQueryDataAsync(
      GET_USER_COURSE_MAPS_BY_COURSE_ID,
      { userId: user_id, courseId: course_id },
      {},
      userQueryClient
    );
    if (res?.error)
      return setToastMsg({ type: 'danger', message: 'Error while loading user course data!' });
    if (!res?.getUserCourseMapByCourseID) return false;
    return res?.getUserCourseMapByCourseID;
  }

  async function assignCourseToOldUser(cohort_id = null, course_data = null, cohortData = null) {
    if (!cohort_id) return;
    if (!course_data?.id) return;
    const cohortUsers = await getCohortUser(cohort_id);
    // console.log(cohortUsers);
    if (!cohortUsers?.length)
      return setToastMsg({ type: 'info', message: 'No Cohort User found!' });

    const userIds = cohortUsers?.map((user) => user?.id);
    let isError = false;
    for (let i = 0; i < cohortUsers?.length; i++) {
      const checkCourse = await isCourseAssigned(course_data?.id, cohortUsers[i]?.id);
      if (!checkCourse) {
        // console.log('assign course');
        const isAssigned = await assignCourseToUser(course_data, cohortUsers[i]?.id);
        if (!isAssigned) {
          isError = true;
          return setToastMsg({
            type: 'info',
            message: `Error while assiging course to user ${cohortUsers[i]?.id}`
          });
        }
        continue;
      } else {
        // console.log('check if it is assigned to admin or not',checkCourse)
        const { role } = JSON.parse(checkCourse[0]?.added_by);
        if (role.toLowerCase() === 'admin') continue;
        const sendData = await getUserCourseData(course_data, cohortUsers[i]?.id);
        sendData.userCourseId = checkCourse[0]?.user_course_id;
        const res = await updateUserCouse({ variables: sendData }).catch((err) => {
          isError = true;
          if (err) return setToastMsg({ type: 'danger', message: 'User Course Maps update Error' });
        });
      }
    }
    // if(!isError){
    //   const notificaitonBody = getNotificationMsg('courseAssign',{courseName:course_data?.name,endDate:course_data?.endDate})
    //   await sendNotification(
    //     {
    //       title: NOTIFICATION_TITLES?.courseAssign,
    //       body: notificaitonBody,
    //       user_id: userIds
    //     },
    //     { context: { headers: { 'fcm-token': fcmToken || sessionStorage.getItem('fcm-token') } } }
    //   );
    // }

    const endDate = getUnixFromDate(course_data?.endDate) * 1000;
    if (!isError) {
      const notificaitonBody = getNotificationMsg('courseAssign', {
        courseName: course_data?.name,
        endDate: moment(endDate).format('D MMM YYYY')
      });
      await sendNotificationWithLink(
        {
          title: NOTIFICATION_TITLES?.courseAssign,
          body: notificaitonBody,
          user_id: userIds,
          link: `/course/${course_data?.id}`
        },
        { context: { headers: { 'fcm-token': fcmToken || sessionStorage.getItem('fcm-token') } } }
      );
    }

    if (!isError) {
      const resUserDetails = await loadQueryDataAsync(
        GET_USER_DETAIL,
        { user_id: userIds },
        {},
        userQueryClient
      );
      const cohortUserEmail = [];
      const cohortUserName = [];
      resUserDetails?.getUserDetails?.forEach((user) => {
        cohortUserEmail.push(user?.email);
        const uName = user?.is_verified ? user?.first_name : '';
        cohortUserName.push(uName);
      });

      const endDate = getUnixFromDate(course_data?.endDate) * 1000;

      const bodyData = {
        lsp_name: sessionStorage?.getItem('lsp_name'),
        course_name: course_data?.name,
        end_date: moment(endDate).format('D MMM YYYY'),
        link: `/course/${course_data?.id}`
      };
      const sendEmailBody = {
        to: cohortUserEmail,
        sender_name: sessionStorage?.getItem('lsp_name'),
        user_name: cohortUserName,
        body: JSON.stringify(bodyData),
        template_id: course_data?.isMandatory
          ? EMAIL_TEMPLATE_IDS?.courseAssignMandatory
          : EMAIL_TEMPLATE_IDS?.courseAssignNotMandatory
      };

      await sendEmail(sendEmailBody, {
        context: { headers: { 'fcm-token': fcmToken || sessionStorage.getItem('fcm-token') } }
      });
    }
    return !isError;
  }

  async function removeUserCohortCourses(
    cohortId = null,
    courseId = null,
    courseName = '',
    cohortData = null,
    courseData = null
  ) {
    if (!courseId) return false;
    if (!cohortId) return false;
    const { id } = getUserData();
    let isError = false;
    const cohortUsers = await getCohortUser(cohortId);
    if (!cohortUsers?.length)
      return setToastMsg({ type: 'info', message: 'No Cohort User found!' });
    const userIds = cohortUsers?.map((user) => user?.id);
    for (let i = 0; i < cohortUsers?.length; i++) {
      const checkCourse = await isCourseAssigned(courseId, cohortUsers[i]?.id);
      const { role } = JSON.parse(checkCourse[0]?.added_by);
      if (role.toLowerCase() === 'admin') continue;
      const _addedBy = JSON?.stringify({ userId: id, role: 'self' });
      const sendData = {
        userCourseId: checkCourse[0]?.user_course_id,
        userId: checkCourse[0]?.user_id,
        userLspId: checkCourse[0]?.user_lsp_id,
        courseId: courseId,
        addedBy: _addedBy,
        courseType: checkCourse[0]?.course_type,
        isMandatory: checkCourse[0]?.is_mandatory,
        courseStatus: 'open',
        endDate: checkCourse[0]?.end_date,
        lspId:courseData?.lspId
      };
      const res = await updateUserCouse({ variables: sendData }).catch((err) => {
        isError = !!err;
        if (err) return setToastMsg({ type: 'danger', message: 'User Course Maps Delete Error' });
      });
    }

    // if(!isError){
    //   const notificaitonBody = getNotificationMsg('courseUnassign',{courseName:courseName});
    // await sendNotification(
    //   {
    //     title: NOTIFICATION_TITLES?.courseUnssigned,
    //     body: notificaitonBody,
    //     user_id: userIds
    //   },
    //   { context: { headers: { 'fcm-token': fcmToken || sessionStorage.getItem('fcm-token') } } }
    // );
    // }

    if (!isError) {
      const resUserDetails = await loadQueryDataAsync(
        GET_USER_DETAIL,
        { user_id: userIds },
        {},
        userQueryClient
      );
      const cohortUserEmail = [];
      const cohortUserName = [];
      resUserDetails?.getUserDetails?.forEach((user) => {
        cohortUserEmail.push(user?.email);
        const uName = user?.is_verified ? user?.first_name : '';
        cohortUserName.push(uName);
      });

      const origin = window?.location?.origin || '';

      const bodyData = {
        lsp_name: sessionStorage?.getItem('lsp_name'),
        course_name: courseName,
        link: `${origin}/self-landing`
      };
      const sendEmailBody = {
        to: cohortUserEmail,
        sender_name: sessionStorage?.getItem('lsp_name'),
        user_name: cohortUserName,
        body: JSON.stringify(bodyData),
        template_id: EMAIL_TEMPLATE_IDS?.courseUnassign
      };

        const notificaitonBody = getNotificationMsg('courseUnassign',{courseName:courseName});
    await sendNotification(
      {
        title: NOTIFICATION_TITLES?.courseUnssigned,
        body: notificaitonBody,
        user_id: userIds
      },
      { context: { headers: { 'fcm-token': fcmToken || sessionStorage.getItem('fcm-token') } } }
    );
      await sendEmail(sendEmailBody, {
        context: { headers: { 'fcm-token': fcmToken || sessionStorage.getItem('fcm-token') } }
      });
    }

    return !isError;
  }

  return { assignCourseToOldUser, removeUserCohortCourses };
}
