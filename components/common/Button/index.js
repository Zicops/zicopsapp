import styles from './button.module.scss';

const Button = ({ text, type, clickHandler, isDisabled, customStyles, styleClass }) => {
  return (
    <button
      className={`${styles.btn} ${styleClass}`}
      style={customStyles}
      type={type}
      onClick={clickHandler}
      disabled={!!isDisabled}>
      {text}
    </button>
  );
};

export default Button;
