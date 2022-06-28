import styles from './congratulationsScreenButton.module.scss';
const CongratulationsScreenButton = ({ title, handleClick, disable, customClass }) => {
  return (
    <div className={`${styles.CongratulationsScreenButton} ${customClass}`}>
      <button onClick={handleClick}>{title}</button>
    </div>
  );
};

export default CongratulationsScreenButton;
