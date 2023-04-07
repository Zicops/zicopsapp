import {
  participantPoll,
  pollArray,
  vcActivePoll,
  vcEndedPoll,
  vcMeetingIconAtom
} from '@/state/atoms/vctool.atoms';
import { useRecoilState } from 'recoil';
import styles from '../vctoolMain.module.scss';
import PollBox from './PollBox';
const ShowPoll = ({ setPollTitle, deletePoll }) => {
  // participantPoll
  const [pollInfo, setPollInfo] = useRecoilState(pollArray);
  const [participantPollArr, setParticipantPollArr] = useRecoilState(participantPoll);
  const [activePoll, setActivePoll] = useRecoilState(vcActivePoll);
  const [endedPoll, setEndedPoll] = useRecoilState(vcEndedPoll);
  return (
    <div>
      <div className={`${styles.pollScreenContainer}`}>

        <div>
          <p className={`${styles.pollScreenLable}`}>Saved</p>
          {pollInfo.map((data, index) => {
            return (
              data.pollName !== '' &&
              data.pollQuestion !== '' && (
                <PollBox
                  pollData={{
                    publish: 'publish',
                    pollType: 'Saved',
                    pollNumber: `Poll ${index}`,
                    pollQuestion: data.pollQuestion,
                    options: pollInfo[index].pollOptions,
                    deletePoll: () => {
                      deletePoll();
                    },
                    publishData: () => {
                      setParticipantPollArr({
                        ...participantPollArr,
                        savedPoll: [pollInfo[index]]
                      });

                      setActivePoll([...activePoll, pollInfo[index]]);
                      setPollInfo(
                        pollInfo.filter((publishedPoll, publishedIndex) => {
                          return publishedIndex !== index;
                        })
                      );
                      console.log(participantPollArr);
                    }
                  }}
                />
              )
            );
          })}
        </div>

        <div>
          <p className={`${styles.pollScreenLable}`}>Active</p>
          {activePoll.map((data, index) => {
            return (
              data.pollName !== '' &&
              data.pollQuestion !== '' && (
                <PollBox
                pollData={{
                    publish:'End Poll',
                    pollType:'Active',
                    pollNumber:`Poll ${index + 1}`,
                    pollQuestion:data?.pollQuestion,
                    options:activePoll[index]?.pollOptions,
                    endPoll:()=>
                    {
                        setEndedPoll([...endedPoll,activePoll[index]])
                        setActivePoll(activePoll.filter((activedPoll,activedPollIndex)=>
                        {
                            return activedPollIndex !==index
                        }))
                    }
                }}
                />
              )
            );
          })}
        </div>

        <div>
          <p className={`${styles.pollScreenLable}`}>Ended</p>
          {endedPoll.map((data, index) => {
            return (
              data.pollName !== '' &&
              data.pollQuestion !== '' && (
                <PollBox
                pollData={{
                    publish:'ENDED',
                    pollType:'Ended',
                    pollNumber:`Poll ${index + 1}`,
                    pollQuestion:data?.pollQuestion,
                    options:endedPoll[index]?.pollOptions,
                    
                }}
                />
              )
            );
          })}
        </div>
        
      </div>
      <button
        className={`${styles.addPollBtn}`}
        onClick={() => {
          setPollTitle();
        }}>
        <div>+</div>Create New Poll
      </button>
    </div>
  );
};
export default ShowPoll;
