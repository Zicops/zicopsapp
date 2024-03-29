import { useTimeInterval } from '@/helper/hooks.helper';
import { TopicClassroomAtomFamily } from '@/state/atoms/courses.atom';
import moment from 'moment';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Spinner from '../common/Spinner';
import useLoadClassroomData from './Logic/useLoadClassroomData';
import { getSessionStatus } from './help/vctool.helper';
import styles from './vctoolMain.module.scss';

export default function ClassroomTopicSection({ topicId, isRecordingAvailable = null }) {
  const classroomData = useRecoilValue(TopicClassroomAtomFamily(topicId));
  const [sessionStatus, setSessionStatus] = useState('beforeStart');

  const { isLoading } = useLoadClassroomData(topicId);

  const classroomStartTime = !!classroomData?.trainingStartTime
    ? moment(classroomData?.trainingStartTime * 1000)
    : null;

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
    },
    recording: {
      text: 'Session Ended',
      imgSrc: '/images/svg/vctool/sensors-off.svg',
      buttonText: 'Click To Play Recording',
      btnClass: `${styles.sessionEnded}`,
      textClass: `${styles.after}`
    }
  };
  const oneMinute = 1000 * 60;

  useEffect(() => {
    if (!classroomData?.trainingStartTime) return;

    updateSessionStatus();
  }, [classroomData?.trainingStartTime]);

  const cancel = useTimeInterval(updateSessionStatus, oneMinute);

  function updateSessionStatus() {
    if (!classroomData?.trainingStartTime) return;

    const status = getSessionStatus(
      +classroomData?.trainingStartTime,
      +classroomData?.trainingEndTime
    );

    const isRecordingAvailable =
      status === 2 && moment().diff(moment(+classroomData?.trainingEndTime * 1000), 'minute') >= 5;

    if (isRecordingAvailable) return setSessionStatus('recording');
    if (status === 2) return setSessionStatus('ended');
    if (status === 1) return setSessionStatus('live');
    if (status === null) return setSessionStatus('beforeStart');
  }

  // end  the timeout loop
  if (sessionStatus === 'recording') cancel();

  if (isLoading) return <Spinner />;

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
        <div className={`${styles.meetingLiveDate}`}>
          {!!classroomStartTime ? `${classroomStartTime?.format('LLL')} IST` : 'N/A'}
        </div>

        <div className={`${styles.meetingDuration}`}>
          Duration : {(classroomData?.duration || 0) / 60} min
        </div>
      </div>

      {/* add script here to initite the jitsi class */}
      <Script src="https://live.zicops.com/external_api.js"></Script>
    </div>
  );
}
