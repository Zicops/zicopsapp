import useUserCourseData from '@/helper/hooks.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from '../learnerUserProfile.module.scss';

import CardContainer from './CardContainer';

const UserCoursesTab = () => {
  let course = ['', '', ''];

  const { getUserCourseData } = useUserCourseData();
  const [isBoxView, setIsBoxView] = useState(true);
  const [onGoingCourses, setOnGoingCourses] = useState([]);
  const [addedCourses, setAddedCourses] = useState([]);
  const [assignedCourses, setAssignedCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [userData, setUserData] = useRecoilState(UserStateAtom);

  const courseSections = [
    { id: 1, displayType: 'Ongoing Courses', footerType: 'onGoing', data: onGoingCourses },
    { id: 2, displayType: 'Courses Added by Me', footerType: 'added', data: addedCourses },
    { id: 3, displayType: 'Assigned Course', footerType: 'assigned', data: assignedCourses },
    {
      id: 4,
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
    //  console.log(userCourses,'courses');
    if (userCourses?.length) {
      const onGCourses = userCourses?.filter(
        (course) => course?.isCourseStarted && !course?.isCourseCompleted
      );
      setOnGoingCourses([...onGCourses], setLoading(false));

      const courseIdArr = [];
      const completedCourses = userCourses?.filter((course) => {
        const isCompleted = course?.isCourseStarted && course?.isCourseCompleted;
        if (isCompleted) courseIdArr.push(course?.id);

        return isCompleted;
      });

      const adminAdded = [];
      const selfAdded = userCourses
        ?.filter((course) => {
          if (courseIdArr?.includes(course?.id)) return null;

          const isSelfAdded = course?.added_by === 'self';
          if (!isSelfAdded) adminAdded.push(course);

          return isSelfAdded;
        })
        ?.filter((c) => c);
      setAddedCourses(selfAdded);
      setAssignedCourses(adminAdded);
      setCompletedCourses(completedCourses);
      // setCourseState(userCourses,'completedPercentage', 100, setOnGoingCourses, 'not');
      // setCourseState(userCourses, 'completedPercentage', 100, setCompletedCourses);
      // setOnGoingCourses(
      //   userCourses?.filter((course) => course?.isCourseStarted && !course?.isCourseCompleted),
      //   setLoading(false)
      // );
      // setCompletedCourses(
      //   userCourses?.filter((course) => course?.isCourseStarted && course?.isCourseCompleted)
      // );
      // setCourseState(userCourses, 'added_by', 'self', setAddedCourses);
      // setCourseState(userCourses, 'added_by', 'self', setAssignedCourses, 'not');
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
              key={section.id}
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
