import {
  CourseTopicContentAtomFamily,
  UserTopicProgressDataAtom,
} from '@/components/LearnerCourseComps/atoms/learnerCourseComps.atom';
import useHandleCourseData from '@/components/LearnerCourseComps/Logic/useHandleCourseData';
import { COURSE_TOPIC_STATUS } from '@/helper/constants.helper';
import { limitValueInRange } from '@/helper/utils.helper';
import { getCourseDisplayTime } from '@/utils/date.utils';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import styles from '../../../learnerCourseComps.module.scss';

export default function TopicContentDetails({ topicId = null }) {
  const topicContent = useRecoilValue(CourseTopicContentAtomFamily(topicId));
  const topicProgressData = useRecoilValue(UserTopicProgressDataAtom);

  const { loadTopicContent } = useHandleCourseData();

  useEffect(() => {
    if (!topicId || topicContent?.length !== 0) return;

    loadTopicContent(topicId);
  }, [topicId, topicContent?.length]);

  const currentTopicProgress = topicProgressData?.find((progress) => progress?.topicId === topicId);

  const isCompleted = currentTopicProgress?.status === COURSE_TOPIC_STATUS.completed;
  // default topic content is the first because we sort based on is_default (check loadTopicContent())
  const defaultTopicContent = topicContent?.[0] || {};
  const progressBarStyles = {
    backgroundColor: isCompleted ? styles.success : styles.primary,
    width: `${limitValueInRange(currentTopicProgress?.videoProgress)}%`,
  };

  return (
    <>
      <div className={styles.topicContent}>
        <div className={styles.progress}>
          <div className={`${styles.progressBarFill}`} style={progressBarStyles}></div>
        </div>

        <div className={styles.details}>
          <span>e-Content</span>
          <span>Duration: {getCourseDisplayTime(defaultTopicContent?.duration)}</span>
        </div>
      </div>
    </>
  );
}
