import QuizInput from '../QuizInput/index';
import DropdownSelect from '../common/DropdownSelectCommon';
import styles from './quizOptionInput.module.scss';

const QuizOptionInput = () => {
  const data = ['MCQ', 'Descriptive'];
  const inputData = {
    inputName: 'quizOptions',
    value: 'disabled',
    placeholder: 'Select Question type',
    label: 'Select question type:'
  };
  return (
    <>
      <form className={`${styles.options}`}>
        <span>
          <DropdownSelect data={data} inputData={inputData} />
        </span>
        <span>Enter Question:</span>
        <QuizInput type="question" sr="Q" text="Enter question in less than 160 characters" />
        <span>Enter Options:</span>
        <QuizInput type="option" sr="O1" text="Enter question in less than 160 characters" />
        <QuizInput type="option" sr="O2" text="Enter question in less than 160 characters" />
        <QuizInput type="option" sr="O3" text="Enter question in less than 160 characters" />
        <QuizInput type="option" sr="O4" text="Enter question in less than 160 characters" />
      </form>
    </>
  );
};

export default QuizOptionInput;
