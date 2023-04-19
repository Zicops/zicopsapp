import {
  CurrentParticipantDataAtom,
  participantPoll,
  pollArray,
  vcActivePoll,
  vcEndedPoll,
  vcMeetingIconAtom,
} from '@/state/atoms/vctool.atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from '../vctoolMain.module.scss';
import PollBox from './PollBox';
import { useEffect } from 'react';
import useLoadClassroomData from '../Logic/useLoadClassroomData';
const ShowPoll = ({ setPollTitle, deletePoll, editPollFunc }) => {
  const { addUpdatePolls } = useLoadClassroomData();
  // participantPoll
  const currentParticipantData = useRecoilValue(CurrentParticipantDataAtom);
  const [participantPollArr, setParticipantPollArr] = useRecoilState(participantPoll);

  const [pollInfo, setPollInfo] = useRecoilState(pollArray);
  const [activePoll, setActivePoll] = useRecoilState(vcActivePoll);
  const [endedPoll, setEndedPoll] = useRecoilState(vcEndedPoll);

  // useEffect(() => {
  //   console.info('All Polls', pollInfo, 'Active Polls', activePoll, 'Ended Polls', endedPoll);
  // }, []);

  return (
    <div>
      <div className={`${styles.pollScreenContainer}`}>
        {!!currentParticipantData?.isModerator ? (
          <>
            <div>
              <p className={`${styles.pollScreenLable}`}>Saved</p>
              {pollInfo
                .filter(function (poll) {
                  return poll.status === 'saved';
                })
                .map((data, index) => {
                  return (
                    data.question !== '' && (
                      <PollBox
                        pollData={{
                          publish: 'publish',
                          pollType: 'Saved',
                          pollId: data.id,
                          pollNumber: `Poll ${index + 1}`,
                          pollQuestion: data.question,
                          options: data.options,
                          deletePoll: () => {
                            const obj = {
                              pollId: data.id,
                              pollName: data.poll_name,
                              meetingId: data.meeting_id,
                              courseId: data.course_id,
                              topicId: data.topic_id,
                              question: data.question,
                              options: data.options,
                              status: 'deleted',
                            };
                            addUpdatePolls(obj);
                          },
                          publishData: () => {
                            const obj = {
                              pollId: data.id,
                              pollName: data.poll_name,
                              meetingId: data.meeting_id,
                              courseId: data.course_id,
                              topicId: data.topic_id,
                              question: data.question,
                              options: data.options,
                              status: 'published',
                            };
                            addUpdatePolls(obj);
                          },
                          // publishData: () => {
                          //   setParticipantPollArr({
                          //     ...participantPollArr,
                          //     savedPoll: [pollInfo[index]],
                          //   });

                          //   setActivePoll([...activePoll, pollInfo[index]]);
                          //   setPollInfo(
                          //     pollInfo.filter((publishedPoll, publishedIndex) => {
                          //       return publishedIndex !== index;
                          //     }),
                          //   );
                          //   console.info(participantPollArr);
                          // },
                          editPollFunc: () => {
                            editPollFunc();
                          },
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
                  data.question !== '' && (
                    <PollBox
                      pollData={{
                        publish: 'End Poll',
                        pollType: 'Active',
                        pollId: data.id,
                        pollNumber: `Poll ${index + 1}`,
                        pollQuestion: data?.question,
                        options: data?.options,
                        endPoll: () => {
                          const obj = {
                            pollId: data.id,
                            pollName: data.poll_name,
                            meetingId: data.meeting_id,
                            courseId: data.course_id,
                            topicId: data.topic_id,
                            question: data.question,
                            options: data.options,
                            status: 'ended',
                          };

                          addUpdatePolls(obj);
                          // setEndedPoll([...endedPoll, activePoll[index]]);
                          // setActivePoll(
                          //   activePoll.filter((activedPoll, activedPollIndex) => {
                          //     return activedPollIndex !== index;
                          //   }),
                          // );
                        },
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
                  data.question !== '' && (
                    <PollBox
                      pollData={{
                        publish: 'ENDED',
                        pollType: 'Ended',
                        pollId: data.id,
                        pollNumber: `Poll ${index + 1}`,
                        pollQuestion: data?.question,
                        options: data?.options,
                      }}
                    />
                  )
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div>
              <p className={`${styles.pollScreenLable}`}>Active</p>
              {activePoll.map((data, index) => {
                return (
                  data.question !== '' && (
                    <PollBox
                      pollData={{
                        publish: 'End Poll',
                        pollType: 'Active',
                        pollId: data.id,
                        pollNumber: `Poll ${index + 1}`,
                        pollQuestion: data?.question,
                        options: data?.options,
                        endPoll: () => {
                          // setEndedPoll([...endedPoll, activePoll[index]]);
                          // setActivePoll(
                          //   activePoll.filter((activedPoll, activedPollIndex) => {
                          //     return activedPollIndex !== index;
                          //   }),
                          // );
                        },
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
                  data.question !== '' && (
                    <PollBox
                      pollData={{
                        publish: 'ENDED',
                        pollType: 'Ended',
                        pollId: data.id,
                        pollNumber: `Poll ${index + 1}`,
                        pollQuestion: data?.question,
                        options: endedPoll[index]?.options,
                      }}
                    />
                  )
                );
              })}
            </div>
          </>
        )}
      </div>
      {!!currentParticipantData?.isModerator && (
        <button className={`${styles.addPollBtn}`} onClick={setPollTitle}>
          <div>+</div>Create New Poll
        </button>
      )}
    </div>
  );
};
export default ShowPoll;
