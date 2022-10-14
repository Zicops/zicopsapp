import { GET_COURSE } from '@/api/Queries';
import { userClient } from '@/api/UserMutations';
import { GET_USER_COURSE_MAPS, GET_USER_COURSE_PROGRESS } from '@/api/UserQueries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UserStateAtom } from '@/state/atoms/users.atom';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from '../learnerUserProfile.module.scss';
import useUserCourseData from '@/helper/hooks.helper';

import CardContainer from './CardContainer';

const UserCoursesTab = () => {
  let course = ['', '', ''];


  const { getUserCourseData } = useUserCourseData()
  const [isBoxView, setIsBoxView] = useState(true);
  const [onGoingCourses, setOnGoingCourses] = useState([]);
  const [addedCourses, setAddedCourses] = useState([]);
  const [assignedCourses, setAssignedCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [userData, setUserData] = useRecoilState(UserStateAtom);

  const courseSections = [
    { displayType: 'Ongoing Courses', footerType: 'onGoing', data: onGoingCourses },
    { displayType: 'Courses Added by Me', footerType: 'added', data: addedCourses },
    { displayType: 'Assigned Course', footerType: 'assigned', data: assignedCourses },
    {
      displayType: 'Completed Course',
      footerType: 'completed',
      data: completedCourses,
      statusData: { status: 'Completed', color: 'green' }
    }
  ];

  useEffect(() => {
    loadAssignedCourseData();
  }, []);

  async function loadAssignedCourseData() {
    const userCourses = await getUserCourseData(99999);
    //  console.log(userCourses);
    if (userCourses?.length) {
      setCourseState(userCourses,'completedPercentage', 100, setOnGoingCourses, 'not');
      setCourseState(userCourses, 'completedPercentage', 100, setCompletedCourses);
      setCourseState(userCourses, 'added_by', 'self', setAddedCourses);
      setCourseState(userCourses, 'added_by', 'self', setAssignedCourses, 'not');

    } else setLoading(false);
  }

  function setCourseState(arr, filterParam, filterData, setState, notEqual = 'equal') {
    const filteredArr =
      notEqual === 'not'
        ? arr.filter((item) => item[`${filterParam}`] !== filterData)
        : arr.filter((item) => item[`${filterParam}`] === filterData);
    if (filteredArr?.length) return setState([...filteredArr], setLoading(false));
    return setLoading(false);
  }

  return (
    <>
      <div className={`${styles.userTabContainer}`}>
        {courseSections.map((section) => {
          return (
            <CardContainer
              type={section.displayType}
              footerType={section.footerType}
              courseData={section.data}
              statusData={section.statusData}
              isLoading={loading}
            />
          );
        })}
      </div>
    </>
  );
};

export default UserCoursesTab;
