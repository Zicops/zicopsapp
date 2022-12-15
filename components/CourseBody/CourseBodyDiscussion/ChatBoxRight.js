import style from './discussion.module.scss';
import moment from 'moment';
import { useState } from 'react';
import ChatReplyRight from './ChatReplyRight';
const ChatBoxRight = ({ message }) => {
  const [showInput, setShowInput] = useState(false);
  const [hideReply, setHideReply] = useState(false);
   const [replys, setReplys] = useState([])
  const [reply, setReply] = useState("");
  const [showReplyMassage, setShowReplyMassage] = useState(false)
  const onReplyHandler = () => {
    setShowInput(true);
    setHideReply(true);
  };
  const onSendReplyHandler = () => {
    setShowInput(false);
    setHideReply(false);
    setShowReplyMassage(true);
    setReplys([...replys, reply])
    setReply("")
  };
  const handleKeyPress = (e)=> {
    if (e.key === "Enter") {
      onSendReplyHandler()
    }
  }
  const currTime = new Date()
  console.log(currTime);
  return (
    <>
    <div className={`${style.chat_right}`}>
      <div className={`${style.right_text_container}`}>
        <div className={`${style.right_chat_Details}`}>
          <div className={`${style.right_user_name_time}`}>
            <p className={`${style.right_user_name}`}>Anupam</p>
              <p className={`${style.right_chat_time}`}>{moment(String(currTime)).startOf('hour').fromNow()}</p>
          </div>
          <div className={`${style.right_image}`}>
            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="" />
          </div>
        </div>
        <p className={`${style.right_message}`}>{message}</p>
        {!hideReply && (
          <p className={`${style.reply_right}`} onClick={onReplyHandler}>
            Reply
          </p>
        )}
        <div className={`${style.reply_container}`}>
            {showInput && <input className={`${style.reply_input}`} placeholder="Reply" value={reply} onChange={(e) => setReply(e.target.value)} onKeyDown={handleKeyPress} />}
          {showInput && (
            <div className={`${style.send_reply}`} onClick={onSendReplyHandler}>
              <img src="/images/svg/send-icon2.svg" alt="" />
            </div>
          )}
        </div>
      </div>
    </div>
    {showReplyMassage && replys.map((data) => (
        <ChatReplyRight replyMessage={data} /> 
      
    ))}
    </>
  );
};

export default ChatBoxRight;
