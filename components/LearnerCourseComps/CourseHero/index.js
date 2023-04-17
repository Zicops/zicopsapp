import ExamLanding from '@/components/Exams/ExamLanding';
import VCtoolStartPage from '@/components/Vctools/VctoolStartPage';
import { useRecoilValue } from 'recoil';
import useLoadCourseData from '../Logic/useLoadCourseData';
import {
  ActiveCourseDataAtom,
  ActiveCourseHeroAtom,
  courseHeroObj,
} from '../atoms/learnerCourseComps.atom';
import CourseMetaDataPreview from './CourseMetaDataPreview';
import CoursePreviewVideo from './CoursePreviewVideo';
import TopicContentPreview from './TopicContentPreview';
import AssessmentPreview from './AssessmentPreview';

export default function CourseHero() {
  const activeHero = useRecoilValue(ActiveCourseHeroAtom);
  const activeCourseData = useRecoilValue(ActiveCourseDataAtom);

  useLoadCourseData();

  const isCoursePreview = courseHeroObj.coursePreviewVideo === activeHero;
  const isTopicContent = courseHeroObj.content === activeHero;
  const isClassroom = courseHeroObj.classroom === activeHero;
  const isAssessment = courseHeroObj.assessment === activeHero;
  const isLabs = courseHeroObj.labs === activeHero;

  if (isClassroom) return <VCtoolStartPage topicId={activeCourseData?.topicId} />;
  if (isAssessment) return <AssessmentPreview />;
  if (isTopicContent) return <TopicContentPreview />;
  if (isCoursePreview) return <CoursePreviewVideo />;

  return <CourseMetaDataPreview />;
}
