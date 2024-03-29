import { GET_COHORT_COURSES, queryClient } from '@/api/Queries';
import {
  ADD_USER_COHORT,
  ADD_USER_COURSE,
  UPDATE_COHORT_MAIN,
  UPDATE_USER_COHORT,
  UPDATE_USER_COURSE,
  userClient
} from '@/api/UserMutations';
import {
  GET_USER_COURSE_MAPS,
  GET_USER_COURSE_PROGRESS_ID,
  GET_USER_LATEST_COHORTS,
  GET_USER_LEARNINGSPACES_DETAILS,
  GET_USER_ORGANIZATION_DETAIL,
  userQueryClient
} from '@/api/UserQueries';
import { loadQueryDataAsync, sendNotificationWithLink } from '@/helper/api.helper';
import { getCurrentEpochTime } from '@/helper/common.helper';
import { COURSE_MAP_STATUS, COURSE_PROGRESS_STATUS, NOTIFICATION_TITLES } from '@/helper/constants.helper';
import { getUserData } from '@/helper/loggeduser.helper';
import { getUnixFromDate } from '@/helper/utils.helper';
import { FcmTokenAtom } from '@/state/atoms/notification.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { SelectedCohortDataAtom, UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cohortTabData } from './userBody.helper';

export default function useHandleCohortTab() {
  const [cohortTab, setCohortTab] = useState(cohortTabData[0].name);
  const [userOrgData, setUserOrgData] = useRecoilState(UsersOrganizationAtom);
  const [selectedCohort, setSelectedCohort] = useRecoilState(SelectedCohortDataAtom);

  //for adding user to cohorts

  const fcmToken = useRecoilValue(FcmTokenAtom);
  const [updateCohortMainData, { error: updateCohortError }] = useMutation(UPDATE_COHORT_MAIN, {
    client: userClient
  });

  const [addToCohort, { error, loading }] = useMutation(ADD_USER_COHORT, {
    client: userClient
  });

  const [addUserCourse] = useMutation(ADD_USER_COURSE, {
    client: userClient
  });

  const [updateUserCourse] = useMutation(UPDATE_USER_COURSE, {
    client: userClient
  });

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const [updateUserCohort, { error: updateError }] = useMutation(UPDATE_USER_COHORT, {
    client: userClient
  });

  function showActiveTab(tab) {
    const index = cohortTabData.findIndex((t) => {
      return t.name === tab;
    });

    if (index >= 0) return cohortTabData[index].component;
    return cohortTabData[0].component;
  }

  async function assignCourseToUser(userId = null, userLspId = null, cohort_id = null) {
    const { id } = getUserData();
    // if(!courseId) return false;
    if (!cohort_id) return false;
    if (!userId) return false;
    if (!userLspId) return false;

    const userCoursesMaps = await loadQueryDataAsync(
      GET_USER_COURSE_MAPS,
      { user_id: userId, publish_time: getCurrentEpochTime(), pageCursor: '', pageSize: 1000 },
      {},
      userQueryClient
    );

    if (userCoursesMaps?.error)
      return setToastMsg({
        type: 'danger',
        message: 'Error occured while loading user course map'
      });

    //filtering the courses based on user_lsp_id
    const courses = userCoursesMaps?.getUserCourseMaps?.user_courses?.filter(
      (item) => item?.user_lsp_id === userLspId
    );

    const cohortCourses = await loadQueryDataAsync(
      GET_COHORT_COURSES,
      { cohort_id: cohort_id },
      {},
      queryClient
    );
    if (cohortCourses?.error)
      return setToastMsg({ type: 'danger', message: 'Error while loading cohort courses!' });

    // const courseIds = cohortCourses?.getCohortCourseMaps?.length? (cohortCourses?.getCohortCourseMaps?.map((item)=> {item?.CourseId})):[];
    const _cohortCourses = cohortCourses?.getCohortCourseMaps;

    if (_cohortCourses?.length) {
      setSelectedCohort((prevValue) => ({ ...prevValue, cohortCourses: [..._cohortCourses] }));
    }

    
    const addNewCourses = _cohortCourses?.filter(
      ({ CourseId: id1 }) => !courses?.some(({ course_id: id2 }) => id2 === id1)
    );

    let oldCourses = [];
    for (let i = 0; i < courses?.length; i++) {
      for (let j = 0; j < _cohortCourses?.length; j++) {
        if (_cohortCourses?.[j]?.CourseId === courses?.[i]?.course_id) {
          oldCourses.push({
            ...courses[i],
            cohortCourseEndDate: _cohortCourses?.[j]?.ExpectedCompletion
          });
        }
      }
    }


    let isError = false;
    //addding course map if user doesnt have course assigned
    if (addNewCourses?.length) {
      for (let i = 0; i < addNewCourses?.length; i++) {
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + parseInt(addNewCourses[i]?.ExpectedCompletion));
        const sendData = {
          userId: userId,
          userLspId: userLspId,
          courseId: addNewCourses[i]?.CourseId,
          courseType: addNewCourses[i]?.CourseType,
          courseStatus: COURSE_MAP_STATUS.assign,
          addedBy: JSON.stringify({ user_id: id, role: 'cohort' }),
          isMandatory: addNewCourses[i]?.isMandatory,
          endDate: getUnixFromDate(endDate)?.toString(),
          lspId: addNewCourses[i]?.LspId
        };

        const res = await addUserCourse({ variables: sendData }).catch((err) => {
          console.log(err);
          isError = !!false;
          // return setToastMsg({ type: 'danger', message: 'Course Assign Error' });
          return;
        });


        if (isError) return setToastMsg({ type: 'danger', message: 'Course Assign Error' });
      }
    }

    // need to update old courses. check if it is assigned by admin or cohort
    if (oldCourses?.length) {
      for (let i = 0; i < oldCourses?.length; i++) {
        let addedBy = null;
        try {
          addedBy = JSON.parse(oldCourses[i]?.added_by);
        } catch (e) {
          console.log(e, 'error in try catch course assign');
        }

        if (addedBy?.role?.toLowerCase() === 'self') {
          const progressRes = await loadQueryDataAsync(
            GET_USER_COURSE_PROGRESS_ID,
            {
              userId: oldCourses[i]?.user_id,
              userCourseId: [oldCourses[i]?.user_course_id]
            },
            {},
            userClient
          );
          const isCourseStarted = progressRes?.getUserCourseProgressByMapId?.length > 0;

          let isCompleted = false;

          let courseStatus = COURSE_MAP_STATUS?.assign;

          if (!!isCourseStarted) {
            let cpLength = 0;
            progressRes?.getUserCourseProgressByMapId?.forEach((courseProgress) => {
              if (courseProgress?.status === COURSE_PROGRESS_STATUS[2]) {
                cpLength++;
              }
            });
            isCompleted =
              cpLength === progressRes?.getUserCourseProgressByMapId?.length ? true : false;
            if (isCompleted) courseStatus = COURSE_MAP_STATUS?.completed;
            else courseStatus = COURSE_MAP_STATUS?.started;
          }

          const endDate = new Date();
          endDate.setDate(endDate.getDate() + parseInt(oldCourses[i]?.cohortCourseEndDate));
          const sendData = {
            userCourseId: oldCourses[i]?.user_course_id,
            userId: oldCourses[i]?.user_id,
            userLspId: oldCourses[i]?.user_lsp_id,
            courseId: oldCourses[i]?.course_id,
            addedBy: JSON.stringify({ userId: id, role: 'cohort' }),
            courseType: oldCourses[i]?.course_type,
            isMandatory: oldCourses[i]?.is_mandatory,
            endDate: getUnixFromDate(endDate)?.toString(),
            lspId: oldCourses[i]?.lsp_id
          };

          sendData.courseStatus = courseStatus;


          const res = await updateUserCourse({ variables: sendData }).catch((err) => {
            isError = !!err;
          });
          if (isError) return setToastMsg({ type: 'danger', message: 'Course Assign Error' });
        }
        continue;
      }
    }

    if (isError) return false;


    // const origin = window?.location?.origin || '';
    // const bodyData = {
    //   user_name: userData?.first_name || '',
    //   lsp_name: sessionStorage?.getItem('lsp_name'),
    //   course_name: courseName || '',
    //   end_date: moment(courseAssignData?.endDate?.valueOf()).format('D MMM YYYY'),
    //   link: `${origin}/`
    // };

    // let emailBody = {
    //   to: [userData?.email],
    //   sender_name: sessionStorage?.getItem('lsp_name'),
    //   user_name: userData?.first_name || '',
    //   body: JSON.stringify(bodyData),
    //   template_id: ''
    // }
    // sendEmail(emailBody,{ context: { headers: { 'fcm-token': fcmToken || sessionStorage.getItem('fcm-token') } } })
    
    //**IMPORTANT: need email template for later to send email and getUserDetails query needs to be called for userDetails
    sendNotificationWithLink(
      {
        title: NOTIFICATION_TITLES?.courseUnssigned,
        body: 'You have been mapped to cohort. Please check out courses that have been assigned to you.',
        user_id: [userId],
        link: ''
      },
      { context: { headers: { 'fcm-token': fcmToken || sessionStorage.getItem('fcm-token') } } }
    );
    return true;
  }

  async function getUserLspData(user_id = null, lsp_id = null) {
    if (!user_id) return false;
    if (!lsp_id) return false;

    const resLsp = await loadQueryDataAsync(
      GET_USER_LEARNINGSPACES_DETAILS,
      { lsp_id: lsp_id, user_id: user_id },
      {},
      userQueryClient
    );
    if (resLsp?.error) return false;
    // console.log(resLsp?.getUserLspByLspId);
    return resLsp?.getUserLspByLspId;
  }

  async function addUserToCohort(userIds = [], cohortId = null) {
    // if(!userOrgData?.lsp_id && !<lsp_id>) return ;
    const lspId = sessionStorage.getItem('lsp_id');
    // if (!userOrgData?.lsp_id) setUserOrgData((prev) => ({ ...prev, lsp_id: lspId }));

    if (!userIds?.length) return setToastMsg({ type: 'info', message: 'Make sure to add users!' });

    const { id, role } = getUserData();

    for (let i = 0; i < userIds?.length; i++) {
      const userLspData = await getUserLspData(userIds[i], lspId);
      if (!userLspData)
        return setToastMsg({ type: 'danger', message: 'Error occured while loading user lsp id' });

      //checking if user is already added to cohort  or not because he may have been disabled and again added
      const sendData = {
        user_id: userIds[i],
        user_lsp_id: userLspData?.user_lsp_id,
        publish_time: getCurrentEpochTime(),
        pageCursor: '',
        pageSize: 10
      };

      const resCohorts = await loadQueryDataAsync(
        GET_USER_LATEST_COHORTS,
        { ...sendData },
        {},
        userQueryClient
      );
      // console.log(resCohorts?.getLatestCohorts?.cohorts);

      const cohorts = resCohorts?.getLatestCohorts?.cohorts;

      const userCohorts = cohorts?.filter((cohort) => cohort?.cohort_id === cohortId);
      // console.log(userCohorts,'userCohorts');

      if (userCohorts?.length) {
        const sendData = {
          user_cohort_id: userCohorts[0]?.user_cohort_id,
          user_id: userCohorts[0]?.user_id,
          user_lsp_id: userCohorts[0]?.user_lsp_id,
          cohort_id: userCohorts[0]?.cohort_id,
          added_by: JSON.stringify({ user_id: id, role: 'Cohort' }),
          membership_status: 'Active',
          role: 'Learner'
        };
        // console.log(sendData,'cohort send item');
        let isError = false;
        const res = await updateUserCohort({ variables: sendData }).catch((err) => {
          isError = true;
        });

        if (isError)
          return setToastMsg({
            type: 'danger',
            message: 'Error occured while updating user cohort mapping'
          });
      }

      if (!userCohorts?.length) {
        const sendCohortData = {
          user_id: userIds[i],
          user_lsp_id: userLspData?.user_lsp_id,
          cohort_id: cohortId,
          added_by: JSON.stringify({ user_id: id, role: role }),
          membership_status: 'Active',
          role: 'Learner'
        };

        let isError = false;
        const resCohort = await addToCohort({ variables: { userCohort: sendCohortData } }).catch(
          (err) => {
            console.log(err);
            isError = !!err;
          }
        );
        if (isError)
          return setToastMsg({
            type: 'danger',
            message: 'Error occured while adding user cohort mapping'
          });
      }

      // check if user have cohort courses
      const assignCourse = await assignCourseToUser(userIds[i], userLspData?.user_lsp_id, cohortId);

      if (!assignCourse)
        return setToastMsg({
          type: 'danger',
          message: 'Error occured while assigning courses to user'
        });
    }

    return userIds;
  }

  async function getUsersOrgDetails(userData = []) {
    if (!userOrgData?.lsp_id) return false;
    if (!userData?.length) return false;
    const updateUserData = [];
    // console.log(userData,'iserdataorg')
    for (let i = 0; i < userData?.length; i++) {
      // const userLspData = await getUserLspData(userData[i]?.user_id, userOrgData?.lsp_id);
      const organizationData = await loadQueryDataAsync(
        GET_USER_ORGANIZATION_DETAIL,
        { user_id: userData[i]?.user_id, user_lsp_id: userData[i]?.user_lsp_id },
        {},
        userQueryClient
      );
      if (organizationData?.error)
        return setToastMsg({ type: 'danger', message: 'Organization load error!' });
      updateUserData.push({
        ...userData[i],
        role_in_organization: organizationData?.getUserOrgDetails?.organization_role
      });
    }

    if (!updateUserData?.length) return userData;
    return updateUserData;
  }

  async function updateCohortMain(cohortData = null) {
    if (!cohortData) return;
    const sendCohortData = {
      cohort_id: cohortData?.cohort_id,
      name: cohortData?.name,
      description: cohortData?.description,
      lsp_id: cohortData?.lsp_id,
      code: cohortData?.code,
      status: 'SAVED',
      type: cohortData?.type,
      is_active: true,
      size: cohortData?.size
    };

    const resCohort = await updateCohortMainData({ variables: sendCohortData }).catch((err) => {
      // console.log(err);
      isError = !!err;
    });
  }

  return {
    cohortTab,
    setCohortTab,
    showActiveTab,
    addUserToCohort,
    getUsersOrgDetails,
    updateCohortMain
  };
}
