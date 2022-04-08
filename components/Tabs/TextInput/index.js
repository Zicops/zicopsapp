import styles from '../tabs.module.scss';

export default function TextInput({ inputName, label, placeholder, onChange, value, classes }) {
  return (
    <div className={`${styles.inputWrapper} ${styles.topBottomMargin} ${classes || ''}`}>
      <label htmlFor={inputName} className={`${styles.label}`}>
        {label}
      </label>

      <input
        type="text"
        name={inputName}
        placeholder={placeholder}
        className={`${styles.input} ${value ? styles.highlight : ''}`}
        required
        onChange={onChange}
        defaultValue={value}
      />
    </div>
  );
}
