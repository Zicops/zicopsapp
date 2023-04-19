import { UserStateAtom } from '@/state/atoms/users.atom';
import { vcChatBarAtom, vcChatObj } from '@/state/atoms/vctool.atoms';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from '../vctoolMain.module.scss';
import ChatMessageBlock from './VcChatMessageBlock';
import useLoadClassroomData from '../Logic/useLoadClassroomData';
const ChatBar = ({ hide = false }) => {
  const { addUpdateMessage,setMessageData } = useLoadClassroomData();
  const [message, setMessage] = useState('');
  const [messageObj, setMessageObj] = useRecoilState(vcChatObj);
  const [messageArr, setMessageArr] = useRecoilState(vcChatBarAtom);
  const [sendMessage, setSendMessage] = useState(false);
  const userDetails = useRecoilValue(UserStateAtom);
  // id: String
  // console.log(messageArr)
  const sendMessageHandler = async () => {
    setSendMessage(true);
    // const _messageObj = structuredClone(messageObj);
    // _messageObj.body =message,
    // _messageObj.meeting_id='',
    // _messageObj.user_id=userDetails?.id,
    // _messageObj.time= Math.floor(Date.now() / 1000)
  
    // setMessageObj(_messageObj);
    
    const obj = {
        body: message,
        meeting_id: '',
        user_id: userDetails?.id,
        time: Math.floor(Date.now() / 1000)
      };
      setMessageData(obj)
    setMessageArr([...messageArr, obj]);
    // console.log(messageObj,_messageObj)
    await addUpdateMessage();
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

  function getReplies(data) {
    const replies = {};
    for (let i = 0; i < data?.length; i++) {
      const message = data[i];
      if (message?.reply_id) {
        const parent = data?.find((m) => m.id === message?.reply_id);
        if (parent) {
          if (!replies[parent?.id]) {
            replies[parent?.id] = {
              parent: parent,
              replies: []
            };
          }
          replies[parent?.id]?.replies?.push(message);
        }
      } else {
        if (!replies[message?.id]) {
          replies[message?.id] = {
            parent: message,
            replies: []
          };
        }
      }
    }
    return Object.values(replies).map((r) => ({
      parent: r?.parent,
      replies: r?.replies?.sort((a, b) => a.time - b.time)
    }));
  }

  const replies = getReplies(messageArr);
  //   useEffect(() => {
  //     console.log(messageArr);
  //   }, [messageArr]);
  return (
    <div className={`${styles.chatbar}`}>
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
        {messageArr?.map((data) => {
          return (
            <>
              <ChatMessageBlock message={data} />
            </>
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
