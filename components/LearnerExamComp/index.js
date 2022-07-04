import { LearnerExamAtom } from '@/state/atoms/exams.atoms';
import { useLazyQuery } from '@apollo/client';
import { GET_QUESTION_OPTIONS_WITH_ANSWER, queryClient } from 'API/Queries';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import NewQuestionPaperPreview from '../examComps/NewQuestionPaperPreview';
import AnswerAllOptions from './AnswerAllOptions';
import ExamAllQuestions from './ExamAllQuestions';
import InfoSection from './InfoSection';
import styles from './learnerExam.module.scss';
import { getPassingMarks } from './Logic/exam.helper';
import ProctoredSection from './ProctoredSection';
import QuestionCountButtonSection from './QuestionCountButton';

const LearnerExamComponent = ({ data, setData, current, setCurrent }) => {
  const [loadOptions, { error: errorOptionsData }] = useLazyQuery(
    GET_QUESTION_OPTIONS_WITH_ANSWER,
    { client: queryClient }
  );
  const [learnerExamData, setLearnerExamData] = useRecoilState(LearnerExamAtom);
  const router = useRouter();

  const [filter, setFilter] = useState('all');
  const [option, setOption] = useState(current?.selectedOption);
  const [isQuestion, setIsQuestion] = useState(false);

  async function calculateResult() {
    const marks = 0;
    const allQuestionIds = [];
    const allOptions = [];
    data?.forEach((obj) => allQuestionIds.push(obj?.question?.id));

    let isError = false;
    const optionsRes = await loadOptions({ variables: { question_id: allQuestionIds } }).catch(
      (err) => {
        console.log('Options Load Err', err);
        isError = !!err;
      }
    );

    if (isError) return;

    if (optionsRes?.data?.getOptionsForQuestions) {
      optionsRes?.data?.getOptionsForQuestions.forEach((obj) => {
        obj?.options.forEach((option) => {
          allOptions.push({ id: option.id, qmId: option.QmId, isCorrect: option.IsCorrect });
        });
      });
    }

    learnerExamData?.sectionData?.forEach((section) => {
      section?.questions.forEach((id) => {
        const ques = data?.filter((q) => q?.question?.id === id)[0];
        const selectedOption = ques?.selectedOption
          ? allOptions?.find((op) => op?.id === ques?.selectedOption)
          : null;
        const isCorrect = selectedOption?.isCorrect || false;

        marks += isCorrect ? +ques?.question?.question_marks : 0;
      });
    });

    const passingMarks = getPassingMarks(
      learnerExamData?.examData?.passingCriteria,
      learnerExamData?.examData?.totalMarks
    );

    setLearnerExamData({
      ...learnerExamData,
      resultData: {
        examScore: marks,
        isPassed: passingMarks <= marks
      }
    });
  }

  useEffect(() => {
    if (learnerExamData?.resultData?.examScore == null) return;

    router.push('/exam-result');
  }, [learnerExamData?.resultData?.examScore]);

  return (
    <div className={`${styles.questionSection}`}>
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
              option={option}
              setOption={setOption}
              data={data}
              setData={setData}
              current={current}
              setCurrent={setCurrent}
              filter={filter}
              setFilter={setFilter}
              submitPaper={() => calculateResult()}
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
        <InfoSection
          handleEndButton={calculateResult}
          setIsQuestion={setIsQuestion}
          data={data}
          setFilter={setFilter}
        />
      </div>
    </div>
  );
};

export default LearnerExamComponent;
