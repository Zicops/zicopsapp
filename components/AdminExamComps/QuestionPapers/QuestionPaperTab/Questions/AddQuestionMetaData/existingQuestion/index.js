import { useRecoilState } from 'recoil';
import { GET_CATS_N_SUB_CATS } from '../../../../../../../API/Queries';
import { loadQueryData } from '../../../../../../../helper/api.helper';
import { changeHandler } from '../../../../../../../helper/common.helper';
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
  const categoryOption = [{ value: '', label: '-- Select --' }];
  const subCategoryOption = [{ value: '', label: '-- Select --' }];

  // load categories
  const { allCategories, allSubCategories } = loadQueryData(GET_CATS_N_SUB_CATS);
  allCategories?.map((val) => categoryOption.push({ value: val, label: val }));
  allSubCategories?.map((val) => subCategoryOption.push({ value: val, label: val }));

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

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
            value: { value: metaData?.category, label: metaData?.category }
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
            options: subCategoryOption,
            value: { value: metaData?.sub_category, label: metaData?.sub_category }
          }}
          changeHandler={(e) => changeHandler(e, metaData, setMetaData, 'sub_category')}
          isFiftyFifty={true}
        />
      </div>

      <LabeledDropdown
        styleClass={styles.inputField}
        filterOption={(option, searchQuery) => {
          if (searchQuery) return option.label?.toLowerCase()?.includes(searchQuery?.toLowerCase());
          if (!metaData?.category && !metaData?.sub_category) return true;

          return (
            option?.data?.category === metaData?.category ||
            option?.data?.sub_category === metaData?.sub_category
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
        changeHandler={(e) => setMetaData({ ...metaData, total_questions: 0, qbId: e.value })}
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
                ?.noOfQuestions || totalQuestions;

            let questionsCount = +e.target.value;
            // no bank selected
            if (questionAvailable == null) {
              questionsCount = 0;
              setToastMsg({ type: 'danger', message: 'Select Question Bank First' });
            }

            if (questionAvailable === 0) {
              questionsCount = 0;
              setToastMsg({ type: 'danger', message: 'Bank does not have questions' });
            }

            if (questionsCount > questionAvailable) {
              setToastMsg({ type: 'danger', message: `Bank has ${questionAvailable} question` });
              questionsCount = questionAvailable;
            }

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
