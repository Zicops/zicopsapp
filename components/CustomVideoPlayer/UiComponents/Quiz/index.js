import Image from 'next/image';
import { questions } from '../../../examComps/QuickQuiz/Logic/QuickQuiz.helper';
import QuizOptions from '../../../examComps/QuickQuiz/QuizOptions';
import QuizQuestion from '../../../examComps/QuickQuiz/QuizQuestion';
import styles from '../../customVideoPlayer.module.scss';

export default function Quiz({ playerClose, quizData = {}, handleSkip, handleSubmit }) {
  return (
    <div className={`${styles.quizContainer}`}>
      <div className={`${styles.firstIcon}`} onClick={playerClose}>
        <Image src="/images/bigarrowleft.png" width="20px" height="20px" alt="" />
      </div>
      <div>
        <QuizQuestion question={questions[1].question} />
      </div>

      <div>
        <QuizOptions answerOptions={questions[1].answerOptions} />
      </div>

      <div className={`${styles.footerBtns}`}>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleSkip}>Skip</button>
      </div>
    </div>
  );
}
