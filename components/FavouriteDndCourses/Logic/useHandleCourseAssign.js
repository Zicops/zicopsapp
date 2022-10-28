import { GET_COURSE } from '@/api/Queries';
import { ADD_USER_COURSE, UPDATE_USER_COURSE, userClient } from '@/api/UserMutations';
import { GET_USER_COURSE_MAPS_BY_COURSE_ID } from '@/api/UserQueries';
import { IsDataPresentAtom } from '@/components/common/PopUp/Logic/popUp.helper';
import { getQueryData, loadQueryDataAsync } from '@/helper/api.helper';
import { getUnixFromDate, parseJson } from '@/helper/utils.helper';
import { UserDataAtom } from '@/state/atoms/global.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { getVideoObject, UserCourseDataAtom, VideoAtom } from '@/state/atoms/video.atom';
import { courseContext } from '@/state/contexts/CourseContext';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function useHandleCourseAssign() {
  const [addUserCourse] = useMutation(ADD_USER_COURSE, { client: userClient });
  const [updateUserCouse] = useMutation(UPDATE_USER_COURSE, { client: userClient });

  const router = useRouter();

  const [userCourseData, setUserCourseData] = useRecoilState(UserCourseDataAtom);

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [isPopUpDataPresent, setIsPopUpDataPresent] = useRecoilState(IsDataPresentAtom);
  const userData = useRecoilValue(UserStateAtom);
  const userDataGlobal = useRecoilValue(UserDataAtom);

  const [courseAssignData, setCourseAssignData] = useState({
    endDate: new Date(),
    isMandatory: false,
    isCourseAssigned: false,
    fullCourse: {}
  });
  const [isAssignPopUpOpen, setIsAssignPopUpOpen] = useState(false);
  const [isSaveDisabled, setisSaveDisabled] = useState(false);

  async function assignCourseToUser() {
    const {user_lsp_id} = parseJson(sessionStorage?.getItem('lspData'));
    setisSaveDisabled(false);
    setIsPopUpDataPresent(false);
    const sendData = {
      userId: userData?.id,
      userLspId: userDataGlobal?.userDetails?.user_lsp_id || user_lsp_id ,
      courseId: courseAssignData?.fullCourse?.id,
      addedBy: JSON.stringify({ userId: userData.id, role: 'self' }),
      courseType: courseAssignData?.fullCourse?.type,
      isMandatory: courseAssignData?.isMandatory,
      courseStatus: 'open',
      endDate: getUnixFromDate(courseAssignData?.endDate)?.toString()
    };

    let isUpdateCourse = false;
    const userCourse = await loadQueryDataAsync(
      GET_USER_COURSE_MAPS_BY_COURSE_ID,
      { userId: userData?.id, courseId: courseAssignData?.fullCourse?.id },
      {},
      userClient
    );
    if (userCourse?.error)
    return setToastMsg({ type: 'danger', message: 'Course Maps Load Error' });
    const data = userCourse?.getUserCourseMapByCourseID?.[0];
    
    if (userCourse?.getUserCourseMapByCourseID?.length) isUpdateCourse = true;
    // console.log(sendData);
    let isError = false;

    let res ;
    let courseData ; 
    if (isUpdateCourse) {
      sendData.userCourseId = data?.user_course_id;
       res = await updateUserCouse({ variables: sendData }).catch((err) => (isError = !!err));
      if (isError) return setToastMsg({ type: 'danger', message: 'Course Maps update Error' });

      setUserCourseData({
        ...userCourseData,
        userCourseMapping:res?.data?.updateUserCourse || {}
      });
      setCourseAssignData({ ...courseAssignData, isCourseAssigned: true });
      setIsAssignPopUpOpen(false);
      setisSaveDisabled(false);
      return ;
    }

    if (!isUpdateCourse) {
       res = await addUserCourse({ variables: sendData }).catch((err) => {
        console.log(err);
        isError = true;
        return setToastMsg({ type: 'danger', message: 'Course Assign Error' });
      });
      // console.log(res);
      if (res?.errors) return setToastMsg({ type: 'danger', message: 'Course Assign Error' });
    

    if (isError) return;
    setUserCourseData({
      ...userCourseData,
      userCourseMapping: res?.data?.addUserCourse[0] || {}
    });
    setCourseAssignData({ ...courseAssignData, isCourseAssigned: true });
    setIsAssignPopUpOpen(false);
    setisSaveDisabled(false); }
  }

  return {
    courseAssignData,
    setCourseAssignData,
    isAssignPopUpOpen,
    setIsAssignPopUpOpen,
    assignCourseToUser,
    isSaveDisabled
  };
}
