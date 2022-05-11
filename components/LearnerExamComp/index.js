
import ExamAllQuestions from './ExamAllQuestions';
import ProctoredSection from './ProctoredSection';
import QuestionCountButtonSection from './QuestionCountButton';
import styles from './learnerExam.module.scss'
import AnswerAllOptions from './AnswerAllOptions';
import InfoSection from './InfoSection';

const LearnerExamComponent = () => {
  return (
    <div className={`${styles.questionSection}`}>
      <div className={`${styles.questionSection_questions}`}>
        <ExamAllQuestions />
        <AnswerAllOptions />
      </div>
      <div className={`${styles.proctor_section}`}>
          <ProctoredSection />
        <QuestionCountButtonSection />
        <InfoSection />
      </div>
    </div>
  );
};

export default LearnerExamComponent;
