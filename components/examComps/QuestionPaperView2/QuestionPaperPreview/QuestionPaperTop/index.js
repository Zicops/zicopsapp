import styles from '../questionPaperPreview.module.scss';
import { obj } from './Logic/questionTop';
const QuestionPaperTop = () => {
  return (
    <>
      <div className={`${styles.container}`}>
        <div className={`${styles.middleSection}`}>
          <p>
            QUESTION PAPER NAME: <p>{obj.description}</p>
          </p>
        </div>

        <div className={`${styles.lowerSection}`}>
          <p>
            Total No. of Question: <span>{obj.Total_Q}</span>
          </p>
          <p>
            Total Marks: <span>{obj.Total_M}</span>
          </p>
          <p>
            Passing Marks: <span>{obj.Passing_M}</span>
          </p>
          <p>
            Duration: <span>{obj.Duration}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default QuestionPaperTop;
