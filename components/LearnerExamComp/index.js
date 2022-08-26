import { ADD_USER_EXAM_RESULTS, userClient } from '@/api/UserMutations';
import { LearnerExamAtom } from '@/state/atoms/exams.atoms';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UserExamDataAtom } from '@/state/atoms/video.atom';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_QUESTION_OPTIONS_WITH_ANSWER, queryClient } from 'API/Queries';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import NewQuestionPaperPreview from '../examComps/NewQuestionPaperPreview';
import AnswerAllOptions from './AnswerAllOptions';
import ExamAllQuestions from './ExamAllQuestions';
import InfoSection from './InfoSection';
import styles from './learnerExam.module.scss';
import { getPassingMarks } from './Logic/exam.helper';
import ProctoredSection from './ProctoredSection';
import QuestionCountButtonSection from './QuestionCountButton';

const LearnerExamComponent = ({
  data,
  setData,
  current,
  setCurrent,
  syncDataWithBackend,
  calculateResult
}) => {
  const [loadOptions, { error: errorOptionsData }] = useLazyQuery(
    GET_QUESTION_OPTIONS_WITH_ANSWER,
    { client: queryClient }
  );
  const [learnerExamData, setLearnerExamData] = useRecoilState(LearnerExamAtom);
  const [userExamData, setUserExamData] = useRecoilState(UserExamDataAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const router = useRouter();

  const [filter, setFilter] = useState('all');
  const [option, setOption] = useState(current?.selectedOption);
  const [isQuestion, setIsQuestion] = useState(false);

  useEffect(() => {
    if (learnerExamData?.resultData?.examScore == null) return;

    router.push(`/exam-result`);
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
          handleQuestionPaperClick={() => {
            syncDataWithBackend(true);
            setIsQuestion(true);
          }}
          data={data}
          setFilter={setFilter}
        />
      </div>
    </div>
  );
};

export default LearnerExamComponent;
