
import ExamAllQuestions from './ExamAllQuestions';
import ProctoredSection from './ProctoredSection';
import QuestionCountButtonSection from './QuestionCountButton';
import styles from './learnerExam.module.scss'
import AnswerAllOptions from './AnswerAllOptions';
import InfoSection from './InfoSection';
import {useState} from "react";

const LearnerExamComponent = ({data, setData, current, setCurrent}) => {

    const [filter, setFilter] = useState('all')
    const [option, setOption] = useState(current?.selectedOption);

  return (
    <div className={`${styles.questionSection}`}>
      <div className={`${styles.questionSection_questions}`}>
        <ExamAllQuestions
            current={current}
        />
        <AnswerAllOptions
            option={option} setOption={setOption}
            data={data} setData={setData}
            current={current} setCurrent={setCurrent}
            filter={filter} setFilter={setFilter}
        />
      </div>
      <div className={`${styles.proctor_section}`}>
          <ProctoredSection/>
          <QuestionCountButtonSection
              filterData={filter} setOption={setOption}
              data={data} setData={setData}
              current={current} setCurrent={setCurrent}
          />
          <InfoSection
              filter={filter}
              data={data} setFilter={setFilter}
          />
      </div>
    </div>
  );
};

export default LearnerExamComponent;
