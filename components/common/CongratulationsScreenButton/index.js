import styles from './congratulationsScreenButton.module.scss';
const CongratulationsScreenButton = ({ title, handleClick, disable, customClass }) => {
  return (
    <div
      className={`${styles.CongratulationsScreenButton} ${
        disable ? styles.disabled : ''
      } ${customClass}`}>
      <button onClick={handleClick} disabled={disable}>
        {title}
      </button>
    </div>
  );
};

export default CongratulationsScreenButton;
