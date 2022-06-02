import CongratulationsScreenButton from '../../common/CongratulationsScreenButton';
import styles from './examAlertPopupTwo.module.scss';

const ExamAlertPopupTwo = ({ handleClick }) => {
  return (
    <>
      <div className={`${styles.examAlertPopup_Two}`}>
        <div className={`${styles.cross}`}>
          <img src={'/images/svg/clear.svg'} width={35} onClick={handleClick} />
        </div>

        <div className={`${styles.alert_text}`}>
          <img src={'/images/svg/error_outline.svg'} width={30} />
          <span className={`${styles.text}`}>Alert: You have a previous unfinished attempt !</span>
        </div>
        <div className={`${styles.desc}`}>
          You will be redirected to the last attempted question to continue with your attempt.Are
          you sure you want to continue?
        </div>
        <div className={`${styles.buttons}`}>
          {/* <div className={`${styles.button}`}> */}
          <CongratulationsScreenButton title={'Yes'} />
          {/* </div> */}
          {/* <div className={`${styles.button}`}> */}
          <CongratulationsScreenButton title={' No'} />
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default ExamAlertPopupTwo;
