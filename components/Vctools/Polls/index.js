import {
  CurrentParticipantDataAtom,
  participantPoll,
  pollArray,
  vcActivePoll,
  vcEndedPoll,
  vcMeetingIconAtom,
  vcToolNavbarState,
} from '@/state/atoms/vctool.atoms';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import DeletePoUp from '../DeletePopUp';
import styles from '../vctoolMain.module.scss';
import CreatePOll from './CreatePoll';
import PollQA from './PollQA';
import ShowPoll from './ShowPoll';
import ParticipantPollScreen from './ParticipantPollScreen';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/helper/firebaseUtil/firestore.helper';
import { ActiveClassroomTopicIdAtom } from '@/state/atoms/module.atoms';
import EditPoll from './EditPoll';

const Poll = ({ hide = false, deletePollPopUp }) => {
  const [polltitle, setPollTitle] = useState('');
  const [editPollData, setEditPollData] = useState({});
  const [pollInfo, setPollInfo] = useRecoilState(pollArray);
  const [activePoll, setActivePoll] = useRecoilState(vcActivePoll);
  const [endedPoll, setEndedPoll] = useRecoilState(vcEndedPoll);
  const [hideToolBar, setHideToolbar] = useRecoilState(vcToolNavbarState);
  const [meetingIconsAtom, setMeetingIconAtom] = useRecoilState(vcMeetingIconAtom);
  const currentParticipantData = useRecoilValue(CurrentParticipantDataAtom);
  const activeClassroomTopicId = useRecoilValue(ActiveClassroomTopicIdAtom);
  const [participantPollArr, setParticipantPollArr] = useRecoilState(participantPoll);

  const pollsRef = collection(db, 'polls');
  const q = query(
    pollsRef,
    where('meeting_id', '==', activeClassroomTopicId),
  );

  useEffect(async () => {
    const unsub = onSnapshot(q, (querySnapshot) => {
      const newPolls = [];
      querySnapshot.forEach((doc) => {
        newPolls.push({ id: doc.id, ...doc.data() });
      });
      setPollInfo(newPolls);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    const publishedPolls = [];
    const endedPolls = [];
    
    pollInfo.map((poll) => {
      if (poll.status === 'published') {
        publishedPolls.push(poll);
      }
      if (poll.status === 'ended') {
        endedPolls.push(poll);
      }
    })
    setActivePoll(publishedPolls);
    setEndedPoll(endedPolls);
  }, [pollInfo]);

  function showPollPopup(title) {
    if (title === '')
      return (
        <>
          {pollInfo.length > 1 || activePoll.length >= 1 || endedPoll.length >= 1
            ? pollComponent[2].component
            : pollComponent[1].component}{' '}
        </>
      );
    const pollObj = pollComponent.find((obj) => obj.title == title);
    return pollObj?.component;
  }
  const pollComponent = [
    {
      title: 'pollQA',
      component: (
        <PollQA
          ShowPoll={() => {
            setPollTitle('showPoll');
          }}
          goToCreatePoll={() => {
            if (pollInfo.length > 1) {
              setPollTitle('showPoll');
            } else {
              setPollTitle('emptyPoll');
            }
          }}
        />
      ),
    },
    {
      title: 'emptyPoll',
      component: (
        <CreatePOll
          setPollTitle={() => {
            setPollTitle('pollQA');
          }}
        />
      ),
    },
    {
      title: 'showPoll',
      component: (
        <ShowPoll
          setPollTitle={() => {
            editPollFunc('pollQA');
          }}
          deletePoll={(index) => {
            deletePollPopUp(index);
          }}
          editPollFunc={(pollData) => {
            setPollTitle('editPoll');
            console.info('polldata in edit func', pollData);
            setEditPollData(pollData);
          }}
        />
      ),
    },
    {
      title: 'editPoll',
      component: (
        <EditPoll
          pollData={editPollData}
          goToCreatePoll={() => {
            if (pollInfo.length > 1) {
              setPollTitle('showPoll');
            } else {
              setPollTitle('emptyPoll');
            }
          }}
          ShowPoll={() => {
            setPollTitle('showPoll');
          }}
        />
      ),
    },
  ];

  return (
    <div
      className={`${styles.pollBar}`}
      onMouseEnter={() => setHideToolbar(false)}
      onMouseLeave={() => setHideToolbar(null)}>
      <div className={`${styles.pollHead}`}>
        <div>Polls</div>
        <button
          onClick={() => {
            hide();
          }}>
          <img src="/images/svg/vctool/close.svg" />
        </button>
      </div>

      <div className={`${styles.pollScreen}`}>
        {!!currentParticipantData?.isModerator ? <>{showPollPopup(polltitle)}</> : <ShowPoll />}
        {/* {!!currentParticipantData?.isModerator ? (
          <>{showPollPopup(polltitle)}</>
        ) : participantPollArr?.savedPoll.length < 1 && participantPollArr?.endedPoll.length < 1 ? (
          <CreatePOll />
        ) : (
          <ShowPoll />
        )} */}
      </div>
    </div>
  );
};
export default Poll;
