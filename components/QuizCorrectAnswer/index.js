import styles from './quizCorrectAnswer.module.scss';

const QuizCorrectAnswer = () => {
  return (
    
        <label className={styles.checkbox_container}>
          <input type="checkbox" />
          <span className={styles.checkmark}></span>
        </label>

  );
};

export default QuizCorrectAnswer;
