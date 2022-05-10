import LabeledDropdown from '../../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../../common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '../../../common/FormComponents/LabeledRadioCheckbox';
import NextButton from '../../../common/NextButton';
import styles from './questionPaperMaster.module.scss';

export default function QuestionPaperMaster() {
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
          label: 'Question Paper Name:',
          placeholder: 'Enter name of the course (Upto 60 characters)'
        }}
        styleClass={`${styles.inputField}`}
      />
      <LabeledInput
        styleClass={styles.inputField}
        inputOptions={{
          inputName: 'description',
          label: 'Description:',
          placeholder: 'Enter name of the course (Upto 60 characters)'
        }}
      />
      <LabeledDropdown
        styleClass={styles.inputField}
        dropdownOptions={{
          inputName: 'category',
          label: 'Category:',
          placeholder: 'Select the category of the course',
          options: categoryOption
        }}
      />
      <LabeledDropdown
        styleClass={styles.inputField}
        dropdownOptions={{
          inputName: 'sub_category',
          label: 'Sub-Category:',
          placeholder: 'Select the sub category of the course',
          options: categoryOption
        }}
      />
      <LabeledDropdown
        styleClass={styles.inputField}
        dropdownOptions={{
          inputName: 'question_paper_level',
          label: 'Question Paper Level:',
          placeholder: 'Select the sub category of the course',
          options: categoryOption
        }}
      />

      <div className={`${styles.footer}`}>
        <LabeledRadioCheckbox type="checkbox" label="Section Wise" name={'section_wise'} />

        <NextButton />
      </div>
      {/* <div className={`${styles.footer}`}>
        <Button text={'Add'} />
        <Button text={'Cancel'} />
      </div> */}
    </div>
  );
}
