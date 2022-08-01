import styles from './dayWeekMonth.module.scss';
const DayWeekMonth = () => {
  return (
    <div className={`${styles.headButton}`}>
      <p>Day</p>
      <p>Week</p>
      <p>Month</p>
    </div>
  );
};

export default DayWeekMonth;
