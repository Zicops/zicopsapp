import styles from './zicopsRadioButton.module.scss';
const RadioButtonLeft = ({ text }) => {
  return (
    <>
      <label className={`${styles.container}` }>
        {text}
        <input type={'radio'} name="radio" />
        <span className={`${styles.checkmark}` }></span>
      </label>
    </>
  );
};

export default RadioButtonLeft;
