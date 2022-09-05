import ExamScreenPage from '@/components/LearnerExamComp/ExamScreenPage';
import {
  getPassingMarks,
  questionData as examData
} from '@/components/LearnerExamComp/Logic/exam.helper';
import { getLearnerExamObj, LearnerExamAtom } from '@/state/atoms/exams.atoms';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

const ExamScreen = () => {
  let [learnerExamData, setLearnerExamData] = useRecoilState(LearnerExamAtom);

  const router = useRouter();

  examData.forEach((each) => {
    each.isVisited = false;
    each.isMarked = false;
    each.selectedOption = null;
  });

  examData[0].isVisited = true;

  const [data, setData] = useState(examData);
  const [current, setCurrent] = useState(data[0]);
  const [isLearner, setIsLearner] = useState(false);

  useEffect(() => {
    setLearnerExamData(getLearnerExamObj());
    setData(examData);
  }, []);

  function calculateResult() {
    const marks = 0;

    data?.forEach((obj) => {
      if (obj?.options?.[+obj.selectedOption]?.isCorrect) {
        marks += obj?.question?.question_marks || 1;
      }
    });

    const passingMarks = getPassingMarks(
      learnerExamData?.examData?.passingCriteria,
      learnerExamData?.examData?.totalMarks
    );

    const result_status = JSON.stringify({ examScore: marks, isPassed: passingMarks <= marks });
    console.log(result_status);
    localStorage?.setItem('resultData', result_status);
    router.push('/exam-result');
  }

  return (
    <>
      <ExamScreenPage
        isSampleTest={true}
        isLearner={isLearner}
        questionData={data}
        setQuestionData={setData}
        current={current}
        setCurrent={setCurrent}
        calculateResult={calculateResult}
        handleExamStart={() => setIsLearner(true)}
      />
      {/* <div ref={refFullscreen}>
      {isLearner ? (
        <LearnerExamComponent
          data={data}
          setData={setData}
          current={current}
          setCurrent={setCurrent}
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
          isTestExam={true}
        />
      ) : (
        // <ExamLandingPage setIsLearner={setIsLearner} />
        <ExamInstruction
          isTestExam={true}
          setIsLearner={setIsLearner}
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
        />
      )}
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          display: 'flex',
          gap: '10px',
          marginLeft: '40px'
        }}>
        <div onClick={toggleFullScreen}>
          {isFullScreen ? (
            <Image src="/images/svg/fullscreen_exit.svg" height={30} width={30} />
          ) : (
            <Image src="/images/svg/fullscreen.svg" height={30} width={30} />
          )}
        </div>
        <div onClick={() => router.push('/exam')}>
          <Image src="/images/svg/clear.svg" height={30} width={30} />
        </div>
      </div>
    </div> */}
    </>
  );
};

export default ExamScreen;
