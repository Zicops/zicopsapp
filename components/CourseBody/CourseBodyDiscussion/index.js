import { useState } from 'react';
import style from './discussion.module.scss';
import ChatBoxLeft from './ChatBoxLeft';
import ChatBoxRight from './ChatBoxRight';
import Data from './Data.json';
const CourseBodyDiscussion = () => {
  const [message, setMessage] = useState('');
  const [messageArr, setMessageArr] = useState([]);
  const [sendMessage, setSendMessage] = useState(false);
  console.log(Data);

  const sendMessageHandler = () => {
    setSendMessage(true);
    setMessageArr([
      ...messageArr,
      {
        id: Math.random() * 1000,
        content: message
      }
    ]);
    setMessage('');
  };
  const onMessageHandler = (e) => {
    setMessage(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessageHandler();
    }
  };
  return (
    <div className={`${style.discussion_container}`}>
      <div className={`${style.chat_text_container}`}>
        {Data.messages.map((msg) => (
          <ChatBoxLeft message={msg} dataArr={Data.messages} />
        ))}
        {sendMessage && messageArr.map((msg) => <ChatBoxRight message={msg.content} />)}
      </div>
      <div>
        <div className={`${style.discussion_form}`}>
          <div className={`${style.discussion}`}>
            {/* <RTE placeholder="Message" value={message} changeHandler={onMessageHandler} /> */}
            <input
              className={`${style.send_input}`}
              placeholder="Message"
              value={message}
              onChange={onMessageHandler}
              onKeyDown={handleKeyPress}
            />
          </div>
          <div className={`${style.send_image}`} onClick={sendMessageHandler}>
            <img src="/images/svg/send-icon2.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseBodyDiscussion;
