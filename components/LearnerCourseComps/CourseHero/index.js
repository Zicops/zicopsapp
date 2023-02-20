import { useRecoilValue } from 'recoil';
import { ActiveCourseHeroAtom, courseHeroObj } from '../atoms/learnerCourseComps.atom';
import useHandleCourseData from '../Logic/useHandleCourseData';
import CourseMetaDataPreview from './CourseMetaDataPreview';
import CoursePreviewVideo from './CoursePreviewVideo';
import TopicPreview from './TopicPreview';

export default function CourseHero() {
  const activeHero = useRecoilValue(ActiveCourseHeroAtom);
  useHandleCourseData();

  const isCoursePreview = courseHeroObj.coursePreviewVideo === activeHero;
  const isTopicPreview = courseHeroObj.topicPreview === activeHero;

  if (isCoursePreview) return <CoursePreviewVideo />;
  if (isTopicPreview) return <TopicPreview />;

  return (
    <>
      <CourseMetaDataPreview />
    </>
  );
}
