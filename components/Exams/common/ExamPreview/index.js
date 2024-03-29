import Info from './Info';
import styles from './examPreview.module.scss';
import { months } from '../../../../helper/utils.helper';
import { SCHEDULE_TYPE } from '../../../AdminExamComps/Exams/ExamMasterTab/Logic/examMasterTab.helper';

export default function ExamPreview({
  examName,
  scheduleType,
  scheduleDate = new Date(),
  difficulty,
  duration,
  isProctoring = false,
  totalQuestions,
  isNegativeMarking = false,
  noAttempts
}) {
  const date = new Date(scheduleDate);
  return (
    <div className={styles.examPreview}>
      <h1>{examName}</h1>
      <p>
        This is <span>{scheduleType}</span> type exam
      </p>

      <section>
        <Info
          title="Schedule:"
          value={
            scheduleType === SCHEDULE_TYPE[0]
              ? `${date?.getDate()} ${months[date?.getMonth()]}, ${date?.getFullYear()}`
              : 'N/A'
          }
        />
        {scheduleType === SCHEDULE_TYPE[0] && (
          <Info value={date?.toTimeString()} customStyles={{ color: 'var(--dark_three)' }} />
        )}
        <Info title="Expertise Level:" value={difficulty} />
        <Info title="Proctoring:" value={isProctoring ? 'Yes' : 'No'} />
        <Info title="Duration:" value={`${duration} mins`} />
        <Info title="Total Number of Questions:" value={totalQuestions} />
        <Info title="Negative Marking:" value={isNegativeMarking ? 'Yes' : 'No'} />
        <Info title="Total Number of Attempts:" value={noAttempts} />
      </section>
    </div>
  );
}
