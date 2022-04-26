import InputField from '../../common/InputField';
import DropdownSelect from '../../Tabs/DropdownSelect';
import QuizCheckBox from '../QuizOptionInput/QuizCheckBox';
import styles from './createNewQuestionPaper.module.scss';
import { InputFieldData } from './Logic/createNewQuestionPaper.helper';

const CreateNewQuestionPaper = () => {
  return (
    <div>
      <form>
        <InputField obj={InputFieldData[0]} />
        <InputField obj={InputFieldData[1]} />
        <DropdownSelect
          classes={styles.cnq_dropdown}
          data={['Accounting', 'Bussiness', 'Developement', 'Engg']}
          inputData={{
            inputName: 'category',
            label: 'Category:',
            placeholder: 'Select the category of the course',
            value: 'disabled'
          }}
        />
        <DropdownSelect
          classes={styles.cnq_dropdown}
          data={['Accounting', 'Bussiness', 'Developement', 'Engg']}
          inputData={{
            inputName: 'category',
            label: 'Sub Category:',
            placeholder: 'Select the category of the course',
            value: 'disabled'
          }}
        />
        <DropdownSelect
          classes={styles.cnq_dropdown}
          data={['Accounting', 'Bussiness', 'Developement', 'Engg']}
          inputData={{
            inputName: 'category',
            label: 'Question Paper Level:',
            placeholder: 'Select the category of the course',
            value: 'disabled'
          }}
        />
      </form>
      <div className={`${styles.innerContainer}`}>
        <div className={`${styles.small}`}>
          <QuizCheckBox />
          <span>Section Wise</span>
        </div>
        <button>
          Next
          <img src="./images/bigarrowright.png" alt="Not Found" />
        </button>
      </div>
    </div>
  );
};

export default CreateNewQuestionPaper;
