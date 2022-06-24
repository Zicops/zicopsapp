import Accordian from '../../../components/UserProfile/Accordian';
import CoursesAccHead from '../CoursesAccHead';
// import AssignedCourses from '../../AssignedCourses';
import CoursesCard from '../CoursesCard';
import styles from './coursesAccordian.module.scss';
const CoursesAccordian = () => {
  let course = ['', '', ''];
  return (
    <>
      <Accordian height={'auto'} acc_title={'Courses'}>
        <div className={`${styles.courses_acc_head}`}>
          <div className={`${styles.current_courses}`}>Current Courses:6</div>
          <div className={`${styles.assign}`}>
            <img src="/images/svg/add-line-blue.svg" />
            Assign Courses
          </div>
        </div>
        <CoursesAccHead />
        <div className={`${styles.course_loop}`}>
          {course.map((course) => (
            <div className={`${styles.course_card}`}>
              <CoursesCard />
            </div>
          ))}
        </div>
      </Accordian>
    </>
  );
};

export default CoursesAccordian;
