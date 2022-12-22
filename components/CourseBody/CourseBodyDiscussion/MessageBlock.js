import { useState } from 'react';
import moment from 'moment';
import style from './discussion.module.scss';
import { useRecoilValue, useRecoilState } from 'recoil';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { ReplyAtom } from '@/state/atoms/discussion.atoms';
import RTE2 from '@/components/common/FormComponents/RTE2';
const MessageBlock = ({ isReply, message }) => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [isAnnouncement, setIsAnnouncement] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [replyArr, setReplyArr] = useRecoilState(ReplyAtom);
  const [reply, setReply] = useState('');
  const userDetails = useRecoilValue(UserStateAtom);
  const onReplyHandler = () => {
    setShowInput(true);
  };
  const canclePostHanlder = () => {
    setShowInput(false);
  };
  const onMessageHandler = (e) => {
    setReply(e);
  };
  const anonymousUserHandler = () => {
    setIsAnonymous(true);
    setIsPublic(false);
  };
  const publicUserHandler = () => {
    setIsPublic(true);
    setIsAnonymous(false);
  };
  const announcementHandler = () => {
    setIsAnnouncement(!isAnnouncement);
  };
  console.log(replyArr);
  const onSendReplyHandler = () => {
    setShowInput(false);
    const newreplyData = replyArr.find((rdata) => rdata[message?.id] || rdata[message?.replyId]);
    {
      message?.replyId || (message?.id && console.log(message?.id || message?.replyId));
      setReplyArr([
        {
          [message?.id || message?.replyId]: [
            ...newreplyData[message?.id || message?.replyId],
            {
              reply_id: Math.floor(Date.now() / 1000 + 1),
              content: { text: reply.replace(/<[^>]+>/g, ''), image: [] },
              time: Math.floor(Date.now() / 1000),
              replyId: message?.id,
              isAnonymous: false,
              user: {
                first_name: userDetails?.first_name,
                id: userDetails?.id,
                photo_url: 'https://www.w3schools.com/howto/img_avatar.png'
              },
              like: [],
              unlike: [],
              isPinned: false
            }
          ]
        }
      ]);
    }
    setReply('');
    setShowInput(false);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSendReplyHandler();
    }
  };

  return (
    <>
      <div
        className={`${style.message_Block_Main} ${isReply ? style.message_Block_Main_Reply : ''}`}>
        <div className={`${style.message_Block_Head}`}>
          <div className={`${style.message_Block_Head_left}`}>
            <div className={`${style.message_Block_Head_profile_pic}`}>
              <img
                src={
                  !message?.isAnonymous
                    ? message?.user?.photo_url
                    : 'https://www.w3schools.com/howto/img_avatar2.png'
                }
                alt=""
              />
            </div>
            <div>
              <p>{!message?.isAnonymous ? message?.user?.first_name : 'Anonymous'}</p>
            </div>
          </div>
          <div className={`${style.message_Block_Head_right}`}>
            <div className={`${style.message_time}`}>
              {moment.unix(message?.time).format('lll')}
            </div>
            {message?.isAnnouncement && (
              <div className={`${style.announcement_container}`}>
                <div className={`${style.announcement_image}`}>
                  <img src="/images/svg/annousment.svg" alt="" />
                </div>
                <p>Announcement</p>
              </div>
            )}
          </div>
        </div>
        <div className={`${style.message_Block_Body}`}>
          {!isReply && !message?.isAnnouncement && (
            <div className={`${style.message_Block_module}`}>
              <p>{message?.currentTopic?.time}</p>
              {message?.currentTopic?.module}, {message?.currentTopic?.chapter},
              {message?.currentTopic?.topic}
            </div>
          )}
          <div className={`${style.message_Content}`}>
            {message?.content?.image?.length ? <img src={message?.content?.image} alt="" /> : ''}
            <p>{message?.content?.text}</p>
          </div>
          <div className={`${style.reply_buttons}`}>
            <div className={`${style.react_button}`}>
              <div className={`${style.like_button}`}>
                <div className={`${style.like_button_image}`}>
                  <img src="/images/thumb_up.png" alt="" />
                </div>
                <span>{message?.like?.length || 0} </span>
              </div>
              <div className={`${style.button_divider}`}></div>
              <div className={`${style.dislike_button}`}>
                <div className={`${style.dislike_button_image}`}>
                  <img src="/images/thumb_down_off.png" alt="" />
                </div>
                <span>{message?.unlike?.length || 0}</span>
              </div>
            </div>
            <button className={`${style.reply_button}`} onClick={onReplyHandler}>
              Reply
            </button>
          </div>
          {showInput && (
            <div>
              <RTE2
                placeholder="Start typing here..."
                value={reply}
                contenteditable
                changeHandler={onMessageHandler}
                onPostHandler={onSendReplyHandler}
                onCancleHandler={canclePostHanlder}
                onAnonymousHandler={anonymousUserHandler}
                checkAnonymous={isAnonymous}
                checkPublic={isPublic}
                onPublicHandler={publicUserHandler}
                onAnnouncementHandler={announcementHandler}
                checkAnnouncement={isAnnouncement}
                handleKeyPress={handleKeyPress}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MessageBlock;
