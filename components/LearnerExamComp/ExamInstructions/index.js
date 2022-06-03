import InstructionLayout from './InstructionLayout';
import InstructionPage from './InstructionPage';

const ExamInstructions = ({ setIsLearner }) => {
  const examType = 'Scheduled';
  return (
    <InstructionLayout>
      <InstructionPage type={examType} setIsLearner={setIsLearner} />
    </InstructionLayout>
  );
};

export default ExamInstructions;
