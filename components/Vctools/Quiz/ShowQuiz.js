import {
  CurrentParticipantDataAtom,
  activequizArr,
  particiapntQuiz,
  quizArray
} from '@/state/atoms/vctool.atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import QuizQuestion from '../QuizQuestion';
import styles from '../vctoolMain.module.scss';
const ShowQuiz = ({ addQuiz }) => {
  const [activeQuiz, setActiveQuiz] = useRecoilState(activequizArr);
  const currentParticipantData = useRecoilValue(CurrentParticipantDataAtom);
  const [participantQuizAtom, setParticiapntQuizAtom] = useRecoilState(particiapntQuiz);
  const [quizArr, setQuizArr] = useRecoilState(quizArray);
  return (
    <div className={`${styles.showQuizContainer}`}>
      <div className={`${styles.availableQuizSCreen}`}>
        {!!currentParticipantData?.isModerator ? (
          <>
          <div>
          <p className={`${styles.quizTypeHeading}`}>Saved</p>
          {quizArr.map((data, index) => {
            return (
              data.quizName !== '' &&
              data.quizQuestion !== '' && (
                <QuizQuestion
                  QuizQuestion={data.quizQuestion}
                  quizIndex={index}
                  publishQuiz={() => {
                    setActiveQuiz([...activeQuiz, quizArr[index]]);
                    setParticiapntQuizAtom({
                      ...participantQuizAtom,
                      unAttemptedQuiz: [...activeQuiz, quizArr[index]]
                    });
                    setQuizArr(
                      quizArr.filter((quiz, quizIndex1) => {
                        return quizIndex1 !== index;
                      })
                    );
                  }}
                  selectedQuiz={quizArr}
                quiztype='Saved' />
              )
            );
          })}
        </div>
        <div>
          <p className={`${styles.quizTypeHeading}`}>Active</p>
          {activeQuiz.map((active, index) => {
            return (
              active?.quizName !== '' &&
              active?.quizQuestion !== '' && (
                <QuizQuestion
                  QuizQuestion={active?.quizQuestion}
                  quizIndex={index}
                  selectedQuiz={activeQuiz}
                  quiztype='Active'
                />
              )
            );
          })}
        </div>
          </>
        ) : (
          <>
            <div>
              <p className={`${styles.quizTypeHeading}`}>Un-attempted</p>
              {participantQuizAtom.unAttemptedQuiz.map((active, index) => {
                return (
                  active?.quizName !== '' &&
                  active?.quizQuestion !== '' && (
                    <QuizQuestion
                      QuizQuestion={active?.quizQuestion}
                      quizIndex={index}
                      selectedQuiz={participantQuizAtom.unAttemptedQuiz}
                    />
                  )
                );
              })}
            </div>

            <div>
              <p className={`${styles.quizTypeHeading}`}>Attempted</p>
              <div></div>
            </div>
          </>
        )}
        
      
      </div>
      {!!currentParticipantData?.isModerator && (
        <button
          className={`${styles.addQuizBtn}`}
          onClick={() => {
            addQuiz();
          }}>
          <div>+</div>Add Quiz
        </button>
      )}
    </div>
  );
};
export default ShowQuiz;
