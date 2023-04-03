import styles from '../learnerSideScreen.module.scss';
import PollBox from './PollBox';
const ParticipantPollScreen = () => {
  return (
    <div className={`${styles.participantPollContainer}`}>
      <div className={`${styles.activePoll}`}>
        <PollBox />
      </div>
      <div className={`${styles.endedPoll}`}></div>
    </div>
  );
};
export default ParticipantPollScreen;
