
import ExamAllQuestions from './ExamAllQuestions';
import ProctoredSection from './ProctoredSection';
import QuestionCountButtonSection from './QuestionCountButton';
import styles from './learnerExam.module.scss'
import AnswerAllOptions from './AnswerAllOptions';
import InfoSection from './InfoSection';
import {useState} from "react";
import QuestionPaperView2 from "../examComps/QuestionPaperView2/QuestionPaperPreview";

const LearnerExamComponent = ({data, setData, current, setCurrent}) => {

    const [filter, setFilter] = useState('all')
    const [option, setOption] = useState(current?.selectedOption);
    const [isQuestion, setIsQuestion] = useState(false)

  return (
    <div className={`${styles.questionSection}`}>
      <div className={`${styles.questionSection_questions}`}>
          {
              isQuestion ? <QuestionPaperView2 setIsQuestion={setIsQuestion} setOption={setOption} data={data} setData={setData} current={current} setCurrent={setCurrent}/>
                  : (
                  <>
                      <ExamAllQuestions
                          current={current}
                      />
                      <AnswerAllOptions
                          option={option} setOption={setOption}
                          data={data} setData={setData}
                          current={current} setCurrent={setCurrent}
                          filter={filter} setFilter={setFilter}
                      />
                  </>
              )
          }

      </div>
      <div className={`${styles.proctor_section}`}>
          <ProctoredSection/>
          <QuestionCountButtonSection
              filterData={filter} setOption={setOption}
              data={data} setData={setData}
              current={current} setCurrent={setCurrent}
          />
          <InfoSection
              setIsQuestion={setIsQuestion}
              data={data} setFilter={setFilter}
          />
      </div>
    </div>
  );
};

export default LearnerExamComponent;
