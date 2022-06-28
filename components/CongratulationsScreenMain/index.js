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
        Programming.
      </div>
      <img src="/images/completed.png" width={200} />
      <div className={`${styles.buttons}`}>
        <CongratulationsScreenButton title={'View Result'} />
        <CongratulationsScreenButton title={'View Answer Key'} />
        <CongratulationsScreenButton title={'Exit And Return To Main Screen'} />
      </div>
    </div>
  );
};

export default CongratulatonsScreenMain;
