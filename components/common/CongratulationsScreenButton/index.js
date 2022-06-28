import styles from './congratulationsScreenButton.module.scss';
const CongratulationsScreenButton = ({ title, handleClick, disable, customStyle }) => {
  return (
    <div className={`${styles.CongratulationsScreenButton}`} style={customStyle}>
      <button onClick={handleClick}>{title}</button>
    </div>
  );
};

export default CongratulationsScreenButton;
