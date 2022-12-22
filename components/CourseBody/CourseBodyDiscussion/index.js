import { useState } from 'react';
import style from './discussion.module.scss';
import { useRecoilState, useRecoilValue } from 'recoil';
import MessageBlock from './MessageBlock';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { MessageAtom, ReplyAtom } from '@/state/atoms/discussion.atoms';
import RTE2 from '@/components/common/FormComponents/RTE2';
const CourseBodyDiscussion = () => {
  const [message, setMessage] = useState('');

  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [isAnnouncement, setIsAnnouncement] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [messageArr, setMessageArr] = useRecoilState(MessageAtom);
  const [replyArr, setReplyArr] = useRecoilState(ReplyAtom);
  const userDetails = useRecoilValue(UserStateAtom);

  const onShowHandler = () => {
    setShowInput(true);
  };
  const canclePostHanlder = () => {
    setShowInput(false);
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
  const showRepliesHandler = (id) => {
    setShowReplies(!showReplies);
  };
  const sendMessageHandler = () => {
    setMessageArr([
      ...messageArr,
      {
        id: Math.floor(Date.now() / 1000 + 1),
        isAnonymous: isAnonymous,
        isAnnouncement: isAnnouncement,
        replyId: null,
        content: {
          text: message.replace(/<[^>]+>/g, ''),
          image: []
        },
        time: Math.floor(Date.now() / 1000),
        user: {
          id: userDetails?.id,
          first_name: userDetails?.first_name,
          photo_url: userDetails?.photo_url
        },

        currentTopic: {
          module: 'Module2',
          chapter: 'chapter2',
          topic: ' topic3',
          time: '10:45'
        },
        like: [124, 4524, 4552, 454, 2345, 963, 458],
        unlike: [543, 123, 555],
        isPinned: false
      }
    ]);
    setMessage('');
    setShowInput(false);
  };
  const onMessageHandler = (e) => {
    setMessage(e);
    console.log(e);
  };
  console.log('messageArr', messageArr);
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessageHandler();
    }
  };
  console.log('replyArr', replyArr);
  //   return Object.values(replies).map((r) => ({
  //     parent: r?.parent,
  //     replies: r?.replies?.sort((a, b) => b.time - a.time)
  //   }));
  // }

  return (
    <div className={`${style.discussion_container}`}>
      <div className={`${style.discussion_header}`}>
        <p>Discussion</p>
        <div className={`${style.discussion_header_images}`}>
          <img src="/images/search3.png" alt="" />
          <img src="/images/expand.png" alt="" />
        </div>
      </div>
      {!showInput && (
        <div className={`${style.input_container}`} onClick={onShowHandler}>
          <div className={`${style.input_image}`}>
            <img src={userDetails?.photo_url} alt="" />
          </div>
          <input placeholder="Start new discussion..." className={`${style.input}`} />
        </div>
      )}
      {showInput && (
        <div>
          <RTE2
            placeholder="Start typing here..."
            value={message}
            changeHandler={onMessageHandler}
            onPostHandler={sendMessageHandler}
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
      {messageArr?.map((data) => {
        console.log(replyArr);
        const newreplyData = replyArr?.find((rdata) => rdata[data.id]);
        console.log(newreplyData);
        return (
          <>
            <MessageBlock message={data} />
            <div className={`${style.more_replies}`}>
              <div
                className={`${style.more_replies_image}`}
                onClick={() => showRepliesHandler(message?.id)}>
                <img src="/images/unfold_more.png" alt="" />
              </div>
              <p>{newreplyData ? newreplyData[data.id].length : '0'}</p>
            </div>
            {showReplies && newreplyData && (
              <>
                {newreplyData[data.id].map((repdata) => {
                  return <MessageBlock message={repdata} isReply={true} />;
                })}
              </>
            )}

            <div className={`${style.hr}`}></div>
          </>
        );
      })}
    </div>
  );
};

export default CourseBodyDiscussion;
