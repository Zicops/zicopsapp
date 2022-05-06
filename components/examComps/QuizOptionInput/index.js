import QuizInput from './QuizInput/index';
import DropdownSelect from '../../Tabs/common/DropdownSelect';
import InputField from '../../common/InputField';
import styles from './quizOptionInput.module.scss';
import LabeledDropdown from '../../common/FormComponents/LabeledDropdown';
import LabeledTextarea from '../../common/FormComponents/LabeledTextarea';

const QuizOptionInput = () => {
  const data = ['MCQ', 'Descriptive'];
  const inputData = {
    inputName: 'quizOptions',
    value: 'disabled',
    placeholder: 'Select Question type',
    label: 'Select question type:'
  };
  const dropdownOptions = {
    inputName: 'questionType',
    label: 'Select Question Type',
    placeholder: 'Select question type',
    options: [
      { label: 'MCQ', value: 'MCQ' },
      { label: 'Descriptive', value: 'Descriptive' }
    ],
    isDisabled: false,
    isSearchEnable: false,
    isMulti: false
  };
  return (
    <form className={`${styles.options}`}>
      <span>
        <LabeledDropdown dropdownOptions={dropdownOptions} />
      </span>
      <br />
      <div> Enter Question: </div>
      <br />
      <QuizInput type="question" sr="Q" text="Enter question in less than 160 characters" />
      <div>Exam Hint:</div>
      <br />
      <LabeledTextarea
        inputOptions={{
          inputName: 'hint',
          placeholder: 'Enter hint in less than 300 characters.',
          rows: 4
        }}
      />
      <br />
      <span>Enter Options:</span>
      <span style={{ fontSize: 'small', float: 'right', paddingRight: '10px' }}>
        Select the checkbox for the right option.
      </span>
      <div style={{ marginTop: '20px', paddingBottom: '30px' }}>
        <QuizInput type="option" sr="O1" text="Enter question in less than 160 characters" />
        <QuizInput type="option" sr="O2" text="Enter question in less than 160 characters" />
        <QuizInput type="option" sr="O3" text="Enter question in less than 160 characters" />
        <QuizInput type="option" sr="O4" text="Enter question in less than 160 characters" />
      </div>
    </form>
  );
};

export default QuizOptionInput;
