import ChatBoxLeft from './ChatBoxLeft';
import ChatBoxRight from './ChatBoxRight';
import style from './discussion.module.scss';
const CourseBodyDiscussion = () => {
  return (
      <div className={`${style.discussion_container}`}>
          <div className={`${style.chat_text_container}`}>
              <ChatBoxLeft message="Hello i am from Zicops"/>
              <ChatBoxRight message="Hii"/>
              <ChatBoxLeft message="How are you?"/>
              <ChatBoxRight message="I am fine and you?"/>
              <ChatBoxLeft message="I am also fine"/>
              </div>
          <div>
          <form className={`${style.discussion_form}`}>
                  <input
                      className={`${style.discussion_input}`}
              placeholder="Message"
            />
            <button type="submit" className={`${style.discussion_button}`} >SEND</button>
          </form>
        </div>
    </div>
  )
}

export default CourseBodyDiscussion;