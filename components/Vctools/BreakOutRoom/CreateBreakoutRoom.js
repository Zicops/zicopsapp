import { useRecoilValue } from 'recoil';
import styles from '../vctoolMain.module.scss';
import { CurrentParticipantDataAtom } from '@/state/atoms/vctool.atoms';
const CreateBreakoutRoom = ({ addRoom }) => {
  const currentParticipantData = useRecoilValue(CurrentParticipantDataAtom);
  return (
    <div className={`${styles.moderatorBreakoutroom}`}>
      <div className={`${styles.moderatorAddroom}`}>
        <div className={styles.breakouRoomIcon}>
          <img src="/images/svg/vctool/videocam-on.svg" />
        </div>
        <div className={`${styles.breakoutRoomAvailableHead}`}>No rooms available !</div>
        <p>Click below to add breakout room</p>
      </div>
      {!!currentParticipantData.isModerator && (
        <button
          className={`${styles.addBreakoutroombtn}`}
          onClick={() => {
            addRoom();
          }}>
          Add Room
        </button>
      )}
    </div>
  );
};
export default CreateBreakoutRoom;
