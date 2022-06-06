import { useState } from 'react';
import ExamLandingPage from '../../components/LearnerExamComp/ExamLandingPage';

const ExamStartScreen = () => {

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
