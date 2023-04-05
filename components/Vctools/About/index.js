import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { TopicClassroomAtomFamily } from '@/state/atoms/courses.atom';
import { ActiveClassroomTopicIdAtom, TopicAtom } from '@/state/atoms/module.atoms';
import styles from '../vctoolMain.module.scss';
import { vctoolAlluserinfo } from '@/state/atoms/vctool.atoms';
import moment from 'moment';

const About = ({ showHide = false }) => {
  const activeClassroomTopicId = useRecoilValue(ActiveClassroomTopicIdAtom);
  const classroomData = useRecoilValue(TopicClassroomAtomFamily(activeClassroomTopicId));
  const topicData = useRecoilValue(TopicAtom);
  const userList = useRecoilValue(vctoolAlluserinfo);
  const currentTopicData = topicData?.find((topic) => topic?.id === activeClassroomTopicId);
  const modIdList = [...classroomData?.moderators, ...classroomData?.trainers];

  const modList = [];
  userList?.forEach((user) => {
    // user id is present in the user profule picture storage path
    const pattern = /profiles\/([A-za-z0-9]+)\//;
    const userId = user?.avatarURL?.match(pattern)?.[1];

    if (modIdList?.includes(userId)) return modList.push(user);
  });

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
              Fekete Csanád
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
                {classroomData?.language?.join(', ')}
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
                {modList?.[0]?.displayName || modList?.[0]?.formattedDisplayName}
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
