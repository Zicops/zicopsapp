import Button from '@/common/Button';
import Popup from 'reactjs-popup';
import styles from './alertBox.module.scss';

export default function AlertBox({ title = '', description = '', handleClose = () => {} }) {
  return (
    <Popup open={true} closeOnDocumentClick={false} closeOnEscape={false}>
      <div className={styles.alertBox}>
        <div className={`${styles.cross}`}>
          <img src={'/images/svg/clear.svg'} width={35} onClick={handleClose} />
        </div>

        <div className={`${styles.alert_text}`}>
          <img src={'/images/svg/error_outline.svg'} width={30} />
          <span className={`${styles.text}`}>Alert {title && `: ${title}`}!</span>
        </div>
        <div className={`${styles.desc}`}>{description}</div>

        <div className={styles.closeBtnContainer}>
          <Button text="Close" styleClass={styles.closeBtn} clickHandler={handleClose} />
        </div>
      </div>
    </Popup>
  );
}
