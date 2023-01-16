import { useState } from 'react';
import moment from 'moment';
import style from './discussion.module.scss';
import { useRecoilValue, useRecoilState } from 'recoil';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { MessageAtom, ReplyAtom } from '@/state/atoms/discussion.atoms';
import RTE2 from '@/components/common/FormComponents/RTE2';
import { ADD_COURSE_DISCUSSION, mutationClient } from '@/api/Mutations';
import { GET_DISCUSSION_REPLY, queryClient } from '@/api/Queries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { ModuleAtom } from '@/state/atoms/module.atoms';
import { useEffect } from 'react';
const MessageBlock = ({ isReply, message , setFilterData  }) => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isAnnouncement, setIsAnnouncement] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [replyArr, setReplyArr] = useRecoilState(ReplyAtom);
  const [messageArr, setMessageArr] = useRecoilState(MessageAtom);
  const [reply, setReply] = useState('');
  const[isPinned , setIsPinned] = useState(false)
  const userDetails = useRecoilValue(UserStateAtom);
  const moduleData = useRecoilValue(ModuleAtom);
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
    setIsAnonymous(!isAnonymous);
  };
  const announcementHandler = () => {
    setIsAnnouncement(!isAnnouncement);
  };
 
  const onPinnedHandler = (data) => {
    console.log("data", data)
    const nonPinedMessages = messageArr?.filter((m) => m?.DiscussionId !== data?.DiscussionId);
    console.log("nonPinedMessages", nonPinedMessages)
    setMessageArr([{ ...data, IsPinned: true }, ...nonPinedMessages])
    console.log("messageArr", messageArr)
    setFilterData([...messageArr])
  }

  const onUnpinHandler = (data) => {
    console.log("data", data)
    const filterMessages = messageArr?.filter((m) => m?.DiscussionId !== data?.DiscussionId);
 
    console.log("data", filterMessages);
    console.log("ispinned",{...data, IsPinned: false});
    setMessageArr([...filterMessages, { ...data, IsPinned: false }]);
  //  let newArray = [...messageArr];
  //   newArray?.sort(function(a, b) {
  //     return b.time - a.time;
  //   });  
  //    console.log("sortedArr" , newArray);
  //    console.log("messageArr" , messageArr);
    setFilterData([...messageArr])
  }

  const getReplies = async (discussionId) => {
    console.log("message?.DiscussionId", message?.DiscussionId,discussionId );
     const repliesArr = await loadQueryDataAsync(GET_DISCUSSION_REPLY, {
      course_id :moduleData[0]?.courseId, discussion_id:discussionId
    },
    {},
    queryClient
    )
    console.log("repliesArr", repliesArr?.getCourseDiscussion);
    return repliesArr?.getCourseDiscussion;
  }

  const onSendReplyHandler = async(msg) => {
    setShowInput(false);
    if (!msg?.ReplyId) {
      const addMessage = await loadQueryDataAsync(
     ADD_COURSE_DISCUSSION,
      {
       CourseId: moduleData[0]?.courseId,
       Content: reply,
       ReplyId: msg?.DiscussionId,
       Likes: [userDetails?.id],
       Dislike: [],
       IsPinned: false,
       IsAnonymous: isAnonymous,
       IsAnnouncement: isAnnouncement,
       ReplyCount: 0,
       CreatedBy: userDetails?.id,
       CreatedAt: Math.floor(Date.now() / 1000),
       UpdatedBy: userDetails?.id,
       UpdatedAt: Math.floor(Date.now() / 1000),
       Status: "active"
      },
     {},
     mutationClient
     );
     console.log("addMessage", addMessage?.addCourseDiscussion);
     const replies = await getReplies(msg?.DiscussionId) || [];
     console.log("replies", replies);
     setReplyArr([
       ...replies,
     ])
    } else {
      const addMessage = await loadQueryDataAsync(
     ADD_COURSE_DISCUSSION,
      {
       CourseId: moduleData[0]?.courseId,
       Content: `${'@' + userDetails?.first_name + ' ' + reply}`,
       ReplyId: msg?.ReplyId,
       Likes: [userDetails?.id],
       Dislike: [],
       IsPinned: false,
       IsAnonymous: isAnonymous,
       IsAnnouncement: isAnnouncement,
       ReplyCount: 0,
       CreatedBy: userDetails?.id,
       CreatedAt: Math.floor(Date.now() / 1000),
       UpdatedBy: userDetails?.id,
       UpdatedAt: Math.floor(Date.now() / 1000),
       Status: "active"
      },
     {},
     mutationClient
     );
     console.log("addMessage", addMessage);
     const replies = await getReplies(msg?.ReplyId) || [];
     console.log("replies", replies);
      setReplyArr([
       ...replies,
     ])
    }
      setReply('');
      setShowInput(false);
}

