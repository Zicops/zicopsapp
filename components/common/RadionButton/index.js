import styles from './radioButton.module.scss';
const RadioButton = ({ text }) => {
  return (
    <>
      <div className={`${styles.container}`}>
        <label>
          <p>{text}</p>
          <input type="radio" name="radio" />
          <span class={`${styles.checkmark}`}></span>
        </label>
      </div>
    </>
  );
};

export default RadioButton;
