import { useEffect, useState } from 'react';
import VcMaintool from '..';
import TimeFrame from './TimeFrame';
import styles from './vctoolStartPage.module.scss';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { useRecoilValue } from 'recoil';
import { TopicClassroomAtomFamily } from '@/state/atoms/courses.atom';
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
  const [dateInfo, setDateInfo] = useState({
    day: new Date(topicClassroomData.trainingStartTime * 1000).getDay(),
    month: new Date(topicClassroomData.trainingStartTime * 1000).getMonth(),
    year: new Date(topicClassroomData.trainingStartTime * 1000).getFullYear(),
    hours: new Date(topicClassroomData.trainingStartTime * 1000).getHours(),
    minute: new Date(topicClassroomData.trainingStartTime * 1000).getMinutes(),
    second: 0
  });
  const [isVctoolActive, setIsVctoolActive] = useState();

  useEffect(() => {
    setIsVctoolActive(new Date(topicClassroomData.trainingStartTime * 1000).getMinutes() <= 15);
  }, [dateInfo]);

  if (isVctoolActive) return <VcMaintool vcData={topicClassroomData} />;

  return (
    <>
      <div className={`${styles.vctoolStartPageContainer}`}>
        <div className={`${styles.timeFrame}`}>
          {/* <TimeFrame givenTime={new Date("4/10/2023 00:00:00").getTime()} */}

          <TimeFrame
            setIsVctoolActive={setIsVctoolActive}
            givenTime={new Date(`${new Date(
              topicClassroomData.trainingStartTime * 1000
            ).getMonth()}/
            ${new Date(topicClassroomData.trainingStartTime * 1000).getDay()}/
            ${new Date(topicClassroomData.trainingStartTime * 1000).getFullYear()} ${new Date(
              topicClassroomData.trainingStartTime * 1000
            ).getHours()}:
        ${new Date(topicClassroomData.trainingStartTime * 1000).getMinutes()}:${
              dateInfo.second
            }`).getTime()}
          />
        </div>
        <div className={`${styles.subDiv}`}>
          <img src="/images/svg/vctool/lamp.svg" />
          <div>
            <h3>This session has not started yet</h3>
            <h4>
              Schedule: {new Date(topicClassroomData.trainingStartTime * 1000).getDate()}th{' '}
              {monthName[new Date(topicClassroomData.trainingStartTime * 1000).getMonth()]}
              {new Date(topicClassroomData.trainingStartTime * 1000).getFullYear()} -
              {new Date(topicClassroomData.trainingStartTime * 1000).getHours()}:
              {new Date(topicClassroomData.trainingStartTime * 1000).getMinutes()}
              {new Date(topicClassroomData.trainingStartTime * 1000).getHours() > 12 ? (
                <span>PM</span>
              ) : (
                <span>AM</span>
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
