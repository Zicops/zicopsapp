import InputField from '../../common/InputField';
import DropdownSelect from '../../Tabs/DropdownSelect';
import QuizCheckBox from '../QuizOptionInput/QuizCheckBox';
import styles from './createNewQuestionPaper.module.scss';

const CreateNewQuestionPaper = () => {
  const obj1 = {
    type: 'text',
    name: 'qPaperName',
    label: 'Question Paper Name:',
    placeholder: 'Enter name of the course (Upto 60 characters)',
    id: 'name'
  };

  const obj2 = {
    type: 'text',
    name: 'description',
    label: 'Description:',
    placeholder: 'Enter name of the course (Upto 160 characters)',
    id: 'description'
  };
  return (
    <div className={`${styles.container}`}>
      <form>
        <InputField obj={obj1} classes={styles.Container} />
        <InputField obj={obj2} classes={styles.Container} />
        <DropdownSelect
          classes={styles.dropdown}
          data={['Accounting', 'Bussiness', 'Developement', 'Engg']}
          inputData={{
            inputName: 'category',
            label: 'Category:',
            placeholder: 'Select the category of the course',
            value: 'disabled'
          }}
        />
        <DropdownSelect
          classes={styles.dropdown}
          data={['Accounting', 'Bussiness', 'Developement', 'Engg']}
          inputData={{
            inputName: 'category',
            label: 'Sub Category:',
            placeholder: 'Select the category of the course',
            value: 'disabled'
          }}
        />
        <DropdownSelect
          classes={styles.dropdown}
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
