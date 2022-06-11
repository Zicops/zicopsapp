import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  CREATE_QUESTION_BANK,
  mutationClient,
  UPDATE_QUESTION_BANK
} from '../../../../API/Mutations';
import {
  getQuestionBankObject,
  RefetchDataAtom,
  SelectedQuestionBankAtom
} from '../../../../state/atoms/exams.atoms';
import { PopUpStatesAtomFamily } from '../../../../state/atoms/popUp.atom';
import { ToastMsgAtom } from '../../../../state/atoms/toast.atom';

export default function useHandleQuestionBank() {
  const [createQuestionBank, { error: createError }] = useMutation(CREATE_QUESTION_BANK, {
    client: mutationClient
  });
  const [updateBank, { error: updateError }] = useMutation(UPDATE_QUESTION_BANK, {
    client: mutationClient
  });

  const router = useRouter();

  // recoil state
  const [addPopUp, setAddPopUp] = useRecoilState(PopUpStatesAtomFamily('addQuestionBank'));
  const [editPopUp, setEditPopUp] = useRecoilState(PopUpStatesAtomFamily('editQuestionBank'));
  const refetchData = useRecoilValue(RefetchDataAtom);

  // for edit data
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const selectedQB = useRecoilValue(SelectedQuestionBankAtom);

  // local state
  const [questionBankData, setQuestionBankData] = useState(getQuestionBankObject());
  const [isAddQuestionBankReady, setIsAddQuestionBankReady] = useState(false);

  // disable submit if data not complete
  useEffect(() => {
    setIsAddQuestionBankReady(
      questionBankData.name && questionBankData.category && questionBankData.sub_category
    );
  }, [questionBankData]);

  // set local state to selected edit question bank
  useEffect(() => {
    setQuestionBankData(getQuestionBankObject(selectedQB));
  }, [selectedQB]);

  // error notification
  useEffect(() => {
    if (createError) return setToastMsg({ type: 'danger', message: 'Question Bank Create Error' });
    if (updateError) return setToastMsg({ type: 'danger', message: 'Question Bank Update Error' });
  }, [createError, updateError]);

  async function createNewQuestionBank() {
    const sendData = {
      name: questionBankData.name,
      description: questionBankData.description,
      category: questionBankData.category,
      sub_category: questionBankData.sub_category,

      //TODO: extra data for success, remove or make this dynamic
      created_by: questionBankData.created_by || 'Zicops',
      updated_by: questionBankData.updated_by || 'Zicops',
      is_active: questionBankData.is_active || true,
      is_default: questionBankData.is_default || true,
      owner: questionBankData.owner || 'Zicops'
    };

    let isError = false;
    const res = await createQuestionBank({ variables: sendData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Question Bank Create Error' });
    });

    if (!isError) {
      setToastMsg({ type: 'success', message: 'New Question Bank Created' });
      refetchData.questionBank();
    }
    setAddPopUp(false);

    const questionTableRoute = `${router.asPath}/${res.data.createQuestionBank.id}`;
    router.push(`${questionTableRoute}?isTabOpen=true`, questionTableRoute);
  }

  async function updateQuestionBank() {
    const sendData = {
      id: questionBankData.id,
      name: questionBankData.name,
      description: questionBankData.description,
      category: questionBankData.category,
      sub_category: questionBankData.sub_category,

      //TODO: extra data for success, remove or make this dynamic
      created_by: questionBankData.created_by || 'Zicops',
      updated_by: questionBankData.updated_by || 'Zicops',
      is_active: questionBankData.is_active || true,
      is_default: questionBankData.is_default || true,
      owner: questionBankData.owner || 'Zicops'
    };

    let isError = false;
    const res = await updateBank({ variables: sendData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Question Bank Update Error' });
    });

    if (!isError) {
      setToastMsg({ type: 'success', message: 'New Question Bank Updated' });
      refetchData.questionBank();
    }
    setEditPopUp(false);
  }

  return {
    questionBankData,
    setQuestionBankData,
    isAddQuestionBankReady,
    createNewQuestionBank,
    updateQuestionBank
  };
}
