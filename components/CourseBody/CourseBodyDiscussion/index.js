import RTE from '@/components/common/FormComponents/RTE';
import ChatBoxLeft from './ChatBoxLeft';
import ChatBoxRight from './ChatBoxRight';
import style from './discussion.module.scss';
const CourseBodyDiscussion = () => {
  return (
    <div className={`${style.discussion_container}`}>
      <div className={`${style.chat_text_container}`}>
        <ChatBoxLeft message="Hello" />
        <ChatBoxRight message="Hii" />
        <ChatBoxLeft message="How are you?" />
        <ChatBoxRight message="I am fine and you?" />
        <ChatBoxLeft message="I am also fine . Zicops Learning Technology Private Limited is a Private incorporated on 27 June 2022. It is classified as Non-govt company and is registered at Registrar of Companies, Bangalore. Its authorized share capital is Rs. 100,000 and its paid up capital is Rs. 100,000. It is inolved in Higher education [Includes post-secondary/senior secondary sub-degree level education that leads to university degree or equivalent" />
      </div>
      <div>
        <form className={`${style.discussion_form}`}>
          <div className={`${style.discussion}`}>
            <RTE placeholder="Message" />
          </div>
          <div className={`${style.send_image}`}>
            <img src="/images/svg/send-icon2.svg" alt="" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseBodyDiscussion;
