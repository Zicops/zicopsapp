import { useState } from 'react';
import style from './discussion.module.scss';
const ChatReplyLeft = ({ replyMessage }) => {
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
        <div className={`${style.chat_reply_left}`}>
        <div className={`${style.left_reply_container}`}>
          <div className={`${style.left_chat_Details}`}>
            <div className={`${style.left_image}`}>
              <img src="https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png" alt="" />
            </div>
            <div className={`${style.left_user_name_time}`}>
              <p className={`${style.left_user_name}`}>Zicops Manager</p>
              <p className={`${style.left_chat_time}`}>11:30 AM</p>
            </div>
          </div>
          <p>{replyMessage}</p>
          {!hideReply && (
            <p className={`${style.reply}`} onClick={onReplyHandler}>
              Reply
            </p>
          )}
          <div className={`${style.reply_container}`}>
            {showInput && <input className={`${style.reply_input}`} placeholder="Reply" />}
            {showInput && (
              <div className={`${style.send_reply}`} onClick={onSendReplyHandler}>
                <img src="/images/svg/send-icon2.svg" alt="" />
              </div>
            )}
          </div>
        </div>
      </div>
  )
}

export default ChatReplyLeft;