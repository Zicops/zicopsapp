import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import Clock from 'react-digital-clock';
import styles from './calendar.module.scss';

const CommonCalendar = () => {
  let today = new Date();
  let date = new Date().toUTCString().slice(5, 16);
  return (
    <div>
      <DatePicker
        dateFormat="dd/MM/yyyy"
        className="common_calendar_body"
        calendarClassName="common_calendar"
        dayClassName={() => 'common_calendar_dates'}
        monthClassName={() => 'common_calendar_months'}
        inline
        fixedHeight
      />
      <div className={`${styles.clock_time}`}>
        <span>{date}</span>
        {/* <Clock format={'hh-mm'} /> */}
      </div>
    </div>
  );
};

export default CommonCalendar;
