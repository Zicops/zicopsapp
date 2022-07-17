import CongratulationsScreenButton from '../common/CongratulationsScreenButton';
import styles from './congratulationsScreenMain.module.scss';
const CongratulatonsScreenMain = ({ userName, examName }) => {
  return (
    <div className={`${styles.congratulatonsScreen}`}>
      <div className={`${styles.head}`}>
        Congratulations <span>{userName} !</span>
      </div>
      <div className={`${styles.textHead}`}>
        You have successfully completed the exam:<span> {examName}</span>
      </div>
      <img src="/images/completed.png" width={200} />
      <div className={`${styles.buttons}`}>
        <CongratulationsScreenButton title={'View Result'} customClass={`${styles.newStyle}`} />
        <CongratulationsScreenButton title={'View Answer Key'} customClass={`${styles.newStyle}`} />
        <CongratulationsScreenButton
          title={'Exit And Return To Main Screen'}
          customClass={`${styles.newStyle}`}
        />
      </div>
    </div>
  );
};

export default CongratulatonsScreenMain;
