import InstructionLayout from './InstructionLayout';
import InstructionPage from './InstructionPage';

const ExamInstructions = ({ setIsLearner, isFullScreen }) => {
  return (
    <InstructionLayout>
      <InstructionPage setIsLearner={setIsLearner} isFullScreen={isFullScreen} />
    </InstructionLayout>
  );
};

export default ExamInstructions;
