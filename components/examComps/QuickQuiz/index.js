import QuizOptions from './QuizOptions';
import { questions } from './Logic/QuickQuiz.helper';
import styles from './quickQuiz.module.scss';
import QuizQuestion from './QuizQuestion';

const QuickQuiz = () => {
  return (
    <>
      <QuizQuestion question={questions[0].question} />
      <QuizOptions answerOptions={questions[0].answerOptions} />
    </>
  );
};

export default QuickQuiz;
