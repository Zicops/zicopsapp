import { useRecoilValue } from 'recoil';
import {
  ActiveCourseDataAtom,
  ActiveCourseHeroAtom,
  courseHeroObj,
} from '../atoms/learnerCourseComps.atom';
import useHandleCourseData from '../Logic/useHandleCourseData';
import CourseMetaDataPreview from './CourseMetaDataPreview';
import CoursePreviewVideo from './CoursePreviewVideo';
import TopicContentPreview from './TopicContentPreview';

export default function CourseHero() {
  const activeHero = useRecoilValue(ActiveCourseHeroAtom);
  const activeCourseData = useRecoilValue(ActiveCourseDataAtom);
  useHandleCourseData();

  const isCoursePreview = courseHeroObj.coursePreviewVideo === activeHero;
  const isTopicPreview = courseHeroObj.topicPreview === activeHero;

  if (isCoursePreview) return <CoursePreviewVideo />;
  if (isTopicPreview && !!activeCourseData?.topicId) return <TopicContentPreview />;

  return (
    <>
      <CourseMetaDataPreview />
    </>
  );
}
