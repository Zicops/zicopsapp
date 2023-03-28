import Spinner from '../common/Spinner';
import styles from './dashboardComponents.module.scss';
import Pill from './Pill';

export default function StatisticsCard({
  title = '',
  icon = '',
  courseName = null,
  learnerCount = null,
  type = null
}) {
  const totalLearners = +learnerCount || null;

  if (learnerCount === null && courseName === null && type === null)
    return (
      <div className={`${styles.statisticCard}`}>
        <Spinner size="30px" customStyles={{ minHeight: '100px' }} />
      </div>
    );

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
        <Pill
          displayText={
            totalLearners !== null
              ? `${totalLearners} learner${totalLearners > 1 ? 's' : ''}`
              : null
          }
        />
        <Pill displayText={type !== null ? `Type : ${type || ''}` : null} />
      </div>
    </div>
  );
}
