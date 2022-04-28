import InputField from '../../common/InputField';
import DropdownSelect from '../../Tabs/common/DropdownSelect';
import styles from './questionBankCard.module.scss';
import Button from '../../common/Button';
import { InputFieldData } from './Logic/QuestionBankCard.helper';
const QuestionBankCard = ({ title }) => {
  return (
    <div className={`${styles.qb_container}`}>
      <form>
        <span>{title} Question Bank</span>
        <InputField obj={InputFieldData[0]} />
        <InputField obj={InputFieldData[1]} />
        <DropdownSelect
          classes={styles.qbc_dropdown}
          data={['Accounting', 'Bussiness', 'Developement', 'Engg']}
          inputData={{
            inputName: 'category',
            label: 'Course Category',
            placeholder: 'Select the category of the course',
            value: 'disabled'
          }}
        />
        <DropdownSelect
          classes={styles.qbc_dropdown}
          data={['Accounting', 'Bussiness', 'Developement', 'Engg']}
          inputData={{
            inputName: 'category',
            label: 'Course subCategory',
            placeholder: 'Select the subcategory of the course',
            value: 'disabled'
          }}
        />
        <Button text={'Save'} />
        <Button text={'Cancel'} />
      </form>
    </div>
  );
};

export default QuestionBankCard;
