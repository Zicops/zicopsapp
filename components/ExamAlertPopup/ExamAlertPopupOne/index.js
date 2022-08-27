import styles from './examAlertPopupOne.module.scss';
import CongratulationsScreenButton from '../../common/CongratulationsScreenButton';

const ExamAlertPopupOne = ({
  handleClose = () => {},
  handleContinue = () => {},
  handleNewAttempt = () => {},
  isLastAttempt = null
}) => {
  return (
    <>
      <div className={`${styles.examAlertPopup_One}`}>
        <div className={`${styles.cross}`}>
          <img src={'/images/svg/clear.svg'} width={35} onClick={handleClose} />
        </div>

        <div className={`${styles.alert_text}`}>
          <img src={'/images/svg/error_outline.svg'} width={30} />
          <span className={`${styles.text}`}>Alert: You have a previous unfinished attempt</span>
        </div>

        <div className={`${styles.button}`}>
          <CongratulationsScreenButton
            title={'Continue with last attempt'}
            handleClick={handleContinue}
          />
        </div>
        {!isLastAttempt && (
          <div className={`${styles.button}`}>
            <CongratulationsScreenButton
              title={' Finish previous and start new attempt'}
              handleClick={handleNewAttempt}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ExamAlertPopupOne;
