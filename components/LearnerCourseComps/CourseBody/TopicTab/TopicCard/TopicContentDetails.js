import { UserTopicProgressDataAtom } from '@/components/LearnerCourseComps/atoms/learnerCourseComps.atom';
import ZicopsSkeleton from '@/components/LearnerCourseComps/common/ZicopsSkeleton';
import { COURSE_TOPIC_STATUS } from '@/helper/constants.helper';
import { limitValueInRange } from '@/helper/utils.helper';
import { getCourseDisplayTime } from '@/utils/date.utils';
import { useRecoilValue } from 'recoil';
import styles from '../../../learnerCourseComps.module.scss';

export default function TopicContentDetails({
  topicId = null,
  topicContent = {},
  isLoading = false,
}) {
  const topicProgressData = useRecoilValue(UserTopicProgressDataAtom);

  const currentTopicProgress = topicProgressData?.find((progress) => progress?.topicId === topicId);
  const isCompleted = currentTopicProgress?.status === COURSE_TOPIC_STATUS.completed;

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
          <span>
            {isLoading ? (
              <ZicopsSkeleton variant="text" height={30} width={150} />
            ) : (
              <>
                Duration:{' '}
                {!topicContent?.duration ? 'N/A' : getCourseDisplayTime(topicContent?.duration)}
              </>
            )}
          </span>
        </div>
      </div>
    </>
  );
}
