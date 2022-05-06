import { CalendarContainer } from 'react-datepicker';
import styles from '../calendar.module.scss';

export default function CustomCalenderHeader({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled
}) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  return (
    <>
      <div
        style={{
          margin: 10,
          display: 'flex',
          justifyContent: 'center'
        }}>
        <button
          className={`${styles.navBtn} ${styles.prev}`}
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}></button>

        <div className={`${styles.calenderHeading}`}>
          {`${months[date.getMonth()]}, ${date.getFullYear()}`}
        </div>

        <button
          className={`${styles.navBtn} ${styles.next}`}
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}></button>
      </div>
    </>
  );
}
