import styles from '../questionPaperPreview.module.scss';
import { obj } from './Logic/questionTop';
const QuestionPaperTop = () => {
  return (
    <>
      <div className={`${styles.container}`}>
        <div className={`${styles.upperSection}`}>
          <p>
            Category: <span>{obj.category}</span>
          </p>
          <p>
            Sub-Category: <span>{obj.subCategory}</span>
          </p>
          <p>
            Level: <span>{obj.level}</span>
          </p>
        </div>
        <div className={`${styles.middleSection}`}>
          <p>
            Description: <p>{obj.description}</p>
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
            Section Wise: <span>{obj.SectionWise}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default QuestionPaperTop;
