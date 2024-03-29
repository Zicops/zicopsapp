import { CREATE_QUESTION_BANK, mutationClient } from '@/api/Mutations';
import {
  GET_LATEST_QUESTION_BANK,
  GET_QUESTIONS_NAMES,
  GET_QUESTION_BY_ID,
  GET_QUESTION_OPTIONS
} from '@/api/Queries';
import { acceptedFileTypes } from '@/components/AdminExamComps/QuestionBanks/Logic/questionBank.helper';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { LIMITS, ONE_MB_IN_BYTES, QUESTION_STATUS } from '@/helper/constants.helper';
import { secondsToMinutes } from '@/helper/utils.helper';
import { courseContext } from '@/state/contexts/CourseContext';
import { useMutation } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  BingeAtom,
  getQuizObject,
  QuizAtom,
  QuizMetaDataAtom,
  TopicContentAtom
} from '../../../../state/atoms/module.atoms';
import { ToastMsgAtom } from '../../../../state/atoms/toast.atom';

export default function useAddQuiz(courseId = '', topicId = '', isScrom = false) {
  const [createQuestionBank, { error: createError }] = useMutation(CREATE_QUESTION_BANK, {
    client: mutationClient
  });

  // recoil state
  const { fullCourse } = useContext(courseContext);
  const [quizzes, setQuizzes] = useRecoilState(QuizAtom);
  const [quizMetaData, setQuizMetaData] = useRecoilState(QuizMetaDataAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const topicContent = useRecoilValue(TopicContentAtom);
  const binge = useRecoilValue(BingeAtom);

  // local state
  const [quizTemp, setQuizTemp] = useState([]);
  const [isQuizFormVisible, setIsQuizFormVisible] = useState(false);
  const [isQuizReady, setIsQuizReady] = useState(false);
  const [editedQuiz, setEditedQuiz] = useState(null);
  const [newQuiz, setNewQuiz] = useState(getQuizObject({ courseId, topicId }));

  // update resouce courseid and topicid
  useEffect(() => {
    setNewQuiz({ ...newQuiz, topicId: topicId, courseId: courseId });
  }, [topicId, courseId]);

  useEffect(() => {
    if (!isQuizFormVisible) setNewQuiz({ ...newQuiz, topicId: topicId, courseId: courseId });
  }, [isQuizFormVisible]);

  // load question bank data
  useEffect(async () => {
    const LARGE_PAGE_SIZE = 10000;
    const queryVariables = { publish_time: Date.now(), pageSize: LARGE_PAGE_SIZE, pageCursor: '' };

    const qbRes = await loadQueryDataAsync(GET_LATEST_QUESTION_BANK, queryVariables);
    if (qbRes?.error) return setToastMsg({ type: 'danger', message: 'question bank load error' });

    let subCatQb = qbRes?.getLatestQuestionBank?.questionBanks?.find(
      (qb) => qb?.name === fullCourse?.sub_category
    );

    let allQuestionsArr = [];
    if (!subCatQb) {
      const sendData = {
        name: fullCourse?.sub_category,
        description: '',
        category: fullCourse?.category,
        sub_category: fullCourse.sub_category,

        //TODO: extra data for success, remove or make this dynamic
        created_by: 'Zicops',
        updated_by: 'Zicops',
        is_active: true,
        is_default: true,
        owner: 'Zicops'
      };

      const createdQbRes = await createQuestionBank({ variables: sendData }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Question Bank Create Error' });
      });

      subCatQb = createdQbRes?.data?.createQuestionBank;
    } else {
      const questionRes = await loadQueryDataAsync(GET_QUESTIONS_NAMES, {
        question_bank_id: subCatQb?.id
      });
      allQuestionsArr = questionRes?.getQuestionBankQuestions?.filter(
        (q) => q?.Status === QUESTION_STATUS[1]
      );
    }

    setQuizMetaData({
      questionBank: subCatQb,
      questions: allQuestionsArr
    });
  }, []);

  useEffect(() => {
    const question = newQuiz?.question;
    const options = newQuiz?.options;
    let isOptionsCompleted = 0,
      isOneChecked = false;

    options?.forEach((option) => {
      const isComplete = option?.option || option?.file;
      isOptionsCompleted += isComplete ? 1 : 0;

      if (!isComplete) return;

      if (option?.isCorrect && !isOneChecked) isOneChecked = true;
    });

    let questionRequired =
      question && newQuiz?.difficulty && isOptionsCompleted >= 2 && isOneChecked;

    if (newQuiz?.questionId && newQuiz?.formType === 'create') {
      if (newQuiz?.options?.length > isOptionsCompleted) {
        options?.forEach((option) => {
          if (option?.id && !(option?.file || option?.option)) questionRequired = false;
        });
      }
    }
    setIsQuizReady(
      newQuiz.name &&
        newQuiz.type &&
        (isScrom ? true : !!+newQuiz?.startTimeMin || !!+newQuiz?.startTimeSec) &&
        (questionRequired || (newQuiz?.formType === 'select' && newQuiz?.questionId))
    );
  }, [newQuiz]);

  // validate the start time input after input
  useEffect(() => {
    const videoDuration = +topicContent[0]?.duration;

    if (isNaN(videoDuration)) return;

    const { startTimeMin, startTimeSec } = newQuiz;
    const _newQuiz = { ...newQuiz };
    let isInValidData = false;

    const nextShowTime = parseInt(binge?.showTimeMin || 0) * 60 + parseInt(binge?.showTimeSec || 0);

    const bingeTime = !binge.isFromEnd
      ? nextShowTime || videoDuration
      : videoDuration - nextShowTime;

    const startTime = +startTimeMin * 60 + +startTimeSec;

    // start time
    if (startTimeMin < 0) {
      _newQuiz.startTimeMin = '';
      isInValidData = true;
    }
    if (startTimeSec < 0) {
      _newQuiz.startTimeSec = '';
      isInValidData = true;
    }
    if (startTimeSec > 60) {
      _newQuiz.startTimeSec = startTimeSec % 60;
      _newQuiz.startTimeMin = Math.floor(startTimeSec / 60);
      isInValidData = true;
    }
    if (startTime > videoDuration) {
      isInValidData = true;
      _newQuiz.startTimeMin = Math.floor(videoDuration / 60);
      _newQuiz.startTimeSec = videoDuration % 60;
    }
    if (startTime > bingeTime) {
      isInValidData = true;
      _newQuiz.startTimeMin = Math.floor(bingeTime / 60);
      _newQuiz.startTimeSec = bingeTime % 60;
    }

    if (isInValidData) return setNewQuiz({ ...newQuiz, ..._newQuiz });
  }, [newQuiz]);

  function toggleQuizForm(val) {
    if (typeof val === 'boolean') return setIsQuizFormVisible(!!val);

    const quizTempIndex = quizTemp?.findIndex((q) => q?.data?.questionId === val);
    if (quizTempIndex >= 0) {
      const _quizzes = structuredClone(quizzes);
      const quizData = quizTemp[quizTempIndex];
      if (quizData?.data && !isNaN(+quizData.index))
        _quizzes.splice(quizData?.index, 0, quizData?.data);

      setQuizzes(_quizzes);
    }

    setIsQuizFormVisible(!isQuizFormVisible);
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

  function isOptionsDuplicate() {
    const optionArr = newQuiz?.options?.map((op) => op.option?.trim()?.toLowerCase());
    const isDuplicate = optionArr.some((op, i) => {
      if (!op) return false;

      return optionArr.indexOf(op) != i;
    });

    if (isDuplicate) setToastMsg({ type: 'danger', message: 'Options cannot be same.' });
    return isDuplicate;
  }

  // input handler
  function handleQuizInput(e, index = null) {
    if (e?.value) setNewQuiz({ ...newQuiz, type: e.value });

    if (index != null) {
      const _newQuiz = structuredClone(newQuiz);
      let updatedOption = _newQuiz?.options[index] || null;
      if (updatedOption == null && _newQuiz?.options?.length < 4) {
        updatedOption = { option: '', file: null, attachmentType: '', isCorrect: false };
        _newQuiz?.options?.push(updatedOption);
      }

      if (e.target.type === 'file') {
        const file = e.target.files[0];
        if (!file) return;
        if (!isImageValid(e)) return;

        if (file?.size > LIMITS.questionOptionSize) {
          e.target.value = '';
          return setToastMsg({
            type: 'danger',
            message: `File Size limit is ${Math.ceil(
              LIMITS.questionOptionSize / ONE_MB_IN_BYTES
            )} mb`
          });
        }

        updatedOption.file = e.target.files[0];
        updatedOption.attachmentType = e.target.files[0]?.type;
      } else if (e.target.type === 'checkbox') {
        updatedOption.isCorrect = e.target.checked;
      } else {
        updatedOption[e.target.name] = e.target.value;
      }

      return setNewQuiz((prev) => {
        return {
          ...prev,
          options: prev?.options?.map((o, i) => (i === index ? updatedOption : o))
        };
      });
    }

    if (e.target.type === 'checkbox') {
      return setNewQuiz({ ...newQuiz, [e.target.name]: e.target.checked });
    }

    if (e.target.type == 'file') {
      const file = e.target.files[0];
      if (!file) return;
      if (!isImageValid(e)) return;
      if (file?.size > LIMITS.questionOptionSize) {
        e.target.value = '';
        return setToastMsg({
          type: 'danger',
          message: `File Size limit is ${Math.ceil(LIMITS.questionOptionSize / ONE_MB_IN_BYTES)} mb`
        });
      }

      return setNewQuiz({
        ...newQuiz,
        questionFile: e.target.files[0],
        attachmentType: e.target.files[0]?.type
      });
    }

    setNewQuiz({ ...newQuiz, [e.target.name]: e.target.value });
  }

  async function handleEditQuiz(quiz, index) {
    toggleQuizForm(true);
    let _quiz = quiz;

    const quizTempIndex = quizTemp?.findIndex((q) => quiz?.questionId === q?.data?.questionId);

    if (quizTempIndex >= 0) {
      const _quizzes = structuredClone(quizzes);
      const quizData = quizTemp[quizTempIndex];

      _quiz = { ..._quiz, ...quizData?.data };

      setNewQuiz(_quiz);
      setEditedQuiz({ ..._quiz, isEditQuiz: false });

      _quizzes?.splice(index, 1);
      setQuizzes(_quizzes);
      return;
    }

    if (quiz?.questionId) {
      const quesRes = await loadQueryDataAsync(GET_QUESTION_BY_ID, {
        question_ids: [quiz?.questionId]
      });
      const question = quesRes?.getQuestionsById?.[0];

      const opRes = await loadQueryDataAsync(GET_QUESTION_OPTIONS, {
        question_id: quiz?.questionId
      });
      const options = opRes?.getOptionsForQuestions?.[0]?.options;

      const timeObj = secondsToMinutes(+quiz?.startTime);

      _quiz = {
        ..._quiz,
        startTimeMin: +timeObj?.minute || 0,
        startTimeSec: +timeObj?.second || 0,
        isMandatory: quiz?.isMandatory || false,
        formType: 'create',
        type: question?.Type || 'MCQ',
        difficulty: question?.Difficulty || 1,
        attachmentType: question?.AttachmentType || '',
        hint: question?.Hint || '',

        questionId: quiz?.questionId || null,
        question: question?.Description || '',
        attachment: question?.Attachment || null,

        options: options?.map((op) => ({
          id: op?.id,
          option: op?.Description || '',
          attachment: op?.Attachment || null,
          attachmentType: op?.AttachmentType || '',
          isCorrect: op?.IsCorrect || false
        }))
      };
    }

    if (_quiz?.options?.length === 2)
      _quiz?.options?.push({ option: '', file: null, attachmentType: '', isCorrect: false });
    if (_quiz?.options?.length === 3)
      _quiz?.options?.push({ option: '', file: null, attachmentType: '', isCorrect: false });

    setNewQuiz(_quiz);
    setEditedQuiz({ ..._quiz, isEditQuiz: false });
    const _quizzes = structuredClone(quizzes);

    const _quizTemp = structuredClone(quizTemp);
    const _q = _quizzes?.splice(index, 1)[0];

    _quizTemp.push({ index, data: { ..._quiz, ..._q } });
    setQuizTemp(_quizTemp);

    setQuizzes(_quizzes);
    return;
  }

  // save in recoil state
  function addNewQuiz() {
    if (isOptionsDuplicate()) return;
    if (
      quizzes?.some((q) => q?.name?.toLowerCase()?.trim() === newQuiz?.name?.toLowerCase()?.trim())
    )
      return setToastMsg({ type: 'danger', message: 'Quiz name cannot be same in one topic.' });
    const isDuplicate = quizMetaData?.questions?.some(
      (q) =>
        q?.Description?.toLowerCase()?.trim() === newQuiz?.question?.toLowerCase()?.trim() &&
        q?.id !== newQuiz?.questionId
    );
    if (isDuplicate)
      return setToastMsg({ type: 'danger', message: 'Question with same name cannot be added!' });

    const _quizTemp = structuredClone(quizTemp);
    const quizTempIndex = quizTemp?.findIndex((q) => q?.data?.questionId === newQuiz?.questionId);
    if (quizTempIndex >= 0) _quizTemp[quizTempIndex].data = newQuiz;

    setQuizTemp(_quizTemp);

    setQuizzes([...quizzes, { ...newQuiz, isEditQuiz: true }]);
    setNewQuiz(getQuizObject({ courseId, topicId }));
    setIsQuizFormVisible(false);
  }

  return {
    newQuiz,
    setNewQuiz,
    editedQuiz,
    setEditedQuiz,
    handleQuizInput,
    addNewQuiz,
    isQuizFormVisible,
    toggleQuizForm,
    isQuizReady,
    handleEditQuiz
  };
}
