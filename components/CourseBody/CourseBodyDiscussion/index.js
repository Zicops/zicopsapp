import { useState } from 'react';
import style from './discussion.module.scss';
import { useRecoilState, useRecoilValue } from 'recoil';
import MessageBlock from './MessageBlock';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { DiscussionAtom } from '@/state/atoms/discussion.atoms';
import RTE2 from '@/components/common/FormComponents/RTE2';
const CourseBodyDiscussion = () => {
  const [message, setMessage] = useState('');
  const [messageArr, setMessageArr] = useRecoilState(DiscussionAtom);
  const [showInput , setShowInput] = useState(false)
  const userDetails = useRecoilValue(UserStateAtom);

  const onShowHandler = () => {
    setShowInput(true)
  }
  const canclePostHanlder = () => {
    setShowInput(false)
  }
  const sendMessageHandler = () => {
    setMessageArr([
      ...messageArr,
      {
        id: Math.floor(Date.now() / 1000 + 1),
        content: message.replace(/<[^>]+>/g, ''),
        time: Math.floor(Date.now() / 1000),
        user: {
          id: userDetails?.id,
          first_name: userDetails?.first_name,
          photo_url:userDetails?.photo_url
        }
      }
    ]);
    setMessage('');
    setShowInput(false)
  };
  const onMessageHandler = (e) => {
    setMessage(e);
  };
  // const handleKeyPress = (e) => {
  //   if (e.key === 'Enter') {
  //     sendPostHandler();
  //   }
  // };

  

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

  return (
    <div className={`${style.discussion_container}`}>
          <div className={`${style.discussion_header}`}>
              <p>Discussion</p>
              <div className={`${style.discussion_header_images}`}>
                  <img src="/images/search3.png" alt="" />
                  <img src="/images/expand.png" alt="" /> 
              </div>
      </div>
      {!showInput && <div className={`${style.input_container}`} onClick={onShowHandler}>
        <div className={`${style.input_image}`}>
          <img src={userDetails?.photo_url} alt="" />
        </div>
        <input placeholder='Start new discussion...' className={`${style.input}`}/>
      </div>}
     {showInput && <div>
        <RTE2 placeholder="Start typing here..." value={message} changeHandler={onMessageHandler} onPostHandler={sendMessageHandler} onCancleHandler={canclePostHanlder} />
      </div>}
      {replies?.map((data) => {

          return (
            <>
              <MessageBlock message={data?.parent} />
              {data?.replies &&
                data?.replies?.map((reply) => (
                  <MessageBlock message={reply} isReply={true} />
                ))}
              <div className={`${style.hr}`}></div>
            </>
          );
        })}
    </div>
  );
};

export default CourseBodyDiscussion;