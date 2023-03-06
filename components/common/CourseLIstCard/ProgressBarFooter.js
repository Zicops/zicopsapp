import { getCourseDisplayTime } from '@/helper/utils.helper';
import styles from './courseListCard.module.scss';

export default function ProgressBarFooter({ courseData, isCompleted }) {
  return (
    <div className={`${styles.progressBarFooter}`}>
      <section>
        {isCompleted ? (
          <>
            <p>
              Completed on{' '}
              {courseData?.completedOn || ''}
            </p>
          </>
        ) : (
          <>
            <p>
              Expected Completion by {courseData?.expected_completion || ''}
              <div className={`${styles.dot}`}></div>
              <span className={`${styles.mandatory}`}>
                {courseData?.is_mandatory ? 'Mandatory' : 'Not Mandatory'}
              </span>
            </p>
            <p className={styles.percent}>
              {getCourseDisplayTime(courseData?.timeLeft)} of content left
            </p>
          </>
        )}
      </section>

      <section className={styles.progress}>
        <span className={`w-${courseData?.completedPercentage || 0}`}></span>
      </section>
    </div>
  );
}
