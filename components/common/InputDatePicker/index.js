import DatePicker from 'react-datepicker';
import CustomHeader from './CustomHeader';
import styles from './inputDatePicker.module.scss';

export default function InputDatePicker({
  selectedDate = new Date(),
  minDate = null,
  maxDate = null,
  changeHandler = function () {},
  isDisabled = false,
  styleClass,
}) {
  return (
    <div className={`${styles.inputDatePickerContainer} ${styleClass}`}>
      <DatePicker
        dateFormat="dd/MM/yyyy"
        renderCustomHeader={CustomHeader}
        selected={selectedDate}
        onChange={changeHandler}
        disabled={isDisabled}
        minDate={minDate ? new Date(minDate) : null}
        maxDate={maxDate ? new Date(maxDate) : null}
        calendarClassName={styles.inlineCalender}
        dayClassName={() => styles.calanderDates}
      />
    </div>
  );
}
