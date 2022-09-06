import styles from './userButton.module.scss';

const UserButton = ({
  text,
  type,
  clickHandler,
  isDisabled,
  customStyles,
  styleClass,
  isPrimary = true
}) => {
  return (
    <button
      className={`${isPrimary ? styles.btnPrimary : styles.btnDark} ${styleClass}`}
      style={customStyles}
      type={type}
      onClick={clickHandler}
      disabled={!!isDisabled}>
      {text}
    </button>
  );
};

export default UserButton;
