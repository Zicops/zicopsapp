import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { GET_QUESTION_BANK_QUESTIONS, queryClient } from '../../../../API/Queries';
import { changeHandler } from '../../../../helper/common.helper';
import { loadCatSubCat } from '../../../../helper/data.helper';
import {
  getQuestionBankObject,
  SelectedQuestionBankAtom
} from '../../../../state/atoms/exams.atoms';
import Button from '../../../common/Button';
import LabeledDropdown from '../../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../../common/FormComponents/LabeledInput';
import useHandleQuestionBank from '../Logic/useHandleQuestionBank';
import styles from './addQuestionBank.module.scss';

export default function AddQuestionBank({ isEdit = false, closePopUp, isPopUp = true }) {
  const [loadQBQuestions, { error: errorQBQuestionsData }] = useLazyQuery(
    GET_QUESTION_BANK_QUESTIONS,
    { client: queryClient }
  );
  const selectedQb = useRecoilValue(SelectedQuestionBankAtom);
  const [isQuestionsPresent, setIsQuestionsPresent] = useState(false);

  // cat and sub cat
  const [catAndSubCatOption, setCatAndSubCatOption] = useState({ cat: [], subCat: [] });
  loadCatSubCat(catAndSubCatOption, setCatAndSubCatOption, questionBankData?.category);

  const categoryOption = [];
  const subCategoryOption = [];

  const {
    questionBankData,
    setQuestionBankData,
    isAddQuestionBankReady,
    createNewQuestionBank,
    updateQuestionBank
  } = useHandleQuestionBank();

  useEffect(() => {
    if (!selectedQb) return;

    setQuestionBankData(getQuestionBankObject(selectedQb));
  }, [selectedQb]);

  // load questions
  useEffect(() => {
    loadQBQuestions({
      variables: { question_bank_id: selectedQb?.id },
      fetchPolicy: 'no-cache'
    }).then(({ data }) => {
      if (errorQBQuestionsData)
        return setToastMsg({ type: 'danger', message: 'QB Questions load error' });

      setIsQuestionsPresent(!!data?.getQuestionBankQuestions?.length);
    });
  }, [selectedQb?.id]);

  return (
    <div className={`${styles.questionBankContainer}`}>
      {/* bank name */}
      <LabeledInput
        styleClass={`${styles.inputField}`}
        inputOptions={{
          inputName: 'name',
          label: 'Name:',
          placeholder: 'Enter the name in less than 60 characters',
          value: questionBankData?.name,
          isDisabled: !isPopUp,
          maxLength: 60
        }}
        changeHandler={(e) => changeHandler(e, questionBankData, setQuestionBankData)}
      />

      {/* bank description */}
      <LabeledInput
        styleClass={styles.inputField}
        inputOptions={{
          inputName: 'description',
          label: 'Description:',
          placeholder: 'Enter the description in less than 160 characters',
          value: questionBankData?.description,
          isDisabled: !isPopUp,
          maxLength: 160
        }}
        changeHandler={(e) => changeHandler(e, questionBankData, setQuestionBankData)}
      />

      <LabeledDropdown
        styleClass={styles.inputField}
        dropdownOptions={{
          inputName: 'category',
          label: 'Category:',
          placeholder: 'Select Category',
          options: catAndSubCatOption.cat,
          value: { value: questionBankData?.category, label: questionBankData?.category },
          isDisabled: isQuestionsPresent || !isPopUp,
          isSearchEnable: true
        }}
        changeHandler={(e) => changeHandler(e, questionBankData, setQuestionBankData, 'category')}
      />

      <LabeledDropdown
        styleClass={styles.inputField}
        dropdownOptions={{
          inputName: 'sub_category',
          label: 'Sub-Category:',
          placeholder: 'Select Sub-Category',
          options: catAndSubCatOption.subCat,
          value: { value: questionBankData?.sub_category, label: questionBankData?.sub_category },
          isDisabled: isQuestionsPresent || !isPopUp,
          isSearchEnable: true
        }}
        changeHandler={(e) =>
          changeHandler(e, questionBankData, setQuestionBankData, 'sub_category')
        }
      />

      {isPopUp && (
        <div className={`${styles.btnContainer}`}>
          <Button text={'Cancel'} clickHandler={closePopUp} />
          <Button
            text={isEdit ? 'Update' : 'Add'}
            isDisabled={!isAddQuestionBankReady}
            styleClass={isAddQuestionBankReady ? 'bg-primary' : ''}
            clickHandler={() => {
              isEdit ? updateQuestionBank() : createNewQuestionBank();
            }}
          />
        </div>
      )}
    </div>
  );
}
