import { LearnerExamAtom } from '@/state/atoms/exams.atoms';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { UserCourseDataAtom, UserExamDataAtom } from '@/state/atoms/video.atom';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import Congratulations from '../../../../../components/Congratulations';

export default function ExamResult() {
  const learnerExamData = useRecoilValue(LearnerExamAtom);
  const userExamData = useRecoilValue(UserExamDataAtom);
  const userCourseData = useRecoilValue(UserCourseDataAtom);
  const userData = useRecoilValue(UserStateAtom);

  const router = useRouter();
  const cpId = router?.query?.cpId;
  const examId = router?.query?.examId;

  const isShowResult = learnerExamData?.examData?.show_result || false;

  let resultIndex = 2;
  if (isShowResult) resultIndex = learnerExamData?.resultData?.isPassed ? 0 : 1;

  useEffect(() => {
    if (!userExamData?.currentAttemptId) router.back();
  }, []);

  const currentAttemptData = userExamData?.userExamAttempts.find(
    (ea) => ea?.user_ea_id === userExamData?.currentAttemptId
  );

  function handleReturnToMainScreen() {
    const courseId = userCourseData?.userCourseMapping?.course_id;
    router.push(`/course/${courseId}?activateExam=${examId}`, `/course/${courseId}`);
  }

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
          resultIndex={resultIndex}
          user_name={`${userData?.first_name || ''} ${userData?.last_name || ''}`}
          exam_name={learnerExamData?.examData?.name || ''}
          totalAttempts={
            +learnerExamData?.examData?.noAttempts > 0 ? learnerExamData?.examData?.noAttempts : ''
          }
          attemptData={{
            attempt: currentAttemptData?.attempt_no || 1,
            examScore: learnerExamData?.resultData?.examScore,
            totalMarks: learnerExamData?.examData?.totalMarks
          }}
          handleReturnToMainScreen={handleReturnToMainScreen}
        />
      </div>
    </>
  );
}
