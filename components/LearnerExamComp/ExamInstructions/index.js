import AttempHistory from '@/components/AttemptHistory';
import InstructionLayout from './InstructionLayout';
import InstructionPage from './InstructionPage';

const ExamInstructions = ({ handleStart, isFullScreen }) => {
  return (
    <InstructionLayout>
      <InstructionPage handleStart={handleStart} isFullScreen={isFullScreen} />
    </InstructionLayout>
  );
};

export default ExamInstructions;
