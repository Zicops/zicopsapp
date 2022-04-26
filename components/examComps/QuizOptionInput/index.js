import QuizInput from './QuizInput/index';
import DropdownSelect from '../../Tabs/DropdownSelect';
import InputField from '../../common/InputField';
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
    <form className={`${styles.options}`}>
      <span>
        <DropdownSelect data={data} inputData={inputData} />
      </span>
      <span>Enter Question:</span>
      <QuizInput type="question" sr="Q" text="Enter question in less than 160 characters" />
      <span>Exam Hint:</span>
      <InputField
        obj={{
          type: 'text',
          name: 'hint',
          label: '',
          placeholder: 'Enter hint in 60 words',
          id: 'hint'
        }}
      />
      <span>Enter Options:</span>
      <span style={{ fontSize: 'small', float: 'right', paddingRight: '10px' }}>
        Select the checkbox for the right option.
      </span>
      <div style={{ marginTop: '20px' }}>
        <QuizInput type="option" sr="O1" text="Enter question in less than 160 characters" />
        <QuizInput type="option" sr="O2" text="Enter question in less than 160 characters" />
        <QuizInput type="option" sr="O3" text="Enter question in less than 160 characters" />
        <QuizInput type="option" sr="O4" text="Enter question in less than 160 characters" />
      </div>
    </form>
  );
};

export default QuizOptionInput;
