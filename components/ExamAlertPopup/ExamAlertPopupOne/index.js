import styles from './examAlertPopupOne.module.scss';
// import '/public/images';
import CongratulationsScreenButton from '../../common/CongratulationsScreenButton';
const ExamAlertPopupOne = ({ handleClick }) => {
  return (
    <>
      <div className={`${styles.examAlertPopup_One}`}>
        <div className={`${styles.cross}`}>
          <img src={'/images/svg/clear.svg'} width={35} onClick={handleClick} />
        </div>

        <div className={`${styles.alert_text}`}>
          <img src={'/images/svg/error_outline.svg'} width={30} />
          <span className={`${styles.text}`}>Alert: You have a previous unfinished attempt</span>
        </div>

        <div className={`${styles.button}`}>
          <CongratulationsScreenButton title={'Continue with last attempt'} />
        </div>
        <div className={`${styles.button}`}>
          <CongratulationsScreenButton title={' Finish previous and start new attempt'} />
        </div>
      </div>
    </>
  );
};

export default ExamAlertPopupOne;
