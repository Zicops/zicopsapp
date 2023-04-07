import { TopicClassroomAtomFamily } from '@/state/atoms/courses.atom';
import { ActiveClassroomTopicIdAtom } from '@/state/atoms/module.atoms';
import moment from 'moment';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import VcMaintool from '..';
import { getSessionStatus } from '../help/vctool.helper';
import TimeFrame from './TimeFrame';
import styles from './vctoolStartPage.module.scss';
import ClassroomMeetingPage from './ClassroomMeetingPage';

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
  const [activeClassroomTopicId, setActiveClassroomTopicId] = useRecoilState(
    ActiveClassroomTopicIdAtom
  );
  const topicClassroomData = useRecoilValue(TopicClassroomAtomFamily(topicId));

  const trainingStartTimeUnix = topicClassroomData?.trainingStartTime;
  const startTime = new Date(trainingStartTimeUnix * 1000);

  const [isVctoolActive, setIsVctoolActive] = useState(false);

  const endTime = new Date(topicClassroomData?.trainingEndTime * 1000);

  const status = getSessionStatus(
    +topicClassroomData?.trainingStartTime,
    +topicClassroomData?.trainingEndTime
  );

  const isSessionEnded = status === 2;
  const isSessionActive =
    (moment(startTime).diff(new Date(), 'minute') < 15 || isVctoolActive) && !isSessionEnded;

  return (
    <>
      <div
        className={`${styles.vctoolStartPageContainer}`}
        ref={(elem) =>
          elem?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
        }>
        <span onClick={() => setActiveClassroomTopicId(null)} className={`${styles.backBtn}`}>
          <img src="/images/bigarrowleft.png" alt="" />
        </span>

        {/* <VcMaintool vcData={topicClassroomData} /> */}
        {isSessionActive ? (
          <ClassroomMeetingPage />
        ) : (
          <>
            {!isSessionEnded && (
              <div className={`${styles.timeFrame}`}>
                {/* <TimeFrame givenTime={new Date('2023-04-4 2:6:00')} vcData={vcData} /> */}
                <TimeFrame
                  givenTime={startTime}
                  vcData={topicClassroomData}
                  setIsVctoolActive={setIsVctoolActive}
                />
              </div>
            )}

            <div className={`${styles.centerImg}`}>
              <img src="/images/svg/vctool/lamp.svg" />
            </div>

            <div>
              <h3>This session has {!isSessionEnded ? 'not started yet' : 'ended'}</h3>
              <h4>
                {!isSessionEnded && (
                  <>Schedule: {moment.unix(topicClassroomData?.trainingStartTime).format('LLL')}</>
                )}
              </h4>

              <p>
                {!isSessionEnded
                  ? 'This session will be opened 15 mins before the start time to join'
                  : 'Recording will be available soon'}
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default VCtoolStartPage;
