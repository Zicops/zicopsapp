import { CurrentParticipantDataAtom, pollArray } from '@/state/atoms/vctool.atoms';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from '../vctoolMain.module.scss';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import useLoadClassroomData from '../Logic/useLoadClassroomData';
import { UserStateAtom } from '@/state/atoms/users.atom';
import Loader from '@/components/common/Loader';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/helper/firebaseUtil/firestore.helper';

const PollBox = ({ pollData }) => {
  const {
    pollId,
    pollNumber,
    publish,
    pollName,
    pollQuestion,
    options,
    deletePoll,
    publishData,
    pollType,
    endPoll,
    editPollFunc,
  } = pollData;

  const [expand, setexpand] = useState(true);
  const [pollResponse, setPollResponse] = useState(false);
  const [pollResult, setPollResult] = useState(null);

  const [voteCount, setVoteCount] = useState(0);
  const [result, setResult] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const userData = useRecoilValue(UserStateAtom);
  const currentParticipantData = useRecoilValue(CurrentParticipantDataAtom);
  const { updatePollsResponse } = useLoadClassroomData();

  function pollHandler(e) {
    const choosenOption = e?.target?.value?.trim();
    setPollResponse(choosenOption);
  }

  async function submitPoll() {
    setIsLoading(true);

    const obj = {
      pollId: pollId,
      userId: userData.id,
      option: pollResponse,
    };
    await updatePollsResponse(obj);

    setIsLoading(false);
    setPollResult(null);
  }

  const pollResponseRef = collection(db, 'polls_response');
  const q = query(pollResponseRef, where('poll_id', '==', pollId));

  useEffect(async () => {
    const unsub = onSnapshot(q, (querySnapshot) => {
      const newMessages = [];
      querySnapshot.forEach((doc) => {
        newMessages.push({ id: doc.id, ...doc.data() });
      });
      setPollResult(newMessages);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    if (!pollResult) return;
    pollResult.map((res) => {
      setVoteCount((prevCount) => prevCount + res?.user_ids?.length);

      let localArr = result;
      localArr[res.response] = res?.user_ids?.length;
      setResult(localArr);

      if (res?.user_ids?.includes(userData.id)) {
        setPollResponse(res?.response);
      }
    });

  }, [pollResult]);

  return (
    <div className={`${styles.quizQuestion}`}>
      <div className={`${styles.pollQuestionhead}`}>
        <div className={`${styles.pollLable}`}>
          <img src="/images/svg/vctool/Poll Icon.svg" />
          <div>{pollNumber}</div>
        </div>
        <div className={`${styles.quizeExpand}`}>
          {!!currentParticipantData?.isModerator ? (
            <>
              {publish === 'publish' && (
                <div className={`${styles.publishPollHead}`} onClick={publishData}>
                  Publish
                </div>
              )}

              {publish === 'End Poll' && (
                <div
                  id={publish === 'End Poll' ? `${styles.endPoll}` : ''}
                  className={`${styles.publishPollHead}`}
                  onClick={() => {
                    endPoll();
                  }}>
                  {publish}
                </div>
              )}

              {publish === 'ENDED' && (
                <div
                  id={publish === 'ENDED' ? `${styles.endedPoll}` : ''}
                  className={`${styles.publishPollHead}`}>
                  Ended
                </div>
              )}
            </>
          ) : (
            <>
              {pollResponse ? (
                <img
                  className={`${styles.publishPollHead}`}
                  style={{ width: '20px' }}
                  src="/images/svg/check_circle.svg"
                  alt="voted"
                />
              ) : (
                ''
              )}
            </>
          )}

          <button
            onClick={() => {
              setexpand(!expand);
            }}>
            {
              <img
                src={
                  expand
                    ? '/images/svg/vctool/expand-more.svg'
                    : '/images/svg/vctool/expand-less.svg'
                }
              />
            }
          </button>
        </div>
      </div>

      <div>
        {!expand ? (
          <div className={`${styles.pollQuestionScreen}`}>
            {isLoading ? (
              <Loader
                customStyles={{
                  minHeight: '200px',
                  height: '100%',
                  backgroundColor: 'transparent',
                }}
              />
            ) : (
              <>
                {pollType === 'Saved' && (
                  <div className={`${styles.pollSavedLabel}`}>{pollType}</div>
                )}
                {pollType === 'Active' && (
                  <div className={`${styles.pollActiveLabel}`}>{pollType}</div>
                )}
                {pollType === 'Ended' && (
                  <div className={`${styles.pollEndedLabel}`}>{pollType}</div>
                )}
                <div className={`${styles.pollQuestions}`}>{pollQuestion}</div>
                <div className={`${styles.pollBoxOptions}`}>
                  {options?.map((data) => {
                    return (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          backgroundImage: `linear-gradient(90deg, #333 ${
                            (100 * result[data]) / voteCount
                          }%, transparent 0%)`,
                        }}>
                        {!!currentParticipantData?.isModerator ? (
                          <>
                            <span>{data}</span>
                            {pollType === 'Ended' && (
                              <span style={{ fontSize: '13px', color: 'var(--primary)' }}>
                                {result[data] || 0} Vote{result[data] > 1 ? 's' : ''}
                              </span>
                            )}
                          </>
                        ) : (
                            <>
                          <LabeledRadioCheckbox
                            type="radio"
                            name={pollQuestion}
                            label={data}
                            value={data}
                            isChecked={data === pollResponse}
                            changeHandler={pollHandler}
                            isDisabled={pollType === 'Ended'}
                              />
                              {pollType === 'Ended' && (
                              <span style={{ fontSize: '13px', color: 'var(--primary)' }}>
                                {result[data] || 0} Vote{result[data] > 1 ? 's' : ''}
                              </span>
                            )}
                            </>
                        )}
                      </div>
                    );
                  })}
                </div>
                {!currentParticipantData?.isModerator &&
                  pollType !== 'Ended' && (
                      <div className={`${styles.participantPollBoxBtns}`}>
                        <button onClick={submitPoll}>{!pollResponse ? 'Submit' : 'Update'}</button>
                      </div>,
                    )}
                {!!currentParticipantData?.isModerator && (
                  <>
                    {publish === 'publish' && (
                      <>
                        <div className={`${styles.pollBoxBtns}`}>
                          <button
                            className={`${styles.pollBoxDeleteBnt}`}
                            onClick={() => {
                              deletePoll();
                            }}>
                            Delete
                          </button>
                          <button
                            className={`${styles.pollBoxEditBnt}`}
                              onClick={() => {
                                editPollFunc(pollData)
                            }}>
                            Edit
                          </button>
                        </div>
                        <button className={`${styles.publishPoll}`} onClick={publishData}>
                          Publish
                        </button>
                        {publish === 'End Poll' && (
                          <>
                            <button
                              className={`${styles.endPollBtn}`}
                              onClick={() => {
                                endPoll();
                              }}>
                              End Poll
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
export default PollBox;
