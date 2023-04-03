import { useEffect, useState } from 'react';
import styles from './sessionJoin.module.scss';
const SessionJoinCard = ({ classroomData = {} }) => {
  const [timing, setTiming] = useState({
    // meeting start time
    day: new Date(classroomData?.trainingStartTime * 1000).getDate(),
    month: new Date(classroomData?.trainingStartTime * 1000).getMonth(),
    year: new Date(classroomData?.trainingStartTime * 1000).getFullYear(),
    time: new Date(classroomData?.trainingStartTime * 1000).getHours(),
    timeMin: new Date(classroomData?.trainingStartTime * 1000).getMinutes()
    // timeSec: 0
  });
  const [meetingStart, setmeetingStart] = useState(classroomData?.trainingStartTime);
  const [meetingEnd, setmeetingEnd] = useState(classroomData?.trainingEndTime);

  const [meetingDuration, setMeetingDuration] = useState(classroomData?.duration / 60);
  const [meetingType, setMeetingType] = useState();
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
          <div className={`${styles.meetingLiveDate}`}>{`${new Date(classroomData?.trainingStartTime * 1000).getDate()}-${new Date(
            classroomData?.trainingStartTime * 1000
          ).getMonth()}
          -${new Date(classroomData?.trainingStartTime * 1000).getFullYear()},
          ${new Date(classroomData?.trainingStartTime * 1000).getHours()}
          :${new Date(classroomData?.trainingStartTime * 1000).getMinutes()} IST`}</div>
          <div className={`${styles.meetingDuration}`}>
            duration :<div className={`${styles.durationTime}`}>{classroomData?.duration / 60} min</div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
export default SessionJoinCard;
