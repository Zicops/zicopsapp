import { UPDATE_USER_COURSE, userClient } from '@/api/UserMutations';
import { GET_USER_COURSE_MAPS_BY_COURSE_ID } from '@/api/UserQueries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { COURSE_MAP_STATUS } from '@/helper/constants.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

export default function useHandleUpdateCourse() {
  const [updateUserCouse] = useMutation(UPDATE_USER_COURSE, { client: userClient });
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);


  async function updateCourse(userCourseData, userId = null, role = 'admin', adminId = null) {
    let id = !!adminId ? adminId : userId;
    const userCourse = await loadQueryDataAsync(
      GET_USER_COURSE_MAPS_BY_COURSE_ID,
      { userId: userId, courseId: userCourseData?.id },
      {},
      userClient
    );
    if (!userCourse?.getUserCourseMapByCourseID?.length) return false;
    if (userCourse?.error)
      return setToastMsg({ type: 'danger', message: 'Course Maps Load Error' });
    const data = userCourse?.getUserCourseMapByCourseID[0];
    const sendData = {
      userCourseId: data?.user_course_id,
      userId: data?.user_id,
      userLspId: data?.user_lsp_id,
      courseId: userCourseData?.id,
      addedBy: JSON.stringify({ userId: id, role: role }),
      courseType: data?.course_type,
      isMandatory: data?.is_mandatory,
      courseStatus: COURSE_MAP_STATUS.assign,
      endDate: data?.end_date
    };

    // console.log(sendData);
    let isError = false;
    const res = await updateUserCouse({ variables: sendData }).catch((err) => (isError = !!err));
    return !isError;
  }

  return { updateCourse };
}
