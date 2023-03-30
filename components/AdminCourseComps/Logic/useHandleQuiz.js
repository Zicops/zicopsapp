import { CREATE_QUESTION_BANK } from '@/api/Mutations';
import {
  GET_LATEST_QUESTION_BANK,
  GET_QUESTIONS_NAMES,
  GET_QUESTION_BY_ID,
  GET_QUESTION_OPTIONS,
  GET_TOPIC_QUIZ
} from '@/api/Queries';
import { TOPIC_CONTENT_TYPES } from '@/constants/course.constants';
import { loadQueryDataAsync, mutateData } from '@/helper/api.helper';
import { QUESTION_STATUS } from '@/helper/constants.helper';
import { sortArrByKeyInOrder } from '@/helper/data.helper';
import { getUnixFromDate, isWordSame, secondsToMinutes } from '@/helper/utils.helper';
import {
  BingeDataAtom,
  CourseMetaDataAtom,
  getTopicQuizObject,
  QuestionBankDataAtom,
  TopicContentListAtom,
  TopicQuizAtom
} from '@/state/atoms/courses.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useEffect, useState } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';

export default function useHandleQuiz(topData = null) {
  const setToastMessage = useRecoilCallback(({ set }) => (message = '', type = 'danger') => {
    set(ToastMsgAtom, { type, message });
  });
  const courseMetaData = useRecoilValue(CourseMetaDataAtom);
  const topicContentList = useRecoilValue(TopicContentListAtom);
  const bingeData = useRecoilValue(BingeDataAtom);
  const [topicQuiz, setTopicQuiz] = useRecoilState(TopicQuizAtom);
  const [questionBankData, setQuestionBankData] = useRecoilState(QuestionBankDataAtom);

  // local state
  const [isQuizReady, setIsQuizReady] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(null);
  const [questionData, setQuestionData] = useState([]);
  const [quizFormData, setQuizFormData] = useState(
    getTopicQuizObject({ courseId: courseMetaData?.id, topicId: topData?.id })
  );

  const shouldDisplayTime = topicContentList?.[0]?.type === TOPIC_CONTENT_TYPES.mp4;

  // reset state
  useEffect(() => {
    setTopicQuiz(null);
  }, []);

  useEffect(() => {
    if (!topData?.id) return;
    if (topicQuiz != null) return;

    // load quiz data
    loadQueryDataAsync(GET_TOPIC_QUIZ, { topic_id: topData?.id })
      .then((res) => {
        const sortedBySequnce = sortArrByKeyInOrder(res?.getTopicQuizes);

        setTopicQuiz(
          sortedBySequnce?.map((quiz) => {
            const timeObj = secondsToMinutes(+quiz?.startTime);

            return getTopicQuizObject({
              ...quiz,
              startTimeMin: +timeObj?.minute || 0,
              startTimeSec: +timeObj?.second || 0
            });
          }) || []
        );
      })
      .catch(() => {
        setToastMessage('Topic Quiz Load Error');
        setTopicQuiz([]);
      });
  }, [topData, topicQuiz]);

  // load question bank data
  useEffect(() => {
    if (!courseMetaData?.subCategory) return;

    loadQueryDataAsync(GET_LATEST_QUESTION_BANK, {
      publish_time: getUnixFromDate(),
      pageSize: 1,
      pageCursor: '',
      searchText: courseMetaData?.subCategory
    }).then(async (qbRes) => {
      if (qbRes?.error) return setToastMessage('question bank load error');
      const allQuestionsArr = [];

      let subCatQb = qbRes?.getLatestQuestionBank?.questionBanks?.[0];
      if (!subCatQb) {
        const sendData = {
          name: courseMetaData?.subCategory,
          description: '',
          category: courseMetaData?.category,
          sub_category: courseMetaData.subCategory,

          //TODO: extra data for success, remove or make this dynamic
          created_by: 'Zicops',
          updated_by: 'Zicops',
          is_active: true,
          is_default: true,
          owner: 'Zicops'
        };

        const createdQbRes = await mutateData(CREATE_QUESTION_BANK, sendData).catch(() =>
          setToastMessage('Question Bank Create Error')
        );

        subCatQb = createdQbRes?.data?.createQuestionBank;
      } else {
        const questionRes = await loadQueryDataAsync(GET_QUESTIONS_NAMES, {
          question_bank_id: subCatQb?.id
        });
        allQuestionsArr.push(
          ...questionRes?.getQuestionBankQuestions?.filter((q) => q?.Status === QUESTION_STATUS[1])
        );
      }

      setQuestionBankData({ questionBank: subCatQb, questions: allQuestionsArr });
    });
  }, [courseMetaData?.subCategory]);

  // validate the start time input after input
  useEffect(() => {
    const videoDuration = +topicContentList?.[0]?.duration;
    const { nextShowTime, fromEndTime } = bingeData;
    if (isNaN(videoDuration)) return;

    const isStartTime = nextShowTime > 0;
    const bingeEndTime = isStartTime ? nextShowTime : videoDuration - fromEndTime;

    const { startTimeMin, startTimeSec } = quizFormData;
    const _quizData = { ...quizFormData };
    let isInValidData = false;

    const startTime = +startTimeMin * 60 + +startTimeSec;

    // start time
    if (startTimeMin < 0) {
      _quizData.startTimeMin = '';
      isInValidData = true;
    }
    if (startTimeSec < 0) {
      _quizData.startTimeSec = '';
      isInValidData = true;
    }
    if (startTimeSec > 60) {
      _quizData.startTimeSec = startTimeSec % 60;
      _quizData.startTimeMin = Math.floor(startTimeSec / 60);
      isInValidData = true;
    }
    if (startTime > bingeEndTime) {
      isInValidData = true;
      _quizData.startTimeMin = Math.floor(bingeEndTime / 60);
      _quizData.startTimeSec = bingeEndTime % 60;
    }

    if (isInValidData) return setQuizFormData({ ...quizFormData, ..._quizData });
  }, [quizFormData?.startTimeMin, quizFormData?.startTimeSec]);

  // validate quiz and question form data
  useEffect(() => {
    const question = quizFormData?.question;
    const options = quizFormData?.options;
    let isOptionsCompleted = 0,
      isOneChecked = false;

    options?.forEach((option) => {
      const isComplete = option?.option || option?.file;
      isOptionsCompleted += isComplete ? 1 : 0;

      if (!isComplete) return;

      if (option?.isCorrect && !isOneChecked) isOneChecked = true;
    });

    let questionRequired =
      question && quizFormData?.difficulty && isOptionsCompleted >= 2 && isOneChecked;

    if (quizFormData?.questionId && quizFormData?.formType === 'create') {
      if (quizFormData?.options?.length > isOptionsCompleted) {
        options?.forEach((option) => {
          if (option?.id && !(option?.file || option?.option)) questionRequired = false;
        });
      }
    }
    setIsQuizReady(
      quizFormData.name &&
        quizFormData.type &&
        (!shouldDisplayTime
          ? true
          : !!+quizFormData?.startTimeMin || !!+quizFormData?.startTimeSec) &&
        (questionRequired || (quizFormData?.formType === 'select' && quizFormData?.questionId))
    );
  }, [quizFormData]);

  useEffect(() => {
    if (isFormVisible) return;

    // reset quiz data on form close
    const _allQuiz = structuredClone(topicQuiz)?.map((quiz) => ({ ...quiz, editIndex: null }));
    setQuizFormData(getTopicQuizObject({ courseId: courseMetaData?.id, topicId: topData?.id }));

    // if (_allQuiz?.every((q) => q?.editIndex == null)) return;
    setTopicQuiz(_allQuiz);
  }, [isFormVisible]);

  function toggleForm(type = null) {
    // reset form data
    if (!isFormVisible && type !== 'edit')
      setQuizFormData(getTopicQuizObject({ courseId: courseMetaData?.id, topicId: topData?.id }));

    setIsFormVisible(!isFormVisible);
  }

  function isOptionsDuplicate() {
    const optionArr = quizFormData?.options?.map((op) => op?.option?.trim()?.toLowerCase());
    const isDuplicate = optionArr?.some((op, i) => {
      if (!op) return false;

      return optionArr?.indexOf(op) != i;
    });

    if (isDuplicate) setToastMessage('Options cannot be same.');
    return isDuplicate;
  }

  // input handler
  function handleQuizInput(e, index = null) {
    if (e?.value) setQuizFormData({ ...quizFormData, type: e.value });

    // reset form data on switch
    if (e.target.name === 'formType')
      return setQuizFormData(
        getTopicQuizObject({
          courseId: courseMetaData?.id,
          topicId: topData?.id,
          formType: e.target.value,
          name: quizFormData?.name,
          startTimeMin: quizFormData?.startTimeMin,
          startTimeSec: quizFormData?.startTimeSec,
          editIndex: quizFormData?.editIndex
        })
      );

    if (index != null) {
      const _quizFormData = structuredClone(quizFormData);
      let updatedOption = _quizFormData?.options[index] || null;
      if (updatedOption == null && _quizFormData?.options?.length < 4) {
        updatedOption = { option: '', file: null, attachmentType: '', isCorrect: false };
        _quizFormData?.options?.push(updatedOption);
      }

      if (e.target.type === 'file') {
        const file = e.target.files[0];
        if (!file) return;

        if (file?.size > LIMITS.questionOptionSize) {
          e.target.value = '';
          return setToastMessage(
            `File Size limit is ${Math.ceil(LIMITS.questionOptionSize / ONE_MB_IN_BYTES)} mb`
          );
        }

        updatedOption.file = e.target.files[0];
        updatedOption.attachmentType = e.target.files[0]?.type;
      } else if (e.target.type === 'checkbox') {
        updatedOption.isCorrect = e.target.checked;
      } else {
        updatedOption[e.target.name] = e.target.value;
      }

      return setQuizFormData((prev) => {
        return {
          ...prev,
          options: prev?.options?.map((o, i) => (i === index ? updatedOption : o))
        };
      });
    }

    if (e.target.type === 'checkbox') {
      return setQuizFormData({ ...quizFormData, [e.target.name]: e.target.checked });
    }

    if (e.target.type == 'file') {
      const file = e.target.files[0];
      if (!file) return;

      if (file?.size > LIMITS.questionOptionSize) {
        e.target.value = '';
        return setToastMessage(
          `File Size limit is ${Math.ceil(LIMITS.questionOptionSize / ONE_MB_IN_BYTES)} mb`
        );
      }

      return setQuizFormData({
        ...quizFormData,
        questionFile: e.target.files[0],
        attachmentType: e.target.files[0]?.type
      });
    }

    setQuizFormData({ ...quizFormData, [e.target.name]: e.target.value });
  }

  async function handleEditQuiz(index) {
    if (isFormVisible) return setToastMessage('Please close the open form to edit quiz');

    const _quizData = structuredClone(topicQuiz);
    const _questionData = structuredClone(questionData);

    const selectedQuiz = _quizData?.[index];
    let editQuizData = structuredClone(selectedQuiz);

    const isQuestionDataPresent =
      _questionData?.find((q) => q?.questionId === selectedQuiz?.questionId) || null;

    // load question and option data and save it in questionData
    if (!isQuestionDataPresent) {
      const quesRes = await loadQueryDataAsync(GET_QUESTION_BY_ID, {
        question_ids: [selectedQuiz?.questionId]
      });
      const question = quesRes?.getQuestionsById?.[0];

      const opRes = await loadQueryDataAsync(GET_QUESTION_OPTIONS, {
        question_id: selectedQuiz?.questionId
      });
      const options = opRes?.getOptionsForQuestions?.[0]?.options;

      const quesData = {
        isMandatory: selectedQuiz?.isMandatory || false,
        type: question?.Type || 'MCQ',
        difficulty: question?.Difficulty || 1,
        attachmentType: question?.AttachmentType || '',
        hint: question?.Hint || '',

        questionId: selectedQuiz?.questionId || null,
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

      _questionData.push(quesData);
    }

    if (editQuizData?.options?.length === 2)
      editQuizData?.options?.push({ option: '', file: null, attachmentType: '', isCorrect: false });
    if (editQuizData?.options?.length === 3)
      editQuizData?.options?.push({ option: '', file: null, attachmentType: '', isCorrect: false });

    _quizData?.splice(index, 1, { ...(_quizData?.[index] || {}), editIndex: index });

    const _fullQuestionData =
      _questionData?.find((q) => q?.questionId === selectedQuiz?.questionId) || null;

    // filtering null values to prevent overiding keys
    const filteredQuizData = {};
    Object.keys(editQuizData).forEach((key) => {
      if (!editQuizData?.[key]) return null;

      filteredQuizData[key] = editQuizData?.[key];
    });

    setTopicQuiz(_quizData);
    setQuizFormData({
      ...(_fullQuestionData || null),
      ...filteredQuizData,
      options: filteredQuizData?.options?.map((op, i) => {
        if (op?.id || op?.option || op?.file) return op;

        return _fullQuestionData?.options?.[i];
      }),
      editIndex: index,
      formType: 'create'
    });
    setQuestionData(_questionData);

    toggleForm('edit');
  }

  // save in recoil state
  function handleSubmit() {
    if (isOptionsDuplicate()) return;
    if (topicQuiz?.some((q) => isWordSame(q?.name, quizFormData?.name) && q?.editIndex == null))
      return setToastMessage('Quiz name cannot be same in one topic.');

    const isDuplicate = questionBankData?.questions?.some(
      (q) =>
        isWordSame(q?.Description, quizFormData?.question) && q?.id !== quizFormData?.questionId
    );
    if (isDuplicate) return setToastMessage('Question with same name cannot be added!');

    const _allQuiz = structuredClone(topicQuiz);

    if (quizFormData?.editIndex != null) {
      _allQuiz.splice(quizFormData?.editIndex, 1, { ...quizFormData, editIndex: null });
    } else {
      _allQuiz.push({ ...quizFormData, editIndex: null });
    }

    setTopicQuiz(_allQuiz);
    setQuizFormData(getTopicQuizObject({ courseId: courseMetaData?.id, topicId: topData?.id }));
    setIsFormVisible(false);
  }

  return {
    quizFormData,
    setQuizFormData,
    handleQuizInput,
    isFormVisible,
    toggleForm,
    isQuizReady,
    handleEditQuiz,
    handleSubmit
  };
}
