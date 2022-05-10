import { CalendarContainer } from 'react-datepicker';
import styles from '../calendar.module.scss';

export default function CustomCalenderFooter({ className, children }) {
  let date = new Date().toUTCString().slice(5, 16);

  return (
    <>
      <CalendarContainer className={className}>
        <>{children}</>
        <div className={`${styles.calendarFooter}`}>
          <span>{date}</span>
          <div format={'hh-mm'}>09:33 AM</div>
        </div>
      </CalendarContainer>
    </>
  );
}
