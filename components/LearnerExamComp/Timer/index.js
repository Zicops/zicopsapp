import { secondsToHMS } from '@/helper/utils.helper';
import { LearnerExamAtom } from '@/state/atoms/exams.atoms';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from '../InfoSection/infoSection.module.scss';
import { getEndTime } from '../Logic/exam.helper';

export default function Timer({ isShowTimeLeft, setIsShowTimeLeft, submitPaper }) {
  const [learnerExamData, setLearnerExamData] = useRecoilState(LearnerExamAtom);

  const [timer, setTimer] = useState(latestTime());
  const [isExamEnded, setIsExamEnded] = useState(false);
  let totalDuration = getDurationLeft();

  let timeInterval;
  useEffect(() => {
    clearInterval(timeInterval);

    timeInterval = setInterval(() => {
      if (+isShowTimeLeft === 1) {
        const durationInSeconds = timerGenerator().next()?.value;

        if (durationInSeconds <= 0) return setIsExamEnded(true);

        return setTimer(secondsToHMS(durationInSeconds));
      }

      setTimer(latestTime());
    }, 1000);

    return () => {
      clearInterval(timeInterval);
      secondsToHMS(timerGenerator().next(true));
    };
  }, [isShowTimeLeft]);

  useEffect(async () => {
    if (isExamEnded) await submitPaper();
  }, [isExamEnded]);

  function latestTime() {
    return new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      second: '2-digit'
    });
  }

  function getDurationLeft() {
    const { duration = 0, bufferTime = 0 } = learnerExamData?.examData;
    const examEndDate = moment(getEndTime(learnerExamData));
    const timeDiff = examEndDate.diff(moment(), 'seconds');

    const durationLeft = (+duration + +bufferTime) * 60;
    return durationLeft > timeDiff ? timeDiff : durationLeft;
  }

  function* timerGenerator(isReset = null) {
    if (isReset) totalDuration = getDurationLeft();
    if (totalDuration < 0) yield 0;

    yield --totalDuration;
  }

  return (
    <>
      <div className={`${styles.dropdownContainer}`}>
        <select value={isShowTimeLeft} onChange={(e) => setIsShowTimeLeft(+e.target.value)}>
          <option value={0}>Current Time</option>
          <option value={1}>Time Left</option>
        </select>
      </div>

      <span className={`${styles.info_section_watch_time}`}>{timer}</span>
    </>
  );
}
