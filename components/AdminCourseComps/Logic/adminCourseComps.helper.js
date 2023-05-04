import {
  ADD_QUESTION_BANK_QUESTION,
  ADD_QUESTION_OPTIONS,
  ADD_TOPIC_QUIZ,
  UPDATE_QUESTION_BANK_QUESTION,
  UPDATE_QUESTION_OPTIONS,
  UPDATE_TOPIC_QUIZ,
  UPLOAD_TOPIC_RESOURCE,
} from '@/api/Mutations';
import { mutateData } from '@/helper/api.helper';
import { QUESTION_STATUS } from '@/helper/constants.helper';
import About from '../About';
import Commercials from '../Commercials';
import Configuration from '../Configuration';
import CourseDetails from '../CourseDetails';
import CourseMaster from '../CourseMaster';
import Topics from '../Topics';
import BookingTable from '../RegisterUserTabs/BookingTable';
import RegisterTable from '../RegisterUserTabs/RegisterTable';
import Analytics from '../Analytics';

// admin course tabs
export const courseTabs = {
  courseMaster: { name: 'Course Master', component: <CourseMaster /> },
  details: { name: 'Details', component: <CourseDetails /> },
  about: { name: 'About', component: <About /> },
  topics: { name: 'Topics', component: <Topics /> },
  commercials: { name: 'Commercials', component: <Commercials />, isHidden: true },
  configuration: { name: 'Configuration', component: <Configuration /> },
  analytics: { name: 'Analytics', component: <Analytics /> },
};
export const usersTabs = [
  { name: 'Registrations', component: <RegisterTable /> },
  { name: 'Bookings', component: <BookingTable /> },
];

// default state objects
export function getModuleDataObject(data = {}) {
  return {
    id: data?.id || null,
    courseId: data?.courseId || null,
    sequence: data?.sequence || 1,
    name: data?.name || '',
    description: data?.description || '',
    level: data?.level || '',
    isChapter: data?.isChapter || false,

    duration: data?.duration || 0,

    owner: data?.owner || '',
    setGlobal: data?.setGlobal || false,
  };
}

export function getChapterDataObject(data = {}) {
  return {
    id: data?.id || null,
    courseId: data?.courseId || null,
    moduleId: data?.moduleId || null,
    sequence: data?.sequence || 1,
    name: data?.name || '',
    description: data?.description || '',
  };
}

export function getTopicDataObj(data = {}) {
  return {
    courseId: data?.courseId || null,
    moduleId: data?.moduleId || null,
    chapterId: data?.chapterId || null,
    id: data?.id || null,

    sequence: data?.sequence || 1,
    name: data?.name || '',
    description: data?.description || '',
    type: data?.type || '',
  };
}

export function getTopicContentDataObj(data = {}) {
  return {
    id: data?.id || null,
    topicId: data?.topicId || null,
    courseId: data?.courseId || null,
    contentUrl: data?.contentUrl || null,
    type: data?.type || null,
    language: data?.language || '',
    duration: data?.duration || '',
    isDefault: data?.isDefault || false,
    file: data?.file || '',
  };
}

export function getTopicAssessmentObj(data = {}) {
  return {
    id: data?.id || null,
    topicId: data?.topicId || null,
    courseId: data?.courseId || null,
    examId: data?.examId || null,
    language: data?.language || '',
    category: data?.category || '',
    subCategory: data?.subCategory || '',
  };
}

// common mutations
export async function addTopicResources(topicResources = [], setToastMessage = () => {}) {
  let isError = false;
  for (let index = 0; index < topicResources?.length; index++) {
    const resource = topicResources[index];
    // check if all required data is present
    if (!resource?.isNew) continue;
    if (!resource.topicId) {
      isError = true;
      setToastMessage(`No Topic Id Found in resource ${resource?.name}`);
      continue;
    }
    if (!resource.courseId) {
      isError = true;
      setToastMessage(`No Course Id Found in resource ${resource?.name}`);
      continue;
    }

    const sendData = {
      name: resource.name,
      type: resource.type,
      topicId: resource.topicId,
      courseId: resource?.courseId,
    };
    if (resource.file && resource.type !== 'LINK') sendData.file = resource.file;
    if (resource.type === 'LINK') sendData.url = resource.url;

    await mutateData(UPLOAD_TOPIC_RESOURCE, sendData).catch((err) => {
      console.log(err);
      isError = true;
      setToastMessage(`${sendData.name} Resource Upload Failed`);
    });
  }

  return isError;
}

