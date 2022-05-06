import LabeledDropdown from '../../../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../../../common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '../../../../common/FormComponents/LabeledRadioCheckbox';
import styles from '../addQuestionMetaData.module.scss';

export default function ExistingQuestion() {
  const categoryOption = [
    { value: 'Accounting', label: 'Accounting' },
    { value: 'Bussiness', label: 'Bussiness' },
    { value: 'Developement', label: 'Developement' },
    { value: 'Engg', label: 'Engg' }
  ];

  return (
    <>
      <LabeledDropdown
        styleClass={styles.inputField}
        dropdownOptions={{
          inputName: 'question_bank',
          label: 'Question Bank:',
          placeholder: 'Select the sub category of the course',
          options: categoryOption
        }}
      />

      <div className={styles.twoInputContainer}>
        <LabeledDropdown
          styleClass={styles.halfInputField}
          dropdownOptions={{
            inputName: 'category',
            label: 'Category:',
            placeholder: 'Select the category',
            options: categoryOption
          }}
          isFiftyFifty={true}
        />
        <LabeledDropdown
          styleClass={`${styles.halfInputField} ${styles.paddingToLabel}`}
          dropdownOptions={{
            inputName: 'sub_category',
            label: 'Sub-Category:',
            placeholder: 'Select the sub category',
            options: categoryOption
          }}
          isFiftyFifty={true}
        />
      </div>

      <LabeledDropdown
        styleClass={styles.inputField}
        dropdownOptions={{
          inputName: 'question_bank',
          label: 'Difficulty:',
          placeholder: 'Select difficulty level',
          options: categoryOption
        }}
      />
      <div className={styles.twoInputContainer}>
        <LabeledInput
          styleClass={styles.inputField}
          inputOptions={{
            inputName: 'marks',
            label: 'Marks Per Question:',
            placeholder: 'Enter Marks Per Question'
          }}
          isFiftyFifty={true}
        />
        <LabeledInput
          styleClass={`${styles.paddingToLabel}`}
          inputOptions={{
            inputName: 'number_of_questions',
            label: 'No. of Question:',
            placeholder: 'Enter No. of Question'
          }}
          isFiftyFifty={true}
        />
      </div>

      <LabeledInput
        styleClass={styles.inputField}
        inputOptions={{
          inputName: 'total',
          label: 'Total Marks:',
          placeholder: 'Total Marks'
        }}
      />

      <div className={`${styles.radioContainer} ${styles.inputField}`}>
        <label>Question Pick:</label>
        <LabeledRadioCheckbox type="radio" label="Random" name="pick" />
        <LabeledRadioCheckbox type="radio" label="Manual" name="pick" />
      </div>
    </>
  );
}
