import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { QuestionPaperTabDataAtom } from '../../../../../state/atoms/exams.atoms';
import LabeledDropdown from '../../../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../../../common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '../../../../common/FormComponents/LabeledRadioCheckbox';
import NextButton from '../../../../common/NextButton';
import useHandlePaperTab from '../Logic/useHandlePaperTab';
import styles from '../questionPaperTab.module.scss';

export default function QuestionPaperMaster() {
  const categoryOption = [
    { value: 'Accounting', label: 'Accounting' },
    { value: 'Bussiness', label: 'Bussiness' },
    { value: 'Developement', label: 'Developement' },
    { value: 'Engg', label: 'Engg' }
  ];

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
          placeholder: 'Enter name of the course (Upto 60 characters)',
          value: questionPaperTabData.paperMaster?.name
        }}
        changeHandler={(e) => handleInput(e)}
        styleClass={`${styles.inputField}`}
      />
      <LabeledInput
        styleClass={styles.inputField}
        inputOptions={{
          inputName: 'description',
          label: 'Description:',
          placeholder: 'Enter name of the course (Upto 160 characters)',
          value: questionPaperTabData.paperMaster?.description
        }}
        changeHandler={(e) => handleInput(e)}
      />
      <LabeledDropdown
        styleClass={styles.inputField}
        dropdownOptions={{
          inputName: 'category',
          label: 'Category:',
          placeholder: 'Select the category of the course',
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
          placeholder: 'Select the sub category of the course',
          options: categoryOption,
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
            options: categoryOption,
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
            placeholder: 'Enter duration',
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
          clickHandler={() => {
            questionPaperId ? updateQuestionPaper(1) : addNewQuestionPaper(1);
          }}
        />
      </div>
    </div>
  );
}
