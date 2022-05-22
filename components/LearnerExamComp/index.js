
import ExamAllQuestions from './ExamAllQuestions';
import ProctoredSection from './ProctoredSection';
import QuestionCountButtonSection from './QuestionCountButton';
import styles from './learnerExam.module.scss'
import AnswerAllOptions from './AnswerAllOptions';
import InfoSection from './InfoSection';
import {useState} from "react";

const LearnerExamComponent = ({data, setData, current, setCurrent}) => {

    const [filter, setFilter] = useState('all')

  return (
    <div className={`${styles.questionSection}`}>
      <div className={`${styles.questionSection_questions}`}>
        <ExamAllQuestions
            current={current}
        />
        <AnswerAllOptions
            data={data} setData={setData}
            current={current} setCurrent={setCurrent}
        />
      </div>
      <div className={`${styles.proctor_section}`}>
          <ProctoredSection/>
          <QuestionCountButtonSection
              filterData={filter}
              data={data} setData={setData}
              current={current} setCurrent={setCurrent}
          />
          <InfoSection
              data={data} setFilter={setFilter}
          />
      </div>
    </div>
  );
};

export default LearnerExamComponent;
