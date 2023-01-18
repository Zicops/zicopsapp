import { useEffect, useState } from 'react';
import style from './discussion.module.scss';
import { useRecoilState, useRecoilValue } from 'recoil';
import MessageBlock from './MessageBlock';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { DiscussionReplyAtom, MessageAtom, ReplyAtom } from '@/state/atoms/discussion.atoms';
import RTE2 from '@/components/common/FormComponents/RTE2';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LearnerUser from './LearnerUser';
import { ADD_COURSE_DISCUSSION, mutationClient } from '@/api/Mutations';
import { GET_COURSE_DISCUSSION, GET_DISCUSSION_REPLY, queryClient } from '@/api/Queries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { ChapterAtom, ModuleAtom, TopicAtom } from '@/state/atoms/module.atoms';
import { UserCourseDataAtom } from '@/state/atoms/video.atom';
import Loader from '@/components/common/Loader';
const CourseBodyDiscussion = () => {
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isAnnouncement, setIsAnnouncement] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [inputText, setInputText] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [checkClick, setCheckClick] = useState(false);
  const [showSelf, setShowSelf] = useState(false);
  const [showLearners, setShowLearners] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fliterData, setFilterData] = useState();
  const [learnerUser, setLearnerUser] = useState();
  const [replyData, setReplyData] = useRecoilState(DiscussionReplyAtom);
  const [messageArr, setMessageArr] = useRecoilState(MessageAtom);
  const [replyArr, setReplyArr] = useRecoilState(ReplyAtom);
  const userDetails = useRecoilValue(UserStateAtom);
  const moduleData = useRecoilValue(ModuleAtom);
  const chapterData = useRecoilValue(ChapterAtom);
  const topicData = useRecoilValue(TopicAtom);
  const courseData = useRecoilValue(UserCourseDataAtom);

  const inputHandler = (e) => {
    let lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const onShowHandler = () => {
    setShowInput(true);
  };

  const canclePostHanlder = () => {
    setShowInput(false);
  };

  const anonymousUserHandler = () => {
    setIsAnonymous(!isAnonymous);
  };

  const announcementHandler = () => {
    setIsAnnouncement(!isAnnouncement);
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
    return repliesArr?.getCourseDiscussion;
  };

  const showRepliesHandler = async (msg) => {
    const replies = (await getReplies(msg?.DiscussionId)) || [];
    let _replies = [...replies];
    _replies?.sort(function (a, b) {
      return b.Created_at - a.Created_at;
    });
    setReplyData([..._replies]);
    setShowReplies(msg?.DiscussionId);
  };

  const getCourseMessages = async () => {
    const messagesArr = await loadQueryDataAsync(
      GET_COURSE_DISCUSSION,
      {
        course_id: moduleData[0]?.courseId
      },
      {},
      queryClient
    );
    const messages = messagesArr?.getCourseDiscussion;
    if (!messages?.length) return ;
    const pinnedData = messages?.filter((data) => data?.IsPinned);
    const nonPinnedData = messages?.filter((data) => !data?.IsPinned);
    if (!nonPinnedData?.length) return [...pinnedData];
    let newArray = [...nonPinnedData];
    newArray?.sort(function (a, b) {
      return b.Created_at - a.Created_at;
    });
    if (!pinnedData?.length) return [...newArray];
    return [...pinnedData, ...newArray]
  };

  const sendMessageHandler = async () => {
    const ModuleData = moduleData?.filter((data) => data?.id === courseData?.activeModule?.id);
    const TopicData = topicData?.filter((data) => data?.id === courseData?.activeTopic?.id);
    const ChapterData = chapterData?.filter((data) => data?.id === TopicData[0]?.chapterId);
    const addMessage = await loadQueryDataAsync(
      ADD_COURSE_DISCUSSION,
      {
        CourseId: moduleData[0]?.courseId,
        Content: message,
        UserId: userDetails?.id,
        ReplyId: null,
        Module: ModuleData[0]?.name,
        Chapter: ChapterData[0]?.name,
        Topic: TopicData[0]?.name,
        Time: courseData?.videoData?.timestamp,
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
    const messages = (await getCourseMessages()) || [];
    console.log('messages', messages);
    setMessageArr(messages);
    setMessage('');
    setShowInput(false);
  };

  const onMessageHandler = (e) => {
    setMessage(e);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessageHandler();
    }
  };

  const options = [
    { label: 'All', value: 'All' },
    { label: 'Announcements', value: 'Announcements' },
    { label: 'Discussions', value: 'Discussions' }
  ];

  const handleTypeSelect = (e) => {
    const announcementData = messageArr?.filter((el) => {
      if (e.value === 'Announcements') {
        return el?.IsAnnouncement;
      } else {
        return el;
      }
    });
    setFilterData(announcementData);
    setSelectedType(e.value);
  };

  const typeValue = options.find((option) => option.value === selectedType);

  let filteredData = messageArr?.filter((el) => {
    if (inputText === '') {
      return el;
    } else {
      return userDetails?.first_name.toLowerCase().includes(inputText);
    }
  });

  const onSelfHandler = () => {
    console.log('messageArr', messageArr);
    const selfMessages = messageArr?.filter((el) => el?.UserId === userDetails?.id);
    console.log(userDetails?.id);
    console.log('selfMessages', selfMessages);
    setFilterData(selfMessages);
    setCheckClick(true);
    setShowSelf(true);
    setShowLearners(false);
  };

  const onLearnerHandler = () => {
    const othersMessages = messageArr?.filter((el) => el?.UserId !== userDetails?.id);
    setLearnerUser(othersMessages);
    setFilterData(othersMessages);
    setCheckClick(true);
    setShowLearners(true);
    setShowSelf(false);
  };

   useEffect(() => {
    setFilterData(filteredData);
  }, [inputText, messageArr, replyArr]);
  
    useEffect(async () => {
    setLoading(true)
    const messages = (await getCourseMessages()) || [];
    if (!messages?.length) return;
    console.log('messages', messages);
    setMessageArr(messages);
    setLoading(false)
  }, []);

  useEffect(async () => {
    const messages = (await getCourseMessages()) || [];
    setMessageArr(messages);
  }, [replyArr]);

  return (
    <div className={`${style.discussion_container}`}>
      <div className={`${style.discussion_header}`}>
        <p>Discussion</p>
      </div>
      <div className={`${style.discussion_filter}`}>
        <div className={`${style.discussion_search_input}`}>
          <input
            type="text"
            placeholder="Search by User Name, Topics, Announcements"
            onChange={inputHandler}
          />
          <div className={`${style.discussion_search_images}`}>
            <img src="/images/search3.png" alt="" />
          </div>
        </div>
        <div className={`${style.user_type} ${checkClick ? style.user_check : ''}`}>
          <div
            className={`${style.user_type_self} ${
              checkClick && (showSelf ? style.self : style.learners)
            }`}
            onClick={onSelfHandler}>
            {showSelf ? (
              <img src="/images/svg/person_filled2.svg" alt="" />
            ) : (
              <img src="/images/svg/person_filled.svg" alt="" />
            )}
            <span>Me</span>
          </div>
          {!showSelf && !showLearners && <span className={`${style.dot}`}></span>}
          <div
            className={`${style.user_type_learner} ${
              checkClick && (showLearners ? style.self : style.learners)
            }`}
            onClick={onLearnerHandler}>
            {showLearners ? (
              <img src="/images/svg/group3.svg" alt="" />
            ) : (
              <img src="/images/svg/group2.svg" alt="" />
            )}
            <span>All</span>
          </div>
          {showLearners && (
            <div className={`${style.all_users}`}>
              <LearnerUser data={learnerUser} />
            </div>
          )}
        </div>
        <LabeledDropdown
          dropdownOptions={{
            inputName: 'type',
            placeholder: 'Type',
            options: options,
            value: { value: typeValue?.value, label: typeValue?.label }
          }}
          changeHandler={handleTypeSelect}
        />
      </div>
      {!showInput && (
        <div className={`${style.input_container}`} onClick={onShowHandler}>
          <div className={`${style.input_image}`}>
            <img src={userDetails?.photo_url} alt="" />
          </div>
          <input placeholder="Start new discussion..." className={`${style.input}`} />
        </div>
      )}
      {inputText?.length ? (
        <>
          <div className={`${style.searchValue}`}>Showing results for "{inputText}"</div>
          <div className={`${style.hr}`}></div>
        </>
      ) : (
        ''
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
            onAnnouncementHandler={announcementHandler}
            checkAnnouncement={isAnnouncement}
            handleKeyPress={handleKeyPress}
          />
        </div>
      )}
      {loading ? <Loader customStyles={{ height: '100%', backgroundColor: 'transparent' }} /> :
      <>
      {fliterData?.map((data) => {
        return (
          <>
            <div className={`${data?.IsPinned ? style.massage_pinned : style.massage_block}`}>
              <MessageBlock message={data} setFilterData={setFilterData} />
              <div
                className={`${style.more_replies}`}
                onClick={() => {
                  if (data?.DiscussionId === showReplies) {
                    setReplyData([]);
                    setShowReplies(false);
                    return;
                  }
                  showRepliesHandler(data);
                }}>
                <div className={`${style.more_replies_image}`}>
                  <img src="/images/unfold_more.png" alt="" />
                </div>
                <p>{data?.ReplyCount ? data?.ReplyCount + ' ' + 'Replies' : 'No Replies'}</p>
              </div>
            </div>
            {data?.DiscussionId === showReplies && !!replyData?.length && (
              <>
                {replyData?.map((repdata) => {
                  return <MessageBlock message={repdata} isReply={true} />;
                })}
              </>
            )}

            <div className={`${style.hr}`}></div>
          </>
        );
      })}
      </>
      }
    </div>
  );
};

export default CourseBodyDiscussion;
