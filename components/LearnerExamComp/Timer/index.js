import { LearnerExamAtom } from '@/state/atoms/exams.atoms';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from '../InfoSection/infoSection.module.scss';
import { getEndTime } from '../Logic/exam.helper';

export default function Timer({ isShowTimeLeft, setIsShowTimeLeft }) {
  const [learnerExamData, setLearnerExamData] = useRecoilState(LearnerExamAtom);

  const [timer, setTimer] = useState(latestTime());

  function latestTime() {
    return new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      second: '2-digit'
    });
  }

  function getTimeLeft(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds
    };
    return `${hours}:${minutes}:${seconds}`;
  }

  const { duration = 0, bufferTime = 0 } = learnerExamData?.examData;
  const examEndDate = moment(getEndTime(learnerExamData));
  const timeDiff = examEndDate.diff(moment(), 'seconds');

  const durationLeft = (+duration + +bufferTime) * 60;
  const totalDuration = durationLeft > timeDiff ? timeDiff : durationLeft;

  function* timerGenerator() {
    yield --totalDuration;
  }

  let timeInterval;

  useEffect(() => {
    clearInterval(timeInterval);

    timeInterval = setInterval(() => {
      if (+isShowTimeLeft === 1) {
        return setTimer(getTimeLeft(timerGenerator().next()?.value));
      }

      setTimer(latestTime());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, [isShowTimeLeft]);

  return (
    <>
      <div className="smallDropdown">
        <select
          name="timeDropdown"
          value={isShowTimeLeft}
          onChange={(e) => setIsShowTimeLeft(+e.target.value)}>
          <option value={0}>Current Time</option>
          <option value={1}>Time Left</option>
        </select>
      </div>

      <span className={`${styles.info_section_watch_time}`}>{timer}</span>
      <style jsx>
        {`
          .smallDropdown {
            padding: 0 !impoptant;
            margin-bottom: 10px;
          }
          .smallDropdown select {
            background-color: var(--darkThree);
            color: var(--white);
            border: 0;
            border-bottom: 1px solid grey;
          }
          .smallDropdown select:focus {
            outline: none;
          }
        `}
      </style>
    </>
  );
}
