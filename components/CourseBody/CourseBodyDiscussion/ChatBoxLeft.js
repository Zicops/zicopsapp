import style from './discussion.module.scss';
const ChatBoxLeft = ({message}) => {
  return (
      <div>
        <div className={`${style.chat_left}`}>
              <p className={`${style.left_text}`}>{message}</p>
      </div>  
    </div>
  )
}

export default ChatBoxLeft