
import ExamAllQuestions from './ExamAllQuestions';
import ProctoredSection from './ProctoredSection';
import QuestionCountButtonSection from './QuestionCountButton';
import styles from './learnerExam.module.scss'
import AnswerAllOptions from './AnswerAllOptions';
import InfoSection from './InfoSection';
import { useState } from 'react';
import QuestionPaperView2 from '../examComps/QuestionPaperView2/QuestionPaperPreview';

const LearnerExamComponent = () => {
  const [ShowQuestions, setShowQuestions] = useState(0);

  return (
    <div className={`${styles.questionSection}`}>
      {!ShowQuestions ? (
        <div className={`${styles.questionSection_questions}`}>
          <ExamAllQuestions />
          <AnswerAllOptions />
        </div>
      ) : (
        <div className={`${styles.questionSection_questions}`}>
            <QuestionPaperView2/>
        </div>
      )}
      <div className={`${styles.proctor_section}`}>
        <ProctoredSection />
        <QuestionCountButtonSection />
        <InfoSection showQuestions={ShowQuestions} setShowQuestions={setShowQuestions} />
      </div>
    </div>
  );
};

export default LearnerExamComponent;
