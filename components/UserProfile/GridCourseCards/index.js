import styles from '../CoursesAccordian/coursesAccordian.module.scss';
import CoursesCard from '../CoursesCard';

export default function GridCourseCards({ courses = [] }) {
  return (
    <>
      <div className={`${styles.course_loop}`}>
        {courses.map((course) => (
          <div className={`${styles.course_card}`}>
            <CoursesCard />
          </div>
        ))}
      </div>
    </>
  );
}
