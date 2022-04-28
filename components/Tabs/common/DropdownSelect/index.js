import styles from '../../tabs.module.scss';

export default function DropdownSelect({ data, inputData, classes }) {
  // remove falsy values
  if (data) {
    data = data.filter((d) => d);
  }

  return (
    <div className={`${styles.inputWrapper}  ${styles.topBottomMargin} ${classes}`}>
      <label htmlFor={inputData.inputName} className={`${styles.label}`}>
        {inputData.label}
      </label>

      <select
        className={`${styles.input} ${inputData.value ? styles.highlight : ''}`}
        name={inputData.inputName}
        onChange={inputData.handleChange}
        value={inputData.value}>
        <option value="" disabled>
          {inputData.placeholder}
        </option>
        {data &&
          data.map((d) => (
            <option key={d} className={`${styles.select} ${styles.highlight}`} value={d}>
              {d}
            </option>
          ))}
      </select>
    </div>
  );
}
