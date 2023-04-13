import { getUserDetails } from '@/helper/userData.helper';
import { TopicClassroomAtomFamily } from '@/state/atoms/courses.atom';
import { ActiveClassroomTopicIdAtom, TopicAtom } from '@/state/atoms/module.atoms';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styles from '../vctoolMain.module.scss';

const About = ({ showHide = false }) => {
  const activeClassroomTopicId = useRecoilValue(ActiveClassroomTopicIdAtom);
  const classroomData = useRecoilValue(TopicClassroomAtomFamily(activeClassroomTopicId));
  const topicData = useRecoilValue(TopicAtom);
  const currentTopicData = topicData?.find((topic) => topic?.id === activeClassroomTopicId);
  const [hostUsersData, setHostUsersData] = useState({ mod: null, trainer: null });

  useEffect(() => {
    if (!classroomData?.moderators?.length && !classroomData?.trainers?.length) return;
    if (hostUsersData?.mod && hostUsersData?.trainer) return;

    getUserDetails([...(classroomData?.moderators || []), ...(classroomData?.trainers || [])]).then(
      (userDetailsArr) => {
        const modUsers = [];
        const trainers = [];
        userDetailsArr.forEach((user) => {
          const userName = `${user?.first_name} ${user?.last_name}`;

          if (classroomData?.moderators?.includes(user?.id)) modUsers.push(userName);
          if (classroomData?.trainers?.includes(user?.id)) trainers.push(userName);
        });

        setHostUsersData({ mod: modUsers, trainer: trainers });
      }
    );
  }, [classroomData?.moderators?.length, classroomData?.trainers?.length]);

  return (
    <div className={`${styles.aboutBar}`}>
      <div className={`${styles.aboutHead}`}>
        <div>About</div>
        <button
          onClick={() => {
            showHide();
          }}>
          <img src="/images/svg/vctool/close.svg" />
        </button>
      </div>

      <div className={`${styles.aboutHeadScreen}`}>
        <div className={`${styles.aboutScreenHeading}`}>{currentTopicData?.description}</div>
        <div className={`${styles.aboutScreenSessionHead}`}>{currentTopicData?.name}</div>
        <div className={`${styles.aboutInstructor}`}>
          <div className={`${styles.aboutInstructorlogo}`}></div>
          <div className={`${styles.intructorInfo}`}>
            <div
              style={{
                color: '#ACACAC'
              }}>
              Instructor:
            </div>
            <div
              style={{
                color: 'white'
              }}>
              {!hostUsersData?.trainer?.length
                ? 'No Instructor Added'
                : hostUsersData?.trainer?.join(', ')}
            </div>
          </div>
        </div>
        {/* info */}
        {/* /images/svg/vctool/insert-chart.svg */}
        <div className={`${styles.aboutScreen}`}>
          <div className={`${styles.aboutMeetingInfo}`}>
            <div className={`${styles.aboutMeetingLogo}`}>
              <img src="/images/svg/vctool/translate.svg" />
            </div>
            <div className={`${styles.intructorInfo}`}>
              <div
                style={{
                  color: '#ACACAC'
                }}>
                Language:
              </div>
              <div
                style={{
                  color: 'white'
                }}>
                {classroomData?.language}
              </div>
            </div>
          </div>

          <div className={`${styles.aboutMeetingInfo}`}>
            <div className={`${styles.aboutMeetingLogo}`}>
              <img src="/images/svg/vctool/supervisor-account.svg" />
            </div>
            <div className={`${styles.intructorInfo}`}>
              <div
                style={{
                  color: '#ACACAC'
                }}>
                Moderator:
              </div>
              <div
                style={{
                  color: 'white'
                }}>
                {!hostUsersData?.mod?.length
                  ? 'No Moderator Added'
                  : hostUsersData?.mod?.join(', ')}
              </div>
            </div>
          </div>

          <div className={`${styles.aboutMeetingInfo}`}>
            <div className={`${styles.aboutMeetingLogo}`}>
              <img src="/images/svg/vctool/calendar-month.svg" />
            </div>
            <div className={`${styles.intructorInfo}`}>
              <div
                style={{
                  color: '#ACACAC'
                }}>
                Date:
              </div>
              <div
                style={{
                  color: 'white'
                }}>
                {moment(classroomData?.trainingStartTime * 1000).format('LL')}
              </div>
            </div>
          </div>

          <div className={`${styles.aboutMeetingInfo}`}>
            <div className={`${styles.aboutMeetingLogo}`}>
              <img src="/images/svg/vctool/schedule.svg" />
            </div>
            <div className={`${styles.intructorInfo}`}>
              <div
                style={{
                  color: '#ACACAC'
                }}>
                Start time:
              </div>
              <div
                style={{
                  color: 'white'
                }}>
                {moment(classroomData?.trainingStartTime * 1000).format('HH:MM')} IST
              </div>
            </div>
          </div>
          <div className={`${styles.aboutMeetingInfo}`}>
            <div className={`${styles.aboutMeetingLogo}`}>
              <img src="/images/svg/vctool/timelapse.svg" />
            </div>
            <div className={`${styles.intructorInfo}`}>
              <div
                style={{
                  color: '#ACACAC'
                }}>
                Duration:
              </div>
              <div
                style={{
                  color: 'white'
                }}>
                {classroomData?.duration / 60} mins
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
