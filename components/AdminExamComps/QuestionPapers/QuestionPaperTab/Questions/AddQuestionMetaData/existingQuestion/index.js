import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { changeHandler } from '../../../../../../../helper/common.helper';
import { loadCatSubCat } from '../../../../../../../helper/data.helper';
import { ToastMsgAtom } from '../../../../../../../state/atoms/toast.atom';
import LabeledDropdown from '../../../../../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../../../../../common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '../../../../../../common/FormComponents/LabeledRadioCheckbox';
import styles from '../addQuestionMetaData.module.scss';

export default function ExistingQuestion({
  metaData,
  totalQuestions,
  setMetaData,
  questionBankOptions,
  isEdit
}) {
  const difficultyOptions = [
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Competent', label: 'Competent' },
    { value: 'Proficient', label: 'Proficient' }
  ];

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  // set meta data cat and sub cat
  useEffect(() => {
    setMetaData({
      ...metaData,
      category: questionBankOptions?.filter((op) => op?.value === metaData?.qbId)[0]?.category,
      sub_category: questionBankOptions?.filter((op) => op?.value === metaData?.qbId)[0]
        ?.sub_category
    });
  }, [questionBankOptions]);

  // cat and sub cat
  const [catAndSubCatOption, setCatAndSubCatOption] = useState({ cat: [], subCat: [] });
  // update sub cat based on cat
  loadCatSubCat(catAndSubCatOption, setCatAndSubCatOption, metaData?.category);

  return (
    <>
      <div className={styles.twoInputContainer}>
        <LabeledDropdown
          styleClass={styles.halfInputField}
          dropdownOptions={{
            inputName: 'category',
            label: 'Category:',
            placeholder: 'Select category',
            options: [{ value: '', label: '-- Select --' }, ...catAndSubCatOption?.cat],
            value: { value: metaData?.category, label: metaData?.category },
            isSearchEnable: true
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
            options: [{ value: '', label: '-- Select --' }, ...catAndSubCatOption?.subCat],
            value: { value: metaData?.sub_category, label: metaData?.sub_category },
            isSearchEnable: true
          }}
          changeHandler={(e) => changeHandler(e, metaData, setMetaData, 'sub_category')}
          isFiftyFifty={true}
        />
      </div>

      <LabeledDropdown
        styleClass={styles.inputField}
        filterOption={(option, searchQuery) => {
          if (!option?.data?.noOfQuestions) return false;

          if (searchQuery) return option.label?.toLowerCase()?.includes(searchQuery?.toLowerCase());
          if (!metaData?.category && !metaData?.sub_category) return true;

          if (!metaData?.category) return option?.data?.sub_category === metaData?.sub_category;
          if (!metaData?.sub_category) return option?.data?.category === metaData?.category;

          return (
            option?.data?.category === metaData?.category &&
            option?.data?.sub_category === metaData?.sub_category
          );
        }}
        dropdownOptions={{
          inputName: 'qbId',
          label: 'Question Bank:',
          placeholder: 'Select the question bank to choose question from',
          options: questionBankOptions,
          value: questionBankOptions?.filter((option) => {
            option.label = `${option.name} [${option?.noOfQuestions || 0}]`;
            const isSelected = option?.value === metaData?.qbId;

            if (isSelected) option.label = `${option.name} [${totalQuestions || 0}]`;
            return isSelected;
          })[0],
          isSearchEnable: true
        }}
        changeHandler={(e) => setMetaData({ ...metaData, total_questions: 0, qbId: e.value })}
      />

      <LabeledDropdown
        styleClass={styles.inputField}
        dropdownOptions={{
          inputName: 'difficulty_level',
          label: 'Difficulty:',
          placeholder: 'Select difficulty level',
          options: difficultyOptions,
          value: { value: metaData?.difficulty_level, label: metaData?.difficulty_level }
        }}
        changeHandler={(e) =>
          setMetaData({ ...metaData, total_questions: 0, difficulty_level: e.value })
        }
      />

      <div className={styles.twoInputContainer}>
        <LabeledInput
          styleClass={styles.inputField}
          inputOptions={{
            inputName: 'question_marks',
            label: 'Marks Per Question:',
            placeholder: 'Enter Marks Per Question',
            value: metaData?.question_marks,
            isNumericOnly: true
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
            value: metaData?.total_questions,
            isNumericOnly: true
          }}
          changeHandler={(e) => {
            // validation for entering total question should not be greater than available questions
            const questionAvailable = totalQuestions;

            let questionsCount = +e.target.value;
            let errorMsg = null;
            // no bank selected
            if (questionAvailable == null) {
              questionsCount = 0;
              errorMsg = 'Select Question Bank First';
            }

            // no difficulty level selected
            if (!metaData?.difficulty_level) {
              questionsCount = 0;
              if (!errorMsg) errorMsg = 'Select Difficulty First';
            }

            if (questionAvailable === 0) {
              questionsCount = 0;
              if (!errorMsg) errorMsg = 'Bank does not have questions';
            }

            if (questionsCount > questionAvailable) {
              questionsCount = questionAvailable;
              if (!errorMsg)
                errorMsg = `Bank has only ${questionAvailable} question with ${metaData?.difficulty_level} level`;
            }

            if (errorMsg) setToastMsg({ type: 'danger', message: errorMsg });
            return setMetaData({ ...metaData, total_questions: questionsCount });
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
            key={label}
            label={label}
            name="retrieve_type"
            value={label.toLowerCase()}
            isDisabled={isEdit}
            isChecked={metaData?.retrieve_type === label.toLowerCase()}
            changeHandler={(e) => changeHandler(e, metaData, setMetaData)}
          />
        ))}
      </div>
    </>
  );
}
