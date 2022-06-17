import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  GET_CATS_N_SUB_CATS,
  GET_QUESTION_BANK_QUESTIONS,
  queryClient
} from '../../../../API/Queries';
import { loadQueryData } from '../../../../helper/api.helper';
import { changeHandler } from '../../../../helper/common.helper';
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
          options: categoryOption,
          value: { value: questionBankData?.category, label: questionBankData?.category },
          isDisabled: isQuestionsPresent || !isPopUp
        }}
        changeHandler={(e) => changeHandler(e, questionBankData, setQuestionBankData, 'category')}
      />

      <LabeledDropdown
        styleClass={styles.inputField}
        dropdownOptions={{
          inputName: 'sub_category',
          label: 'Sub-Category:',
          placeholder: 'Select Sub-Category',
          options: subCategoryOption,
          value: { value: questionBankData?.sub_category, label: questionBankData?.sub_category },
          isDisabled: isQuestionsPresent || !isPopUp
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
            clickHandler={() => {
              isEdit ? updateQuestionBank() : createNewQuestionBank();
            }}
          />
        </div>
      )}
    </div>
  );
}
