import styles from './congratulationsScreenButton.module.scss';
const CongratulationsScreenButton = ({ title, handleClick, disable }) => {
  return (
    <div className={`${styles.CongratulationsScreenButton}`}>
      <button onClick={handleClick}>{title}</button>
    </div>
  );
};

export default CongratulationsScreenButton;
