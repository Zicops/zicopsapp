import { useEffect, useState } from 'react';
import styles from './sessionJoin.module.scss';
const SessionJoinCard = ({classroomData = {}}) => {
  const [timing, setTiming] = useState({
    // meeting start time
    day: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    time: 12,
    timeMin: 29
    // timeSec: 0
  });
  let duration = 1800;
  const [meetingStart, setmeetingStart] = useState(new Date('3/31/2023 14:58:00').getTime());
  const [meetingEnd, setmeetingEnd] = useState(new Date('3/31/2023 15:30:00').getTime());

  const [meetingDuration, setMeetingDuration] = useState(30);
  const [meetingType, setMeetingType] = useState('');
  useEffect(() => {
    var now = new Date().getTime();
    if (now >= meetingStart && now <= meetingEnd) {
      setMeetingType('MeetingStarted');
    } else if (now < meetingStart) {
      setMeetingType('JoinSession');
    } else {
      setMeetingType('MeetingEnded');
    }
  });
  const title = ['Session has not started', 'Live now', 'Session Ended'];
  return (
    <div className={`${styles.joinSessionContainer}`}>
      <div>
        <div className={`${styles.joinSessionHead}`}>
          {/* <div>Session has not started</div> */}
          {meetingType === 'JoinSession' && <div>{title[0]}</div>}
          {meetingType === 'MeetingStarted' && (
            <div className={`${styles.meetingLive}`}>
              {title[1]} <img src="/images/svg/vctool/sensors-on.svg" />
            </div>
          )}
          {meetingType === 'MeetingEnded' && (
            <div className={`${styles.sessionEnd}`}>
              {title[2]} <img src="/images/svg/vctool/sensors-off.svg" />
            </div>
          )}
        </div>
        {/* <button className={`${styles.JoinSessionBtn}`}>Join Session</button> */}
        {meetingType === 'JoinSession' && (
          <button className={`${styles.JoinSessionBtn}`}>Join Session</button>
        )}
        {meetingType === 'MeetingStarted' && (
          <button className={`${styles.JoinSessionBtn}`}>Join Session</button>
        )}
        {meetingType === 'MeetingEnded' && (
          <button className={`${styles.sessionEnded}`}>Recording will be available soon</button>
        )}
        <div className={`${styles.joinsessionFooter}`}>
          <div>{`${timing.day}-${timing.month}-${timing.year},
          ${timing.time}:${timing.timeMin} IST`}</div>
          <div className={`${styles.meetingDuration}`}>
            duration :<div className={`${styles.durationTime}`}>{meetingDuration} min</div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
export default SessionJoinCard;
