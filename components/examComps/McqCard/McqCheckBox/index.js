import styles from './mcqCheckBox.module.scss';
const McqCheckBox = ({ checked }) => {
  return (
    <label className={styles.checkbox_container}>
      <input type="checkbox" defaultChecked={checked} />
      <span className={styles.checkmark}></span>
    </label>
  );
};

export default McqCheckBox;
