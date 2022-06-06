import { useEffect } from 'react';
import { GET_CATS_N_SUB_CATS } from '../../../../API/Queries';
import { loadQueryData } from '../../../../helper/api.helper';
import { changeHandler } from '../../../../helper/common.helper';
import Button from '../../../common/Button';
import LabeledDropdown from '../../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../../common/FormComponents/LabeledInput';
import useHandleQuestionBank from '../Logic/useHandleQuestionBank';
import styles from './addQuestionBank.module.scss';

export default function AddQuestionBank({ isEdit = false, closePopUp }) {
  const categoryOption = [];
  const subCategoryOption = [];

  // load categories
  const { allCategories, allSubCategories } = loadQueryData(GET_CATS_N_SUB_CATS);
  allCategories?.map((val) => categoryOption.push({ value: val, label: val }));
  allSubCategories?.map((val) => subCategoryOption.push({ value: val, label: val }));

  const {
    questionBankData,
    setQuestionBankData,
    isAddQuestionBankReady,
    createNewQuestionBank,
    updateQuestionBank
  } = useHandleQuestionBank();

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
          value: { value: questionBankData?.category, label: questionBankData?.category }
        }}
        changeHandler={(e) => changeHandler(e, questionBankData, setQuestionBankData, 'category')}
      />

      <LabeledDropdown
        styleClass={styles.inputField}
        dropdownOptions={{
          inputName: 'sub_category',
          label: 'Sub-Category:',
          placeholder: 'Select the sub category of the course',
          options: subCategoryOption,
          value: { value: questionBankData?.sub_category, label: questionBankData?.sub_category }
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
