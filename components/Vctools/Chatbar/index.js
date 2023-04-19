import { UserStateAtom } from '@/state/atoms/users.atom';
import { vcChatBarAtom, vcChatObj, vcToolNavbarState } from '@/state/atoms/vctool.atoms';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from '../vctoolMain.module.scss';
import ChatMessageBlock from './VcChatMessageBlock';
import useLoadClassroomData from '../Logic/useLoadClassroomData';
import { ActiveClassroomTopicIdAtom } from '@/state/atoms/module.atoms';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '@/helper/firebaseUtil/firestore.helper';

const ChatBar = ({ hide = false }) => {
  const { sendChatMessage } = useLoadClassroomData();
  const [message, setMessage] = useState('');
  const [hideToolBar, setHideToolbar] = useRecoilState(vcToolNavbarState);
  const activeClassroomTopicId = useRecoilValue(ActiveClassroomTopicIdAtom);
  const userDetails = useRecoilValue(UserStateAtom);
  const [classroomChats, setClassroomChats] = useState([]);

  const meetMessagesRef = collection(db, 'MeetMessages');
  const q = query(
    meetMessagesRef,
    where('meeting_id', '==', activeClassroomTopicId),
    where('chat_type', '==', 'classroom'),
    orderBy('time', 'asc'),
  );

  useEffect(async () => {
    const unsub = onSnapshot(q, (querySnapshot) => {
      const newMessages = [];
      querySnapshot.forEach((doc) => {
        newMessages.push({ id: doc.id, ...doc.data() });
      });
      setClassroomChats(newMessages);
    });

    return () => unsub();
  }, []);

  const sendMessageHandler = async () => {
    const obj = {
      meetingId: activeClassroomTopicId,
      userId: userDetails?.id,
      body: message,
      time: Math.floor(Date.now() / 1000),
      chatType: 'classroom' // move to constants
    };

    setClassroomChats([...classroomChats, obj]);
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

  // function getReplies(data) {
  //   const replies = {};
  //   for (let i = 0; i < data?.length; i++) {
  //     const message = data[i];
  //     if (message?.reply_id) {
  //       const parent = data?.find((m) => m.id === message?.reply_id);
  //       if (parent) {
  //         if (!replies[parent?.id]) {
  //           replies[parent?.id] = {
  //             parent: parent,
  //             replies: [],
  //           };
  //         }
  //         replies[parent?.id]?.replies?.push(message);
  //       }
  //     } else {
  //       if (!replies[message?.id]) {
  //         replies[message?.id] = {
  //           parent: message,
  //           replies: [],
  //         };
  //       }
  //     }
  //   }
  //   return Object.values(replies).map((r) => ({
  //     parent: r?.parent,
  //     replies: r?.replies?.sort((a, b) => a.time - b.time),
  //   }));
  // }

  // const replies = getReplies(messageArr);

  // useEffect(() => {
  //   console.info(classroomChats);
  // }, [classroomChats]);

  return (
    <div
      className={`${styles.chatbar}`}
      onMouseEnter={() => setHideToolbar(false)}
      onMouseLeave={() => setHideToolbar(null)}>
      <div className={`${styles.chatbarHead}`}>
        <div>Chat</div>
        <button
          onClick={() => {
            hide();
          }}>
          <img src="/images/svg/vctool/close.svg" />
        </button>
      </div>

      <div className={`${styles.chatbarScreen}`}>
        {classroomChats?.map((chat) => {
          return (
            <span key={chat.id}>
              <ChatMessageBlock message={chat} />
            </span>
          );
        })}
      </div>

      <div className={`${styles.chatbarInput}`}>
        <input
          type="text"
          placeholder="Type message here"
          value={message}
          onChange={onMessageHandler}
          onKeyDown={handleKeyPress}
        />
        <div className={`${styles.chatSendFile}`}>
          <img src="/images/svg/vctool/image.svg" />
          <img src="/images/svg/vctool/send.svg" onClick={sendMessageHandler} />
        </div>
      </div>
    </div>
  );
};
export default ChatBar;
