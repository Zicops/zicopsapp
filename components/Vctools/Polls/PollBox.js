import { pollArray } from '@/state/atoms/vctool.atoms';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from '../vctoolMain.module.scss';
const PollBox = ({ pollData }) => {
  const {
    pollNumber,
    publish,
    pollQuestion,
    options,
    deletePoll,
    publishData,
    pollType,
    endPoll,
    editPollFunc
  } = pollData;
  const [expand, setexpand] = useState(true);
  return (
    <div className={`${styles.quizQuestion}`}>
      <div className={`${styles.pollQuestionhead}`}>
        <div className={`${styles.pollLable}`}>
          <img src="/images/svg/vctool/Poll Icon.svg" />
          <div>{pollNumber}</div>
        </div>
        <div className={`${styles.quizeExpand}`}>
          {publish === 'publish' && (
            <div
              className={`${styles.publishPollHead}`}
              onClick={() => {
                publishData();
              }}>
              {publish}
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
              {publish}
            </div>
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
            {pollType === 'Saved' && <div className={`${styles.pollSavedLabel}`}>{pollType}</div>}
            {pollType === 'Active' && <div className={`${styles.pollActiveLabel}`}>{pollType}</div>}
            {pollType === 'Ended' && <div className={`${styles.pollEndedLabel}`}>{pollType}</div>}
            <div className={`${styles.pollQuestions}`}>{pollQuestion}</div>
            <div className={`${styles.pollBoxOptions}`}>
              {options?.map((data) => {
                return <div>{data.value}</div>;
              })}
            </div>

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
                  <button className={`${styles.pollBoxEditBnt}`} onClick={() => editPollFunc()}>
                    Edit
                  </button>
                </div>
                <button
                  className={`${styles.publishPoll}`}
                  onClick={() => {
                    publishData();
                  }}>
                  Publish
                </button>
              </>
            )}
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
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
export default PollBox;
