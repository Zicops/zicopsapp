import { useEffect, useState } from 'react';
import ChatReplyLeft from './ChatReplyLeft';
import style from './discussion.module.scss';
const ChatBoxLeft = ({ message, dataArr }) => {
  const [showInput, setShowInput] = useState(false);
  const [hideReply, setHideReply] = useState(false);
  const [replys, setReplys] = useState(message.reply);
  const [reply, setReply] = useState('');
  const [showReplyMassage, setShowReplyMassage] = useState(true);
  const reply_user_Details = dataArr.filter((d) => d.id === message.reply_id);

  const onReplyHandler = () => {
    setShowInput(true);
    setHideReply(true);
  };
  const onSendReplyHandler = () => {
    setShowInput(false);
    setHideReply(false);
    setShowReplyMassage(true);
    setReplys([...replys, reply]);
    setReply('');
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSendReplyHandler();
    }
  };
  return (
    <>
      <div className={`${style.chat_left}`}>
        <div className={`${style.left_text_container}`}>
          <div className={`${style.left_chat_Details}`}>
            <div className={`${style.left_image}`}>
              <img src={message.user.photo_url} alt="" />
            </div>
            <div className={`${style.left_user_name_time}`}>
              <p className={`${style.left_user_name}`}>{message.user.first_name}</p>
              <p className={`${style.left_chat_time}`}>{message.time}</p>
            </div>
          </div>
          <p>{message.content}</p>
          {!hideReply && (
            <p className={`${style.reply}`} onClick={onReplyHandler}>
              Reply
            </p>
          )}
          <div className={`${style.reply_container}`}>
            {showInput && (
              <input
                className={`${style.reply_input}`}
                placeholder="Reply"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            )}
            {showInput && (
              <div className={`${style.send_reply}`} onClick={onSendReplyHandler}>
                <img src="/images/svg/send-icon2.svg" alt="" />
              </div>
            )}
          </div>
        </div>
      </div>
      {showReplyMassage && replys.length ? (
        <ChatReplyLeft replyData={reply_user_Details[0]} replyMessage={replys[0]} />
      ) : (
        ''
      )}
    </>
  );
};

export default ChatBoxLeft;
