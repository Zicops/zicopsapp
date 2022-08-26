import styles from './courseBoxCard.module.scss';

export default function ProgressBarFooter({ courseData, isCompleted }) {
  const progress = courseData?.completedPercentage != null ? courseData?.completedPercentage : 90;

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
            <p>Expected Completion by {courseData?.expected_completion || '22-06-2022'}</p>
            <p className={styles.percent}>{progress}%</p>
          </>
        )}
      </div>

      <div className={styles.progress}>
        <span className={`w-${progress}`}></span>
      </div>
    </div>
  );
}
