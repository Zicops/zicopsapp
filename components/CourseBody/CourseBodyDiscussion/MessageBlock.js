import React from 'react'
import style from './discussion.module.scss';
const MessageBlock = ({ isReply, isLeft, message }) => {
    
  return (
     <>
      <div className={`${style.chat_Main} ${isLeft ? style.chat_Main_left : ''}`}>
        <div className={`${style.chat_container} ${isReply ? (isLeft ? style.left_reply_container : style.right_reply_container)  : ""}`}>
          <div className={`${style.chat_Details} ${isLeft ? style.left_chat_Details : ''}`}>
            <div className={`${style.user_name_time} ${isLeft ? style.left_user_name_time : ''}`}>
              <p className={`${style.user_name}`}>{message?.user?.first_name || 'Anupam'}</p>
              <p className={`${style.chat_time}`}>{message?.time }</p>
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
        </div>
      </div>
    </>
  )
}

export default MessageBlock