import { TopicClassroomAtomFamily } from '@/state/atoms/courses.atom';
import { ActiveClassroomTopicIdAtom } from '@/state/atoms/module.atoms';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { vctoolAlluserinfo } from '@/state/atoms/vctool.atoms';
import { useRecoilValue } from 'recoil';
import StudentFrame from '../StudentFrame';
import styles from '../vctoolMain.module.scss';

const Participants = ({ hide = false, Info, Iframe }) => {
  const userData = useRecoilValue(UserStateAtom);
  const userList = useRecoilValue(vctoolAlluserinfo);
  const activeClassroomTopicId = useRecoilValue(ActiveClassroomTopicIdAtom);
  const classroomData = useRecoilValue(TopicClassroomAtomFamily(activeClassroomTopicId));

  const modIdList = [...classroomData?.moderators, ...classroomData?.trainers];

  const modList = [];
  const learnerList = [];
  userList?.forEach((user) => {
    // user id is present in the user profule picture storage path
    const pattern = /profiles\/([A-za-z0-9]+)\//;
    const userId = user?.avatarURL?.match(pattern)?.[1];

    if (modIdList?.includes(userId)) return modList.push(user);

    learnerList.push(user);
  });

  return (
    <div className={`${styles.participantsBar}`}>
      <div className={`${styles.participantsHead}`}>
        <div>Participants</div>
        <button
          onClick={() => {
            hide();
          }}>
          <img src="/images/svg/vctool/close.svg" />
        </button>
      </div>

      <div className={`${styles.participantsScreen}`}>
        {/* <div className={`${styles.participantsScreenhead}`}>Instructors</div> */}
        {/* <div className={`${styles.allInstructors}`}></div> */}

        <div className={`${styles.participantsScreenhead}`}>Moderators</div>
        <div className={`${styles.allInstructors}`}>
          {modList.map((data) => (
            <StudentFrame
              name={data?.displayName || data?.formattedDisplayName}
              avatarUrl={data?.avatarURL}
            />
          ))}

          {!modList?.length && <small>No Moderators Joined</small>}
        </div>

        <div className={`${styles.participantsScreenhead}`}>Learners</div>
        <div className={`${styles.allInstructors}`}>
          {learnerList.map((data) => (
            <StudentFrame
              name={data?.displayName || data?.formattedDisplayName}
              avatarUrl={data?.avatarURL}
            />
          ))}

          {!learnerList?.length && <small>No Learners Joined</small>}
        </div>
      </div>
    </div>
  );
};
export default Participants;
