import InstructionLayout from './InstructionLayout';
import InstructionPage from './InstructionPage';

const ExamInstructions = () => {
  const examType = 'Scheduled';
  return (
    <InstructionLayout>
      <InstructionPage type={examType} />
    </InstructionLayout>
  );
};

export default ExamInstructions;
