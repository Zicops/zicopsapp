import ToolTip from '@/components/common/ToolTip';
import { useHandleCatSubCat } from '@/helper/hooks.helper';
import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { GET_QUESTION_BANK_QUESTIONS, queryClient } from '../../../../API/Queries';
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

  const {
    questionBankData,
    setQuestionBankData,
    isAddQuestionBankReady,
    createNewQuestionBank,
    updateQuestionBank
  } = useHandleQuestionBank();

  // cat and sub cat
  // const [catAndSubCatOption, setCatAndSubCatOption] = useState({ cat: [], subCat: [] });
  // update sub cat based on cat
  // loadCatSubCat(catAndSubCatOption, setCatAndSubCatOption, questionBankData?.category);
  const { catSubCat, setActiveCatId } = useHandleCatSubCat(questionBankData?.category);

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
      if (errorQBQuestionsData) return console.log('QB Questions load error');

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
          isDisabled: questionBankData?.id || !isPopUp,
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

      {/* cat */}
      <LabeledDropdown
        styleClass={styles.inputField}
        dropdownOptions={{
          inputName: 'category',
          label: 'Category:',
          placeholder: 'Select Category',
          options: catSubCat.cat,
          value: { value: questionBankData?.category, label: questionBankData?.category },
          isDisabled: isQuestionsPresent || !isPopUp,
          isSearchEnable: true
        }}
        changeHandler={(e) => {
          setActiveCatId(e);
          setQuestionBankData({
            ...questionBankData,
            category: e.value,
            sub_category: null
          });
        }}
      />

      <LabeledDropdown
        styleClass={styles.inputField}
        dropdownOptions={{
          inputName: 'sub_category',
          label: 'Sub-Category:',
          placeholder: 'Select Sub-Category',
          options: catSubCat.subCat,
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
          <ToolTip title="Cancel and Go Back to Question Banks list" placement="left">
            <div>
              <Button text={'Cancel'} clickHandler={closePopUp} />
            </div>
          </ToolTip>
          <ToolTip
            title={`${
              isEdit
                ? 'Save new changes to this question paper'
                : 'Add and proceed to Question Creation'
            }`}
            placement="right">
            <div>
              <Button
                text={isEdit ? 'Update' : 'Add'}
                isDisabled={!isAddQuestionBankReady}
                styleClass={isAddQuestionBankReady ? 'bg-primary' : ''}
                clickHandler={() => {
                  isEdit ? updateQuestionBank() : createNewQuestionBank();
                }}
              />
            </div>
          </ToolTip>
        </div>
      )}
    </div>
  );
}
