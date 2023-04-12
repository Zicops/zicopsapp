import { COURSE_TOPIC_TYPES } from '@/helper/constants.helper';
import { AllCourseModulesDataAtom } from '@/state/atoms/courses.atom';
import { useRecoilValue } from 'recoil';
import { TopicQuizAtom } from '../../atoms/learnerCourseComps.atom';
import KeyValueWithColon from '../../common/KeyValueWithColon';
import styles from '../../learnerCourseComps.module.scss';
import SectionTitle from './SectionTitle';

export default function Inclusions({ languages = [] }) {
  const allModules = useRecoilValue(AllCourseModulesDataAtom);
  const topicQuiz = useRecoilValue(TopicQuizAtom);

  let chapterCount = 0;
  let topicCount = 0;
  let assessmentCount = 0;
  let labsCount = 0;

  allModules?.forEach((mod) => {
    mod?.chapters?.forEach((chap) => {
      if (chap?.id) ++chapterCount;
      topicCount += chap?.topics?.length;

      chap?.topics?.forEach((top) => {
        if (top?.type === COURSE_TOPIC_TYPES.assessment) ++assessmentCount;
        if (top?.type === COURSE_TOPIC_TYPES.lab) ++labsCount;
      });
    });
  });

  const courseInclusions = [
    { key: 'Languages', value: languages },
    {
      key: 'Structured View',
      value: `Modules: ${allModules?.length}, Chapters: ${chapterCount}, Topics: ${topicCount}`,
    },
    { key: 'Interactive Quizzes', value: topicQuiz?.length || '0' },
    { key: 'Practice Exercises & Labs', value: labsCount?.toString() },
    { key: 'Assessments', value: assessmentCount?.toString() },
  ];

  return (
    <>
      <SectionTitle title="Course Inclusion" />

      <div className={`${styles.gapBetweenPointers}`}>
        {courseInclusions?.map((inclusion) => (
          <KeyValueWithColon
            keyData={{ text: inclusion?.key, textColor: styles.primary, flex: 1.5 }}
            valueData={{ text: inclusion?.value, textColor: styles.primary }}
          />
        ))}
      </div>
    </>
  );
}
