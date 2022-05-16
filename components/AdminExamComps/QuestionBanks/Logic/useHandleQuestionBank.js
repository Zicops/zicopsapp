import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { CREATE_QUESTION_BANK, mutationClient } from '../../../../API/Mutations';
import { getQuestionBankObject, QuestionBankAtom } from '../../../../state/atoms/exams.atoms';
import { PopUpStatesAtomFamily } from '../../../../state/atoms/popUp.atom';
import { ToastMsgAtom } from '../../../../state/atoms/toast.atom';

export default function useHandleQuestionBank(editQuestionBankId) {
  const [createQuestionBank, { loading, error }] = useMutation(CREATE_QUESTION_BANK, {
    client: mutationClient
  });

  // recoil state
  const [questionBank, setQuestionBank] = useRecoilState(QuestionBankAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [addPopUp, setAddPopUp] = useRecoilState(PopUpStatesAtomFamily('addQuestionBank'));

  // local state
  const [questionBankData, setQuestionBankData] = useState(getQuestionBankObject());
  const [isAddQuestionBankReady, setIsAddQuestionBankReady] = useState(false);

  // disable submit if data not complete
  useEffect(() => {
    setIsAddQuestionBankReady(
      questionBankData.name && questionBankData.category && questionBankData.sub_category
    );
  }, [questionBankData]);

  useEffect(() => {
    const filteredQuestionBank = questionBank.filter((qb) => qb.id === editQuestionBankId);

    setQuestionBankData(getQuestionBankObject({ ...filteredQuestionBank[0] }));
  }, [editQuestionBankId]);

  async function createNewQuestionBank() {
    const sendData = {
      name: questionBankData.name,
      //   description: questionBankData.description,
      category: questionBankData.category,
      sub_category: questionBankData.sub_category,

      //TODO: extra data for success, remove or make this dynamic
      created_by: 'Zicops',
      updated_by: 'Zicops',
      is_active: true,
      is_default: true,
      owner: 'Zicops'
    };

    let isError = false;
    const { data } = await createQuestionBank({ variables: sendData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Question Bank Create Error' });
    });

    console.log(data);
    setQuestionBank([...questionBank, data.createQuestionBank]);

    if (error) return setToastMsg({ type: 'danger', message: 'Question Bank Create Error' });
    if (!isError) setToastMsg({ type: 'success', message: 'New Question Bank Created' });

    setAddPopUp(false);
  }

  async function updateQuestionBank() {
    return setToastMsg({ type: 'info', message: 'Not Yet Implemented, wait for it' });
  }

  return {
    questionBankData,
    setQuestionBankData,
    isAddQuestionBankReady,
    createNewQuestionBank,
    updateQuestionBank
  };
}
