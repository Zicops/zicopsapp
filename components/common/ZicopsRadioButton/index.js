import styles from './zicopsRadioButton.module.scss';
const RadioButtonLeft = ({ prop, onRadioChanged }) => {
  return (
    <>
      <label className={`${styles.container}`}>
        {prop.text}
        <input
          type="radio"
          name={prop.name}
          value={prop.value}
          // checked={this.state.site === result.SITE_NAME}
          onChange={onRadioChanged}
        />
        <span className={`${styles.checkmark}`}></span>
      </label>
    </>
  );
};

export default RadioButtonLeft;
