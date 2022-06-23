import InstructionLayout from './InstructionLayout';
import InstructionPage from './InstructionPage';

const ExamInstructions = ({ setIsLearner, isFullScreen, setIsFullScreen }) => {
  const examType = 'Scheduled';
  return (
    <InstructionLayout>
      <InstructionPage type={examType} setIsLearner={setIsLearner} isFullScreen={isFullScreen} setIsFullScreen={setIsFullScreen}/>
    </InstructionLayout>
  );
};

export default ExamInstructions;
