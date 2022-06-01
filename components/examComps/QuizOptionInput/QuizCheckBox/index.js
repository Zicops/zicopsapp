import styles from './quizCheckBox.module.scss';

const QuizCorrectAnswer = ({ labelText }) => {
  return (
    <label className={styles.checkbox_container}>
      <input type="checkbox" />
      <span className={styles.checkmark}></span>
      {labelText}
    </label>
  );
};

export default QuizCorrectAnswer;
