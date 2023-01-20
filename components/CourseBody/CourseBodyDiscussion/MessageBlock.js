import { useState, useEffect } from 'react';
import moment from 'moment';
import style from './discussion.module.scss';
import { useRecoilValue, useRecoilState } from 'recoil';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { DiscussionReplyAtom, MessageAtom, ReplyAtom } from '@/state/atoms/discussion.atoms';
import RTE2 from '@/components/common/FormComponents/RTE2';
import { ADD_COURSE_DISCUSSION, UPDATE_COURSE_DISCUSSION, mutationClient } from '@/api/Mutations';
import { GET_DISCUSSION_REPLY, queryClient } from '@/api/Queries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { ModuleAtom } from '@/state/atoms/module.atoms';
import { USER_LSP_ROLE } from '@/helper/constants.helper';
import { GET_USER_DETAIL, userQueryClient } from '@/api/UserQueries';
const MessageBlock = ({ isReply, message, setFilterData }) => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isAnnouncement, setIsAnnouncement] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [isDisLike, setIsDisLike] = useState(false);
  const [replyArr, setReplyArr] = useRecoilState(ReplyAtom);
  const [messageArr, setMessageArr] = useRecoilState(MessageAtom);
  const [replyData, setReplyData] = useRecoilState(DiscussionReplyAtom);
  const [isRole, setIsRole] = useState('');
  const [reply, setReply] = useState('');
  const userDetails = useRecoilValue(UserStateAtom);
  const moduleData = useRecoilValue(ModuleAtom);

  useEffect(() => {
    const role = sessionStorage?.getItem('user_lsp_role');
    if (!role) return;
    setIsRole(role);
  }, []);

  useEffect(() => {
    if (message?.Likes?.includes(userDetails?.id)) {
      setIsLike(true);
    }
    else if (message?.Dislike?.includes(userDetails?.id)) {
      setIsDisLike(true);
    }
  }, [messageArr]);

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

  const onPinnedHandler = async (data) => {
    console.log('data', data);
    const nonPinedMessages = messageArr?.filter((m) => m?.DiscussionId !== data?.DiscussionId);
    const updateMessage = await loadQueryDataAsync(
      UPDATE_COURSE_DISCUSSION,
      {
        courseId: moduleData[0]?.courseId,
        discussionId: data?.DiscussionId,
        IsPinned: true
      },
      {},
      mutationClient
    );
    console.log('updateMessage', updateMessage);
    setMessageArr([updateMessage?.updateCourseDiscussion, ...nonPinedMessages]);
    console.log('messageArr', messageArr);
    setFilterData([updateMessage?.updateCourseDiscussion, ...nonPinedMessages]);
  };

  const onUnpinHandler = async (data) => {
    console.log('data', data);
    const filterMessages = messageArr?.filter((m) => m?.DiscussionId !== data?.DiscussionId);
    console.log('data', filterMessages);
    const updateMessage = await loadQueryDataAsync(
      UPDATE_COURSE_DISCUSSION,
      {
        courseId: moduleData[0]?.courseId,
        discussionId: data?.DiscussionId,
        IsPinned: false
      },
      {},
      mutationClient
    );
    const newUpdateMsgArr = [...filterMessages, updateMessage?.updateCourseDiscussion];
    const pinnedData = newUpdateMsgArr?.filter((data) => data?.IsPinned);
    const nonPinnedData = newUpdateMsgArr?.filter((data) => !data?.IsPinned);
    let newArray = [...nonPinnedData];
    newArray?.sort(function (a, b) {
      return b.Created_at - a.Created_at;
    });
    setMessageArr([...pinnedData, ...newArray]);
    setFilterData([...pinnedData, ...newArray]);
  };

  const onLikeHandler = async (data) => {
    console.log(data);
    const filterMessages = data?.Dislike?.filter((id) => id !== userDetails?.id);
    console.log('filterMessages', filterMessages);
    const messageLikes = [...(data?.Likes || []), userDetails?.id];
    const messageDisLikes = filterMessages?.Dislike || [];
    const updateMessage = await loadQueryDataAsync(
      UPDATE_COURSE_DISCUSSION,
      {
        courseId: moduleData[0]?.courseId,
        discussionId: data?.DiscussionId,
        likes: messageLikes,
        dislikes: messageDisLikes
      },
      {},
      mutationClient
    );
    console.log('updateMessage', updateMessage);

    // Update local state for likes
    const _messageArr = structuredClone(messageArr);
    const index = messageArr?.findIndex((m) => m?.DiscussionId === data?.DiscussionId);
    if (index >= 0) {
      _messageArr[index].Likes = messageLikes;
      _messageArr[index].Dislike = messageDisLikes;
      setMessageArr(_messageArr);
      setIsLike(true);
      setIsDisLike(false);
      setFilterData([..._messageArr]);
    } 
    if (!replyData.length) return;
    const _replyData = structuredClone(replyData);
    const index2 = replyData?.findIndex((m) => m?.DiscussionId === data?.DiscussionId);
    if (index2 >= 0) {
      _replyData[index2].Likes = messageLikes;
      _replyData[index2].Dislike = messageDisLikes;
      setIsLike(true);
      setIsDisLike(false);
      setReplyData([..._replyData]);
    }
  };
  
  const onRemoveLikeHandler = async (data) => {
    const filterLikes = data?.Likes?.filter((id) => id !== userDetails?.id);
    const removeLikes = filterLikes?.Likes || [];
    const updateMessage = await loadQueryDataAsync(
      UPDATE_COURSE_DISCUSSION,
      {
        courseId: moduleData[0]?.courseId,
        discussionId: data?.DiscussionId,
        likes: removeLikes
      },
      {},
      mutationClient
    );
    console.log('updateMessage', updateMessage);
    const _messageArr = structuredClone(messageArr);
   
    const index = messageArr?.findIndex((m) => m?.DiscussionId === data?.DiscussionId);
     if (index >= 0) {
      _messageArr[index].Likes = removeLikes;
      setMessageArr(_messageArr);
      setIsLike(false);
      setFilterData([..._messageArr]);
    }
    if (!replyData.length) return;
    const _replyData = structuredClone(replyData);
    const index2 = replyData?.findIndex((m) => m?.DiscussionId === data?.DiscussionId);
    if (index2 >= 0) {
      _replyData[index2].Likes = removeLikes;
      setIsLike(false);
      setReplyData([..._replyData]);
    }
  };

  const onDisLikeHandler = async (data) => {
    const filterMessages = data?.Likes?.filter((id) => id !== userDetails?.id);
    console.log('filterMessages', filterMessages);
    const messageDisLikes = [...(data?.Dislike || []), userDetails?.id];
    const messageLikes = filterMessages?.Likes || [];
    const updateMessage = await loadQueryDataAsync(
      UPDATE_COURSE_DISCUSSION,
      {
        courseId: moduleData[0]?.courseId,
        discussionId: data?.DiscussionId,
        dislikes: messageDisLikes,
        likes: messageLikes
      },
      {},
      mutationClient
    );
    console.log('updateMessage', updateMessage);
    const _messageArr = structuredClone(messageArr);
    const index = messageArr?.findIndex((m) => m?.DiscussionId === data?.DiscussionId);
    if (index >= 0) {
      _messageArr[index].Likes = messageLikes;
      _messageArr[index].Dislike = messageDisLikes;
      setMessageArr(_messageArr);
      setIsDisLike(true);
      setIsLike(false);
      setFilterData([..._messageArr]);
    } 
    if (!replyData.length) return;
    const _replyData = structuredClone(replyData);
    const index2 = replyData?.findIndex((m) => m?.DiscussionId === data?.DiscussionId);
    if (index2 >= 0) {
      _replyData[index2].Likes = messageLikes;
      _replyData[index2].Dislike = messageDisLikes;
      setIsDisLike(true);
      setIsLike(false);
      setReplyData([..._replyData]);
    }
  };

  const onRemoveDisLikeHandler = async (data) => {
    const filterMessages = data?.Dislike?.filter((id) => id !== userDetails?.id);
    console.log('filterMessages', filterMessages);
    const removeDisLikes = filterMessages?.Dislike || [];
    const updateMessage = await loadQueryDataAsync(
      UPDATE_COURSE_DISCUSSION,
      {
        courseId: moduleData[0]?.courseId,
        discussionId: data?.DiscussionId,
        dislikes: removeDisLikes
      },
      {},
      mutationClient
    );
    console.log('updateMessage', updateMessage);

    const _messageArr = structuredClone(messageArr);
    const index = messageArr?.findIndex((m) => m?.DiscussionId === data?.DiscussionId);
    if (index >= 0) {
      _messageArr[index].Dislike = removeDisLikes;
      setMessageArr(_messageArr);
      setIsDisLike(false);
      setFilterData([..._messageArr]);
    } 
    
    if (!replyData.length) return;
    const _replyData = structuredClone(replyData);
    const index2 = replyData?.findIndex((m) => m?.DiscussionId === data?.DiscussionId);
    if (index2 >= 0) {
      _replyData[index2].Dislike = removeDisLikes;
      setIsDisLike(false);
      setReplyData([..._replyData]);
    }
  };

  const getReplies = async (discussionId) => {
    console.log('message?.DiscussionId', message?.DiscussionId, discussionId);
    const repliesArr = await loadQueryDataAsync(
      GET_DISCUSSION_REPLY,
      {
        course_id: moduleData[0]?.courseId,
        discussion_id: discussionId
      },
      {},
      queryClient
    );
    console.log('repliesArr', repliesArr?.getCourseDiscussion);
     const replies = repliesArr?.getCourseDiscussion;
    const userIds = replies?.map((data) => data?.UserId);
    const users = await loadQueryDataAsync(
       GET_USER_DETAIL,
      {
        user_id: userIds
      },
      {},
      userQueryClient
    );
    const userDetails = users.getUserDetails
    const mappedArray = replies?.map(item1 => {
    const item2 = userDetails?.find(i => i.id === item1.UserId);
    return { ...item1, ...item2};
    });
    console.log("mappedArray", mappedArray)
    return mappedArray;
  };

  const onSendReplyHandler = async (msg) => {
    setShowInput(false);
    if (!msg?.ReplyId) {
      const addMessage = await loadQueryDataAsync(
        ADD_COURSE_DISCUSSION,
        {
          CourseId: moduleData[0]?.courseId,
          Content: reply,
          ReplyId: msg?.DiscussionId,
          UserId: userDetails?.id,
          Likes: [],
          Dislike: [],
          IsPinned: false,
          IsAnonymous: isAnonymous,
          IsAnnouncement: isAnnouncement,
          ReplyCount: 0,
          Status: 'active'
        },
        {},
        mutationClient
      );
      console.log('addMessage', addMessage?.addCourseDiscussion);
      const replies = (await getReplies(msg?.DiscussionId)) || [];
      console.log('replies', replies);
      setReplyArr([...replies]);
    } else {
      const addMessage = await loadQueryDataAsync(
        ADD_COURSE_DISCUSSION,
        {
          CourseId: moduleData[0]?.courseId,
          Content: `${'@' + msg?.first_name + ' ' + reply}`,
          ReplyId: msg?.ReplyId,
          UserId: userDetails?.id,
          Likes: [],
          Dislike: [],
          IsPinned: false,
          IsAnonymous: isAnonymous,
          IsAnnouncement: isAnnouncement,
          ReplyCount: 0,
          Status: 'active'
        },
        {},
        mutationClient
      );
      console.log('addMessage', addMessage);
      const replies = (await getReplies(msg?.ReplyId)) || [];
      console.log('replies', replies);
      setReplyArr([...replies]);
    }
    setReply('');
    setShowInput(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSendReplyHandler(message);
    }
  };

  return (
    <div className={`${style.message_Block_container}`}>
      {message?.IsPinned && (
        <div className={`${style.message_Block_Pinned}`} onClick={() => onUnpinHandler(message)}>
          <img src="/images/svg/pinned2.svg" alt="" />
          <p>Pinned by {message?.first_name}</p>
        </div>
      )}
      <div
        className={`${style.message_Block_Main} ${isReply ? style.message_Block_Main_Reply : ''}`}>
        <div className={`${style.message_Block_Head}`}>
          <div className={`${style.message_Block_Head_left}`}>
            <div className={`${style.message_Block_Head_profile_pic}`}>
              <img
                src={
                  !message?.IsAnonymous
                    ? message?.photo_url
                    : 'https://www.w3schools.com/howto/img_avatar2.png'
                }
                alt=""
              />
            </div>
            <div className={`${style.userName}`}>
              <p>{!message?.IsAnonymous && userDetails?.first_name === message?.first_name ? message?.first_name + "(You)" : !message?.IsAnonymous ?  message?.first_name  : 'Anonymous'}</p>
              {message?.IsAnonymous && isRole.toLowerCase() === USER_LSP_ROLE.admin && (
                <img
                  src="/images/svg/visibility2.svg"
                  alt=""
                  className={`${style.visibility_icon}`}
                />
              )}
            </div>
          </div>
          <div className={`${style.message_Block_Head_right}`}>
            <div className={`${style.message_time}`}>
              {moment.unix(message?.Created_at).format('lll')}
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
        <div
          className={`${style.message_Block_Body} ${
            message?.IsPinned ? style.message_Block_Body_pinned : style.message_Block_Body_unpinned
          }`}>
          {!isReply && !message?.IsAnnouncement && (
            <div className={`${style.message_Block_module}`}>
              <p>{message?.Time}</p>
              {message?.Module}, {message?.Chapter},{message?.Topic}
            </div>
          )}
          <div
            className={`${style.message_Content} ${!isReply ? style.message_content_hover : ''}`}>
            {!isReply && !message?.IsPinned && (
              <div
                className={`${style.message_Content_pinned}`}
                onClick={() => onPinnedHandler(message)}>
                <img src="/images/svg/pined.svg" alt="" />
              </div>
            )}
            <div>
              {message?.content?.image?.length ? <img src={message?.content?.image} alt="" /> : ''}
              <span>
                <RTE2 value={message?.Content} isReadOnly={true} />
              </span>
            </div>
          </div>
          <div className={`${style.reply_buttons}`}>
            <div className={`${style.react_button}`}>
              <div className={`${style.like_button}`}>
                {isLike ? (
                  <div
                    className={`${style.like_button_image}`}
                    onClick={() => onRemoveLikeHandler(message)}>
                    <img src="/images/svg/thumb_up.svg" alt="" />
                  </div>
                ) : (
                  <div
                    className={`${style.like_button_image}`}
                    onClick={() => onLikeHandler(message)}>
                    <img src="/images/thumb_up.png" alt="" />
                  </div>
                )}
                <span>{message?.Likes?.length || '00'} </span>
              </div>
              <div className={`${style.button_divider}`}></div>
              <div className={`${style.dislike_button}`}>
                {isDisLike ? (
                  <div
                    className={`${style.dislike_button_image}`}
                    onClick={() => onRemoveDisLikeHandler(message)}>
                    <img src="/images/svg/thumb_down_off.svg" alt="" />
                  </div>
                ) : (
                  <div
                    className={`${style.dislike_button_image}`}
                    onClick={() => onDisLikeHandler(message)}>
                    <img src="/images/thumb_down_off.png" alt="" />
                  </div>
                )}
                <span>{message?.Dislike?.length || '00'}</span>
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
                onPostHandler={() => onSendReplyHandler(message)}
                onCancleHandler={canclePostHanlder}
                onAnonymousHandler={anonymousUserHandler}
                checkAnonymous={isAnonymous}
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
