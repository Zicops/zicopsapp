import DatePicker from 'react-datepicker';
import CustomHeader from './CustomHeader';
import styles from './inputDatePicker.module.scss';

export default function InputDatePicker({
  selectedDate = new Date(),
  minDate = null,
  changeHandler = function () {},
  isDisabled = false,
  customStyle = {}
}) {
  return (
    <div className={`${styles.inputDatePickerContainer} ${customStyle}`}>
      <DatePicker
        dateFormat="dd/MM/yyyy"
        renderCustomHeader={CustomHeader}
        selected={selectedDate}
        onChange={changeHandler}
        disabled={isDisabled}
        minDate={minDate ? new Date(minDate) : null}
        calendarClassName={styles.inlineCalender}
        dayClassName={() => styles.calanderDates}
      />
    </div>
  );
}
