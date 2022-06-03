import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  ADD_QUESTION_BANK_QUESTION,
  ADD_QUESTION_OPTIONS,
  mutationClient,
  UPDATE_QUESTION_BANK_QUESTION,
  UPDATE_QUESTION_OPTIONS
} from '../../../../API/Mutations';
import { ToastMsgAtom } from '../../../../state/atoms/toast.atom';
import {
  getQuestionBankQuestionObject,
  getQuestionOptionsObject,
  imageTypes
} from './questionBank.helper';

export default function useHandleQuestionBankQuestion(editData, closeQuestionMasterTab) {
  const [addQuestion, { error: addQuestionErr }] = useMutation(ADD_QUESTION_BANK_QUESTION, {
    client: mutationClient
  });
  const [addOption, { error: addOptionErr }] = useMutation(ADD_QUESTION_OPTIONS, {
    client: mutationClient
  });
  const [updateQuestion, { error: updateQuestionErr }] = useMutation(
    UPDATE_QUESTION_BANK_QUESTION,
    { client: mutationClient }
  );
  const [updateOption, { error: updateOptionErr }] = useMutation(UPDATE_QUESTION_OPTIONS, {
    client: mutationClient
  });

  const router = useRouter();
  const questionBankId = router.query?.questionBankId;

  // recoil state
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  // local state
  const [questionsArr, setQuestionsArr] = useState([]);
  const [questionData, setQuestionData] = useState(
    getQuestionBankQuestionObject({ qbmId: questionBankId })
  );
  const [optionData, setOptionData] = useState(Array(4).fill(getQuestionOptionsObject()));
  const [isUploading, setIsUploading] = useState(null);

  // set edit data in local state
  useEffect(() => {
    if (!editData) return;

    setQuestionData(editData.question);
    setOptionData(editData.options);
  }, [editData]);

  // set is uploading to null if error msg is showen
  useEffect(() => {
    if (toastMsg[0]?.type === 'danger') setIsUploading(null);
  }, [toastMsg]);

  // error notification
  useEffect(() => {
    if (addQuestionErr) return setToastMsg({ type: 'danger', message: `Add Question Error` });
    if (addOptionErr) return setToastMsg({ type: 'danger', message: `Add Option Error` });

    if (updateQuestionErr) return setToastMsg({ type: 'danger', message: `Update Question Error` });
    if (updateOptionErr) return setToastMsg({ type: 'danger', message: `Update Option Error` });
  }, [addQuestionErr, addOptionErr, updateQuestionErr, updateOptionErr]);

  // disable submit if data not complete
  function validateInput() {
    const question = questionData;
    const options = optionData;
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

  // validation for only taking only accepted type images
  function isImageValid(e) {
    if (e.target.type === 'file') {
      const file = e.target.files[0];
      if (!file) return false;
      if (!imageTypes.includes(file?.type)) {
        setToastMsg({ type: 'danger', message: `${imageTypes.join(', ')} only accepted` });
        return false;
      }
    }

    return true;
  }

  // file input handler for question
  function questionFileInputHandler(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!isImageValid(e)) return;

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
      if (!isImageValid(e)) return;

      updatedOption.file = e.target.files[0];
      updatedOption.attachmentType = e.target.files[0].type;
    } else if (e.target.type === 'checkbox') {
      updatedOption.isCorrect = e.target.checked;
    } else {
      updatedOption[e.target.name] = e.target.value;
    }

    setOptionData(optionData.map((o, i) => (i === optionIndex ? updatedOption : o)));
  }

  // add question data to array to show in accordion
  function saveQuestion() {
    if (!validateInput())
      return setToastMsg({ type: 'danger', message: 'Please fill all the details' });

    setQuestionsArr([...questionsArr, { question: questionData, options: optionData }]);

    // reset form data
    setQuestionData(getQuestionBankQuestionObject({ qbmId: questionBankId }));
    setOptionData(Array(4).fill(getQuestionOptionsObject()));
  }

  // edit question data from accordion
  function activateEdit(index) {
    const allQuestions = [...questionsArr];
    const [removedQuestion] = allQuestions.splice(index, 1);

    setQuestionData(removedQuestion.question);
    setOptionData(removedQuestion.options);
    setQuestionsArr(allQuestions);
  }

  async function addQuestionAndOptions() {
    if (!questionsArr.length)
      return setToastMsg({ type: 'danger', message: 'Add at least one question' });
    setIsUploading(true);

    for (let index = 0; index < questionsArr.length; index++) {
      const { question, options } = questionsArr[index];
      const sendQuestionData = {
        description: question.description || '',
        type: question.type || '',
        difficulty: question.difficulty || 0,
        hint: question.hint || '',
        qbmId: question.qbmId || null,
        attachmentType: question.attachmentType || '',

        // TODO: remove or update later
        createdBy: 'Zicops',
        updatedBy: 'Zicops',
        status: 'SAVED'
      };

      if (question.file) {
        sendQuestionData.file = question.file;
      }
      let isError = false;
      // add question
      const questionRes = await addQuestion({ variables: sendQuestionData }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Add Question Error' });
      });

      if (!questionRes || isError)
        return setToastMsg({ type: 'danger', message: 'Add Question Error' });

      // add option
      for (let i = 0; i < options.length; i++) {
        const option = options[i];
        const sendOptionData = {
          description: option.description || '',
          isCorrect: option.isCorrect || false,
          qmId: questionRes?.data?.addQuestionBankQuestion?.id,
          isActive: option.isActive || false,
          attachmentType: option.attachmentType || '',

          // TODO: remove or update later
          createdBy: 'Zicops',
          updatedBy: 'Zicops'
        };

        if (option.file) {
          sendOptionData.file = option.file;
        }

        await addOption({ variables: sendOptionData }).catch((err) => {
          console.log(err);
          isError = !!err;
          return setToastMsg({ type: 'danger', message: `Add Option (${i + 1}) Error` });
        });
      }

      if (!isError) setToastMsg({ type: 'success', message: 'New Question Added with Options' });
    }

    setIsUploading(null);
    closeQuestionMasterTab();
  }

  async function updateQuestionAndOptions() {
    setIsUploading(true);
    if (!validateInput())
      return setToastMsg({ type: 'danger', message: 'Please fill all the details' });

    const question = questionData;
    const options = optionData;
    const sendQuestionData = {
      id: question.id,
      description: question.description || '',
      type: question.type || '',
      difficulty: question.difficulty || 0,
      hint: question.hint || '',
      qbmId: question.qbmId || null,
      attachmentType: question.attachmentType || '',

      // TODO: remove or update later
      createdBy: 'Zicops',
      updatedBy: 'Zicops',
      status: 'SAVED'
    };

    if (question.file) {
      sendQuestionData.file = question.file;
    }
    let isError = false;
    await updateQuestion({ variables: sendQuestionData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Update Question Error' });
    });

    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      const sendOptionData = {
        id: option.id,
        description: option.description || '',
        isCorrect: option.isCorrect || false,
        qmId: option.qmId,
        isActive: option.isActive || false,
        attachmentType: option.attachmentType || '',

        // TODO: remove or update later
        createdBy: 'Zicops',
        updatedBy: 'Zicops'
      };

      if (option.file) {
        sendOptionData.file = option.file;
      }
      console.log(sendOptionData, option);
      // continue;
      await updateOption({ variables: sendOptionData }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: `Update Option (${i + 1}) Error` });
      });
    }

    if (!isError) setToastMsg({ type: 'success', message: 'Question and Options Updated' });

    setIsUploading(null);
    closeQuestionMasterTab();
  }

  return {
    questionsArr,
    questionData,
    setQuestionData,
    optionData,
    activateEdit,
    questionFileInputHandler,
    optionInputHandler,
    addQuestionAndOptions,
    updateQuestionAndOptions,
    saveQuestion,

    isUploading
  };
}
