import { GET_COURSE, GET_LATEST_COURSES, queryClient } from '@/api/Queries';
import { GET_USER_COURSE_MAPS, userQueryClient } from '@/api/UserQueries';
import { courseData } from '@/components/LearnerUserProfile/Logic/userBody.helper';
import CardContainer from '@/components/LearnerUserProfile/UserCoursesTab/CardContainer';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useLazyQuery } from '@apollo/client';
import { async } from '@firebase/util';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import Accordian from '../../../components/UserProfile/Accordian';
import AssignedCourses from '../AssignedCourses';
import CoursesAccHead from '../CoursesAccHead';

// import AssignedCourses from '../../AssignedCourses';
import CoursesCard from '../CoursesCard';
import GridCourseCards from '../GridCourseCards';
import AssignCourses from './AssignCourses';
import styles from './coursesAccordian.module.scss';
const CoursesAccordian = () => {
  // const [loadUserCourseData, { error: errorUC }] = useLazyQuery(GET_USER_COURSE_MAPS, {
  //   client: userQueryClient
  // });

  const [loadLastestCourseData, { error: error }] = useLazyQuery(GET_LATEST_COURSES, {
    client: queryClient
  });
  const [loadCourseData, { error: errorC, refetch }] = useLazyQuery(GET_COURSE, {
    client: queryClient
  });
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const [selected, setSelected] = useState(3);
  const [selectedPage, setSelectedPage] = useState('');
  const [isAssignedPage, setIsAssignedPage] = useState(false);
  const courseSections = [
    { displayType: 'Current Courses', footerType: 'onGoing', data: courseData },
    { displayType: 'Current Courses', footerType: 'added', data: courseData },
    { displayType: 'Assigned Courses', footerType: 'adminFooter', data: courseData },
    { displayType: 'All Course', footerType: 'adminFooter', data: courseData }
  ];
  const [lists, setLists] = useState([
    { id: 1, component: 'Current Courses', onClick: true },
    {
      id: 2,
      component: (
        <svg
          width="24"
          height="25"
          viewBox="0 -3 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <mask
            id="mask0_978_6473"
            // style="mask-type:alpha"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="24"
            height="25">
            <rect y="0.5" width="24" height="24" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_978_6473)">
            <path
              d="M8.02505 22.7008L6.05005 20.7258L14.275 12.5008L6.05005 4.27578L8.02505 2.30078L18.225 12.5008L8.02505 22.7008Z"
              fill="#ACACAC"
            />
          </g>
        </svg>
      ),
      onClick: false
    },
    { id: 3, component: 'Assign Courses', onClick: true }
    // {
    //   id: 4,
    //   component: (
    //     <svg
    //       width="24"
    //       height="25"
    //       viewBox="0 -3 24 25"
    //       fill="none"
    //       xmlns="http://www.w3.org/2000/svg">
    //       <mask
    //         id="mask0_978_6473"
    //         // style="mask-type:alpha"
    //         maskUnits="userSpaceOnUse"
    //         x="0"
    //         y="0"
    //         width="24"
    //         height="25">
    //         <rect y="0.5" width="24" height="24" fill="#D9D9D9" />
    //       </mask>
    //       <g mask="url(#mask0_978_6473)">
    //         <path
    //           d="M8.02505 22.7008L6.05005 20.7258L14.275 12.5008L6.05005 4.27578L8.02505 2.30078L18.225 12.5008L8.02505 22.7008Z"
    //           fill="#ACACAC"
    //         />
    //       </g>
    //     </svg>
    //   ),
    //   onClick: false
    // },
    // { id: 5, component: 'Assigned Courses', onClick: true }
  ]);

  function handleNode(item) {
    if (item.component === 'Current Courses') {
      if (lists.length > 3) {
        lists.pop();
        lists.pop();
      }
      setIsAssignedPage(!isAssignedPage);
      // setSelectedPage(item.component);
      // setSelected(item.id);
    }
    if (item.component === 'Assign Courses') {
      if (lists.length > 3) {
        lists.pop();
        lists.pop();
      }
      // setSelected(item.id);
      // setSelectedPage(item.component);
    }

    setSelected(item.id);
    setSelectedPage(item.component);
  }

  function handleClickFolder() {
    setLists((prevValue) => [
      ...prevValue,
      {
        id: 4,
        component: (
          <svg
            width="24"
            height="25"
            viewBox="0 -3 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <mask
              id="mask0_978_6473"
              // style="mask-type:alpha"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="24"
              height="25">
              <rect y="0.5" width="24" height="24" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_978_6473)">
              <path
                d="M8.02505 22.7008L6.05005 20.7258L14.275 12.5008L6.05005 4.27578L8.02505 2.30078L18.225 12.5008L8.02505 22.7008Z"
                fill="#ACACAC"
              />
            </g>
          </svg>
        ),
        onClick: false
      },
      { id: 5, component: 'Assigned Courses', onClick: true }
    ]);

    setSelectedPage('Assigned Courses');
    setSelected(5);
  }

  useEffect(async () => {
    const currentTime = new Date().getTime();
    const sendData = {
      publish_time: Math.floor(currentTime / 1000),
      pageCursor: '',
      pageSize: 10
    };
    const res = await loadLastestCourseData({ variables: sendData }).catch((err) => {
      console.log(err);
      return setToastMsg({ type: 'danger', message: `${err}` });
    });
    const courseData = res?.data;
    console.log(courseData);
    // courseData.forEach(async (item) => {
    //   console.log(item);
    //   let sendData = { course_id: item?.course_id };
    //   const resCourseData = await loadCourseData({ variables: sendData }).catch((err) => {
    //     console.log(err);
    //   });
    //   console.log(resCourseData?.data);
    //   data.push(resCourseData?.data);
    // });
  }, []);
  let course = ['', '', ''];
  const [isBoxView, setIsBoxView] = useState(true);

  return (
    <>
      <Accordian height={'auto'} acc_title={'Courses'}>
        <div className={`${styles.courses_acc_head}`}>
          {isAssignedPage && (
            <div className={`${styles.current_courses}`}>
              {lists.map((item) => (
                <div
                  key={item.id}
                  onClick={item.onClick ? () => handleNode(item) : () => {}}
                  style={{ color: item.id === selected ? 'var(--primary)' : '' }}>
                  {item.component}
                </div>
              ))}
            </div>
          )}
          {!isAssignedPage && (
            <div className={`${styles.assign}`}>
              <div>Current courses:6</div>
              <div
                onClick={() => {
                  setIsAssignedPage(!isAssignedPage);
                  setSelectedPage('Assign Courses');
                  setSelected(3);
                }}
                className={`${styles.assignInner}`}>
                <img src="/images/svg/add-line-blue.svg" />
                Assign Courses
              </div>
            </div>
          )}
        </div>
        {/* {isAssignedPage && <AssignCourses section={courseSections[3]} />} */}
        {!isAssignedPage && <AssignCourses isHead={false} section={courseSections[0]} />}
        {/* {selectedPage === 'Current Courses' && <AssignCourses section={courseSections[1]} />} */}
        {selectedPage === 'Assign Courses' && (
          <AssignCourses
            isFolder={true}
            section={courseSections[3]}
            handleClick={handleClickFolder}
          />
        )}
        {selectedPage === 'Assigned Courses' && <AssignCourses section={courseSections[2]} />}
        {/* <div className={`${styles.imageContainer}`}>
          <img
            src={`/images/svg/view_agenda${isBoxView ? '_gray' : ''}.svg`}
            onClick={() => setIsBoxView(false)}
          />
          <img
            src={`/images/svg/grid_view${isBoxView ? '_primary' : ''}.svg`}
            onClick={() => setIsBoxView(true)}
          />
        </div>

        {isBoxView ? (
          <GridCourseCards courses={course} />
        ) : (
          <>
            {course.map((course) => (
              <AssignedCourses />
            ))}
          </>
        )} */}
      </Accordian>
    </>
  );
};

export default CoursesAccordian;
