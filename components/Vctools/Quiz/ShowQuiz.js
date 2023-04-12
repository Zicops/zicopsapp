import { activequizArr, quizArray } from '@/state/atoms/vctool.atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import QuizQuestion from '../QuizQuestion';
import styles from '../vctoolMain.module.scss';
const ShowQuiz = ({ addQuiz }) => {
  const [activeQuiz, setActiveQuiz] = useRecoilState(activequizArr);
  const [quizArr, setQuizArr] = useRecoilState(quizArray);
  return (
    <div className={`${styles.showQuizContainer}`}>
      <div className={`${styles.availableQuizSCreen}`}>
        <div>
          <p>Saved</p>
          {quizArr.map((data, index) => {
            return (
              data.quizName !== '' &&
              data.quizQuestion !== '' && (
                <QuizQuestion
                  QuizQuestion={data.quizQuestion}
                  quizIndex={index}
                  publishQuiz={() => {
                    setActiveQuiz([...activeQuiz, quizArr[index]]);
                    setQuizArr(
                      quizArr.filter((quiz, quizIndex1) => {
                        return quizIndex1 !== index;
                      })
                    );
                  }}
                  selectedQuiz={quizArr}
                />
              )
            );
          })}
        </div>
        <div>
          <p>Active</p>
          {activeQuiz.map((active, index) => {
            return (
              active?.quizName !== '' &&
              active?.quizQuestion !== '' && (
                <QuizQuestion
                  QuizQuestion={active?.quizQuestion}
                  quizIndex={index}
                  selectedQuiz={activeQuiz}
                />
              )
            );
          })}
        </div>
      </div>
      <button
        className={`${styles.addQuizBtn}`}
        onClick={() => {
          addQuiz();
        }}>
        <div>+</div>Add Quiz
      </button>
    </div>
  );
};
export default ShowQuiz;
