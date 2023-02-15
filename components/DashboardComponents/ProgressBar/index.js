import styles from '../dashboardComponents.module.scss';

export default function ProgressBar({ progressPercent = 0 }) {
  return (
    <div className={`${styles.progressBarFooter}`}>
      <div className={styles.progress}>
        <span className={`w-${progressPercent}`}></span>
      </div>
    </div>
  );
}
