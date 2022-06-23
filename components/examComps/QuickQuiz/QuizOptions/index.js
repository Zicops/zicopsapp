import QuizOption from '../QuizOption';
import { useEffect, useState } from 'react';
import styles from './quizOptions.module.scss';

const QuizOptions = ({ answerOptions }) => {
  const [isRow, setIsRow] = useState(true);

  useEffect(() => {
    for (const item of answerOptions) {
      if (item.imgSrc !== undefined) {
        setIsRow(!isRow);
        break;
      }
    }
    console.log(isRow);
    // console.log(answerOptions[0]);
  }, []);

  return (
    <>
      {isRow ? (
        <div className={`${styles.quizOptionsRow}`}>
          {answerOptions.map((item) => (
            <QuizOption options={item} isRow={isRow} />
          ))}
        </div>
      ) : (
        <div className={`${styles.quizOptionsGrid}`}>
          {answerOptions.map((item) => (
            <QuizOption options={item} isRow={isRow} />
          ))}
        </div>
      )}
    </>
  );
};

export default QuizOptions;
