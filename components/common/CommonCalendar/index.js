import { addDays } from 'date-fns';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './calendar.module.scss';
// import Clock from 'react-digital-clock';
import CustomCalenderFooter from './CustomCalenderFooter';
import CustomCalenderHeader from './CustomCalenderHeader';

export default function CommonCalendar() {
  // addDays(date, numberOfDaysFromFirstDate)
  const [selectedDates, setSelectedDates] = useState([addDays(new Date(), 0)]);
  const highlightedDates = [addDays(new Date(), 2), addDays(new Date(), 5), addDays(new Date(), 7)];

  return (
    <div className={`w-100 h-100 ${styles.commonCalendar}`}>
      <DatePicker
        calendarContainer={CustomCalenderFooter}
        renderCustomHeader={CustomCalenderHeader}
        dateFormat="dd/MM/yyyy"
        calendarClassName={`${styles.calender}`}
        dayClassName={() => `${styles.singleDayCell}`}
        selected={new Date()}
        onChange={(date) => setSelectedDates([...selectedDates, addDays(date, 0)])}
        highlightDates={[
          { [styles.circleAtCorner]: highlightedDates },
          { [styles.highlighted]: selectedDates }
        ]}
        // openToDate={new Date('1993/09/28')}
        inline
        fixedHeight
      />
    </div>
  );
}
