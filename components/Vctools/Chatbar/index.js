import { db } from '@/helper/firebaseUtil/firestore.helper';
import { ActiveClassroomTopicIdAtom } from '@/state/atoms/module.atoms';
import { UserStateAtom } from '@/state/atoms/users.atom';
import {
  ClassRoomFlagsInput,
  vcToolNavbarState
} from '@/state/atoms/vctool.atoms';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import useLoadClassroomData from '../Logic/useLoadClassroomData';
import styles from '../vctoolMain.module.scss';
import ChatMessageBlock from './VcChatMessageBlock';

const ChatBar = ({ hide = false }) => {
  const { sendChatMessage } = useLoadClassroomData();
  const [message, setMessage] = useState('');
  const [parentId, setParentId] = useState(null);
  const [hideToolBar, setHideToolbar] = useRecoilState(vcToolNavbarState);
  const activeClassroomTopicId = useRecoilValue(ActiveClassroomTopicIdAtom);
  const userDetails = useRecoilValue(UserStateAtom);
  const controls = useRecoilValue(ClassRoomFlagsInput);
  const [classroomChats, setClassroomChats] = useState([]);
  const [sortedMessageArr, setSortedMessageArr] = useState([]);

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

  useEffect(() => {
    let parents = [];
    classroomChats.forEach((message) => {
      if (message.parent_id === null) {
        parents.push(message);
      } else {
        const parentIndex = parents.findIndex((parent) => parent.id === message.parent_id);
        parents.splice(parentIndex + 1, 0, message);
      }
    });
    setSortedMessageArr(parents);
  }, [classroomChats]);

  const sendMessageHandler = async () => {
    if (!message || !activeClassroomTopicId) return;
    const obj = {
      meetingId: activeClassroomTopicId,
      userId: userDetails?.id,
      parentId: parentId,
      body: message,
      time: Math.floor(Date.now() / 1000),
      chatType: 'classroom', // move to constants
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
      if (message !== '' && controls?.is_chat_enabled) {
        sendMessageHandler();
      }
    }
  };

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
        {sortedMessageArr?.map((chat) => {
          return (
            <span key={chat.id}>
              <ChatMessageBlock message={chat} setParentId={setParentId} />
            </span>
          );
        })}
      </div>

      <div className={`${styles.chatbarInput}`}>
        {!!parentId && (
          <div className={`${styles.replyBlock}`}>
            Replying to : {}
            {
              sortedMessageArr.filter((m) => {
                return m.id === parentId;
              })?.[0]?.body
            }
            <div onClick={() => setParentId(null)}>x</div>
          </div>
        )}
        <input
          type="text"
          placeholder={controls?.is_chat_enabled ? 'Type message here' : 'Chat is disabled'}
          value={message}
          onChange={onMessageHandler}
          onKeyDown={handleKeyPress}
          disabled={!controls?.is_chat_enabled}
        />
        <div className={`${styles.chatSendFile}`}>
          {/* <img src="/images/svg/vctool/image.svg" /> */}
          <span></span>
          <img
            src="/images/svg/vctool/send.svg"
            onClick={controls?.is_chat_enabled ? sendMessageHandler : () => {}}
          />
        </div>
      </div>
    </div>
  );
};
export default ChatBar;
