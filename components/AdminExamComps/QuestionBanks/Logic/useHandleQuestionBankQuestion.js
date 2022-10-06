import { QUESTION_STATUS } from '@/helper/constants.helper';
import { STATUS, StatusAtom } from '@/state/atoms/utils.atoms';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_QUESTIONS_NAMES, queryClient } from 'API/Queries';
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
  acceptedFileTypes,
  getQuestionBankQuestionObject,
  getQuestionOptionsObject
} from './questionBank.helper';

export default function useHandleQuestionBankQuestion(editData, closeQuestionMasterTab) {
  const [getQuestionNames, { error: questionNameLoadErr }] = useLazyQuery(GET_QUESTIONS_NAMES, {
    client: queryClient
  });
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
  const [status, setStatus] = useRecoilState(StatusAtom);

  // local state
  const [questionsArr, setQuestionsArr] = useState([]);
  const [questionData, setQuestionData] = useState(
    getQuestionBankQuestionObject({ qbmId: questionBankId })
  );
  const [optionData, setOptionData] = useState(Array(4).fill(getQuestionOptionsObject()));
  const [isUploading, setIsUploading] = useState(null);
  const [isEditQuestion, setIsEditQuestion] = useState(false);

  // set edit data in local state
  useEffect(() => {
    if (!editData) return setStatus(STATUS.display[0]);

    setQuestionData(editData.question);
    const opts = Array(4).fill(getQuestionOptionsObject({ qmId: editData?.question?.id }));
    opts?.forEach((op, i) => {
      if (editData.options[i]) opts[i] = editData.options[i];
    });

    setOptionData(opts);
  }, [editData]);

  // set is uploading to null if error msg is showen
  useEffect(() => {
    if (toastMsg[0]?.type === 'danger') {
      setIsUploading(null);
      setStatus(questionData?.status || STATUS.display[0]);
    }
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
    let isOptionsCompleted = 0,
      isOneChecked = false;

    options.forEach((option) => {
      const isComplete = option?.description || option?.file;
      isOptionsCompleted += isComplete ? 1 : 0;

      if (!isComplete) return;

      if (option?.isCorrect && !isOneChecked) isOneChecked = true;
    });

    let errorMsg = '';
    if (!question.type) errorMsg = 'Select Question Type';
    if (!question.description && !errorMsg) errorMsg = 'Add Question';
    if (!question.difficulty && !errorMsg) errorMsg = 'Add Question Difficulty';
    if (isOptionsCompleted < 2 && !errorMsg) errorMsg = 'Add at least 2 option';
    if (!isOneChecked && !errorMsg) errorMsg = 'Select at least 1 correct option';

    if (editData?.options?.length > isOptionsCompleted) {
      isOptionsCompleted = 0;
      errorMsg = `${editData?.options?.length} options should be filled. Options cannot be deleted`;
    }

    if (errorMsg) setToastMsg({ type: 'danger', message: errorMsg });

    return (
      question.type &&
      question.description &&
      question.difficulty &&
      question.qbmId &&
      isOptionsCompleted >= 2 &&
      isOneChecked
    );
  }

  // validation for only taking only accepted type images
  function isImageValid(e) {
    if (e.target.type === 'file') {
      const file = e.target.files[0];

      if (!file) return false;
      if (!acceptedFileTypes.includes(file?.type)) {
        setToastMsg({ type: 'danger', message: `${acceptedFileTypes.join(', ')} only accepted` });
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

  function isOptionsDuplicate() {
    var optionArr = optionData.map(function (op) {
      return op.description?.trim()?.toLowerCase();
    });
    var isDuplicate = optionArr.some((op, i) => {
      if (!op) return;

      return optionArr.indexOf(op) != i;
    });

    if (isDuplicate) setToastMsg({ type: 'danger', message: 'Options cannot be same.' });
    return isDuplicate;
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
  async function saveQuestion() {
    if (!validateInput()) return;
    if (isOptionsDuplicate()) return;

    let isQuestionAdded = questionsArr.some(
      (q) =>
        q?.question?.description?.toLowerCase()?.trim() ===
        questionData?.description?.toLowerCase()?.trim()
    );
    if (isQuestionAdded)
      return setToastMsg({ type: 'danger', message: 'Question with same name cannot be added!' });

    // duplicate name check
    if (await isDuplicate(true))
      return setToastMsg({ type: 'danger', message: 'Question with same name cannot be added!' });

    setQuestionsArr([...questionsArr, { question: questionData, options: optionData }]);

    // reset form data
    setQuestionData(getQuestionBankQuestionObject({ qbmId: questionBankId }));
    setOptionData(Array(4).fill(getQuestionOptionsObject()));
    setIsEditQuestion(false);
  }

  // edit question data from accordion
  function activateEdit(index) {
    const allQuestions = [...questionsArr];
    const [removedQuestion] = allQuestions.splice(index, 1);

    setQuestionData(removedQuestion.question);
    setOptionData(removedQuestion.options);
    setQuestionsArr(allQuestions);
    setIsEditQuestion(true);
  }

  async function isDuplicate(checkNewQuestion = false, question = null) {
    const res = await getQuestionNames({ variables: { question_bank_id: questionBankId } });
    const questions = res?.data?.getQuestionBankQuestions;

    let isDuplicate = questions.some((q) => {
      const ques = q?.Description?.toLowerCase()?.trim();
      if (q?.id === questionData?.id) return false;
      if (checkNewQuestion) return ques === questionData?.description?.toLowerCase()?.trim();

      return !!questionsArr.find(
        (obj) => ques === obj?.question?.description?.toLowerCase()?.trim()
      );
    });
    return isDuplicate;
  }

  async function addQuestionAndOptions() {
    // duplicate name check
    if (await isDuplicate())
      return setToastMsg({ type: 'danger', message: 'Question with same name cannot be added!' });

    setStatus(STATUS.display[2]);
    if (!questionsArr.length)
      return setToastMsg({ type: 'danger', message: 'Add at least one question' });
    setIsUploading(true);

    for (let index = 0; index < questionsArr.length; index++) {
      const { question, options } = questionsArr[index];
      const sendQuestionData = {
        name: question.name || '',
        description: question.description || '',
        type: question.type || '',
        difficulty: question.difficulty || 0,
        hint: question.hint || '',
        qbmId: question.qbmId || null,
        attachmentType: question.attachmentType || '',

        // TODO: remove or update later
        createdBy: 'Zicops',
        updatedBy: 'Zicops',
        status: QUESTION_STATUS[0]
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
        console.log(option.description, option.file);
        if (!option.description && !option.file) continue;

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
    setStatus(STATUS.flow[0]);
    closeQuestionMasterTab();
  }

  async function updateQuestionAndOptions() {
    setStatus(STATUS.display[2]);
    setIsUploading(true);
    if (!validateInput()) return;
    // duplicate name check
    if (await isDuplicate(true))
      return setToastMsg({ type: 'danger', message: 'Question with same name cannot be added!' });

    const question = questionData;
    const options = optionData;
    const sendQuestionData = {
      id: question.id,
      name: question.name || '',
      description: question.description || '',
      type: question.type || '',
      difficulty: question.difficulty || 0,
      hint: question.hint || '',
      qbmId: question.qbmId || null,
      attachmentType: question.attachmentType || '',

      // TODO: remove or update later
      createdBy: 'Zicops',
      updatedBy: 'Zicops',
      status: QUESTION_STATUS[0]
    };

    if (question.file) {
      sendQuestionData.file = question.file;
    }
    let isError = false;

    if (!question.id) return setToastMsg({ type: 'danger', message: `Question id missing` });

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
      if (!option.id) {
        if (!option.description && !option.file) continue;

        await addOption({ variables: sendOptionData }).catch((err) => {
          console.log(err);
          isError = !!err;
          return setToastMsg({ type: 'danger', message: `Add Option (${i + 1}) Error` });
        });

        continue;
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
    setStatus(STATUS.flow[0]);
    closeQuestionMasterTab();
  }

  return {
    questionsArr,
    questionData,
    setQuestionData,
    optionData,
    activateEdit,
    isEditQuestion,
    questionFileInputHandler,
    optionInputHandler,
    addQuestionAndOptions,
    updateQuestionAndOptions,
    saveQuestion,

    isUploading
  };
}
