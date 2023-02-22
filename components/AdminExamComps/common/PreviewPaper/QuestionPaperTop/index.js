import styles from './questionPaperTop.module.scss';

export default function QuestionPaperTop({ data }) {
  return (
    <>
      <div className={`${styles.container}`}>
        <div className={`${styles.upperSection}`}>
          <p>
            Category: <span>{data.category}</span>
          </p>

          <p>
            Sub-Category: <span>{data?.sub_category || data?.subCategory}</span>
          </p>
          <p>
            Level: <span>{data?.difficulty_level || data?.difficultyLevel}</span>
          </p>
        </div>

        <div className={`${styles.middleSection}`}>
          <p>
            Description: <p>{data.description}</p>
          </p>
        </div>

        <div className={`${styles.lowerSection}`}>
          <p>
            Total No. of Question: <span>{data?.totalQuestions}</span>
          </p>
          <p>
            Total Marks: <span>{data?.totalMarks}</span>
          </p>
          <p>
            Section Wise: <span>{data.section_wise ? 'Yes' : 'No'}</span>
          </p>
        </div>
      </div>
    </>
  );
}
