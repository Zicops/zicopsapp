import { useEffect, useState } from 'react';
import VcMaintool from '..';
import TimeFrame from './TimeFrame';
import styles from './vctoolStartPage.module.scss';

const VCtoolStartPage = ({vcData = null, isDisplayedInCourse = false}) => {

  const [dateInfo, setDateInfo] = useState({
    day: 10,
    month: 12,
    year: 2023,
    hours: 22,
    minute: 8,
    second: 0
  });
  const [isVctoolActive, setIsVctoolActive] = useState();

  useEffect(() => {
    setIsVctoolActive(dateInfo?.hours == 0 && dateInfo?.minute <= 15);
  }, [dateInfo]);

  if (isVctoolActive) return <VcMaintool />;

  return (
    <>
      <div className={`${styles.vctoolStartPageContainer}`}>
        <div className={`${styles.timeFrame}`}>
          {/* <VcMaintool /> */}
          {/* <TimeFrame givenTime={new Date("4/10/2023 00:00:00").getTime()} */}

          <TimeFrame
            setIsVctoolActive={setIsVctoolActive}
            givenTime={new Date(`${dateInfo.month}/${dateInfo.day}/${dateInfo.year} ${dateInfo.hours}:
        ${dateInfo.minute}:${dateInfo.second}`).getTime()}
          />
        </div>
        <div className={`${styles.subDiv}`}>
          <img src="/images/svg/vctool/lamp.svg" />
          <div>
            <h3>This session has not started yet</h3>
            <h4>Schedule: 12th January2023 - 12:30 PM</h4>
            <p>This session will be opened 15 mins before the start time to join</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default VCtoolStartPage;
