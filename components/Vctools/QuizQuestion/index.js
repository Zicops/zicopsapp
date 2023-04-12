import { CurrentParticipantDataAtom, quizArray } from '@/state/atoms/vctool.atoms';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styles from '../vctoolMain.module.scss';
const QuizQuestion = ({ QuizQuestion, quizIndex, publishQuiz, selectedQuiz, quiztype }) => {
  const quizArr = useRecoilValue(quizArray);
  const currentParticipantData = useRecoilValue(CurrentParticipantDataAtom);
  const [expand, setexpand] = useState(true);
  return (
    <div className={`${styles.quizQuestion}`}>
      <div className={`${styles.quizQuestionhead}`}>
        <div className={`${styles.quizLable}`}>
          <img src="/images/svg/vctool/quiz-1.svg" />
          <div
            style={{
              color: 'white',
              fontSize: '14px'
            }}>
            Quiz {quizIndex}
          </div>
        </div>
        <div className={`${styles.quizeExpand}`}>
          {quiztype === 'Saved' && (
            <p id={`${styles.quizPublishBtn}`} onClick={() => publishQuiz()}>
              publish
            </p>
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
            {quiztype === 'Active' && <div className={`${styles.pollActiveLabel}`}>{quiztype}</div>}
            {quiztype === 'Saved' && <div className={`${styles.pollSavedLabel}`}>{quiztype}</div>}

            <div className={`${styles.pollQuestions}`}>{QuizQuestion}</div>
            <div className={`${styles.pollBoxOptions}`}>
              <div>
                {selectedQuiz[quizIndex]?.options?.option1 === selectedQuiz[quizIndex]?.answer ? (
                  <>
                    <img src="/images/svg/vctool/correct-ans.svg" />
                    {selectedQuiz[quizIndex]?.options?.option1}
                  </>
                ) : (
                  <>
                    <img src="/images/svg/vctool/wrong-ans.svg" />
                    {selectedQuiz[quizIndex]?.options?.option1}
                  </>
                )}
              </div>
              <div>
                {selectedQuiz[quizIndex]?.options?.option2 === selectedQuiz[quizIndex]?.answer ? (
                  <>
                    <img src="/images/svg/vctool/correct-ans.svg" />
                    {selectedQuiz[quizIndex]?.options?.option2}
                  </>
                ) : (
                  <>
                    <img src="/images/svg/vctool/wrong-ans.svg" />
                    {selectedQuiz[quizIndex]?.options?.option2}
                  </>
                )}
              </div>
              <div>
                {selectedQuiz[quizIndex]?.options?.option3 === selectedQuiz[quizIndex]?.answer ? (
                  <>
                    <img src="/images/svg/vctool/correct-ans.svg" />
                    {selectedQuiz[quizIndex]?.options?.option3}
                  </>
                ) : (
                  <>
                    <img src="/images/svg/vctool/wrong-ans.svg" />
                    {selectedQuiz[quizIndex]?.options?.option3}
                  </>
                )}
              </div>
              <div>
                {selectedQuiz[quizIndex]?.options?.option4 === selectedQuiz[quizIndex]?.answer ? (
                  <>
                    <img src="/images/svg/vctool/correct-ans.svg" />
                    {selectedQuiz[quizIndex]?.options?.option4}
                  </>
                ) : (
                  <>
                    <img src="/images/svg/vctool/wrong-ans.svg" />
                    {selectedQuiz[quizIndex]?.options?.option4}
                  </>
                )}
              </div>
            </div>
            {!!quiztype === 'Saved' && !!currentParticipantData?.isModerator && (
              <div className={`${styles.quizBoxBtns}`}>
                <button className={`${styles.quizBoxEditBtn}`}>Edit</button>
                <button className={`${styles.quizBoxPublishBtn}`} onClick={() => publishQuiz()}>
                  publish
                </button>
              </div>
            )}

            {/* <button className={`${styles.publishPoll}`}>Publish</button> */}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
export default QuizQuestion;
