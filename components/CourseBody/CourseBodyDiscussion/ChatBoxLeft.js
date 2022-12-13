import { useState } from 'react';
import ChatReplyLeft from './ChatReplyLeft';
import style from './discussion.module.scss';
const ChatBoxLeft = ({ message }) => {
  const [showInput, setShowInput] = useState(false);
  const [hideReply, setHideReply] = useState(false);
  const [reply, setReply] = useState("");
  const [showReplyMassage , setShowReplyMassage] = useState(false)
  const onReplyHandler = () => {
    setShowInput(true);
    setHideReply(true);
  };
  const onSendReplyHandler = () => {
    setShowInput(false);
    setHideReply(false);
    setShowReplyMassage(true)
  };
  return (
    <>
      <div className={`${style.chat_left}`}>
        <div className={`${style.left_text_container}`}>
          <div className={`${style.left_chat_Details}`}>
            <div className={`${style.left_image}`}>
              <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="" />
            </div>
            <div className={`${style.left_user_name_time}`}>
              <p className={`${style.left_user_name}`}>Zicops HR</p>
              <p className={`${style.left_chat_time}`}>11:20 AM</p>
            </div>
          </div>
          <p>{message}</p>
          {!hideReply && (
            <p className={`${style.reply}`} onClick={onReplyHandler}>
              Reply
            </p>
          )}
          <div className={`${style.reply_container}`}>
            {showInput && <input className={`${style.reply_input}`} placeholder="Reply" value={reply} onChange={(e)=>setReply(e.target.value)}/>}
            {showInput && (
              <div className={`${style.send_reply}`} onClick={onSendReplyHandler}>
                <img src="/images/svg/send-icon2.svg" alt="" />
              </div>
            )}
          </div>
        </div>
      </div>
    { showReplyMassage && <ChatReplyLeft replyMessage={reply} /> }
  </>
  );
};

export default ChatBoxLeft;
