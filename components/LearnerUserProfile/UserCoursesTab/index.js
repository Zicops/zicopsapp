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

  return (
    <>
      <div className={`${styles.userTabContainer}`}>
        <CardContainer type={'My Course'} courseData={courseData} />
        <CardContainer type={'Assigned Course'} courseData={courseData} />
        <CardContainer type={'Completed Course'} courseData={courseData} />
      </div>
    </>
  );
};

export default UserCoursesTab;
