import { useEffect, useState } from 'react';
import style from './discussion.module.scss';
import { useRecoilState, useRecoilValue } from 'recoil';
import MessageBlock from './MessageBlock';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { DiscussionReplyAtom, MessageAtom, ReplyAtom } from '@/state/atoms/discussion.atoms';
import RTE2 from '@/components/common/FormComponents/RTE2';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
const CourseBodyDiscussion = () => {
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [isAnnouncement, setIsAnnouncement] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replyData, setReplyData] = useRecoilState(DiscussionReplyAtom);
  const [showInput, setShowInput] = useState(false);
  const [messageArr, setMessageArr] = useRecoilState(MessageAtom);
  const [replyArr, setReplyArr] = useRecoilState(ReplyAtom);
  const userDetails = useRecoilValue(UserStateAtom);
  const [inputText, setInputText] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [currentMsgId , setCurrentMsgId] = useState('')
  const inputHandler = (e) => {
    let lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  const handleTypeSelect = (e) => {
    setSelectedType(e.value);
  };
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
  const showRepliesHandler = (msg) => {
    const messageReplies = replyArr?.find((rdata) => rdata[msg.id]);
    setReplyData(messageReplies);
    setShowReplies(!showReplies);
    setCurrentMsgId("")
  };
  useEffect(() => {
    if (!currentMsgId) return;
    showRepliesHandler(currentMsgId)
  },[replyArr])
  const sendMessageHandler = () => {
    setMessageArr([
      
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
        isPinned: false,
        reply: 0
      },
      ...messageArr
    ]);
    setMessage('');
    setShowInput(false);
  };
  const onMessageHandler = (e) => {
    setMessage(e);
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
  const options = [
    { label: 'All', value: 'All' },
    { label: 'Announcements', value: 'Announcements' },
    { label: 'Discussions', value: 'Discussions' }
  ];
  const typeValue = options.find((option) => option.value === selectedType);
  const filteredData = messageArr.filter((el) => {
    if (inputText === '') {
      return el;
    } else {
      return el.user?.first_name.toLowerCase().includes(inputText);
    }
  });

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
        <LabeledDropdown
          dropdownOptions={{
            inputName: 'type',
            placeholder: 'Posted by',
            options: [{ label: 'Name', value: 'Name' }]
          }}
        />
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
            checkPublic={isPublic}
            onPublicHandler={publicUserHandler}
            onAnnouncementHandler={announcementHandler}
            checkAnnouncement={isAnnouncement}
            handleKeyPress={handleKeyPress}
          />
        </div>
      )}
      {filteredData?.map((data) => {
        const newreplyData = replyArr?.find((rdata) => rdata[data.id]);
        return (
          <>
            <MessageBlock message={data} />
            <div className={`${style.more_replies}`}>
              <div
                className={`${style.more_replies_image}`}
                onClick={() => {
                  setCurrentMsgId(data)
                  showRepliesHandler(data)

                }}>
                <img src="/images/unfold_more.png" alt="" />
              </div>
              <p>{newreplyData ? newreplyData[data.id]?.length : '0'}</p>
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
