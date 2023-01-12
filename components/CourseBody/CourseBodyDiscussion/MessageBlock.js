import { useState } from 'react';
import moment from 'moment';
import style from './discussion.module.scss';
import { useRecoilValue, useRecoilState } from 'recoil';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { MessageAtom, ReplyAtom } from '@/state/atoms/discussion.atoms';
import RTE2 from '@/components/common/FormComponents/RTE2';
const MessageBlock = ({ isReply, message , setFilterData  }) => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  // const [isPublic, setIsPublic] = useState(true);
  const [isAnnouncement, setIsAnnouncement] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [replyArr, setReplyArr] = useRecoilState(ReplyAtom);
  const [messageArr, setMessageArr] = useRecoilState(MessageAtom);
  const [reply, setReply] = useState('');
  const[isPinned , setIsPinned] = useState(false)
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
    setIsAnonymous(!isAnonymous);
    // setIsPublic(false);
  };
  // const publicUserHandler = () => {
  //   setIsPublic(true);
  //   setIsAnonymous(false);
  // };
  const announcementHandler = () => {
    setIsAnnouncement(!isAnnouncement);
  };
 
  const onPinnedHandler = (data) => {
    const nonPinedMessages = messageArr?.filter((m) => m?.id !== data?.id);
    setMessageArr([{ ...data, isPinned: true }, ...nonPinedMessages ])
    setFilterData([...messageArr])
  }

  const onUnpinHandler = (data) => {
    const filterMessages = messageArr?.filter((m) => m?.id !== data?.id);
 
    console.log("data", filterMessages);
    console.log("ispinned",{...data, isPinned: false});
    setMessageArr([...filterMessages, { ...data, isPinned: false }]);
  //  let newArray = [...messageArr];
  //   newArray?.sort(function(a, b) {
  //     return b.time - a.time;
  //   });  
  //    console.log("sortedArr" , newArray);
  //    console.log("messageArr" , messageArr);
    setFilterData([...messageArr])
  }

  const onSendReplyHandler = (msg) => {
    setShowInput(false);
    let newreplyData = replyArr?.filter((rdata) => rdata[msg?.replyId] ? rdata[msg?.replyId] : rdata[msg?.id]);
    let newReplyArr = replyArr?.filter((rdata) => rdata[msg?.replyId] ? !rdata[msg?.replyId] : !rdata[msg?.id]);
    let newMessageId = "";
    if (msg?.replyId) {
      newMessageId = msg?.replyId
    } else {
      newMessageId = msg?.id
    }
    let checkId = "";
    console.log(newreplyData[0]);
    if (newreplyData[0]) {
      console.log(msg?.id);
      checkId = Object.keys(newreplyData[0]);
    }
    console.log(newMessageId);
    if (!newMessageId || (parseInt(checkId[0]) !== msg?.id && !msg?.replyId)) {
      setReplyArr([
        ...replyArr,
        {
          [msg?.id]: [
            {
              id: Math.floor(Date.now() / 1000 + 1),
              content: { text: `${'@' + msg?.user.first_name + ' ' + reply}`, image: [] },
              time: Math.floor(Date.now() / 1000),
              replyId: msg?.id,
              isAnonymous: false,
              user: {
                first_name: userDetails?.first_name,
                id: userDetails?.id,
                photo_url: 'https://www.w3schools.com/howto/img_avatar.png',
                role: userDetails?.role
              },
              like: [],
              unlike: [],
              isPinned: false
            }
          ]
        }
      ])
    } else {
         let newArray = [...newreplyData[0][newMessageId]]
         newArray.unshift(
            {
               id: Math.floor(Date.now() / 1000 + 1),
               content: { text: `${'@' + msg?.user.first_name + ' ' + reply}`, image: [] },
               time: Math.floor(Date.now() / 1000),
               replyId: msg?.id,
               isAnonymous: false,
               user: {
                 first_name: userDetails?.first_name,
                 id: userDetails?.id,
                 photo_url: 'https://www.w3schools.com/howto/img_avatar.png',
                 role: userDetails?.role
               },
               like: [],
               unlike: [],
               isPinned: false
             }
         )
         let obj = {};
         obj[`${newMessageId}`] = newArray
         const updatedReplyArr = [...newReplyArr, obj ]
         setReplyArr(updatedReplyArr)
       } 
      setReply('');
      setShowInput(false);
}

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSendReplyHandler(message);
    }
  };

  return (
    <div className={`${style.message_Block_container}`}>
      {message?.isPinned && 
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
        <div className={`${style.message_Block_Body} ${message?.isPinned ? style.message_Block_Body_pinned : style.message_Block_Body_unpinned}`}>
          {!isReply && !message?.isAnnouncement && (
            <div className={`${style.message_Block_module}`}>
              <p>{message?.currentTopic?.time}</p>
              {message?.currentTopic?.module}, {message?.currentTopic?.chapter},
              {message?.currentTopic?.topic}
            </div>
          )}
          <div className={`${style.message_Content}`}>
            {!message?.isPinned && 
            <div className={`${style.message_Content_pinned}`} onClick={()=>onPinnedHandler(message)}>
            <img src="/images/svg/pined.svg" alt="" />
            </div>
            }
            <div>
            {message?.content?.image?.length ? <img src={message?.content?.image} alt="" /> : ''}
            <p>{message?.content?.text}</p>
            </div>
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
