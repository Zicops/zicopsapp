import { useEffect, useState } from 'react';
import styles from './sessionJoin.module.scss';
const SessionJoinCard = () => {
  const [timing, setTiming] = useState({
    day: 3,
    month: 3,
    year: 2029,
    time: 23,
    timeMin: 30,
    // timeSec: 0
  });
  //   {new Date(`${dateInfo.month}/${dateInfo.day}/${dateInfo.year} ${dateInfo.hours}:
  //         ${dateInfo.minute}:${dateInfo.second}`).getTime()}
  let givenTime =
    new Date(
      `${timing.month}/ ${timing.day}/${timing.year}  ${timing.time}:${timing.timeMin}:${timing.timeSec}`
    ).getTime() / 1000;
  let duration = 1800;
  const [meetingDuration, setMeetingDuration] = useState(30);
  const [meetingType, setMeetingType] = useState('');
  useEffect(() => {
    if (givenTime <= new Date().getTime()) {
      setMeetingType('JoinSession');
    } 
  });
  const title = ['Session has not started', 'Live now', 'Session Ended'];
  return (
    <div className={`${styles.joinSessionContainer}`}>
      <div>
        <div className={`${styles.joinSessionHead}`}>
          {/* <div>Session has not started</div> */}
          {meetingType === 'JoinSession' ? (
            <div>{title[0]}</div>
          ) : meetingType === 'MeetingStarted' ? (
            <div>{title[1]}</div>
          ) : (
            <div>{title[2]}</div>
          )}
        </div>
        {/* <button className={`${styles.JoinSessionBtn}`}>Join Session</button> */}
        {meetingType === 'JoinSession' ? (
          <button className={`${styles.JoinSessionBtn}`}>Join Session</button>
        ) : meetingType === 'MeetingStarted' ? (
          <button className={`${styles.JoinSessionBtn}`}>Join Session</button>
        ) : (
          <button className={`${styles.sessionEnded}`}>Recording will be available soon</button>
        )}
        <div className={`${styles.joinsessionFooter}`}>
          <div>{`0${timing.day}-0${timing.month}-${timing.year},
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
