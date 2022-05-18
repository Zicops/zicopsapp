import { months, years } from '../../../../helper/utils.helper';

export default function CustomHeader({ changeYear, changeMonth }) {
  return (
    <div
      style={{
        margin: 10,
        display: 'flex',
        justifyContent: 'center'
      }}>
      <select value={'2022'} onChange={({ target: { value } }) => changeYear(value)}>
        {years.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select
        // value={months[getMonth(date)]}
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
