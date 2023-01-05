// components\CourseComps\Logic\useHandleCourseAssign.js

import { GET_ALL_COURSE_TOPICS_ID } from '@/api/Queries';
import {
  ADD_USER_COURSE,
  ADD_USER_COURSE_PROGRESS,
  UPDATE_USER_COURSE,
  userClient
} from '@/api/UserMutations';
import { GET_USER_COURSE_MAPS_BY_COURSE_ID } from '@/api/UserQueries';
import { IsDataPresentAtom } from '@/components/common/PopUp/Logic/popUp.helper';
import { loadAndCacheDataAsync, loadQueryDataAsync } from '@/helper/api.helper';
import { getUnixFromDate } from '@/helper/utils.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';
import { UserCourseDataAtom } from '@/state/atoms/video.atom';
import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getCourseAssignDataObj, getMinCourseAssignDate } from './courseComps.helper';

export default function useHandleCourseAssign({
  courseId = null,
  courseType = null,
  suggestedCompletionDays = 1,
  setIsAssignPopUpOpen = () => {},
  assignBy = 'self',
  onCourseAssign = () => {}
}) {
  const [addUserCourse] = useMutation(ADD_USER_COURSE, { client: userClient });
  const [updateUserCouse] = useMutation(UPDATE_USER_COURSE, { client: userClient });
  const [addUserCourseProgress] = useMutation(ADD_USER_COURSE_PROGRESS, { client: userClient });

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [isPopUpDataPresent, setIsPopUpDataPresent] = useRecoilState(IsDataPresentAtom);
  const [userCourseData, setUserCourseData] = useRecoilState(UserCourseDataAtom);

  const userData = useRecoilValue(UserStateAtom);
  const userOrgData = useRecoilValue(UsersOrganizationAtom);

  const endDate = getMinCourseAssignDate(suggestedCompletionDays);

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
    const userLspId = userOrgData?.user_lsp_id || sessionStorage?.getItem('user_lsp_id');

    if (!userLspId || !courseAssignData?.courseId || !courseAssignData?.courseType) {
      closePopUp();
      console.log(userLspId, courseAssignData);
      return setToastMsg({ type: 'danger', message: 'Something Went Wrong! Please Try Again.' });
    }

    setisSaveDisabled(false);
    setIsPopUpDataPresent(false);

    const sendData = {
      userId: userData?.id,
      userLspId: userLspId,
      courseId: courseAssignData?.courseId,
      addedBy: JSON.stringify({ userId: userData.id, role: assignBy }),
      courseType: courseAssignData?.courseType,
      isMandatory: courseAssignData?.isMandatory,
      courseStatus: 'open',
      endDate: getUnixFromDate(courseAssignData?.endDate)?.toString()
    };

    let isUpdateCourseMap = false;
    let isError = false;

    // load course map for current course for updating if map is already created
    const userCourse = await loadQueryDataAsync(
      GET_USER_COURSE_MAPS_BY_COURSE_ID,
      { userId: userData?.id, courseId: courseAssignData?.courseId },
      {},
      userClient
    );
    if (userCourse?.error) {
      closePopUp();
      return setToastMsg({ type: 'danger', message: 'Course Maps Load Error' });
    }

    const data = userCourse?.getUserCourseMapByCourseID?.[0];
    if (userCourse?.getUserCourseMapByCourseID?.length) isUpdateCourseMap = true;

    let userCourseMapping = {};
    let userCourseProgress = userCourseData?.userCourseProgress;

    // update user course map
    if (isUpdateCourseMap) {
      sendData.userCourseId = data?.user_course_id;
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
      userCourseProgress = await createUserTopicProgress(userCourseMapping?.user_course_id);
    }

    setUserCourseData({
      ...userCourseData,
      userCourseMapping: userCourseMapping || {},
      userCourseProgress: userCourseProgress || []
    });
    onCourseAssign({ userCourseMapping, userCourseProgress });
    closePopUp();
    setToastMsg({ type: 'success', message: 'Course Assigned Successfully.' });
  }

  async function createUserTopicProgress(userCourseId) {
    const userCourseProgressArr = [];
    const courseTopicRes = await loadAndCacheDataAsync(GET_ALL_COURSE_TOPICS_ID, {
      course_id: courseAssignData?.courseId
    });

    if (courseTopicRes?.error || !courseTopicRes?.getTopics?.length) return userCourseProgressArr;
    const allTopics = courseTopicRes?.getTopics;

    for (let i = 0; i < allTopics.length; i++) {
      const topic = allTopics[i];

      const sendData = {
        userCourseId,
        userId: userData.id,
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
