import styles from '../mcqCard.module.scss';

export default function McqCheckBox({ checked }) {
  return (
    <label className={styles.checkbox_container}>
      <input type="checkbox" checked={checked} onChange={function () {}} />
      <span className={styles.checkmark}></span>
    </label>
  );
}
