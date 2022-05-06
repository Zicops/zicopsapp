import LabeledDropdown from '../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../common/FormComponents/LabeledInput';
import styles from './addQuestionBank.module.scss';

export default function AddQuestionBank() {
  const categoryOption = [
    { value: 'Accounting', label: 'Accounting' },
    { value: 'Bussiness', label: 'Bussiness' },
    { value: 'Developement', label: 'Developement' },
    { value: 'Engg', label: 'Engg' }
  ];

  return (
    <div className={`${styles.qb_container}`}>
      <LabeledInput
        inputOptions={{
          inputName: 'name',
          label: 'Name:',
          placeholder: 'Enter name of the course (Upto 60 characters)'
        }}
        styleClass={`${styles.inputField}`}
      />
      <br />
      <LabeledInput
        styleClass={styles.inputField}
        inputOptions={{
          inputName: 'description',
          label: 'Description:',
          placeholder: 'Enter name of the course (Upto 60 characters)'
        }}
      />
      <br />
      <LabeledDropdown
        styleClass={styles.inputField}
        dropdownOptions={{
          inputName: 'category',
          label: 'Category:',
          placeholder: 'Select the category of the course',
          options: categoryOption
        }}
      />
      <br />
      <LabeledDropdown
        styleClass={styles.inputField}
        dropdownOptions={{
          inputName: 'sub_category',
          label: 'Sub-Category:',
          placeholder: 'Select the sub category of the course',
          options: categoryOption
        }}
      />
    </div>
  );
}
