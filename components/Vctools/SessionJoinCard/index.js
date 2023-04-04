import { TopicClassroomAtomFamily } from '@/state/atoms/courses.atom';
import moment from 'moment';
import { useRecoilValue } from 'recoil';
import useLoadClassroomData from '../Logic/useLoadClassroomData';
import styles from '../vctoolMain.module.scss';

const SessionJoinCard = ({ topicId = null }) => {
  const classroomData = useRecoilValue(TopicClassroomAtomFamily(topicId));

  useLoadClassroomData(topicId);

  const classroomStartTime = moment(classroomData?.trainingStartTime * 1000);
  const now = new Date();

  const cardData = {
    beforeStart: {
      text: 'Session has not started',
      buttonText: 'Join Session',
      btnClass: `${styles.joinSessionBtn}`,
      textClass: `${styles.before}`
    },
    live: {
      text: 'Live Now',
      imgSrc: '/images/svg/vctool/sensors-on.svg',
      buttonText: 'Join Session',
      btnClass: `${styles.joinSessionBtn}`,
      textClass: `${styles.live}`
    },
    ended: {
      text: 'Session Ended',
      imgSrc: '/images/svg/vctool/sensors-off.svg',
      buttonText: 'Recording will be available soon',
      btnClass: `${styles.sessionEnded}`,
      textClass: `${styles.after}`
    }
  };
  let type = 'beforeStart';
  if (classroomStartTime.diff(now, 'minute') < 0) type = 'live';

  // add current time with durations to get classroom end time
  now.setSeconds(classroomData?.duration);
  if (classroomStartTime.diff(now, 'minute') < 0) type = 'ended';

  return (
    <div className={`${styles.joinSessionContainer}`}>
      <div className={`${styles.joinSessionHead}`}>
        <span className={cardData?.[type]?.textClass}>{cardData?.[type]?.text}</span>

        {!!cardData?.[type]?.imgSrc && <img src={cardData?.[type]?.imgSrc} />}
      </div>

      <div>
        <button className={cardData?.[type]?.btnClass}>{cardData?.[type]?.buttonText}</button>
      </div>

      <div className={`${styles.joinsessionFooter}`}>
        <div className={`${styles.meetingLiveDate}`}>{classroomStartTime.format('LLL')} IST</div>

        <div className={`${styles.meetingDuration}`}>
          duration :{(classroomData?.duration || 0) / 60} min
        </div>
      </div>
    </div>
  );
};
export default SessionJoinCard;