// returns question id after success
export async function addUpdateQuestionAndOptions(
  questionBankData = {},
  questionData = {},
  optionData = [],
  setToastMessage = () => {},
) {
  const sendQuestionData = {
    name: '',
    description: questionData?.question,
    type: questionData?.type || 'MCQ',
    difficulty: questionData.difficulty || 1,
    hint: questionData?.hint || '',
    qbmId: questionBankData?.questionBank?.id,
    attachmentType: '',

    // TODO: remove or update later
    createdBy: 'Zicops',
    updatedBy: 'Zicops',
    status: QUESTION_STATUS[1],
  };

  // add files if available
  if (questionData?.questionFile) {
    sendQuestionData.file = questionData?.questionFile;
    sendQuestionData.attachmentType = questionData?.attachmentType || '';
  }

  if (questionData?.id) sendQuestionData.id = questionData?.id;

  const isEdit = !!sendQuestionData?.id;

  let isError = false;
  // add update question
  const questionRes = await mutateData(
    isEdit ? UPDATE_QUESTION_BANK_QUESTION : ADD_QUESTION_BANK_QUESTION,
    sendQuestionData,
  ).catch(() => (isError = true));

  if (!questionRes || isError) {
    setToastMessage(`${isEdit ? 'Update' : 'Add'} Question Error`);
    return null;
  }

  const questionId = questionRes?.addQuestionBankQuestion?.id;

  // add update option
  for (let i = 0; i < optionData?.length; i++) {
    const option = optionData[i];
    if (!option?.option && !option?.file) continue;
    if (!questionId) continue;

    const sendOptionData = {
      description: option.option || '',
      isCorrect: option.isCorrect || false,
      qmId: questionId,
      isActive: true,
      attachmentType: option.attachmentType || '',

      // TODO: remove or update later
      createdBy: 'Zicops',
      updatedBy: 'Zicops',
    };

    // add files
    if (option.file) {
      sendOptionData.file = option.file;
      sendOptionData.attachmentType = option.attachmentType;
    }

    if (option?.id) sendOptionData.id = option?.id;

    const isOptionEdit = !!sendOptionData?.id;

    await mutateData(
      isOptionEdit ? UPDATE_QUESTION_OPTIONS : ADD_QUESTION_OPTIONS,
      sendOptionData,
    ).catch(() =>
      setToastMsg({
        type: 'danger',
        message: `${isOptionEdit ? 'Update' : 'Add'} Option (${i + 1}) Error`,
      }),
    );
  }

  return questionId;
}

export async function addUpdateTopicQuiz(
  questionBankData = null,
  topicQuiz = [],
  setToastMessage = () => {},
) {
  let isError = false;
  if (!questionBankData?.questionBank) return true;

  const subCatQb = questionBankData?.questionBank || {};

  for (let i = 0; i < topicQuiz?.length; i++) {
    const quiz = topicQuiz[i];

    let questionId = quiz?.questionId;

    if (quiz?.formType === 'create') {
      questionId = await addUpdateQuestionAndOptions(
        questionBankData,
        {
          id: quiz?.questionId,
          question: quiz?.question,
          type: quiz?.type,
          difficulty: quiz.difficulty || 1,
          hint: quiz?.hint,
          questionFile: quiz?.questionFile,
          attachmentType: quiz?.attachmentType,
        },
        quiz?.options,
        setToastMessage,
      );
    }

    if (!questionId) {
      isError = true;
      setToastMessage('Question Id not found!');
      continue;
    }

    const startTime = +quiz?.startTimeMin * 60 + +quiz?.startTimeSec;
    const sendQuizData = {
      name: quiz?.name || '',
      category: quiz?.category || '',
      type: quiz?.type || '',
      isMandatory: quiz?.isMandatory || false,
      topicId: quiz?.topicId || '',
      courseId: quiz?.courseId || '',
      qbId: subCatQb?.id,
      weightage: 1,
      sequence: i + 1,
      startTime: startTime,
      questionId: questionId,
    };

    if (quiz?.id) sendQuizData.id = quiz?.id;

    const isQuizEdit = !!sendQuizData?.id;

    await mutateData(isQuizEdit ? UPDATE_TOPIC_QUIZ : ADD_TOPIC_QUIZ, sendQuizData).catch(() => {
      isError = true;
      setToastMessage(`${isQuizEdit ? 'Update' : 'Add'} Quiz Error`);
    });
  }

  return isError;
}
