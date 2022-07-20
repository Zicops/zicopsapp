import CourseListCard from '@/components/common/CourseBoxCard';
import AssignedCourses from '@/components/UserProfile/AssignedCourses';
import CoursesAccHead from '@/components/UserProfile/CoursesAccHead';
import CoursesCard from '@/components/UserProfile/CoursesCard';
import GridCourseCards from '@/components/UserProfile/GridCourseCards';
import { useState } from 'react';
import styles from '../learnerUserProfile.module.scss';
import { courseData } from '../Logic/userBody.helper';
import CardContainer from './CardContainer';

const UserCoursesTab = () => {
  let course = ['', '', ''];
  const [isBoxView, setIsBoxView] = useState(true);

  const courseSections = [
    { displayType: 'Ongoing Courses', footerType: 'onGoing', data: courseData },
    { displayType: 'Courses Added by Me', footerType: 'added', data: courseData },
    { displayType: 'Assigned Course', footerType: 'assigned', data: courseData },
    { displayType: 'Completed Course', footerType: 'completed', data: courseData }
  ];

  return (
    <>
      <div className={`${styles.userTabContainer}`}>
        {courseSections.map((section) => {
          return (
            <CardContainer
              type={section.displayType}
              footerType={section.footerType}
              courseData={section.data}
            />
          );
        })}
      </div>
    </>
  );
};

export default UserCoursesTab;
