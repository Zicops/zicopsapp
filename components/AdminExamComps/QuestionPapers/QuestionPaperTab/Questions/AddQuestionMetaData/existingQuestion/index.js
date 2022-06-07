import { changeHandler } from '../../../../../../../helper/common.helper';
import LabeledDropdown from '../../../../../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../../../../../common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '../../../../../../common/FormComponents/LabeledRadioCheckbox';
import styles from '../addQuestionMetaData.module.scss';

export default function ExistingQuestion({ metaData, setMetaData, questionBankOptions }) {
  const categoryOption = [
    { value: '', label: '-- Select --' },
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
            options: categoryOption,
            value: metaData?.category
              ? { value: metaData?.category, label: metaData?.category }
              : null
          }}
          changeHandler={(e) => changeHandler(e, metaData, setMetaData, 'category')}
          isFiftyFifty={true}
        />

        <LabeledDropdown
          styleClass={`${styles.halfInputField} ${styles.paddingToLabel}`}
          dropdownOptions={{
            inputName: 'sub_category',
            label: 'Sub-Category:',
            placeholder: 'Select sub-category',
            options: categoryOption,
            value: { value: metaData?.sub_category, label: metaData?.sub_category }
          }}
          changeHandler={(e) => changeHandler(e, metaData, setMetaData, 'sub_category')}
          isFiftyFifty={true}
        />
      </div>

      <LabeledDropdown
        styleClass={styles.inputField}
        filterOption={(s) => {
          if (!metaData?.category && !metaData?.sub_category) return true;

          return (
            s?.data?.category === metaData?.category ||
            s?.data?.sub_category === metaData?.sub_category
          );
        }}
        dropdownOptions={{
          inputName: 'qbId',
          label: 'Question Bank:',
          placeholder: 'Select the question bank to choose question from',
          options: questionBankOptions,
          value: questionBankOptions?.filter((option) => option?.value === metaData?.qbId)[0],
          isSearchEnable: true
        }}
        changeHandler={(e) => changeHandler(e, metaData, setMetaData, 'qbId')}
      />

      <LabeledDropdown
        styleClass={styles.inputField}
        dropdownOptions={{
          inputName: 'difficulty_level',
          label: 'Difficulty:',
          placeholder: 'Select difficulty level',
          options: categoryOption,
          value: { value: metaData?.difficulty_level, label: metaData?.difficulty_level }
        }}
        changeHandler={(e) => changeHandler(e, metaData, setMetaData, 'difficulty_level')}
      />

      <div className={styles.twoInputContainer}>
        <LabeledInput
          styleClass={styles.inputField}
          inputOptions={{
            inputName: 'question_marks',
            label: 'Marks Per Question:',
            placeholder: 'Enter Marks Per Question',
            value: metaData?.question_marks
          }}
          changeHandler={(e) => changeHandler(e, metaData, setMetaData)}
          isFiftyFifty={true}
        />

        <LabeledInput
          styleClass={`${styles.paddingToLabel}`}
          inputOptions={{
            inputName: 'total_questions',
            label: 'No. of Question:',
            placeholder: 'Enter No. of Question',
            value: metaData?.total_questions
          }}
          changeHandler={(e) => {
            // validation for entering total question should not be greater than available questions
            const questionAvailable =
              questionBankOptions?.filter((option) => option.value === metaData.qbId)[0]
                ?.noOfQuestions || 10;

            if (parseInt(e.target.value) > questionAvailable)
              return setMetaData({ ...metaData, total_questions: questionAvailable });

            changeHandler(e, metaData, setMetaData);
          }}
          isFiftyFifty={true}
        />
      </div>

      <LabeledInput
        styleClass={styles.inputField}
        inputOptions={{
          inputName: 'total',
          label: 'Total Marks:',
          placeholder: 'Total Marks',
          value: metaData?.total_questions * metaData?.question_marks || 0,
          isDisabled: true
        }}
      />

      <div className={`${styles.radioContainer} ${styles.inputField}`}>
        <label>Question Pick:</label>
        {['Manual', 'Random'].map((label) => (
          <LabeledRadioCheckbox
            type="radio"
            label={label}
            name="retrieve_type"
            value={label.toLowerCase()}
            isChecked={metaData?.retrieve_type === label.toLowerCase()}
            changeHandler={(e) => changeHandler(e, metaData, setMetaData)}
          />
        ))}
      </div>
    </>
  );
}
