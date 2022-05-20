import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  ADD_QUESTION_BANK_QUESTION,
  ADD_QUESTION_OPTIONS,
  mutationClient
} from '../../../../API/Mutations';
import { QuestionTabDataAtom } from '../../../../state/atoms/exams.atoms';
import { ToastMsgAtom } from '../../../../state/atoms/toast.atom';
import { getQuestionBankQuestionObject, getQuestionOptionsObject } from './questionBank.helper';

export default function useHandleQuestionBankQuestion() {
  const [addQuestion, { error: addQuestionError }] = useMutation(ADD_QUESTION_BANK_QUESTION, {
    client: mutationClient
  });
  const [addOption, { error: addOptionError }] = useMutation(ADD_QUESTION_OPTIONS, {
    client: mutationClient
  });
  const router = useRouter();

  // recoil state
  const [questionMaster, setQuestionMaster] = useRecoilState(QuestionTabDataAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  // local state
  const [questionData, setQuestionData] = useState(
    getQuestionBankQuestionObject({ qbmId: router.query?.questionBankId })
  );
  const [optionData, setOptionData] = useState(Array(4).fill(getQuestionOptionsObject()));
  const [isAddQuestionReady, setIsAddQuestionReady] = useState(false);

  // udpate recoil state when data is upadted
  useEffect(() => {
    setQuestionMaster({
      question: questionData,
      options: optionData
    });
  }, [questionData, optionData]);

  // disable submit if data not complete
  function validateInput() {
    const question = questionMaster.question;
    const options = questionMaster.options;
    let isOptionsCompleted = false,
      isOneChecked = false;

    options.forEach((option) => {
      isOptionsCompleted = !!option.description;

      if (option.isCorrect && !isOneChecked) isOneChecked = true;
    });

    return (
      question.type &&
      question.description &&
      question.difficulty &&
      question.qbmId &&
      isOneChecked &&
      isOptionsCompleted
    );
  }

  // file input handler for question
  function questionFileInputHandler(e) {
    const file = e.target.files[0];
    if (!file) return;

    setQuestionData({
      ...questionData,
      file: e.target.files[0],
      attachmentType: e.target.files[0].type
    });
  }

  // checkbox, file and text input handler for option
  function optionInputHandler(e, optionIndex) {
    const currentOption = optionData[optionIndex];
    const updatedOption = { ...currentOption };

    if (e.target.type === 'file') {
      const file = e.target.files[0];
      if (!file) return;

      updatedOption.file = e.target.files[0];
      updatedOption.attachmentType = e.target.files[0].type;
    } else if (e.target.type === 'checkbox') {
      updatedOption.isCorrect = e.target.checked;
    } else {
      updatedOption[e.target.name] = e.target.value;
    }

    setOptionData(optionData.map((o, i) => (i === optionIndex ? updatedOption : o)));
  }

  async function addQuestionAndOptions() {
    if (!validateInput())
      return setToastMsg({ type: 'danger', message: 'Please fill all the details' });

    console.log(questionMaster);
    const { question, options } = questionMaster;
    const sendQuestionData = {
      description: question.description || '',
      type: question.type || '',
      difficulty: question.difficulty || 0,
      hint: question.hint || '',
      qbmId: question.qbmId || null,

      // TODO: remove or update later
      createdBy: 'Zicops',
      updatedBy: 'Zicops',
      status: 'Success'
    };

    if (question.file) {
      sendQuestionData.file = question.file;
      sendQuestionData.attachmentType = question.attachmentType || '';
    }
    console.log('sendQuestionData', sendQuestionData);
    let isError = false;
    const questionRes = await addQuestion({ variables: sendQuestionData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Add Question Error' });
    });
    console.log(questionRes?.data?.addQuestionBankQuestion);

    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      const sendOptionData = {
        description: option.description || '',
        isCorrect: option.isCorrect || false,
        qmId: questionRes?.data?.addQuestionBankQuestion?.id,
        isActive: option.isActive || false,

        // TODO: remove or update later
        createdBy: 'Zicops',
        updatedBy: 'Zicops'
      };

      if (option.file) {
        sendOptionData.file = option.file;
        sendOptionData.attachmentType = option.attachmentType || '';
      }

      const optionRes = await addOption({ variables: sendOptionData }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: `Add Option (${i + 1}) Error` });
      });
      console.log(optionRes);
    }
    if (addOptionError) return setToastMsg({ type: 'danger', message: `Add Option Error` });
    if (addOptionError) return setToastMsg({ type: 'danger', message: `Add Question Error` });

    if (!isError) setToastMsg({ type: 'success', message: 'New Question Added with Options' });
  }

  return {
    questionData,
    setQuestionData,
    optionData,
    questionFileInputHandler,
    optionInputHandler,
    isAddQuestionReady,
    addQuestionAndOptions
  };
}
