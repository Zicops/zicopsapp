import { useState } from 'react'
import moment from 'moment';
import { discussionData } from './discussion.helper';
import style from './discussion.module.scss';
import { useRecoilValue } from 'recoil';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { ContactlessOutlined } from '@mui/icons-material';
const MessageBlock = ({ isReply, isLeft, message }) => {
  const [showInput, setShowInput] = useState(false);
  const [hideReply, setHideReply] = useState(false);
  const [showReplyMassage, setShowReplyMassage] = useState(false);
  const[replyArr , setReplyArr] = useState(discussionData?.messages)
  const [reply, setReply] = useState('');
  const userDetails = useRecoilValue(UserStateAtom);
  const onReplyHandler = () => {
    setShowInput(true);
    setHideReply(true);
  };
  const onSendReplyHandler = () => {
    setShowInput(false);
    setHideReply(false);
    setShowReplyMassage(true);
    setReplyArr([...replyArr, {
       id: Math.random() * 1000,
        content: reply,
        time: Math.floor(Date.now() / 1000),
      id: Math.random() * 1000,
      reply_id:message?.id,
        user:{
      first_name: userDetails?.first_name,
      id: userDetails?.id,
      photo_url:"https://www.w3schools.com/howto/img_avatar2.png"
    }
    }])
    setReply('');
  };
  console.log("replyArr",replyArr);
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSendReplyHandler();
    }
  };
    
  return (
     <>
      <div className={`${style.chat_Main} ${isLeft ? style.chat_Main_left : ''}`}>
        <div className={`${style.chat_container} ${isReply ? (isLeft ? style.left_reply_container : style.right_reply_container)  : ""}`}>
          <div className={`${style.chat_Details} ${isLeft ? style.left_chat_Details : ''}`}>
            <div className={`${style.user_name_time} ${isLeft ? style.left_user_name_time : ''}`}>
              <p className={`${style.user_name}`}>{message?.user?.first_name || 'Anupam'}</p>
              <p className={`${style.chat_time}`}>{moment.unix(message?.time).format("lll")}</p>
            </div>
            <div className={`${style.image}`}>
              <img
                src={message?.user?.photo_url || 'https://www.w3schools.com/howto/img_avatar.png'}
                alt=""
              />
            </div>
          </div>
          <p className={`${style.message} ${isLeft ? style.left_message : ''}`}>
            {message?.content} 
          </p>
           {!hideReply && (
            <p className={`${style.reply} ${isLeft ? style.reply_left : ''}`} onClick={onReplyHandler}>
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
    </>
  )
}

export default MessageBlock