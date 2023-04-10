import Popup from 'reactjs-popup';
import CongratulationsScreenButton from '../CongratulationsScreenButton';
import styles from './confirmPopUp.module.scss';

export default function ConfirmPopUp({ title, message, btnObj = {} }) {
  const {
    handleClickLeft = function () {},
    textLeft = 'Yes',
    leftIsDisable = false,

    handleClose = null,
    handleClickRight = function () {},
    textRight = 'No',
    rightIsDisable = false
  } = btnObj;

  return (
    <Popup open={true} closeOnDocumentClick={false} closeOnEscape={false}>
      <div className={`${styles.confirmPopContainer}`}>
        <div className={`${styles.confirmPopUp}`}>
          <div className={`${styles.cross}`}>
            <img
              src={'/images/svg/clear.svg'}
              width={35}
              onClick={!!handleClose ? handleClose : handleClickRight}
            />
          </div>

          <div className={`${styles.alert_text}`}>
            <img src={'/images/svg/error_outline.svg'} width={30} />
            <span className={`${styles.text}`}>Alert: {title}</span>
          </div>

          <div className={`${styles.desc}`}>{message}</div>

          <div className={`${styles.buttons}`}>
            <CongratulationsScreenButton
              title={textLeft}
              handleClick={handleClickLeft}
              disable={leftIsDisable}
            />
            <CongratulationsScreenButton
              title={textRight}
              handleClick={handleClickRight}
              disable={rightIsDisable}
            />
          </div>
        </div>
      </div>
    </Popup>
  );
}
