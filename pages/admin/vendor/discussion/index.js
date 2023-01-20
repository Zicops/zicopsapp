import { useState } from 'react';
import style from './chat.module.scss';
import { useRecoilState, useRecoilValue } from 'recoil';
import ChatMessageBlock from './ChatMessageBlock';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { DiscussionAtom } from '@/state/atoms/discussion.atoms';
import ChatHead from './ChatHead';
const CourseBodyChat = () => {
  const [message, setMessage] = useState('');
  const [messageArr, setMessageArr] = useRecoilState(DiscussionAtom);
  const [sendMessage, setSendMessage] = useState(false);
  const userDetails = useRecoilValue(UserStateAtom);
  const sendMessageHandler = () => {
    setSendMessage(true);
    setMessageArr([
      ...messageArr,
      {
        id: Math.floor(Date.now() / 1000 + 1),
        content: message,
        time: Math.floor(Date.now() / 1000),
        user: {
          id: userDetails?.id
        }
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

  function getReplies(data) {
    const replies = {};
    for (let i = 0; i < data?.length; i++) {
      const message = data[i];
      if (message?.reply_id) {
        const parent = data?.find((m) => m.id === message?.reply_id);
        if (parent) {
          if (!replies[parent?.id]) {
            replies[parent?.id] = {
              parent: parent,
              replies: []
            };
          }
          replies[parent?.id]?.replies?.push(message);
        }
      } else {
        if (!replies[message?.id]) {
          replies[message?.id] = {
            parent: message,
            replies: []
          };
        }
      }
    }
    return Object.values(replies).map((r) => ({
      parent: r?.parent,
      replies: r?.replies?.sort((a, b) => a.time - b.time)
    }));
  }

  const replies = getReplies(messageArr);
  console.log('replies', replies);

  // let firstMessageData = discussionData?.messages?.sort((a, b) => a.time - b.time).filter((data) => !data.reply_id);
  // console.log(firstMessageData);
  // let replyMessageData = discussionData?.messages?.sort((a, b) => a.time-b.time ).filter((data) => data.reply_id);
  // console.log(replyMessageData);
  return (
    <div className={`${style.discussion}`}>
    <div className={`${style.discussion_container}`}>
      <ChatHead company_logo = {"/images/svg/unsplash.svg"} company_name= {"ABC Learning Pvt. Ltd."} company_type={"SME"} company_training_type={"Classroom Training"} company_work={"Content Development"} />
     
      <div className={`${style.chat_text_container}`}>
        {replies?.map((data) => {
          let isRight = data?.parent?.user?.id === userDetails?.id;
          return (
            <>
              <ChatMessageBlock message={data?.parent} isLeft={!isRight} />
              {/* {data?.replies &&
                data?.replies?.map((reply) => (
                  <ChatMessageBlock message={reply} isLeft={!isRight} isReply={true} />
                ))} */}
            </>
          );
        })}
      </div>
      <div>
      </div>
    </div>
      <div className={`${style.discussion_form}`}>
        <div className={`${style.file_image}`}>
          <img src="/images/svg/file.svg" alt="" />
        </div>
        <div className={`${style.discussion_input}`}>
          <div className={`${style.user_image}`}>
            <img src="/images/svg/17.svg" alt="" />

          </div>
            <input
              className={`${style.send_input}`}
              placeholder="Type a message ..."
              value={message}
              onChange={onMessageHandler}
              onKeyDown={handleKeyPress}
            />
          </div>
          <button className={`${style.discussion_button}`}>
            <div className={`${style.send_image}`} onClick={sendMessageHandler}>
            <img src="/images/svg/send.svg" alt="" />
            </div>
            <span>Send</span>
          </button>
      </div>
      </div>
  );
};

export default CourseBodyChat;