import styles from './congratulationsScreenButton.module.scss';
const CongratulationsScreenButton = ({ title, handleClick, disable, customClass }) => {
  return (
    <div className={`${styles.CongratulationsScreenButton} ${customClass}`}>
      <button
        onClick={handleClick}
        className={`${disable ? styles.disabled : ''} `}
        disabled={disable}>
        {title}
      </button>
    </div>
  );
};

export default CongratulationsScreenButton;
