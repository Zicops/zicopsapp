import { useState } from 'react';
import style from './discussion.module.scss';
const ChatReplyRight = ({ replyMessage }) => {
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
         <div className={`${style.chat_right}`}>
      <div className={`${style.right_reply_container}`}>
        <div className={`${style.right_chat_Details}`}>
          <div className={`${style.right_user_name_time}`}>
            <p className={`${style.right_user_name}`}>Zicops Admin</p>
            <p className={`${style.right_chat_time}`}>11:35 AM</p>
          </div>
          <div className={`${style.right_image}`}>
            <img src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366__340.png" alt="" />
          </div>
        </div>
        <p className={`${style.right_message}`}>{replyMessage}</p>
        {!hideReply && (
          <p className={`${style.reply_right}`} onClick={onReplyHandler}>
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
  )
}

export default ChatReplyRight;