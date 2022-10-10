import { GET_COURSE } from '@/api/Queries';
import { ADD_USER_COURSE, userClient } from '@/api/UserMutations';
import { IsDataPresentAtom } from '@/components/common/PopUp/Logic/popUp.helper';
import { getQueryData } from '@/helper/api.helper';
import { getUnixFromDate } from '@/helper/utils.helper';
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

  const router = useRouter();

  const [userCourseData, setUserCourseData] = useRecoilState(UserCourseDataAtom);

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [isPopUpDataPresent, setIsPopUpDataPresent] = useRecoilState(IsDataPresentAtom);
  const userData = useRecoilValue(UserStateAtom);

  const [courseAssignData, setCourseAssignData] = useState({
    endDate: new Date(),
    isMandatory: false,
    isCourseAssigned: false,
    fullCourse: {}
  });
  const [isAssignPopUpOpen, setIsAssignPopUpOpen] = useState(false);
  const [isSaveDisabled, setisSaveDisabled] = useState(false);

  async function assignCourseToUser() {
    setisSaveDisabled(false);
    setIsPopUpDataPresent(false);
    const sendData = {
      userId: userData?.id,
      userLspId: 'Zicops',
      courseId: courseAssignData?.fullCourse?.id,
      addedBy: JSON.stringify({ userId: userData.id, role: 'self' }),
      courseType: courseAssignData?.fullCourse?.type,
      isMandatory: courseAssignData?.isMandatory,
      courseStatus: 'open',
      endDate: getUnixFromDate(courseAssignData?.endDate)?.toString()
    };

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
    setisSaveDisabled(false);
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
