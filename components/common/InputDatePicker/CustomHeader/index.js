import { months, getYearsFromNow } from '../../../../helper/utils.helper';
import styles from '../inputDatePicker.module.scss';

export default function CustomHeader({ changeYear, changeMonth }) {
  const YEARS_FROM_NOW = 10;
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();

  return (
    <div className={`${styles.customHeader}`}>
      <select
        defaultValue={currentYear}
        onChange={({ target: { value } }) => {
          console.log(value);
          changeYear(value);
        }}>
        {getYearsFromNow(YEARS_FROM_NOW).map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select
        defaultValue={months[currentMonth]}
        onChange={({ target: { value } }) => {
          console.log(value);
          return changeMonth(months.indexOf(value));
        }}>
        {months.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
