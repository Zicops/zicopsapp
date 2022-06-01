import { useRecoilState } from 'recoil';
import { changeHandler } from '../../../../../helper/common.helper';
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

  const { questionPaperMaster, setQuestionPaperMaster, handleSubmit } = useHandlePaperTab();

  return (
    <div className={`${styles.qb_container}`}>
      <LabeledInput
        inputOptions={{
          inputName: 'name',
          label: 'Question Paper Name:',
          placeholder: 'Enter name of the course (Upto 60 characters)',
          value: questionPaperMaster.name
        }}
        changeHandler={(e) => changeHandler(e, questionPaperMaster, setQuestionPaperMaster)}
        styleClass={`${styles.inputField}`}
      />
      <LabeledInput
        styleClass={styles.inputField}
        inputOptions={{
          inputName: 'description',
          label: 'Description:',
          placeholder: 'Enter name of the course (Upto 160 characters)',
          value: questionPaperMaster.description
        }}
        changeHandler={(e) => changeHandler(e, questionPaperMaster, setQuestionPaperMaster)}
      />
      <LabeledDropdown
        styleClass={styles.inputField}
        dropdownOptions={{
          inputName: 'category',
          label: 'Category:',
          placeholder: 'Select the category of the course',
          options: categoryOption,
          value: questionPaperMaster?.category
            ? { value: questionPaperMaster.category, label: questionPaperMaster.category }
            : null
        }}
        changeHandler={(e) =>
          changeHandler(e, questionPaperMaster, setQuestionPaperMaster, 'category')
        }
      />
      <LabeledDropdown
        styleClass={styles.inputField}
        dropdownOptions={{
          inputName: 'sub_category',
          label: 'Sub-Category:',
          placeholder: 'Select the sub category of the course',
          options: categoryOption,
          value: questionPaperMaster?.sub_category
            ? { value: questionPaperMaster.sub_category, label: questionPaperMaster.sub_category }
            : null
        }}
        changeHandler={(e) =>
          changeHandler(e, questionPaperMaster, setQuestionPaperMaster, 'sub_category')
        }
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
            value: questionPaperMaster?.difficulty_level
              ? {
                  value: questionPaperMaster.difficulty_level,
                  label: questionPaperMaster.difficulty_level
                }
              : null
          }}
          changeHandler={(e) =>
            changeHandler(e, questionPaperMaster, setQuestionPaperMaster, 'difficulty_level')
          }
        />

        <LabeledInput
          isFiftyFifty={true}
          styleClass={`${styles.inputField}`}
          inputOptions={{
            inputName: 'suggested_duration',
            label: 'Suggested Duration:',
            placeholder: 'Enter duration',
            value: questionPaperMaster.suggested_duration
          }}
          changeHandler={(e) => changeHandler(e, questionPaperMaster, setQuestionPaperMaster)}
        />
      </div>

      <div className={`${styles.footer}`}>
        <LabeledRadioCheckbox
          type="checkbox"
          label="Section Wise"
          isChecked={questionPaperMaster.section_wise}
          name="section_wise"
          changeHandler={(e) => changeHandler(e, questionPaperMaster, setQuestionPaperMaster)}
        />

        <NextButton clickHandler={() => handleSubmit(1)} />
      </div>
    </div>
  );
}
