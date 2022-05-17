
import ExamAllQuestions from './ExamAllQuestions';
import ProctoredSection from './ProctoredSection';
import QuestionCountButtonSection from './QuestionCountButton';
import styles from './learnerExam.module.scss'
import AnswerAllOptions from './AnswerAllOptions';
import InfoSection from './InfoSection';

const LearnerExamComponent = ({data, setData, current, setCurrent}) => {
  return (
    <div className={`${styles.questionSection}`}>
      <div className={`${styles.questionSection_questions}`}>
        <ExamAllQuestions
            data={data} current={current}
        />
        <AnswerAllOptions
            data={data} setData={setData}
            current={current} setCurrent={setCurrent}
        />
      </div>
      <div className={`${styles.proctor_section}`}>
          <ProctoredSection/>
        <QuestionCountButtonSection
            data={data} setData={setData}
            current={current} setCurrent={setCurrent}
        />
        <InfoSection
            data={data} setData={setData}
            current={current} setCurrent={setCurrent}
        />
      </div>
    </div>
  );
};

export default LearnerExamComponent;
