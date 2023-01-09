import { useEffect, useState } from 'react';
import style from './discussion.module.scss';
import { useRecoilState, useRecoilValue } from 'recoil';
import MessageBlock from './MessageBlock';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { DiscussionReplyAtom, MessageAtom, ReplyAtom } from '@/state/atoms/discussion.atoms';
import RTE2 from '@/components/common/FormComponents/RTE2';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LearnerUser from './LearnerUser';
const CourseBodyDiscussion = () => {
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  // const [isPublic, setIsPublic] = useState(true);
  const [isAnnouncement, setIsAnnouncement] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [inputText, setInputText] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [currentMsgId, setCurrentMsgId] = useState('');
  const [checkClick, setCheckClick] = useState(false);
  const [showSelf, setShowSelf] = useState(false);
  const [showLearners, setShowLearners] = useState(false);
  const [fliterData, setFilterData] = useState();
  const [learnerUser, setLearnerUser] = useState();
  const [replyData, setReplyData] = useRecoilState(DiscussionReplyAtom);
  const [messageArr, setMessageArr] = useRecoilState(MessageAtom);
  const [replyArr, setReplyArr] = useRecoilState(ReplyAtom);
  const userDetails = useRecoilValue(UserStateAtom);
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
    // setIsPublic(false);
  };
  // const publicUserHandler = () => {
  //   setIsPublic(true);
  //   setIsAnonymous(false);
  // };
  const announcementHandler = () => {
    setIsAnnouncement(!isAnnouncement);
  };
  const showRepliesHandler = (msg) => {
    const messageReplies = replyArr?.find((rdata) => rdata[msg.id]);
    setReplyData(messageReplies);
    setShowReplies(!showReplies);
    setCurrentMsgId("")
  };
  useEffect(() => {
    if (!currentMsgId) return;
    showRepliesHandler(currentMsgId)
  },[replyData])
  const sendMessageHandler = () => {
    setMessageArr([
      ...messageArr,
      {
        id: Math.floor(Date.now() / 1000 + 1),
        isAnonymous: isAnonymous,
        isAnnouncement: isAnnouncement,
        replyId: null,
        content: {
          text: message,
          image: []
        },
        time: Math.floor(Date.now() / 1000),
        user: {
          id: userDetails?.id,
          first_name: userDetails?.first_name,
          photo_url: userDetails?.photo_url,
          role: userDetails?.role
        },

        currentTopic: {
          module: 'Module2',
          chapter: 'chapter2',
          topic: ' topic3',
          time: '10:45'
        },
        like: [124, 4524, 4552, 454, 2345, 963, 458],
        unlike: [543, 123, 555],
        isPinned: false,
        reply: 0
      }
    ]);
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
  //   return Object.values(replies).map((r) => ({
  //     parent: r?.parent,
  //     replies: r?.replies?.sort((a, b) => b.time - a.time)
  //   }));
  // }
  const options = [
    { label: 'All', value: 'All' },
    { label: 'Announcements', value: 'Announcements' },
    { label: 'Discussions', value: 'Discussions' }
  ];
  const handleTypeSelect = (e) => {
    const announcementData = messageArr?.filter((el) => {
      if (e.value === 'Announcements') {
        return el?.isAnnouncement  
      }
      else {
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
      return el?.user?.first_name.toLowerCase().includes(inputText);
    }
  });
  useEffect(() => {
    setFilterData(filteredData);
  },[inputText , messageArr , replyArr])
  const onSelfHandler = () => {
    const selfMessages = messageArr?.filter((el) => el?.user?.first_name === userDetails?.first_name);
    setFilterData(selfMessages);
    setCheckClick(true)
    setShowSelf(true)
    setShowLearners(false)
 }
  const onLearnerHandler = () => {
    const othersMessages = messageArr?.filter((el) => el?.user?.first_name !== userDetails?.first_name);
    setLearnerUser(othersMessages);
    setFilterData(othersMessages);
    setCheckClick(true)
    setShowLearners(true)
    setShowSelf(false)
 }
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
        <div className={`${style.user_type} ${checkClick ? style.user_check : ""}`}>
          <div className={`${style.user_type_self} ${checkClick && (showSelf ? style.self : style.learners)}`} onClick={onSelfHandler}>
           {showSelf ? <img src="/images/svg/person_filled2.svg" alt="" /> : <img src="/images/svg/person_filled.svg" alt="" />}
            <span>Me</span>
          </div>
        { !showSelf && !showLearners &&  <span className={`${style.dot}`}></span>}
          <div className={`${style.user_type_learner} ${checkClick && (showLearners ? style.self : style.learners)}`} onClick={onLearnerHandler}>
           {showLearners ?  <img src="/images/svg/group3.svg" alt="" /> : <img src="/images/svg/group2.svg" alt="" />}
            <span>All</span>
          </div>
          {showLearners &&
            <div className={`${style.all_users}`}>
              <LearnerUser data={learnerUser} />
            </div>
          }
        </div>
        <LabeledDropdown
          dropdownOptions={{
            inputName: 'type',
            placeholder: 'Type',
            options: options,
            value: { value: typeValue?.value ,  label: typeValue?.label },
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
      {inputText?.length ? 
        <>
      <div className={`${style.searchValue}`}>Showing results for "{inputText}"</div>
       <div className={`${style.hr}`}></div>
        </>
        : ""
      }
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
            // checkPublic={isPublic}
            // onPublicHandler={publicUserHandler}
            onAnnouncementHandler={announcementHandler}
            checkAnnouncement={isAnnouncement}
            handleKeyPress={handleKeyPress}
          />
        </div>
      )}
      {fliterData?.map((data) => {
        const newreplyData = replyArr?.find((rdata) => rdata[data.id]);
        return (
          <>
            <div className={`${style.massage_block}`}>
              <MessageBlock message={data} />
            <div className={`${style.more_replies}`} onClick={() => {
                  setCurrentMsgId(data)
                  showRepliesHandler(data)
                }}>
              <div
                className={`${style.more_replies_image}`}
                >
                <img src="/images/unfold_more.png" alt="" />
              </div>
              <p>{newreplyData ? newreplyData[data.id]?.length : 'No Replies'}</p>
            </div>
            </div>
            {showReplies && replyData && (
              <>
                {replyData[data.id]?.map((repdata) => {
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
