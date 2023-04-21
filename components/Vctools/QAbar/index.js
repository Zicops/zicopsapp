import { DiscussionAtom } from '@/state/atoms/discussion.atoms';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { AQChatAtom, vcToolNavbarState } from '@/state/atoms/vctool.atoms';
import { formLabelClasses } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from '../vctoolMain.module.scss';
import EmptyQa from './EmptyQa';
import VcQaMessageBlock from './VcQaMessageBlock';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '@/helper/firebaseUtil/firestore.helper';
import { ActiveClassroomTopicIdAtom } from '@/state/atoms/module.atoms';
import useLoadClassroomData from '../Logic/useLoadClassroomData';

const QAbar = ({ hide = false }) => {
  const [showQAbtn, setshowQAbtn] = useState(false);
  const [message, setMessage] = useState('');
  const [parentId, setParentId] = useState(null);
  const [messageArr, setMessageArr] = useState([]);
  const [sortedMessageArr, setSortedMessageArr] = useState([]);
  const [hideToolBar, setHideToolbar] = useRecoilState(vcToolNavbarState);
  const activeClassroomTopicId = useRecoilValue(ActiveClassroomTopicIdAtom);
  const userDetails = useRecoilValue(UserStateAtom);
  const { sendChatMessage } = useLoadClassroomData();

  const meetMessagesRef = collection(db, 'MeetMessages');
  const q = query(
    meetMessagesRef,
    where('meeting_id', '==', activeClassroomTopicId),
    where('chat_type', '==', 'qna'),
    // where('parent_id', '==', null),
    orderBy('time', 'asc'),
  );

  useEffect(async () => {
    const unsub = onSnapshot(q, (querySnapshot) => {
      const newMessages = [];
      querySnapshot.forEach((doc) => {
        newMessages.push({ id: doc.id, ...doc.data() });
      });
      setMessageArr(newMessages);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    const messagesWithReplies = [];
    let parents = [];
    messageArr.forEach((message) => {
      if (message.parent_id === null || message.parent_id === undefined) {
        parents.push(message);
        messagesWithReplies.push(message);
      } else {
        const parentIndex = parents.findIndex((parent) => parent.id === message.parent_id);
        messagesWithReplies.splice(parentIndex + 1, 0, message);
      }
    });
    setSortedMessageArr(messagesWithReplies);
  }, [messageArr]);

  const sendMessageHandler = async () => {
    const obj = {
      meetingId: activeClassroomTopicId,
      userId: userDetails?.id,
      parentId: parentId,
      body: message,
      time: Math.floor(Date.now() / 1000),
      chatType: 'qna', // move to constants
    };

    await sendChatMessage(obj);
    setMessage('');
    setParentId(null);
  };

  const onMessageHandler = (e) => {
    setMessage(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (message !== '') {
        sendMessageHandler();
      }
    }
  };


  return (
    <div
      className={`${styles.qaBar}`}
      onMouseEnter={() => setHideToolbar(false)}
      onMouseLeave={() => setHideToolbar(null)}>
      <div className={`${styles.qaBarHead}`}>
        <div>Q & A</div>
        <button
          onClick={() => {
            hide();
          }}>
          <img src="/images/svg/vctool/close.svg" />
        </button>
      </div>

      <div className={`${styles.qaBarScreen}`}>
        {sortedMessageArr.length == 0 ? (
          <EmptyQa />
        ) : (
          sortedMessageArr?.map((data) => {
            return (
              <span key={data.id}>
                <VcQaMessageBlock
                  message={data}
                  setshowQAbtn={setshowQAbtn}
                  setParentId={setParentId}
                />
              </span>
            );
          })
        )}
      </div>

      {showQAbtn ? (
        <div className={`${styles.qaBarInput}`}>
          {!!parentId && (
            <div className={`${styles.replyBlock}`}>
              Replying to : {}
              {
                messageArr.filter((m) => {
                  console.info(m, parentId);
                  return m.id === parentId;
                })?.[0]?.body
              }
              <div onClick={() => setParentId(null)}>x</div>
            </div>
          )}
          <input
            type="text"
            placeholder="Type message here"
            maxLength={160}
            value={message}
            onChange={onMessageHandler}
            onKeyDown={handleKeyPress}
          />
          <div className={`${styles.qaSendFile}`}>
            {/* <img src="/images/svg/vctool/image.svg" /> */}
            <span></span>
            <img src="/images/svg/vctool/send.svg" onClick={sendMessageHandler} />
          </div>
        </div>
      ) : (
        <div className={`${styles.qabarBtnContainer}`}>
          <button
            onClick={() => {
              setshowQAbtn(!showQAbtn);
            }}
            className={`${styles.qaBtn}`}>
            Ask a Question?
          </button>
        </div>
      )}
    </div>
  );
};
export default QAbar;
