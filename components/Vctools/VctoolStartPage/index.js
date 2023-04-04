import { useEffect, useState } from 'react';
import VcMaintool from '..';
import TimeFrame from './TimeFrame';
import styles from './vctoolStartPage.module.scss';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { useRecoilValue } from 'recoil';
import { TopicClassroomAtomFamily } from '@/state/atoms/courses.atom';
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

const VCtoolStartPage = ({ topicId = null }) => {
  const topicClassroomData = useRecoilValue(TopicClassroomAtomFamily(topicId));

  const userData = useRecoilValue(UserStateAtom);
  const trainingStartTimeUnix = topicClassroomData?.trainingStartTime;
  const startTime = new Date(trainingStartTimeUnix * 1000);
  const year = startTime.getFullYear();
  const month = startTime.getMonth() + 1;
  const day = startTime.getDate();
  const hour = startTime.getHours();
  const minute = startTime.getMinutes();
  const second = startTime.getSeconds();
  const formattedDate = `${month}/${day}/${year} ${hour}:${minute}:${second}`;

  const [isVctoolActive, setIsVctoolActive] = useState(false);

  const endTime = new Date(topicClassroomData?.trainingEndTime * 1000);

  const isSessionEnded = moment(endTime).diff(new Date(), 'minute') < 0;
  const isSessionActive =
    (moment(startTime).diff(new Date(), 'minute') < 15 || isVctoolActive) && !isSessionEnded;

  if (isSessionActive) return <VcMaintool vcData={topicClassroomData} />;

  return (
    <>
      <div className={`${styles.vctoolStartPageContainer}`}>
        <div className={`${styles.timeFrame}`}>
          {/* <TimeFrame givenTime={new Date('2023-04-4 2:6:00')} vcData={vcData} /> */}
          {!isSessionEnded && (
            <TimeFrame
              givenTime={startTime}
              vcData={topicClassroomData}
              setIsVctoolActive={setIsVctoolActive}
            />
          )}
        </div>
        <div className={`${styles.subDiv}`}>
          <img src="/images/svg/vctool/lamp.svg" />
          <div>
            <h3>This session has {!isSessionEnded ? 'not started yet' : 'ended'}</h3>
            <h4>
              {!isSessionEnded && (
                <>
                  Schedule: {moment.unix(topicClassroomData?.trainingStartTime).format('DD')}th{' '}
                  {monthName[moment.unix(topicClassroomData?.trainingStartTime).format('MM')]}
                  {new Date(topicClassroomData.trainingStartTime * 1000).getFullYear()} -
                  {new Date(topicClassroomData.trainingStartTime * 1000).getHours()}:
                  {new Date(topicClassroomData.trainingStartTime * 1000).getMinutes()}
                  {new Date(topicClassroomData.trainingStartTime * 1000).getHours() > 12 ? (
                    <span>AM</span>
                  ) : (
                    <span>PM</span>
                  )}
                </>
              )}
            </h4>
            <p>
              {!isSessionEnded
                ? 'This session will be opened 15 mins before the start time to join'
                : 'Recording will be available soon'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default VCtoolStartPage;
