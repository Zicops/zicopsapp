import AttempHistory from '@/components/AttemptHistory';
import InstructionLayout from './InstructionLayout';
import InstructionPage from './InstructionPage';

const ExamInstructions = ({
  handleStart,
  isFullScreen,
  isSampleTest = false,
  isTestExam = false,
  handleBackBtn
}) => {
  return (
    <InstructionLayout>
      <InstructionPage
        isTestExam={isTestExam}
        handleStart={handleStart}
        isFullScreen={isFullScreen}
        handleBackBtn={handleBackBtn}
        isSampleTest={isSampleTest}
      />
    </InstructionLayout>
  );
};

export default ExamInstructions;
