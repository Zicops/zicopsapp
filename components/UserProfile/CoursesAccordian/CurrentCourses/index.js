import CourseBoxCard from '@/components/common/CourseBoxCard';
import styles from '../coursesAccordian.module.scss';

export default function CurrentCourses({ assignedCourses = [], onAssignClick = () => {} }) {
  return (
    <>
      <div className={`${styles.courses_acc_head}`}>
        <div className={`${styles.assign}`}>
          <div>Current courses: {assignedCourses?.length}</div>

          <div onClick={onAssignClick} className={`${styles.assignInner}`}>
            <img src="/images/svg/add-line-blue.svg" />
            Assign Courses
          </div>
        </div>
      </div>

      <div className={`${styles.courseContainer}`}>
        {assignedCourses?.map((course) => (
          <CourseBoxCard isAdmin={true} courseData={course}></CourseBoxCard>
        ))}
      </div>
    </>
  );
}
