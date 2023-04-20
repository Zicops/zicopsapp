import { TopicClassroomAtomFamily } from '@/state/atoms/courses.atom';
import { ActiveClassroomTopicIdAtom, VcApi } from '@/state/atoms/module.atoms';
import { UserStateAtom } from '@/state/atoms/users.atom';
import {
  participantJoinData,
  vcToolNavbarState,
  vctoolAlluserinfo,
} from '@/state/atoms/vctool.atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import StudentFrame from '../StudentFrame';
import styles from '../vctoolMain.module.scss';
import { useEffect } from 'react';

const Participants = ({ hide = false, Info, Iframe, api = {} }) => {
  // participantJoinData
  const userData = useRecoilValue(UserStateAtom);
  const vcToolUserList = useRecoilValue(participantJoinData);
  const userList = useRecoilValue(vctoolAlluserinfo);
  const [hideToolBar, setHideToolbar] = useRecoilState(vcToolNavbarState);
  const activeClassroomTopicId = useRecoilValue(ActiveClassroomTopicIdAtom);
  const classroomData = useRecoilValue(TopicClassroomAtomFamily(activeClassroomTopicId));
  const modIdList = [...classroomData?.moderators, ...classroomData?.trainers];
  const modList = [];
  const learnerList = [];

  userList?.forEach((user) => {
    // user id is present in the user profule picture storage path
    const pattern = /profiles\/([A-za-z0-9=]+)\//;
    const userId = decodeURIComponent(user?.avatarURL)?.match(pattern)?.[1];

    if (modIdList?.includes(userId))
      return modList.push({ ...user, isHandRise: true, isAudioEnable: true, isVideoEnable: true });

    let data = { ...user, isHandRise: true, isAudioEnable: false, isVideoEnable: false };
    learnerList.push(data);
  });

  useEffect(() => {
    console.info(modIdList, userData.id, userList);
  }, [classroomData]);

  return (
    <div
      className={`${styles.participantsBar}`}
      onMouseEnter={() => setHideToolbar(false)}
      onMouseLeave={() => setHideToolbar(null)}>
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
              frameIcons={{
                isRiseHand: data?.isHandRise,
                isAudio: data?.isAudioEnable,
                isvideo: data?.isVideoEnable,
              }}
              api={api}
            />
          ))}

          {!modList?.length && <small>No Moderators Joined</small>}
        </div>

        <div className={`${styles.participantsScreenhead}`}>Learners</div>
        <div className={`${styles.allInstructors}`}>
          {learnerList.map((data, index) => (
            <StudentFrame
              name={data?.displayName || data?.formattedDisplayName}
              avatarUrl={data?.avatarURL}
              frameIcons={{
                isRiseHand: data?.isHandRise,
                isAudio: data?.isAudioEnable,
                isvideo: data?.isVideoEnable,
              }}
              api={api}
            />
          ))}

          {!learnerList?.length && <small>No Learners Joined</small>}
        </div>
      </div>
    </div>
  );
};
export default Participants;
