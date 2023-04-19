import { DiscussionAtom } from '@/state/atoms/discussion.atoms';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { AQChatAtom, vcToolNavbarState } from '@/state/atoms/vctool.atoms';
import { formLabelClasses } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from '../vctoolMain.module.scss';
import EmptyQa from './EmptyQa';
import VcQaMessageBlock from './VcQaMessageBlock';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '@/helper/firebaseUtil/firestore.helper';
import { ActiveClassroomTopicIdAtom } from '@/state/atoms/module.atoms';
import useLoadClassroomData from '../Logic/useLoadClassroomData';

const QAbar = ({ hide = false }) => {
  const [showQAbtn, setshowQAbtn] = useState(false);
  const [message, setMessage] = useState('');
  const [messageArr, setMessageArr] = useState([]);
  const [hideToolBar, setHideToolbar] = useRecoilState(vcToolNavbarState);
  const activeClassroomTopicId = useRecoilValue(ActiveClassroomTopicIdAtom);
  const userDetails = useRecoilValue(UserStateAtom);
  const { sendChatMessage } = useLoadClassroomData();

  const meetMessagesRef = collection(db, 'MeetMessages');
  const q = query(
    meetMessagesRef,
    where('meeting_id', '==', activeClassroomTopicId),
    where('chat_type', '==', 'qna'),
    orderBy('time', 'asc'),
  );

  useEffect(async () => {
    const unsub = onSnapshot(q, (querySnapshot) => {
      const newMessages = [];
      querySnapshot.forEach((doc) => {
        newMessages.push({ id: doc.id, ...doc.data() });
      });
      setMessageArr(newMessages);
    });

    return () => unsub();
  }, []);

  const sendMessageHandler = async () => {
    const obj = {
      meetingId: activeClassroomTopicId,
      userId: userDetails?.id,
      body: message,
      time: Math.floor(Date.now() / 1000),
      chatType: 'qna', // move to constants
    };

    setMessageArr([...messageArr, obj]);
    await sendChatMessage(obj);
    setMessage('');
  };

  const onMessageHandler = (e) => {
    setMessage(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (message !== '') {
        sendMessageHandler();
      }
    }
  };

  return (
    <div
      className={`${styles.qaBar}`}
      onMouseEnter={() => setHideToolbar(false)}
      onMouseLeave={() => setHideToolbar(null)}>
      <div className={`${styles.qaBarHead}`}>
        <div>Q & A</div>
        <button
          onClick={() => {
            hide();
          }}>
          <img src="/images/svg/vctool/close.svg" />
        </button>
      </div>

      <div className={`${styles.qaBarScreen}`}>
        {messageArr.length == 0 ? (
          <EmptyQa />
        ) : (
          messageArr?.map((data) => {
            return (
              <span key={data.id}>
                <VcQaMessageBlock message={data} />
              </span>
            );
          })
        )}
      </div>

      {showQAbtn ? (
        <div className={`${styles.qaBarInput}`}>
          <input
            type="text"
            placeholder="Type message here"
            value={message}
            onChange={onMessageHandler}
            onKeyDown={handleKeyPress}
          />
          <div className={`${styles.qaSendFile}`}>
            <img src="/images/svg/vctool/image.svg" />
            <img src="/images/svg/vctool/send.svg" onClick={sendMessageHandler} />
          </div>
        </div>
      ) : (
        <div className={`${styles.qabarBtnContainer}`}>
          <button
            onClick={() => {
              setshowQAbtn(!showQAbtn);
            }}
            className={`${styles.qaBtn}`}>
            Ask a Question?
          </button>
        </div>
      )}
    </div>
  );
};
export default QAbar;
