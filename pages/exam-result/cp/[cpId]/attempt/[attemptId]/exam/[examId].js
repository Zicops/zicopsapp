import { LearnerExamAtom } from '@/state/atoms/exams.atoms';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import Congratulations from '../../../../../components/Congratulations';

export default function ExamResult() {
  const learnerExamData = useRecoilValue(LearnerExamAtom);
  const isShowResult = learnerExamData?.examData?.show_result || false;

  let resultIndex = 2;
  if (isShowResult) resultIndex = learnerExamData?.resultData?.isPassed ? 0 : 1;

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // width: '100vw',
          height: '100vh',
          backgroundColor: 'var(--dark_one)',
          overflow: 'clip'
        }}>
        <Congratulations resultIndex={resultIndex} />
      </div>
    </>
  );
}
