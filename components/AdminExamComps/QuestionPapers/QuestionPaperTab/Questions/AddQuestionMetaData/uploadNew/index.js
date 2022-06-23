import LabeledDropdown from '../../../../../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../../../../../common/FormComponents/LabeledInput';
import styles from '../addQuestionMetaData.module.scss';
import UploadButton from './UploadButton';

export default function UploadNewQuestionBank({ text }) {
  const categoryOption = [
    { value: 'Accounting', label: 'Accounting' },
    { value: 'Bussiness', label: 'Bussiness' },
    { value: 'Developement', label: 'Developement' },
    { value: 'Engg', label: 'Engg' }
  ];

  return (
    <div className={`${styles.container}`}>
      <LabeledInput
        styleClass={styles.inputField}
        inputOptions={{
          inputName: 'name',
          label: 'Name:',
          placeholder: 'Enter the name in less than 60 characters'
        }}
      />
      <LabeledInput
        styleClass={styles.inputField}
        inputOptions={{
          inputName: 'description',
          label: 'Description:',
          placeholder: 'Enter the description in less than 160 characters'
        }}
      />

      <div className={styles.twoInputContainer}>
        <LabeledDropdown
          styleClass={styles.halfInputField}
          dropdownOptions={{
            inputName: 'category',
            label: 'Category:',
            placeholder: 'Select category',
            options: categoryOption,
            isSearchEnable: true
          }}
          isFiftyFifty={true}
        />
        <LabeledDropdown
          styleClass={`${styles.halfInputField} ${styles.paddingToLabel}`}
          dropdownOptions={{
            inputName: 'sub_category',
            label: 'Sub-Category:',
            placeholder: 'Select sub-category',
            options: categoryOption,
            isSearchEnable: true
          }}
          isFiftyFifty={true}
        />
      </div>

      <div className={`${styles.uqContainer}`}>
        <UploadButton />
      </div>
    </div>
  );
}
