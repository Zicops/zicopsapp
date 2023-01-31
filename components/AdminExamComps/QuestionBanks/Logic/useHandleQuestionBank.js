import { CUSTOM_ERROR_MESSAGE } from '@/helper/constants.helper';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  CREATE_QUESTION_BANK,
  mutationClient,
  UPDATE_QUESTION_BANK
} from '../../../../API/Mutations';
import { GET_LATEST_QUESTION_BANK_NAMES } from '../../../../API/Queries';
import { isNameDuplicate } from '../../../../helper/data.helper';
import {
  getQuestionBankObject,
  RefetchDataAtom,
  SelectedQuestionBankAtom
} from '../../../../state/atoms/exams.atoms';
import { PopUpStatesAtomFamily } from '../../../../state/atoms/popUp.atom';
import { ToastMsgAtom } from '../../../../state/atoms/toast.atom';
import { IsDataPresentAtom } from '../../../common/PopUp/Logic/popUp.helper';

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
  const [isPopUpDataPresent, setIsPopUpDataPresent] = useRecoilState(IsDataPresentAtom);
  const selectedQB = useRecoilValue(SelectedQuestionBankAtom);

  // local state
  const [questionBankData, setQuestionBankData] = useState(getQuestionBankObject());
  const [isAddQuestionBankReady, setIsAddQuestionBankReady] = useState(false);

  // disable submit if data not complete
  useEffect(() => {
    setIsAddQuestionBankReady(
      questionBankData.name &&
        questionBankData.description &&
        questionBankData.category &&
        questionBankData.sub_category
    );

    setIsPopUpDataPresent(
      questionBankData.name ||
        questionBankData.description ||
        questionBankData.category ||
        questionBankData.sub_category
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
    setIsAddQuestionBankReady(false);
    // duplicate name check
    if (
      await isNameDuplicate(
        GET_LATEST_QUESTION_BANK_NAMES,
        questionBankData?.name,
        'getLatestQuestionBank.questionBanks'
      )
    ) {
      setIsAddQuestionBankReady(true);
      return setToastMsg({ type: 'danger', message: 'Bank with same name already exist' });
    }

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

    if (!isError) setToastMsg({ type: 'success', message: 'New Question Bank Created' });

    setIsPopUpDataPresent(false);
    setAddPopUp(false);
    setIsAddQuestionBankReady(true);

    const questionTableRoute = `${router.asPath}/${res.data.createQuestionBank.id}`;
    router.push(`${questionTableRoute}?isTabOpen=true`, questionTableRoute);
  }

  async function updateQuestionBank() {
    setIsAddQuestionBankReady(false);
    // duplicate name check
    if (
      await isNameDuplicate(
        GET_LATEST_QUESTION_BANK_NAMES,
        questionBankData?.name,
        'getLatestQuestionBank.questionBanks',
        questionBankData?.id
      )
    ) {
      setIsAddQuestionBankReady(true);
      return setToastMsg({ type: 'danger', message: 'Bank with same name already exist' });
    }

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
      if (err?.message?.includes(CUSTOM_ERROR_MESSAGE?.nothingToUpdate)) return;
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Question Bank Update Error' });
    });

    if (!isError) {
      setToastMsg({ type: 'success', message: 'Question Bank Updated' });
      refetchData.questionBank(res?.data?.updateQuestionBank);
    }
    setIsPopUpDataPresent(false);
    setEditPopUp(false);
    setIsAddQuestionBankReady(true);
  }

  return {
    questionBankData,
    setQuestionBankData,
    isAddQuestionBankReady,
    createNewQuestionBank,
    updateQuestionBank
  };
}
