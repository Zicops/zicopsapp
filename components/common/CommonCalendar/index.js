import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import Clock from 'react-digital-clock';
import styles from './calendar.module.scss';
import CustomCalenderFooter from './CustomCalenderFooter';
import CustomCalenderHeader from './CustomCalenderHeader';

export default function CommonCalendar() {
  return (
    <div className={`w-100 h-100 ${styles.commonCalendar}`}>
      <DatePicker
        calendarContainer={CustomCalenderFooter}
        renderCustomHeader={CustomCalenderHeader}
        dateFormat="dd/MM/yyyy"
        calendarClassName={`${styles.calender}`}
        dayClassName={() => `${styles.singleDayCell}`}
        // openToDate={new Date('1993/09/28')}
        inline
        fixedHeight
      />
    </div>
  );
}
