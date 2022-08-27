import { LearnerExamAtom } from '@/state/atoms/exams.atoms';
import { UserExamDataAtom } from '@/state/atoms/video.atom';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import AttemptsTable from '../common/AttemptsTable';
import CongratulationsScreenButton from '../common/CongratulationsScreenButton';
import CongratulationsFooter from './CongratulationsFooter';
import CongratulationsHead from './CongratulationsHead';
import CongratulationsScreen from './CongratulationsScreen';
import { data, getResultStyles } from './Logic/congratulationsHead.helper';
const Congratulations = ({ resultIndex }) => {
  const learnerExamData = useRecoilValue(LearnerExamAtom);
  const userExamData = useRecoilValue(UserExamDataAtom);

  const router = useRouter();
  const cpId = router?.query?.cpId;
  const examId = router?.query?.examId;

  const style = getResultStyles(data[resultIndex].result);

  return (
    <div style={{ width: '70%' }}>
      <CongratulationsScreen>
        <CongratulationsHead
          user_name={'pallav'}
          exam_name={learnerExamData?.examData?.name || ''}
          data={data[resultIndex]}
          style={style}
        />
        <AttemptsTable
          totalAttempts={3}
          attemptData={[
            {
              attempt: 1,
              examScore: learnerExamData?.resultData?.examScore,
              totalMarks: learnerExamData?.examData?.totalMarks,
              result: data[resultIndex].result
            }
          ]}
          customStyle={{ maxWidth: 'none' }}
        />
      </CongratulationsScreen>
      <CongratulationsFooter>
        <CongratulationsScreenButton title={'Download Result'} />
        <CongratulationsScreenButton
          handleClick={() => router.push(`/answer-key/cp/${cpId}/exam/${examId}`)}
          title={'View Attempt History'}
        />

        <CongratulationsScreenButton title={'Exit And Return To Main Screen'} />
      </CongratulationsFooter>
    </div>
  );
};

export default Congratulations;
