import { useEffect, useState } from 'react';
import { CalendarContainer } from 'react-datepicker';
import styles from '../calendar.module.scss';

export default function CustomCalenderFooter({ className, children }) {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  let date = new Date().toUTCString().slice(5, 16);

  function getTime() {
    setCurrentTime(
      new Date().toLocaleString(navigator.language, { hour: '2-digit', minute: '2-digit' })
    );
  }

  useEffect(() => {
    const timeId = setInterval(getTime, 1000);
    return () => clearInterval(timeId);
  }, []);

  return (
    <>
      <CalendarContainer className={className}>
        <>{children}</>
        <div className={`${styles.calendarFooter}`}>
          <span>{date}</span>
          <div format={'hh-mm'}>{currentTime}</div>
        </div>
      </CalendarContainer>
    </>
  );
}