//  useEffect(async() => {
//    await getReplies()
//   },[replyArr])
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSendReplyHandler(message);
    }
  };

  return (
    <div className={`${style.message_Block_container}`}>
      {message?.IsPinned && 
      <div className={`${style.message_Block_Pinned}`} onClick={()=>onUnpinHandler(message)}>
      <img src="/images/svg/pinned2.svg" alt=""/>
        <p>Pinned by {userDetails?.first_name}</p>
      </div>
      }
      <div
        className={`${style.message_Block_Main} ${isReply ? style.message_Block_Main_Reply : ''}`}>
        <div className={`${style.message_Block_Head}`}>
          <div className={`${style.message_Block_Head_left}`}>
            <div className={`${style.message_Block_Head_profile_pic}`}>
              <img
                src={
                  !message?.IsAnonymous
                    ? userDetails?.photo_url
                    : 'https://www.w3schools.com/howto/img_avatar2.png'
                }
                alt=""
              />
            </div>
            <div>
              <p>{!message?.IsAnonymous ? userDetails?.first_name + "(You)" : 'Anonymous'}</p>
            </div>
          </div>
          <div className={`${style.message_Block_Head_right}`}>
            <div className={`${style.message_time}`}>
              {moment.unix(message?.Time).format('lll')}
            </div>
            {message?.IsAnnouncement && (
              <div className={`${style.announcement_container}`}>
                <div className={`${style.announcement_image}`}>
                  <img src="/images/svg/annousment.svg" alt="" />
                </div>
                <p>Announcement</p>
              </div>
            )}
          </div>
        </div>
        <div className={`${style.message_Block_Body} ${message?.IsPinned ? style.message_Block_Body_pinned : style.message_Block_Body_unpinned}`}>
          {!isReply && !message?.IsAnnouncement && (
            <div className={`${style.message_Block_module}`}>
              <p>{message?.time}</p>
              {message?.Module}, {message?.Chapter},
              {message?.Topic}
            </div>
          )}
          <div className={`${style.message_Content}`}>
            {!message?.IsPinned && 
            <div className={`${style.message_Content_pinned}`} onClick={()=>onPinnedHandler(message)}>
            <img src="/images/svg/pined.svg" alt="" />
            </div>
            }
            <div>
            {message?.content?.image?.length ? <img src={message?.content?.image} alt="" /> : ''}
              <span>
                  <RTE2
                value={message?.Content}
                isReadOnly={true}
              />
              </span>
            </div>
          </div>
          <div className={`${style.reply_buttons}`}>
            <div className={`${style.react_button}`}>
              <div className={`${style.like_button}`}>
                <div className={`${style.like_button_image}`}>
                  <img src="/images/thumb_up.png" alt="" />
                </div>
                <span>{message?.Likes?.length || 0} </span>
              </div>
              <div className={`${style.button_divider}`}></div>
              <div className={`${style.dislike_button}`}>
                <div className={`${style.dislike_button_image}`}>
                  <img src="/images/thumb_down_off.png" alt="" />
                </div>
                <span>{message?.Dislike?.length || 0}</span>
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
                onPostHandler={()=>onSendReplyHandler(message)}
                onCancleHandler={canclePostHanlder}
                onAnonymousHandler={anonymousUserHandler}
                checkAnonymous={isAnonymous}
                // checkPublic={isPublic}
                // onPublicHandler={publicUserHandler}
                onAnnouncementHandler={announcementHandler}
                checkAnnouncement={isAnnouncement}
                handleKeyPress={handleKeyPress}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBlock;
