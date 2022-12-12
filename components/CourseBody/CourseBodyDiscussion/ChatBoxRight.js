import style from './discussion.module.scss';
const ChatBoxRight = ({message}) => {
  return (
      <div>
           <div className={`${style.chat_right}`}>
              <p className={`${style.right_text}`}>{message}</p>
      </div>
    </div>
  )
}

export default ChatBoxRight