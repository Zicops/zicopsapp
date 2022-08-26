import AttempHistory from '@/components/AttemptHistory';
import InstructionLayout from './InstructionLayout';
import InstructionPage from './InstructionPage';

const ExamInstructions = ({ handleStart, isFullScreen, isTestExam = false }) => {
  return (
    <InstructionLayout>
      <InstructionPage
        isTestExam={isTestExam}
        handleStart={handleStart}
        isFullScreen={isFullScreen}
      />
    </InstructionLayout>
  );
};

export default ExamInstructions;
