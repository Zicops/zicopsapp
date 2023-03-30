import { meetingPageAtom } from '@/state/atoms/vctool.atoms';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from './vctoolStartPage.module.scss';
const TimeFrame = ({ stratDate, givenTime, setIsVctoolActive }) => {
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const [date, setDate] = useState();
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const monthName = [
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
  const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const getTime = useRef();

  useEffect(() => {
    getTime = setInterval(() => {
      const now = new Date().getTime();
      const distance = givenTime - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance > 0) {
        setSeconds(seconds);
        setMinutes(minutes);
        setHours(hours);
      }
      setDate(new Date().getDate());
      setMonth(monthName[new Date().getMonth() + 1]);
      setDay(dayName[new Date().getDay()]);
      if (hours == 0 && minutes <= 15) setIsVctoolActive(true);
    }, 1000);

    return () => clearInterval(getTime);
  });

  return (
    <div className={`${styles.vctoolTimeFrame}`}>
      <div className={`${styles.vcTimer}`}>
        <div>
          <div>{hours < 9 ? `0 ${hours}` : hours}</div>
          <p className={`${styles.timeUnite}`}>hh</p>
        </div>
        <p>:</p>
        <div>
          <div>{minutes < 9 ? `0${minutes}` : minutes}</div>
          <p className={`${styles.timeUnite}`}>mm</p>
        </div>
        <p>:</p>
        <div>
          <div>{seconds < 9 ? `0${seconds}` : seconds}</div>
          <p className={`${styles.timeUnite}`}>ss</p>
        </div>
      </div>

      <div className={`${styles.vctoolTimeLine} ${styles.timeIST}`}>IST</div>
      <div
        className={`${styles.vctoolStartDate} ${styles.vctoolStartingDate}`}>{`${date} ${month} , ${day}`}</div>
    </div>
  );
};
export default TimeFrame;
