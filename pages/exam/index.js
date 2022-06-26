import { getLearnerExamObj, LearnerExamAtom } from '@/state/atoms/exams.atoms';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import ExamLandingPage from '../../components/LearnerExamComp/ExamLandingPage';

const ExamStartScreen = () => {
  const [learnerExamData, setLearnerExamData] = useRecoilState(LearnerExamAtom);

  useEffect(() => {
    setLearnerExamData(getLearnerExamObj());
  }, []);
  return (
    <>
      <div className="examlanding">
        <ExamLandingPage />
      </div>
      <style jsx>
        {`
          .examlanding {
            padding-top: 50px;
            // padding-bottom: -20px;
          }
        `}
      </style>
    </>
  );
};

export default ExamStartScreen;
