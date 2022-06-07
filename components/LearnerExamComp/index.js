import { useRef, useState } from "react";
import NewQuestionPaperPreview from '../examComps/NewQuestionPaperPreview';
import AnswerAllOptions from './AnswerAllOptions';
import ExamAllQuestions from './ExamAllQuestions';
import InfoSection from './InfoSection';
import styles from './learnerExam.module.scss';
import ProctoredSection from './ProctoredSection';
import QuestionCountButtonSection from './QuestionCountButton';

const LearnerExamComponent = ({
  data,
  setData,
  current,
  setCurrent,
  isFullScreen,
  setIsFullScreen
}) => {
  const [filter, setFilter] = useState('all');
  const [option, setOption] = useState(current?.selectedOption);
  const [isQuestion, setIsQuestion] = useState(false);
  const examRef = useRef(null);
  return (
    <div className={`${styles.questionSection}`} ref={examRef}>
      <div className={`${styles.questionSection_questions}`}>
        {isQuestion ? (
          <NewQuestionPaperPreview
            setIsQuestion={setIsQuestion}
            setOption={setOption}
            data={data}
            setData={setData}
            current={current}
            setCurrent={setCurrent}
          />
        ) : (
          <div>
            <ExamAllQuestions current={current} />
            <AnswerAllOptions
              isFullScreen={isFullScreen}
              setIsFullScreen={setIsFullScreen}
              option={option}
              setOption={setOption}
              data={data}
              setData={setData}
              current={current}
              setCurrent={setCurrent}
              filter={filter}
              setFilter={setFilter}
              examRef={examRef}
            />
          </div>
        )}
      </div>
      <div className={`${styles.proctor_section}`}>
        <ProctoredSection />
        <QuestionCountButtonSection
          filterData={filter}
          setOption={setOption}
          setIsQuestion={setIsQuestion}
          data={data}
          setData={setData}
          current={current}
          setCurrent={setCurrent}
        />
        <InfoSection setIsQuestion={setIsQuestion} data={data} setFilter={setFilter} />
      </div>
    </div>
  );
};

export default LearnerExamComponent;
