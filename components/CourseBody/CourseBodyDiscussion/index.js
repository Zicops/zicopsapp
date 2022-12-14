import { useState } from 'react';
import style from './discussion.module.scss';
import ChatBoxLeft from './ChatBoxLeft';
import ChatBoxRight from './ChatBoxRight';
import Data from "./Data.json";
const CourseBodyDiscussion = () => {
  const [message, setMessage] = useState("")
  const[messageArr, setMessageArr] = useState([])
  const [sendMessage, setSendMessage] = useState(false)
  console.log(Data);

  const sendMessageHandler = () => {
    setSendMessage(true)
    setMessageArr([...messageArr, {
      id: Math.random() * 1000,
      content: message
    }])
    setMessage("")
  }
  const onMessageHandler = (e) => {
    setMessage(e.target.value)
  }
  return (
    <div className={`${style.discussion_container}`}>
      <div className={`${style.chat_text_container}`}>
        {Data.messsages.map((msg) => (
          <ChatBoxLeft message={msg.content} userName={msg.user_name} time={msg.time} replyArr={msg.reply} />
        ))}
        {sendMessage && messageArr.map((msg) => (
          <ChatBoxRight message={msg.content} />
          ))}
         
        {/* <ChatBoxLeft message="How are you?" /> */}
        {/* <ChatBoxRight message="I am fine and you?" /> */}
        {/* <ChatBoxLeft message="I am also fine . Zicops Learning Technology Private Limited is a Private incorporated on 27 June 2022. It is classified as Non-govt company and is registered at Registrar of Companies, Bangalore. Its authorized share capital is Rs. 100,000 and its paid up capital is Rs. 100,000. It is inolved in Higher education [Includes post-secondary/senior secondary sub-degree level education that leads to university degree or equivalent" /> */}
      </div>
      <div>
        <form className={`${style.discussion_form}`}>
          <div className={`${style.discussion}`}>
            {/* <RTE placeholder="Message" value={message} changeHandler={onMessageHandler} /> */}
            <input className={`${style.send_input}`} placeholder="Message" value={message} onChange={onMessageHandler}/>
          </div>
          <div className={`${style.send_image}`} onClick={sendMessageHandler}>
            <img src="/images/svg/send-icon2.svg" alt="" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseBodyDiscussion;
