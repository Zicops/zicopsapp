import { SCHEDULE_TYPE } from '@/components/AdminExamComps/Exams/ExamMasterTab/Logic/examMasterTab.helper';
import useLoadExamData from '@/components/LearnerCourseComps/Logic/useLoadExamData';
import { CourseTopicAssessmentAtomFamily } from '@/components/LearnerCourseComps/atoms/learnerCourseComps.atom';
import { passingCriteriaSymbol } from '@/components/LearnerExamComp/ExamInstructions/Logic/examInstruction.helper';
import { getEndTime } from '@/components/LearnerExamComp/Logic/exam.helper';
import Spinner from '@/components/common/Spinner';
import { useRecoilValue } from 'recoil';
import styles from '../../../learnerCourseComps.module.scss';

// TODO: rework on this
export default function TopicAssessment({ topicId = null }) {
  const topicExamData = useRecoilValue(CourseTopicAssessmentAtomFamily(topicId));

  const { isLoading, data, examAttempts } = useLoadExamData(topicId);
  const finalEndDate =
    data?.scheduleType === SCHEDULE_TYPE[0] && !data?.examData?.examEnd
      ? new Date(getEndTime({ examData: data }))
      : null;

  if (topicExamData?.topicId == null || isLoading) return <Spinner />;

  if (!topicExamData?.examId)
    return <div className={`${styles.assesmentSection}`}>No Exam Data Added</div>;

  return (
    <div className={`${styles.assesmentSection}`}>
      <div className={`${styles.assesmentType}`}>
        {data?.scheduleType === SCHEDULE_TYPE[0] ? (
          <div>
            <span>{data?.examStart?.toDateString()}</span>

            <span>
              {data?.examStart?.toLocaleTimeString()}-
              {data?.examEnd
                ? data?.examEnd?.toLocaleTimeString()
                : finalEndDate.toLocaleTimeString()}
            </span>
            <span className={`${styles.scheduleType}`}>
              {data?.scheduleType.charAt(0).toUpperCase() + data?.scheduleType.slice(1)} Exam
            </span>
          </div>
        ) : (
          <div>
            <span className={`${styles.scheduleType}`}>Take Anytime Exam</span>
          </div>
        )}
      </div>

      <div className={`${styles.assesmentInfo}`}>
        <span>Marks: {!!data?.totalMarks ? `${data?.totalMarks}` : ''}</span>
        <span>Passing Criteria: {passingCriteriaSymbol(data?.passingCriteria)}</span>
        <span>{data?.difficultyLevel}</span>

        <span>
          Attempt:{' '}
          {+data?.noAttempts < 0 ? (
            <>{examAttempts?.length}/&infin;</>
          ) : (
            `${examAttempts?.length}/${data?.noAttempts}`
          )}
        </span>

        {!!data?.duration && <span>Duration: {`${data?.duration} mins`}</span>}
      </div>
    </div>
  );
}
