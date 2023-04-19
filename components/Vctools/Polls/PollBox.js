import { CurrentParticipantDataAtom, pollArray } from '@/state/atoms/vctool.atoms';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from '../vctoolMain.module.scss';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import useLoadClassroomData from '../Logic/useLoadClassroomData';
import { UserStateAtom } from '@/state/atoms/users.atom';
import Loader from '@/components/common/Loader';

const PollBox = ({ pollData }) => {
  const {
    pollId,
    pollNumber,
    publish,
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
  }
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
            ''
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
                    // return <div>{data}</div>;
                    return (
                      <div>
                        <LabeledRadioCheckbox
                          type="radio"
                          //   isError={
                          //     !courseMetaData?.expertiseLevel?.length && error?.includes('expertiseLevel')
                          //   }
                          name={pollQuestion}
                          label={data}
                          value={data}
                          //   isChecked={courseMetaData?.expertiseLevel?.includes(
                          //     COURSE_EXPERTISE_LEVEL.beginner
                          //   )}
                          changeHandler={pollHandler}
                          //   isDisabled={isDisabled}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className={`${styles.participantPollBoxBtns}`}>
                  <button onClick={submitPoll}>Submit</button>
                </div>
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
                            onClick={() => editPollFunc()}>
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
