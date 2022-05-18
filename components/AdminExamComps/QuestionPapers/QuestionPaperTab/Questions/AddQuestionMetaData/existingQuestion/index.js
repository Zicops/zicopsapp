import { changeHandler } from '../../../../../../../helper/common.helper';
import LabeledDropdown from '../../../../../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../../../../../common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '../../../../../../common/FormComponents/LabeledRadioCheckbox';
import styles from '../addQuestionMetaData.module.scss';

export default function ExistingQuestion({newMetaData, setNewMetaData}) {
  const categoryOption = [
    { value: 'Accounting', label: 'Accounting' },
    { value: 'Bussiness', label: 'Bussiness' },
    { value: 'Developement', label: 'Developement' },
    { value: 'Engg', label: 'Engg' }
  ];

  return (
    <>
      <div className={styles.twoInputContainer}>
        <LabeledDropdown
          styleClass={styles.halfInputField}
          dropdownOptions={{
            inputName: 'category',
            label: 'Category:',
            placeholder: 'Select category',
            options: categoryOption
          }}
          isFiftyFifty={true}
        />
        <LabeledDropdown
          styleClass={`${styles.halfInputField} ${styles.paddingToLabel}`}
          dropdownOptions={{
            inputName: 'sub_category',
            label: 'Sub-Category:',
            placeholder: 'Select sub-category',
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
      <LabeledDropdown
        styleClass={styles.inputField}
        dropdownOptions={{
          inputName: 'questionBank',
          label: 'Question Bank:',
          placeholder: 'Select the question bank to choose question from',
          options: categoryOption
        }}
        changeHandler={(e) => changeHandler(e, newMetaData, setNewMetaData, 'questionBank')}
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
            inputName: 'numberOfQuestions',
            label: 'No. of Question:',
            placeholder: 'Enter No. of Question'
          }}
          changeHandler={(e) => changeHandler(e, newMetaData, setNewMetaData)}
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
