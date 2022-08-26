import styles from './courseListCard.module.scss';

export default function ProgressBarFooter({ courseData, isCompleted }) {
  return (
    <div className={`${styles.progressBarFooter}`}>
      <section>
        {isCompleted ? (
          <>
            <p>Completed on {courseData?.completedOn || '22-06-2022'}</p>
          </>
        ) : (
          <>
            <p>
              Expected Completion by {courseData?.expectedCompletion || '22-06-2022'}
              <div className={`${styles.dot}`}></div>
              <span className={`${styles.mandatory}`}>{courseData?.isMandatory || 'Mandatory'}</span>
            </p>
            <p className={styles.percent}>{courseData?.timeLeft || '3'} hours of content left</p>
          </>
        )}
      </section>

      <section className={styles.progress}>
        <span className={`w-${courseData?.completedPercentage || 90}`}></span>
      </section>
    </div>
  );
}
