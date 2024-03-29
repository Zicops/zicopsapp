import { useTimeInterval } from '@/helper/hooks.helper';
import { TopicClassroomAtomFamily } from '@/state/atoms/courses.atom';
import moment from 'moment';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import useLoadClassroomData from '../Logic/useLoadClassroomData';
import styles from '../vctoolMain.module.scss';

const SessionJoinCard = ({ topicId = null }) => {
  const classroomData = useRecoilValue(TopicClassroomAtomFamily(topicId));
  const [sessionStatus, setSessionStatus] = useState('beforeStart');

  useLoadClassroomData(topicId);

  const classroomStartTime = moment(classroomData?.trainingStartTime * 1000);
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
  const oneMinute = 1000 * 60;

  const cancel = useTimeInterval(() => {
    if (classroomStartTime.diff(new Date(), 'minute') < 0) setSessionStatus('live');

    const endTime = moment(classroomData.trainingEndTime * 1000);

    if (classroomStartTime.diff(endTime, 'minute') < 0) setSessionStatus('ended');
  }, oneMinute);

  if (sessionStatus === 'ended') cancel();

  return (
    <div className={`${styles.joinSessionContainer}`}>
      <div className={`${styles.joinSessionHead}`}>
        <span className={cardData?.[sessionStatus]?.textClass}>
          {cardData?.[sessionStatus]?.text}
        </span>

        {!!cardData?.[sessionStatus]?.imgSrc && <img src={cardData?.[sessionStatus]?.imgSrc} />}
      </div>

      <div>
        <button className={cardData?.[sessionStatus]?.btnClass}>
          {cardData?.[sessionStatus]?.buttonText}
        </button>
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
