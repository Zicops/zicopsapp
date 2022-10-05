import { CREATE_QUESTION_BANK, mutationClient } from '@/api/Mutations';
import {
  GET_LATEST_QUESTION_BANK,
  GET_QUESTIONS_NAMES,
  GET_QUESTION_BY_ID,
  GET_QUESTION_OPTIONS
} from '@/api/Queries';
import { acceptedFileTypes } from '@/components/AdminExamComps/QuestionBanks/Logic/questionBank.helper';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { QUESTION_STATUS } from '@/helper/constants.helper';
import { getMinuteSecondsFromSeconds, secondsToMinutes } from '@/helper/utils.helper';
import { courseContext } from '@/state/contexts/CourseContext';
import { useMutation } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  getQuizObject,
  QuizAtom,
  QuizMetaDataAtom,
  TopicContentAtom
} from '../../../../state/atoms/module.atoms';
import { ToastMsgAtom } from '../../../../state/atoms/toast.atom';

export default function useAddQuiz(courseId = '', topicId = '') {
  const [createQuestionBank, { error: createError }] = useMutation(CREATE_QUESTION_BANK, {
    client: mutationClient
  });

  // recoil state
  const { fullCourse } = useContext(courseContext);
  const [quizzes, setQuizzes] = useRecoilState(QuizAtom);
  const [quizMetaData, setQuizMetaData] = useRecoilState(QuizMetaDataAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const topicContent = useRecoilValue(TopicContentAtom);

  // local state
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
    const LARGE_PAGE_SIZE = 999999999999;
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

      subCatQb = createdQbRes?.createQuestionBank;
    } else {
      const questionRes = await loadQueryDataAsync(GET_QUESTIONS_NAMES, {
        question_bank_id: subCatQb?.id
      });
      allQuestionsArr = questionRes?.getQuestionBankQuestions?.filter(
        (q) => q?.Status === QUESTION_STATUS[1]
      );
    }

    console.log(subCatQb);
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

    options.forEach((option) => {
      const isComplete = option?.option || option?.file;
      isOptionsCompleted += isComplete ? 1 : 0;

      if (!isComplete) return;

      if (option?.isCorrect && !isOneChecked) isOneChecked = true;
    });

    let questionRequired =
      question && newQuiz?.difficulty && isOptionsCompleted >= 2 && isOneChecked;

    if (newQuiz?.questionId && newQuiz?.formType === 'create') {
      if (newQuiz?.options?.length > isOptionsCompleted) questionRequired = false;
    }
    setIsQuizReady(
      newQuiz.name &&
        newQuiz.type &&
        (!!+newQuiz?.startTimeMin || !!+newQuiz?.startTimeSec) &&
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
    if (startTime > videoDuration) {
      isInValidData = true;
      _newQuiz.startTimeMin = Math.floor(videoDuration / 60);
      _newQuiz.startTimeSec = videoDuration % 60;
    }

    if (isInValidData) return setNewQuiz({ ...newQuiz, ..._newQuiz });
  }, [newQuiz]);

  function toggleQuizForm(val) {
    if (typeof val === 'boolean') return setIsQuizFormVisible(!!val);

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
      const updatedOption = { ...newQuiz?.options[index] };

      if (e.target.type === 'file') {
        const file = e.target.files[0];
        if (!file) return;
        if (!isImageValid(e)) return;

        updatedOption.file = e.target.files[0];
        updatedOption.attachmentType = e.target.files[0]?.type;
      } else if (e.target.type === 'checkbox') {
        updatedOption.isCorrect = e.target.checked;
      } else {
        updatedOption[e.target.name] = e.target.value;
      }

      return setNewQuiz({
        ...newQuiz,
        options: newQuiz?.options?.map((o, i) => (i === index ? updatedOption : o))
      });
    }

    if (e.target.type === 'checkbox') {
      return setNewQuiz({ ...newQuiz, [e.target.name]: e.target.checked });
    }

    if (e.target.type == 'file') {
      const file = e.target.files[0];
      if (!file) return;
      if (!isImageValid(e)) return;

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
    if (!quiz?.formType && quiz?.questionId) {
      const quesRes = await loadQueryDataAsync(GET_QUESTION_BY_ID, {
        question_ids: [quiz?.questionId]
      });
      const question = quesRes?.getQuestionsById?.[0];

      const opRes = await loadQueryDataAsync(GET_QUESTION_OPTIONS, {
        question_id: quiz?.questionId
      });
      const options = opRes?.getOptionsForQuestions?.[0]?.options;

      const timeObj = secondsToMinutes(+quiz?.startTime);

      console.log(question);
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
        questionFile: question?.Attachment || null,

        options: options?.map((op) => ({
          id: op?.id,
          option: op?.Description || '',
          file: op?.Attachment || null,
          attachmentType: op?.AttachmentType || '',
          isCorrect: op?.IsCorrect || false
        }))
      };
    }

    setNewQuiz(_quiz);
    setEditedQuiz({ ..._quiz, isEditQuiz: false });
    const _quizzes = structuredClone(quizzes);
    _quizzes?.splice(index, 1);
    setQuizzes(_quizzes);
  }

  // save in recoil state
  function addNewQuiz() {
    if (isOptionsDuplicate()) return;
    if (
      quizzes?.some((q) => q?.name?.toLowerCase()?.trim() === newQuiz?.name?.toLowerCase()?.trim())
    )
      return setToastMsg({ type: 'danger', message: 'Quiz name cannot be same in one topic.' });

    console.log(newQuiz);
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
