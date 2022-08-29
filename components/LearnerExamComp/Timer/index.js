import { customSelectStyles } from '@/components/common/FormComponents/Logic/formComponents.helper';
import { secondsToHMS } from '@/helper/utils.helper';
import { LearnerExamAtom } from '@/state/atoms/exams.atoms';
import { UserExamDataAtom } from '@/state/atoms/video.atom';
import moment from 'moment';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useRecoilState } from 'recoil';
import styles from '../InfoSection/infoSection.module.scss';
import { getEndTime } from '../Logic/exam.helper';

export default function Timer({ submitPaper }) {
  const [learnerExamData, setLearnerExamData] = useRecoilState(LearnerExamAtom);
  const [userExamData, setUserExamData] = useRecoilState(UserExamDataAtom);

  const [timer, setTimer] = useState(latestTime());
  const [isExamEnded, setIsExamEnded] = useState(false);
  const [isShowTimeLeft, setIsShowTimeLeft] = useState(0);
  let totalDuration = getDurationLeft();

  let timeInterval;
  useEffect(() => {
    clearInterval(timeInterval);

    timeInterval = setInterval(() => {
      const durationInSeconds = timerGenerator().next()?.value;
      const { duration = 0, bufferTime = 0 } = learnerExamData?.examData;

      setUserExamData((prev) => ({
        ...prev,
        duration: { total: (+duration + +bufferTime) * 60, timeLeft: durationInSeconds }
      }));

      if (durationInSeconds <= 0) {
        console.log('exam time up');
        return setIsExamEnded(true);
      }

      return setTimer(secondsToHMS(durationInSeconds, false));
    }, 1000);

    return () => {
      clearInterval(timeInterval);
      // secondsToHMS(timerGenerator().next(true));
    };
  }, []);

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

    let attemptData = null;
    if (userExamData?.userExamAttempts) {
      attemptData = userExamData?.userExamAttempts?.find(
        (attempt) => userExamData?.currentAttemptId === attempt?.user_ea_id
      );
    }
    const durationSpent = +attemptData?.attempt_duration || 0;

    const durationLeft = (+duration + +bufferTime) * 60;

    const _timeLeft = (durationLeft > timeDiff ? timeDiff : durationLeft) - durationSpent;
    // console.log(_timeLeft, durationSpent, attemptData);

    return _timeLeft;
  }

  function* timerGenerator() {
    if (totalDuration < 0) yield 0;

    yield --totalDuration;
  }

  const defaultStyles = customSelectStyles(false);
  const selectStyles = {
    ...defaultStyles,
    container: () => ({
      ...defaultStyles.container(),
      width: '150px',
      margin: 'auto',
      height: '25px',
      position: 'relative'
    }),
    control: () => ({
      ...defaultStyles.control(),
      display: 'flex',
      border: '1px solid transparent',
      background: 'transparent',
      borderBottom: '1px solid var(--white)',
      margin: 'auto',
      height: '25px',
      width: '100%',
      height: '100%',
      textAlign: 'left'
    }),
    // menuList: () => ({
    //   ...defaultStyles.menuList(),
    //   height: '100%',
    //   width: '100%'
    // })
    option: () => ({
      ...defaultStyles.option(),
      height: '100%',
      width: '100%',
      padding: '2px 0px'
    })
  };

  return (
    <>
      <div className={`${styles.dropdownContainer}`}>
        <Select
          options={[
            { value: 0, label: 'Current Time' },
            { value: 1, label: 'Time Left' }
          ]}
          value={{ value: isShowTimeLeft, label: isShowTimeLeft ? 'Time Left' : 'Current Time' }}
          // filterOption={filterOption}
          // name={inputName}
          onChange={(e) => setIsShowTimeLeft(e.value)}
          // menuPlacement={menuPlacement}
          styles={selectStyles}
          isSearchable={false}
          // menuIsOpen={true}
          // isDisabled={!!isDisabled}
          // isOptionDisabled={(option) => option.disabled}
          isMulti={false}
          isClearable={false}
        />
        {/* <select value={isShowTimeLeft} onChange={(e) => setIsShowTimeLeft(+e.target.value)}>
          <option value={0}>Current Time</option>
          <option value={1}>Time Left</option>
        </select> */}
      </div>

      <span className={`${styles.info_section_watch_time}`}>
        {isShowTimeLeft ? timer : latestTime()}
      </span>
    </>
  );
}
