import { useEffect, useState } from 'react';
import VcMaintool from '..';
import TimeFrame from './TimeFrame';
import styles from './vctoolStartPage.module.scss';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { useRecoilValue } from 'recoil';
import moment from 'moment';
const monthName = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const VCtoolStartPage = ({ vcData = null, isDisplayedInCourse = false }) => {
  console.info(vcData);
  const userData = useRecoilValue(UserStateAtom);
  const trainingStartTimeUnix = vcData?.trainingStartTime;
  const startTime = new Date(trainingStartTimeUnix * 1000);
  const year = startTime.getFullYear();
  const month = startTime.getMonth() + 1;
  const day = startTime.getDate();
  const hour = startTime.getHours();
  const minute = startTime.getMinutes();
  const second = startTime.getSeconds();
  const formattedDate = `${month}/${day}/${year} ${hour}:${minute}:${second}`;

  const [isVctoolActive, setIsVctoolActive] = useState(false);
  
  // Moment('12:16','HH:mm').get('minutes') //should result in '16'

  if (isVctoolActive) return <VcMaintool vcData={vcData} />;

  return (
    <>
      <div className={`${styles.vctoolStartPageContainer}`}>
        <div className={`${styles.timeFrame}`}>
         
          {/* <TimeFrame givenTime={new Date('2023-04-4 2:6:00')} vcData={vcData} /> */}
          <TimeFrame givenTime={startTime} vcData={vcData} setIsVctoolActive={setIsVctoolActive} />
        </div>
        <div className={`${styles.subDiv}`}>
          <img src="/images/svg/vctool/lamp.svg" />
          <div>
            <h3>This session has not started yet</h3>
            <h4>
              Schedule: {moment.unix(vcData?.trainingStartTime).format('DD')}th{' '}
              {monthName[moment.unix(vcData?.trainingStartTime).format('MM')]}
              {new Date(vcData.trainingStartTime * 1000).getFullYear()} -
              {new Date(vcData.trainingStartTime * 1000).getHours()}:
              {new Date(vcData.trainingStartTime * 1000).getMinutes()}
              {new Date(vcData.trainingStartTime * 1000).getHours() > 12 ? (
                <span>AM</span>
              ) : (
                <span>PM</span>
              )}
            </h4>
            <p>This session will be opened 15 mins before the start time to join</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default VCtoolStartPage;
