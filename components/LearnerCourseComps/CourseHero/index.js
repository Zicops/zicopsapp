import Spinner from '@/components/common/Spinner';
import { useRecoilValue } from 'recoil';
import {
  ActiveCourseDataAtom,
  ActiveCourseHeroAtom,
  courseHeroObj,
  CourseTopicContentAtomFamily,
  CourseTopicsAtomFamily,
} from '../atoms/learnerCourseComps.atom';
import useHandleCourseData from '../Logic/useHandleCourseData';
import useLoadTopicData from '../Logic/useLoadTopicData';
import CourseMetaDataPreview from './CourseMetaDataPreview';
import CoursePreviewVideo from './CoursePreviewVideo';
import TopicContentPreview from './TopicContentPreview';

export default function CourseHero() {
  const activeHero = useRecoilValue(ActiveCourseHeroAtom);
  const activeCourseData = useRecoilValue(ActiveCourseDataAtom);
  const topicData = useRecoilValue(CourseTopicsAtomFamily(activeCourseData?.topicId));
  const topicContent = useRecoilValue(CourseTopicContentAtomFamily(activeCourseData?.topicId));

  useHandleCourseData();
  const { isLoading } = useLoadTopicData(activeCourseData?.topicId, topicData?.type);

  const isCoursePreview = courseHeroObj.coursePreviewVideo === activeHero;
  const isTopicPreview = courseHeroObj.topicPreview === activeHero;

  if (isTopicPreview && !(activeCourseData?.topicContentId || topicContent?.length) && isLoading)
    return <Spinner />;

  if (isTopicPreview && !!activeCourseData?.topicId) return <TopicContentPreview />;
  if (isCoursePreview) return <CoursePreviewVideo />;

  return <CourseMetaDataPreview />;
}
