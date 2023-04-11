import { COURSE_TYPES } from '@/constants/course.constants';
import { CourseMetaDataAtom } from '@/state/atoms/courses.atom';
import { useRecoilValue } from 'recoil';
import styles from './adminCourseComps.module.scss';

export default function CoursePageTitle({ isAddPage = false }) {
  const courseMetaData = useRecoilValue(CourseMetaDataAtom);

  // add course page
  if (isAddPage) {
    if (courseMetaData?.type === COURSE_TYPES.testSeries) return 'Add New Test Series';
    if (courseMetaData?.type === COURSE_TYPES.classroom) return 'Add Classroom Course';

    return 'Add New Course';
  }

  // edit course page
  return (
    <>
      <span className={styles.courseName}>{courseMetaData?.name || 'Edit Course'}</span>
      <span className={styles.courseType}>[{courseMetaData?.type || ''}]</span>
    </>
  );
}
