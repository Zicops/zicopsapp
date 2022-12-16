import { useState } from 'react';
import style from './discussion.module.scss';
import { useRecoilValue } from 'recoil';
import { discussionData } from './discussion.helper';
import MessageBlock from './MessageBlock';
import { UserStateAtom } from '@/state/atoms/users.atom';
const CourseBodyDiscussion = () => {
  const [message, setMessage] = useState('');
  const [messageArr, setMessageArr] = useState([]);
  const [sendMessage, setSendMessage] = useState(false);
  const userDetails = useRecoilValue(UserStateAtom);

  const sendMessageHandler = () => {
    setSendMessage(true);
    setMessageArr([
      ...messageArr,
      {
        id: Math.random() * 1000,
        content: message
      }
    ]);
    setMessage('');
  };
  const onMessageHandler = (e) => {
    setMessage(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessageHandler();
    }
  };
  return (
    <div className={`${style.discussion_container}`}>
      <div className={`${style.chat_text_container}`}>
        {discussionData?.messages?.map((data) => {
          let isRight = data?.user?.id === userDetails?.id;
          let replyId = data?.reply_id;
          let messageData = discussionData?.messages?.filter((d) => d.reply_id);
          let replyData = discussionData?.messages?.filter((d) => d.id === replyId);
          console.log(messageData);
          return (
            <>
              <MessageBlock message={data} isLeft={!isRight} />
              {replyData.length ? (
                <MessageBlock message={replyData[0]} isLeft={!isRight} isReply={true} />
              ) : (
                ''
              )}
            </>
          );
        })}
      </div>
      <div>
        <div className={`${style.discussion_form}`}>
          <div className={`${style.discussion}`}>
            <input
              className={`${style.send_input}`}
              placeholder="Message"
              value={message}
              onChange={onMessageHandler}
              onKeyDown={handleKeyPress}
            />
          </div>
          <div className={`${style.send_image}`} onClick={sendMessageHandler}>
            <img src="/images/svg/send-icon2.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseBodyDiscussion;
