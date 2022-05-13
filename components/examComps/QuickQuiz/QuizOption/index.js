import styles from './quizOption.module.scss';

const QuizOption = ({ options, isRow }) => {
  return (
    <div className={`${isRow ? styles.answer_single_option_true : styles.answer_single_option}`}>
      <span className={`${styles.answer_single_option_count}`}>{options.option}:</span>
      <div className={`${styles.answer_single_option_info}`}>
        {options.imgSrc === undefined ? (
          <p>{options.answerText}</p>
        ) : (
          <div className={`${styles.answer_single_option_img_container}`}>
            <img
              className={` ${styles.answer_single_option_img} `}
              src={`${options.imgSrc}`}
              alt="refresh"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizOption;
