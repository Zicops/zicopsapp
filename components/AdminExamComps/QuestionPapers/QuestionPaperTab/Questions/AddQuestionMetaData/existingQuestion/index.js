import { useRecoilState } from 'recoil';
import { changeHandler } from '../../../../../../../helper/common.helper';
import LabeledDropdown from '../../../../../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../../../../../common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '../../../../../../common/FormComponents/LabeledRadioCheckbox';
import { NewQuestionMetaDataAtom } from '../../../Logic/questionPaperTab.helper';
import styles from '../addQuestionMetaData.module.scss';

export default function ExistingQuestion() {
  const categoryOption = [
    { value: 'Accounting', label: 'Accounting' },
    { value: 'Bussiness', label: 'Bussiness' },
    { value: 'Developement', label: 'Developement' },
    { value: 'Engg', label: 'Engg' }
  ];
  const questionBankOption = [{ value: 'c9vi5778u0hjj4gm4c00', label: 'c9vi5778u0hjj4gm4c00' }];
  const [newMetaData, setNewMetaData] = useRecoilState(NewQuestionMetaDataAtom);

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
            value: newMetaData?.category
              ? { value: newMetaData.category, label: newMetaData.category }
              : null
          }}
          changeHandler={(e) => changeHandler(e, newMetaData, setNewMetaData, 'category')}
          isFiftyFifty={true}
        />
        <LabeledDropdown
          styleClass={`${styles.halfInputField} ${styles.paddingToLabel}`}
          dropdownOptions={{
            inputName: 'sub_category',
            label: 'Sub-Category:',
            placeholder: 'Select sub-category',
            options: categoryOption,
            value: newMetaData?.sub_category
              ? { value: newMetaData.sub_category, label: newMetaData.sub_category }
              : null
          }}
          changeHandler={(e) => changeHandler(e, newMetaData, setNewMetaData, 'sub_category')}
          isFiftyFifty={true}
        />
      </div>

      <LabeledDropdown
        styleClass={styles.inputField}
        dropdownOptions={{
          inputName: 'difficultyLevel',
          label: 'Difficulty:',
          placeholder: 'Select difficulty level',
          options: categoryOption,
          value: newMetaData?.difficultyLevel
            ? { value: newMetaData.difficultyLevel, label: newMetaData.difficultyLevel }
            : null
        }}
        changeHandler={(e) => changeHandler(e, newMetaData, setNewMetaData, 'difficultyLevel')}
      />
      <LabeledDropdown
        styleClass={styles.inputField}
        dropdownOptions={{
          inputName: 'qbId',
          label: 'Question Bank:',
          placeholder: 'Select the question bank to choose question from',
          options: questionBankOption,
          value: newMetaData?.qbId ? { value: newMetaData.qbId, label: newMetaData?.qbId } : null
        }}
        changeHandler={(e) => changeHandler(e, newMetaData, setNewMetaData, 'qbId')}
      />

      <div className={styles.twoInputContainer}>
        <LabeledInput
          styleClass={styles.inputField}
          inputOptions={{
            inputName: 'questionMarks',
            label: 'Marks Per Question:',
            placeholder: 'Enter Marks Per Question',
            value: newMetaData?.questionMarks
          }}
          changeHandler={(e) => changeHandler(e, newMetaData, setNewMetaData)}
          isFiftyFifty={true}
        />
        <LabeledInput
          styleClass={`${styles.paddingToLabel}`}
          inputOptions={{
            inputName: 'totalQuestions',
            label: 'No. of Question:',
            placeholder: 'Enter No. of Question',
            value: newMetaData?.totalQuestions
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
          placeholder: 'Total Marks',
          value: newMetaData?.totalQuestions * newMetaData?.questionMarks || 0,
          isDisabled: true
        }}
      />

      <div className={`${styles.radioContainer} ${styles.inputField}`}>
        <label>Question Pick:</label>
        <LabeledRadioCheckbox
          type="radio"
          label="Random"
          name="retrieveType"
          value={'Random'}
          changeHandler={(e) => changeHandler(e, newMetaData, setNewMetaData)}
        />
        <LabeledRadioCheckbox
          type="radio"
          label="Manual"
          name="retrieveType"
          value={'Manual'}
          changeHandler={(e) => changeHandler(e, newMetaData, setNewMetaData)}
        />
      </div>
    </>
  );
}
