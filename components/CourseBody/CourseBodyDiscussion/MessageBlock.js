import { useState } from 'react';
import moment from 'moment';
import style from './discussion.module.scss';
import { useRecoilValue, useRecoilState } from 'recoil';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { DiscussionAtom } from '@/state/atoms/discussion.atoms';
import RTE2 from '@/components/common/FormComponents/RTE2';
const MessageBlock = ({ isReply,  message }) => {
  const [showInput, setShowInput] = useState(false);
  const [replyArr, setReplyArr] = useRecoilState(DiscussionAtom);
  const [reply, setReply] = useState('');
  const userDetails = useRecoilValue(UserStateAtom);
  const onReplyHandler = () => {
    setShowInput(true);
  };
    const canclePostHanlder = () => {
    setShowInput(false)
  }
    const onMessageHandler = (e) => {
    setReply(e);
  };
  const onSendReplyHandler = () => {
    setShowInput(false);
    setReplyArr([
      ...replyArr,
      {
        id: Math.floor(Date.now() / 1000 + 1),
        content: reply.replace(/<[^>]+>/g, ''),
        time: Math.floor(Date.now() / 1000),
        reply_id: message?.id,
        user: {
          first_name: userDetails?.first_name,
          id: userDetails?.id,
          photo_url: 'https://www.w3schools.com/howto/img_avatar.png'
        }
      }
    ]);
    setReply('');
    setShowInput(false)
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSendReplyHandler();
    }
  };

  return (
    <>
      <div className={`${style.message_Block_Main} ${isReply ? style.message_Block_Main_Reply : ''}`}>
        <div className={`${style.message_Block_Head}`}>
          <div className={`${style.message_Block_Head_left}`}>
            <div className={`${style.message_Block_Head_profile_pic}`}>
              <img src={message?.user?.photo_url} alt="" />
            </div>
            <div>
              <p>{ message?.user?.first_name}</p>
            </div>
          </div>
          <div className={`${style.message_time}`}>{moment.unix(message?.time).format('lll')}</div>
        </div>
        <div className={`${style.message_Block_Body}`}>
          <div className={`${style.message_Block_module}`}>
            <p>38:14</p>
            Module 1, Chapter 2, Topic 3
          </div>
          <div className={`${style.message_Content}`}>
            <p>
              { message?.content}
            </p>
          </div>
          <div className={`${style.reply_buttons}`}>
            <div className={`${style.react_button}`}>
              <div className={`${style.like_button}`}>
                <div className={`${style.like_button_image}`}>
                  <img src="/images/thumb_up.png" alt="" />
                </div>
                <span>15</span>
                </div>
                <div className={`${style.button_divider}`}></div>
              <div className={`${style.dislike_button}`}>
                <div className={`${style.dislike_button_image}`}>
                  <img src="/images/thumb_down_off.png" alt="" />
                </div>
                <span>04</span>
              </div>
            </div>
            <button className={`${style.reply_button}`} onClick={onReplyHandler}>Reply</button>
          </div>
          <div className={`${style.more_replies}`}>
            <div className={`${style.more_replies_image}`}>
              <img src="/images/unfold_more.png" alt="" />
            </div>
            <p>432 Replies</p>
          </div>
      {showInput && <div>
        <RTE2 placeholder="Start typing here..." value={reply} contenteditable changeHandler={onMessageHandler} onPostHandler={onSendReplyHandler} onCancleHandler={canclePostHanlder} />
      </div>}
        </div>
      </div>
    </>
  );
};

export default MessageBlock;
