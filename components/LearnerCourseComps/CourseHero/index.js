import useHandleCourseData from '../Logic/useHandleCourseData';
import CourseMetaDataPreview from './CourseMetaDataPreview';

export default function CourseHero() {
  useHandleCourseData();

  return (
    <>
      <CourseMetaDataPreview />
    </>
  );
}
