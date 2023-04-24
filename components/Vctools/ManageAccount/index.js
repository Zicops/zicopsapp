import SwitchButton from '@/components/common/FormComponents/SwitchButton';
import { db } from '@/helper/firebaseUtil/firestore.helper';
import { ActiveClassroomTopicIdAtom } from '@/state/atoms/module.atoms';
import { ClassRoomFlagsInput } from '@/state/atoms/vctool.atoms';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import useLoadClassroomData from '../Logic/useLoadClassroomData';
import styles from '../vctoolMain.module.scss';

const ManageAccount = ({ hide }) => {
  const { addUpdateClassRoomFlags } = useLoadClassroomData();
  const activeClassroomTopicId = useRecoilValue(ActiveClassroomTopicIdAtom);
  const [controls, setControls] = useRecoilState(ClassRoomFlagsInput);

  const classroomFlagsRef = collection(db, 'ClassroomFlags');
  const q = query(classroomFlagsRef, where('id', '==', activeClassroomTopicId));

  const docRef = doc(classroomFlagsRef, activeClassroomTopicId);

  useEffect(async () => {
    const unsub = onSnapshot(docRef, (querySnapshot) => {
      if (querySnapshot.exists()) {
        setControls({ id: querySnapshot.id, ...querySnapshot.data() });
      } 
    });

    return () => unsub();
  }, []);

  async function handleHostChange(e) {
    const obj = {
      ...controls,
      id: activeClassroomTopicId,
      [e.target.name]: e.target.checked,
    };
    await addUpdateClassRoomFlags(obj);
  }

  return (
    <div className={`${styles.manageAccountBar}`}>
      <div className={`${styles.manageAccountHead}`}>
        <div>Host controls</div>
        <button
          onClick={() => {
            hide();
          }}>
          <img src="/images/svg/vctool/close.svg" />
        </button>
      </div>

      <div className={`${styles.manageAccountScreen}`}>
        <div className={`${styles.manageAccountScreenHeading}`}>LET EVERYONE</div>
        <div className={`${styles.hostControlls}`}>
          <div>Turn on their microphone</div>
          <SwitchButton
            inputName="is_microphone_enabled"
            isChecked={controls?.is_microphone_enabled}
            handleChange={(e) => handleHostChange(e)}
          />
        </div>
        <div className={`${styles.hostControlls}`}>
          <div>Turn on their video</div>
          <SwitchButton
            inputName="is_video_sharing_enabled"
            isChecked={controls?.is_video_sharing_enabled}
            handleChange={(e) => handleHostChange(e)}
          />
        </div>
        <div className={`${styles.hostControlls}`}>
          <div>Share their screen</div>
          <SwitchButton
            inputName="is_screen_sharing_enabled"
            isChecked={controls?.is_screen_sharing_enabled}
            handleChange={(e) => handleHostChange(e)}
          />
        </div>
        <div className={`${styles.hostControlls}`}>
          <div>Post questions to Q & A </div>
          <SwitchButton
            inputName="is_qa_enabled"
            isChecked={controls?.is_qa_enabled}
            handleChange={(e) => handleHostChange(e)}
          />
        </div>
        <div className={`${styles.hostControlls}`}>
          <div>Post messages in chat</div>
          <SwitchButton
            inputName="is_chat_enabled"
            isChecked={controls?.is_chat_enabled}
            handleChange={(e) => handleHostChange(e)}
          />
        </div>
      </div>
    </div>
  );
};
export default ManageAccount;
