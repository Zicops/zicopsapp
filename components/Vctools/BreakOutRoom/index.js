import { UserStateAtom } from '@/state/atoms/users.atom';
import {
  CurrentParticipantDataAtom,
  breakoutList,
  participantRole,
  publishBreakoutRoom,
  vctoolAlluserinfo
} from '@/state/atoms/vctool.atoms';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from '../vctoolMain.module.scss';
import BreakoutRoomSetting from './BreakoutRoomSetting';
import CreateBreakoutRoom from './CreateBreakoutRoom';
import ManageRoom from './ManageRoom';
import BreakoutRoomCard from './BreakoutRoomCard';
const BreakoutRoom = ({ hide = false, createRooms, publishRoom }) => {
  const allUserdata = useRecoilValue(vctoolAlluserinfo);
  const userdata = useRecoilValue(UserStateAtom);
  const breakoutRoomlist = useRecoilValue(breakoutList);
  const [title1, settitle] = useState('');
  const currentParticipantData = useRecoilValue(CurrentParticipantDataAtom);
  const [publishRoomAtom, setPublishRoomAtom] = useRecoilState(publishBreakoutRoom);
  useEffect(() => {
    console.log(publishRoomAtom.publishedRoomArr.length )
  });
  function showData(titles) {
    if (titles === '')
      return (
        <>
          {breakoutRoomlist.length < 2 ? (
            <CreateBreakoutRoom
              addRoom={() => {
                settitle('BreakoutRoomSetting');
              }}
            />
          ) : (
            <BreakoutRoomSetting
              cancelRoom={() => {
                if (breakoutRoomlist.length == 1) {
                  settitle('CreateBreakoutRoom');
                } else {
                  settitle('ManageRoom');
                }
              }}
              listTheroom={() => {
                createRooms();
                settitle('ManageRoom');
              }}
            />
          )}
        </>
      );
    const arr = showComponent.find((data) => data?.title === titles);
    return arr.component;
  }

  const showComponent = [
    {
      title: 'CreateBreakoutRoom',
      component: (
        <CreateBreakoutRoom
          addRoom={() => {
            settitle('BreakoutRoomSetting');
          }}
        />
      )
    },
    {
      title: 'BreakoutRoomSetting',
      component: (
        <BreakoutRoomSetting
          cancelRoom={() => {
            if (breakoutRoomlist.length == 1) {
              settitle('CreateBreakoutRoom');
            } else {
              settitle('ManageRoom');
            }
          }}
          listTheroom={() => {
            createRooms();
            settitle('ManageRoom');
          }}
        />
      )
    },
    {
      title: 'ManageRoom',
      component: (
        <ManageRoom
          addAgain={() => {
            settitle('BreakoutRoomSetting');
          }}
          publishRoom={() => publishRoom()}
        />
      )
    }
  ];
  const userData = useRecoilValue(UserStateAtom);
  return (
    <>
      <div className={`${styles.breakoutRoombar}`}>
        <div className={`${styles.breakoutHead}`}>
          <div>Breakout Rooms</div>
          <button
            onClick={() => {
              hide();
            }}>
            <img src="/images/svg/vctool/close.svg" />
          </button>
        </div>
        <div className={`${styles.breakoutRoomscreen}`}>
          {currentParticipantData.isModerator ? (
            <>{showData(title1)}</>
          ) : !!publishRoomAtom.publishedRoomArr.length < 1 ? (
            <CreateBreakoutRoom />
          ) : (
            <ManageRoom />
          )}
        </div>
      </div>
    </>
  );
};
export default BreakoutRoom;
