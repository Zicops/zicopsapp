import InputField from '../common/InputField';
import DropdownSelect from '../common/DropdownSelectCommon';
import styles from './questionBankCard.module.scss';
import Button from '../common/Button';

const QuestionBankCard = ({ title }) => {
  const obj1 = {
    type: 'text',
    name: 'Name',
    label: 'Name',
    placeholder: 'Enter name of the course (Upto 60 characters)',
    id: 'name'
  };

  const obj2 = {
    type: 'text',
    name: 'description',
    label: 'Description',
    placeholder: 'Enter name of the course (Upto 160 characters)',
    id: 'description'
  };

  return (
    <div className={`${styles.qb_container}`}>
      <form>
        <span>{title} Question Bank</span>
        <InputField obj={obj1} />
        <InputField obj={obj2} />
        <DropdownSelect
          data={['Accounting', 'Bussiness', 'Developement', 'Engg']}
          inputData={{
            inputName: 'category',
            label: 'Course Category',
            placeholder: 'Select the category of the course',
            value: 'disabled'
          }}
        />
        <DropdownSelect
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
