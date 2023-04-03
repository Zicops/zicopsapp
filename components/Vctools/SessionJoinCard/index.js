import { useEffect, useState } from 'react';
import styles from './sessionJoin.module.scss';
import moment from 'moment';
const SessionJoinCard = ({ classroomData = {} }) => {
  const meetingStart =new Date(classroomData?.trainingStartTime*1000).getTime();
  const meetingEnd = new Date(classroomData?.trainingEndTime*1000).getTime();
  

  const meetingDuration = classroomData?.duration / 60;
  {/* <TimeFrame givenTime={new Date("4/3/2023 18:55:00").getTime()}/> */}
  const [meetingType, setMeetingType] = useState();
  useEffect(() => {
    var now = new Date().getTime();
    if (now >= meetingStart && now <= meetingEnd) {
      setMeetingType('MeetingStarted');
    } else if (now < meetingStart) {
      setMeetingType('JoinSession');
    } else if(now > meetingEnd) {
      setMeetingType('MeetingEnded');
    }
  },[]);
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
          <div className={`${styles.meetingLiveDate}`}>{`${moment.unix(classroomData?.trainingStartTime).format('MM')}-${moment.unix(classroomData?.trainingStartTime).format('DD')}
          -${moment.unix(classroomData?.trainingStartTime).format('YYYY')},
          ${moment.unix(classroomData?.trainingStartTime).format(' h')}
          :${moment.unix(classroomData?.trainingStartTime).format('mm')} IST`}</div>
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
