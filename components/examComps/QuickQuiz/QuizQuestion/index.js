import styles from './quizQuestion.module.scss';

const QuizQuestion = ({ question }) => {
  return (
    <div>
      <div className={`${styles.exam_question_number}`}>
        <p>{question.QuestionNumber}.</p>
        <p>{question.question.ques}</p>
        {question.question.imgSrc !== undefined && (
          <div className={`${styles.img_container}`}>
            <img src={`${question.question.imgSrc}`} alt="cannot find" />
          </div>
        )}
      </div>
      <div className={`${styles.all_questions}`}>
        {/* <p>{question.question}</p>
        {question.imgSrc !== undefined && (
          <div className={`${styles.all_questions_img_container}`}>
            <img src={`${question.imgSrc}`} alt="cannot find" />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default QuizQuestion;
