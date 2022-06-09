import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { GET_CATS_N_SUB_CATS, GET_QUESTION_BANK_META, queryClient } from '../../../../API/Queries';
import { loadQueryData } from '../../../../helper/api.helper';
import { changeHandler } from '../../../../helper/common.helper';
import { getQuestionBankObject } from '../../../../state/atoms/exams.atoms';
import { ToastMsgAtom } from '../../../../state/atoms/toast.atom';
import Button from '../../../common/Button';
import LabeledDropdown from '../../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../../common/FormComponents/LabeledInput';
import useHandleQuestionBank from '../Logic/useHandleQuestionBank';
import styles from './addQuestionBank.module.scss';

export default function AddQuestionBank({ isEdit = false, closePopUp, isPopUp = true }) {
  const [loadBankMeta, { error: loadMetaError }] = useLazyQuery(GET_QUESTION_BANK_META, {
    client: queryClient
  });

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const categoryOption = [];
  const subCategoryOption = [];

  const router = useRouter();
  const questionBankId = router?.query?.questionBankId;

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
    const isBankData = questionBankData?.name && questionBankData?.description;

    if (isBankData) return;

    loadBankMeta({
      variables: { question_bank_id: [questionBankId] }
    })
      .then((res) => {
        const qBmeta = res?.data?.getQBMeta[0];
        console.log(qBmeta);
        setQuestionBankData(getQuestionBankObject(qBmeta));
      })
      .catch((err) => {
        return setToastMsg({ type: 'danger', message: 'Bank load error' });
      });
  }, [questionBankId]);

  return (
    <div className={`${styles.questionBankContainer}`}>
      <LabeledInput
        styleClass={`${styles.inputField}`}
        inputOptions={{
          inputName: 'name',
          label: 'Name:',
          placeholder: 'Enter name of the course (Upto 60 characters)',
          value: questionBankData?.name,
          isDisabled: !isPopUp
        }}
        changeHandler={(e) => changeHandler(e, questionBankData, setQuestionBankData)}
      />

      <LabeledInput
        styleClass={styles.inputField}
        inputOptions={{
          inputName: 'description',
          label: 'Description:',
          placeholder: 'Enter name of the course (Upto 60 characters)',
          value: questionBankData?.description,
          isDisabled: !isPopUp
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
          value: { value: questionBankData?.category, label: questionBankData?.category },
          isDisabled: !isPopUp
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
          value: { value: questionBankData?.sub_category, label: questionBankData?.sub_category },
          isDisabled: !isPopUp
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
