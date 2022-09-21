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
import CardContainer from './CardContainer';

const UserCoursesTab = () => {
  let course = ['', '', ''];
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
    const currentUserId = userData?.id;
    if (!currentUserId) return;
    const assignedCoursesRes = await loadQueryDataAsync(
      GET_USER_COURSE_MAPS,
      {
        user_id: currentUserId,
        publish_time: Math.floor(Date.now() / 1000),
        pageCursor: '',
        pageSize: 999999999
      },
      {},
      userClient
    );

    if (assignedCoursesRes?.error)
      return setToastMsg({ type: 'danger', message: 'Course Maps Load Error' });
    const assignedCoursesToUser = assignedCoursesRes?.getUserCourseMaps?.user_courses;

    const allAssignedCourses = [];
    for (let i = 0; i < assignedCoursesToUser.length; i++) {
      const courseMap = assignedCoursesToUser[i];
      const mapId = courseMap?.user_course_id;
      const course_id = courseMap?.course_id;

      const courseProgressRes = await loadQueryDataAsync(
        GET_USER_COURSE_PROGRESS,
        { userId: currentUserId, userCourseId: mapId },
        {},
        userClient
      );

      if (courseProgressRes?.error) {
        setToastMsg({ type: 'danger', message: 'Course Progress Load Error' });
        continue;
      }
      const userProgressArr = courseProgressRes?.getUserCourseProgressByMapId;

      // if (!userProgressArr?.length) continue;

      let topicsStarted = 0;
      userProgressArr?.map((topic) => {
        if (topic?.status !== 'not-started') ++topicsStarted;
      });
      console.log(topicsStarted);
      const courseProgress = userProgressArr?.length
        ? Math.floor((topicsStarted * 100) / userProgressArr?.length)
        : 0;

      const courseRes = await loadQueryDataAsync(GET_COURSE, { course_id: course_id });
      if (courseRes?.error) {
        setToastMsg({ type: 'danger', message: 'Course Load Error' });
        continue;
      }

      const added_by = JSON.parse(assignedCoursesToUser[i]?.added_by);
      allAssignedCourses.push({
        ...courseRes?.getCourse,
        completedPercentage: userProgressArr?.length ? courseProgress : '0',
        added_by: added_by?.role,
        created_at: moment.unix(assignedCoursesToUser[i]?.created_at).format('DD/MM/YYYY'),
        expected_completion: moment.unix(assignedCoursesToUser[i]?.end_date).format('DD/MM/YYYY')
      });
    }

    const userCourses = allAssignedCourses.filter(
      (v, i, a) => a.findIndex((v2) => v2?.id === v?.id) === i
    );

    if (allAssignedCourses?.length) {
      setCourseState(userCourses,'completedPercentage', 100, setOnGoingCourses, 'not');
      setCourseState(userCourses, 'completedPercentage', 100, setCompletedCourses);
      setCourseState(userCourses, 'added_by', 'self', setAddedCourses);
      setCourseState(userCourses, 'added_by', 'self', setAssignedCourses, 'not');
      // const completedCourses = userCourses.filter((item) => item?.completedPercentage === 100);
      // if (completedCourses?.length) setCompletedCourses([...completedCourses], setLoading(false));
      // const assignedToSelf = userCourses.filter((item) => item?.added_by === 'self');
      // if (assignedToSelf?.length) setAddedCourses([...assignedToSelf], setLoading(false));
      // const assignedByAdmin = userCourses.filter((item) => item?.added_by !== 'self');
      // if (assignedByAdmin?.length) setAssignedCourses([...assignedByAdmin], setLoading(false));
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
