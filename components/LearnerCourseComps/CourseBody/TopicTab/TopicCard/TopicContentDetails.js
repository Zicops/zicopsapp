import { GET_USER_QUIZ_ATTEMPTS, userQueryClient } from '@/api/UserQueries';
import {
  getTopicQuizAttemptsDataObj,
  TopicQuizAtom,
  TopicQuizAttemptsAtom,
  UserTopicProgressDataAtom,
} from '@/components/LearnerCourseComps/atoms/learnerCourseComps.atom';
import ZicopsSkeleton from '@/components/LearnerCourseComps/common/ZicopsSkeleton';
import { loadAndCacheDataAsync } from '@/helper/api.helper';
import { COURSE_TOPIC_STATUS } from '@/helper/constants.helper';
import { limitValueInRange } from '@/helper/utils.helper';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { getCourseDisplayTime } from '@/utils/date.utils';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from '../../../learnerCourseComps.module.scss';

export default function TopicContentDetails({
  topicId = null,
  topicContent = {},
  isLoading = false,
}) {
  const topicProgressData = useRecoilValue(UserTopicProgressDataAtom);
  const userData = useRecoilValue(UserStateAtom);
  const topicQuiz = useRecoilValue(TopicQuizAtom);
  const [topicQuizAttempt, setTopicQuizAttempt] = useRecoilState(TopicQuizAttemptsAtom);

  const currentTopicQuiz = topicQuiz?.filter((quiz) => quiz?.topicId === topicId);
  let currentTopicQuizAttempts = 0;
  topicQuiz?.forEach((quiz) => {
    const isQuizAttempted = topicQuizAttempt?.find((qa) => qa?.quizId === quiz?.id);
    if (isQuizAttempted) ++currentTopicQuizAttempts;
  });

  useEffect(() => {
    if (!topicId) return;
    if (!userData?.id) return;
    if (!currentTopicQuiz?.length) return;
    if (currentTopicQuizAttempts?.length) return;

    loadAndCacheDataAsync(
      GET_USER_QUIZ_ATTEMPTS,
      { user_id: userData?.id, topic_id: topicId },
      {},
      userQueryClient,
    )
      .then((res) => {
        const quizAttempts = structuredClone(topicQuizAttempt);

        quizAttempts.push(
          ...(res?.getUserQuizAttempts || []).map((qa) =>
            getTopicQuizAttemptsDataObj({
              ...qa,
              userQaId: qa?.user_qa_id,
              userId: qa?.user_id,
              userCpId: qa?.user_cp_id,
              userCourseId: qa?.user_course_id,
              quizId: qa?.quiz_id,
              quizAttempt: qa?.quiz_attempt,
              topicId: qa?.topic_id,
              result: qa?.result,
              isActive: qa?.is_active,
              createdBy: qa?.created_by,
              updatedBy: qa?.updated_by,
              createdAt: qa?.created_at,
              updatedAt: qa?.updated_at,
            }),
          ),
        );

        setTopicQuizAttempt(quizAttempts);
      })
      .catch((err) => console.log(`Error while loading quiz:`, err));
  }, [topicId, userData?.id, currentTopicQuiz?.length]);

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
            {!!currentTopicQuiz?.length
              ? `Quiz: ${currentTopicQuizAttempts}/ ${currentTopicQuiz?.length}`
              : ''}
          </span>
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
