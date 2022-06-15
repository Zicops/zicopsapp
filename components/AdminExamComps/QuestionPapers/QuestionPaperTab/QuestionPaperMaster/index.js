import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { GET_CATS_N_SUB_CATS } from '../../../../../API/Queries';
import { loadQueryData } from '../../../../../helper/api.helper';
import { QuestionPaperTabDataAtom } from '../../../../../state/atoms/exams.atoms';
import LabeledDropdown from '../../../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../../../common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '../../../../common/FormComponents/LabeledRadioCheckbox';
import NextButton from '../../../../common/NextButton';
import useHandlePaperTab from '../Logic/useHandlePaperTab';
import styles from '../questionPaperTab.module.scss';

export default function QuestionPaperMaster() {
  const categoryOption = [];
  const subCategoryOption = [];
  const difficultyOptions = [
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Competent', label: 'Competent' },
    { value: 'Proficient', label: 'Proficient' }
  ];

  // load categories
  const { allCategories, allSubCategories } = loadQueryData(GET_CATS_N_SUB_CATS);
  allCategories?.map((val) => categoryOption.push({ value: val, label: val }));
  allSubCategories?.map((val) => subCategoryOption.push({ value: val, label: val }));

  const router = useRouter();
  const questionPaperId = router.query?.questionPaperId;
  const questionPaperTabData = useRecoilValue(QuestionPaperTabDataAtom);

  const { handleInput, addNewQuestionPaper, updateQuestionPaper } = useHandlePaperTab();

  return (
    <div className={`${styles.qb_container}`}>
      <LabeledInput
        inputOptions={{
          inputName: 'name',
          label: 'Question Paper Name:',
          placeholder: 'Enter name in less than 60 characters',
          value: questionPaperTabData.paperMaster?.name,
          maxLength: 60
        }}
        changeHandler={(e) => handleInput(e)}
        styleClass={`${styles.inputField}`}
      />
      <LabeledInput
        styleClass={styles.inputField}
        inputOptions={{
          inputName: 'description',
          label: 'Description:',
          placeholder: 'Enter description in less than 160 characters',
          value: questionPaperTabData.paperMaster?.description,
          maxLength: 160
        }}
        changeHandler={(e) => handleInput(e)}
      />
      <LabeledDropdown
        styleClass={styles.inputField}
        dropdownOptions={{
          inputName: 'category',
          label: 'Category:',
          placeholder: 'Select Category',
          options: categoryOption,
          value: {
            value: questionPaperTabData.paperMaster?.category,
            label: questionPaperTabData.paperMaster?.category
          }
        }}
        changeHandler={(e) => handleInput(e, 'category')}
      />
      <LabeledDropdown
        styleClass={styles.inputField}
        dropdownOptions={{
          inputName: 'sub_category',
          label: 'Sub-Category:',
          placeholder: 'Select Sub-Category',
          options: subCategoryOption,
          value: {
            value: questionPaperTabData.paperMaster?.sub_category,
            label: questionPaperTabData.paperMaster?.sub_category
          }
        }}
        changeHandler={(e) => handleInput(e, 'sub_category')}
      />

      <div className={`${styles.twoInputContainers}`}>
        <LabeledDropdown
          styleClass={styles.inputField}
          isFiftyFifty={true}
          dropdownOptions={{
            inputName: 'difficulty_level',
            label: 'Difficulty Level:',
            placeholder: 'Select the difficulty level',
            options: difficultyOptions,
            value: {
              value: questionPaperTabData.paperMaster?.difficulty_level,
              label: questionPaperTabData.paperMaster?.difficulty_level
            }
          }}
          changeHandler={(e) => handleInput(e, 'difficulty_level')}
        />

        <LabeledInput
          isFiftyFifty={true}
          styleClass={styles.inputField}
          inputOptions={{
            inputName: 'suggested_duration',
            label: 'Suggested Duration:',
            placeholder: 'Enter duration in Minutes',
            value: questionPaperTabData.paperMaster?.suggested_duration
          }}
          changeHandler={(e) => handleInput(e)}
        />
      </div>

      <div className={`${styles.footer}`}>
        <LabeledRadioCheckbox
          type="checkbox"
          label="Section Wise"
          name="section_wise"
          isDisabled={!!questionPaperId}
          isChecked={questionPaperTabData.paperMaster?.section_wise}
          changeHandler={(e) => handleInput(e)}
        />

        <NextButton
          clickHandler={() => (questionPaperId ? updateQuestionPaper(1) : addNewQuestionPaper(1))}
        />
      </div>
    </div>
  );
}
