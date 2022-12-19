import { useState } from 'react';
import style from './discussion.module.scss';
import { useRecoilState, useRecoilValue } from 'recoil';
import MessageBlock from './MessageBlock';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { DiscussionAtom } from '@/state/atoms/discussion.atoms';
const CourseBodyDiscussion = () => {
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
          id: 'YW51cGFtcm95NTc1QGdtYWlsLmNvbQ=='
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
    <div className={`${style.discussion_container}`}>
      <div className={`${style.chat_text_container}`}>
        {replies?.map((data) => {
          let isRight = data?.parent?.user?.id === userDetails?.id;
          return (
            <>
              <MessageBlock message={data?.parent} isLeft={!isRight} />
              {data?.replies &&
                data?.replies?.map((reply) => (
                  <MessageBlock message={reply} isLeft={!isRight} isReply={true} />
                ))}
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
