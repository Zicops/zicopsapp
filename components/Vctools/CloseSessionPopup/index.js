import styles from '../vctoolMain.module.scss';
const CloseSessionPopup = ({ leaveSession, endSession }) => {
  return (
    <div className={`${styles.stopSessionPopup}`}>
      <div className={`${styles.starSessionInnerContainer}`}>
        <p>Leaving Session?</p>

        <div className={`${styles.startSessionInstruction}`}>
          Do you want to leave the session or end the session for everyone?
        </div>
        <div className={`${styles.startSessionBtns}`}>
          <button className={`${styles.SessionCanselBtn}`} onClick={leaveSession}>
            Leave
          </button>
          <button className={`${styles.startSessionBtn}`} onClick={endSession}>
            End Session for All
          </button>
        </div>
      </div>
    </div>
  );
};
export default CloseSessionPopup;
