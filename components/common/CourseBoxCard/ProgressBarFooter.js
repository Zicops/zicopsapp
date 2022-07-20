import styles from './courseBoxCard.module.scss';

export default function ProgressBarFooter({ courseData, isCompleted }) {
  return (
    <div className={`${styles.progressBarFooter}`}>
      <div>
        {isCompleted ? (
          <>
            <p>Completed on {courseData?.completedOn || '22-06-2022'}</p>
            <img src="/images/svg/green-tick.svg" alt="" height={15} />
          </>
        ) : (
          <>
            <p>Expected Completion by {courseData?.expectedCompletion || '22-06-2022'}</p>
            <p className={styles.percent}>{courseData?.completedPercentage || '90%'}</p>
          </>
        )}
      </div>

      <div className={styles.progress}>
        <span className={`w-${courseData?.completedPercentage || 90}`}></span>
      </div>
    </div>
  );
}
