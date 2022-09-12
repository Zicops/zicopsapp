import Congratulations from '@/components/Congratulations';
import { data } from '@/components/LearnerExamComp/Logic/exam.helper';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export default function ExamResult() {
  const userData = useRecoilValue(UserStateAtom);

  const router = useRouter();
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    let jsonData = {};
    try {
      jsonData = JSON.parse(localStorage?.getItem('resultData'));
    } catch (err) {
      console.log(err);
    }

    setResultData(jsonData);
  }, []);

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: 'var(--dark_one)'
        }}>
        <Congratulations
          isSampleTest={true}
          resultIndex={resultData?.isPassed ? 1 : 0}
          user_name={`${userData?.first_name || ''} ${userData?.last_name || ''}`}
          exam_name={data?.examData?.name || ''}
          attemptData={{
            attempt: 1,
            examScore: resultData?.examScore,
            totalMarks: data?.examData?.totalMarks
          }}
          handleReturnToMainScreen={() =>
            router.push(`${localStorage?.getItem('sampleTestStartLink') || '/'}`)
          }
        />
      </div>
    </>
  );
}
