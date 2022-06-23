import { months, getYearsFromNow } from '../../../../helper/utils.helper';
import styles from '../inputDatePicker.module.scss';

const YEARS_FROM_NOW = 10;

export default function CustomHeader({ date, changeYear, changeMonth }) {
  date = new Date(date);
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();

  return (
    <div className={`${styles.customHeader}`}>
      <select defaultValue={currentYear} onChange={({ target: { value } }) => changeYear(value)}>
        {getYearsFromNow(YEARS_FROM_NOW).map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select
        defaultValue={months[currentMonth]}
        onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}>
        {months.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
