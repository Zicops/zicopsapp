import { changeHandler } from '../../../../helper/common.helper';
import Button from '../../../common/Button';
import LabeledDropdown from '../../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../../common/FormComponents/LabeledInput';
import useHandleQuestionBank from '../Logic/useHandleQuestionBank';
import styles from './addQuestionBank.module.scss';

export default function AddQuestionBank({ isEdit = false, editQuestionBankId, closePopUp }) {
  const categoryOption = [
    { value: 'Accounting', label: 'Accounting' },
    { value: 'Bussiness', label: 'Bussiness' },
    { value: 'Developement', label: 'Developement' },
    { value: 'Engg', label: 'Engg' }
  ];

  const {
    questionBankData,
    setQuestionBankData,
    isAddQuestionBankReady,
    createNewQuestionBank,
    updateQuestionBank
  } = useHandleQuestionBank(editQuestionBankId);

  return (
    <div className={`${styles.questionBankContainer}`}>
      <LabeledInput
        styleClass={`${styles.inputField}`}
        inputOptions={{
          inputName: 'name',
          label: 'Name:',
          placeholder: 'Enter name of the course (Upto 60 characters)',
          value: questionBankData?.name
        }}
        changeHandler={(e) => changeHandler(e, questionBankData, setQuestionBankData)}
      />

      <LabeledInput
        styleClass={styles.inputField}
        inputOptions={{
          inputName: 'description',
          label: 'Description:',
          placeholder: 'Enter name of the course (Upto 60 characters)',
          value: questionBankData?.description
        }}
        changeHandler={(e) => changeHandler(e, questionBankData, setQuestionBankData)}
      />

      <LabeledDropdown
        styleClass={styles.inputField}
        dropdownOptions={{
          inputName: 'category',
          label: 'Category:',
          placeholder: 'Select the category of the course',
          options: categoryOption,
          value: questionBankData?.category
            ? { value: questionBankData?.category, label: questionBankData?.category }
            : null
        }}
        changeHandler={(e) => changeHandler(e, questionBankData, setQuestionBankData, 'category')}
      />

      <LabeledDropdown
        styleClass={styles.inputField}
        dropdownOptions={{
          inputName: 'sub_category',
          label: 'Sub-Category:',
          placeholder: 'Select the sub category of the course',
          options: categoryOption,
          value: questionBankData?.sub_category
            ? { value: questionBankData?.sub_category, label: questionBankData?.sub_category }
            : null
        }}
        changeHandler={(e) =>
          changeHandler(e, questionBankData, setQuestionBankData, 'sub_category')
        }
      />

      <div className={`${styles.btnContainer}`}>
        <Button
          text={isEdit ? 'Update' : 'Add'}
          isDisabled={!isAddQuestionBankReady}
          clickHandler={() => {
            isEdit ? updateQuestionBank() : createNewQuestionBank();
          }}
        />
        <Button text={'Cancel'} clickHandler={closePopUp} />
      </div>
    </div>
  );
}
