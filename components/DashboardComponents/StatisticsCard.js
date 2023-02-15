import styles from './dashboardComponents.module.scss';
import Pill from './Pill';

export default function StatisticsCard({
  title,
  icon,
  courseName,
  learnerCount = 0,
  type = 'Open'
}) {
  return (
    <div className={`${styles.statisticCard}`}>
      <div className={`${styles.header}`}>
        <div className={`${styles.title}`}>{title}</div>
        <div className={`${styles.img}`}>
          <img src={icon} alt="" />
        </div>
      </div>

      <div className={`${styles.courseName}`}>{courseName}</div>

      <div className={`${styles.pillWrapper}`}>
        <Pill displayText={`${learnerCount} learners`} />
        <Pill displayText={`Type : ${type}`} />
      </div>
    </div>
  );
}
