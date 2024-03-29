import { COURSE_TYPES } from '@/helper/constants.helper';
import { atom } from 'recoil';

export const ModuleAtom = atom({
  key: 'Module',
  default: []
});

export const ChapterAtom = atom({
  key: 'Chapter',
  default: []
});

export const TopicAtom = atom({
  key: 'Topic',
  default: []
});

export const TopicContentAtom = atom({
  key: 'TopicContent',
  default: []
});

export const TopicExamAtom = atom({
  key: 'TopicExam',
  default: getTopicExamObj()
});

export const TopicClassroomAtom = atom({
  key: 'TopicClassroomAtom',
  default: getTopicClassroomObj()
});

export const ActiveClassroomTopicIdAtom = atom({
  key: 'ActiveClassroomTopicId',
  default: null
});

export const TopicVideoAtom = atom({
  key: 'TopicVideo',
  default: []
});

export const TopicSubtitleAtom = atom({
  key: 'TopicSubtitle',
  default: []
});

export const BingeAtom = atom({
  key: 'Binge',
  default: getBingeObject()
});

export const ResourcesAtom = atom({
  key: 'Resources',
  default: []
});

export const QuizAtom = atom({
  key: 'Quiz',
  default: []
});

export const QuizMetaDataAtom = atom({
  key: 'QuizMetaData',
  default: {
    questionBank: {},
    questions: []
  }
});

export const isLoadingAtom = atom({
  key: 'isLoading',
  default: false
});

export const courseErrorAtom = atom({
  key: 'courseError',
  default: getCourseErrorData()
});

export const uploadStatusAtom = atom({
  key: 'uploadStatus',
  default: null
});

export const CourseTypeAtom = atom({
  key: 'courseType',
  default: COURSE_TYPES[0]
});

// object structures which can be used  for reset or immutable new object
export function getModuleObject(data) {
  return {
    courseId: data.courseId,
    sequence: data.sequence || 1,
    id: data.id || '',
    name: data.name || '',
    isChapter: data.isChapter || false,
    description: data.description || '',
    owner: data.owner || '',
    duration: data.duration || 0,
    level: data.level || '',
    setGlobal: data.setGlobal || false,
    isUpdated: data?.isUpdated || false
  };
}

export function getChapterObject(data) {
  return {
    courseId: data.courseId,
    moduleId: data.moduleId,
    sequence: data.sequence || 1,
    id: data.id || '',
    name: data.name || '',
    description: data.description || '',
    isUpdated: data?.isUpdated || false
  };
}

export function getTopicObject(data) {
  return {
    courseId: data.courseId,
    moduleId: data.moduleId,
    chapterId: data.chapterId,
    sequence: data.sequence || 1,
    id: data.id || '',
    name: data.name || '',
    description: data.description || '',
    type: data.type || '',
    isUpdated: data?.isUpdated || false
  };
}

export function getTopicContentObject(data) {
  return {
    topicId: data.topicId,
    moduleId: data.moduleId,
    id: data.id || '',
    language: data.language || '',
    type: data.type || '',
    duration: data.duration || 0,
    is_default: data.is_default || false
  };
}

export function getTopicExamObj(data = {}) {
  return {
    id: data.id || null,
    topicId: data.topicId,
    courseId: data.courseId,
    examId: data.examId,
    language: data.language || '',
    currentModule: data.currentModule || {},
    currentTopic: data.currentTopic || {}
  };
}

export function getTopicClassroomObj(data = {}) {
  return {
    id: data.id || null,
    topicId: data.topicId,
    courseId: data.courseId,
    language: data.language || '',
    currentModule: data.currentModule || {},
    currentTopic: data.currentTopic || {},
    trainers: data?.trainers || [],
    moderators: data?.moderators || [],
    trainingStartTime: data?.trainingStartTime || null,
    trainingEndTime: data?.trainingEndTime || null,
    duration: data?.duration || '00',
    breaktime: data?.breaktime || '',
    language: data?.language || [],
    isScreenShareEnabled: data?.isScreenShareEnabled || false,
    isChatEnabled: data?.isChatEnabled || false,
    isMicrophoneEnabled: data?.isMicrophoneEnabled || false,
    isQaEnabled: data?.isQaEnabled || false,
    isCameraEnabled: data?.isCameraEnabled || false,
    isOverrideConfig: data?.isOverrideConfig || false,
    status: data?.status || ''
  };
}

export function getTopicVideoObject(data) {
  return {
    courseId: data.courseId,
    contentId: data.contentId,
    file: data.file || null,
    contentUrl: data.contentUrl || null,
    language: data.language || null
  };
}
export function getTopicSubtitleObject(data) {
  return {
    courseId: data.courseId,
    topicId: data.topicId,
    file: data.file || null,
    subtitleUrl: data.subtitleUrl || null,
    language: data.language || null
  };
}

export function getBingeObject() {
  return {
    startTimeMin: 0,
    startTimeSec: 0,
    skipIntroDuration: 0,
    showTimeMin: 0,
    showTimeSec: 5,
    isFromEnd: true
  };
}

export function getResourcesObject(data) {
  return {
    courseId: data.courseId,
    topicId: data.topicId,
    name: data.name || '',
    type: data.type || '',
    url: data.url || null,
    file: data.file || null
  };
}

export function getQuizObject(data) {
  return {
    courseId: data.courseId,
    topicId: data.topicId,
    name: data.name || '',
    startTimeMin: data?.startTimeMin || 0,
    startTimeSec: data?.startTimeSec || 0,
    isMandatory: data.isMandatory || false,
    formType: data.formType || null,
    type: data.type || 'MCQ',
    difficulty: data?.difficulty || 1,
    attachmentType: data?.attachmentType || '',
    hint: data?.hint || '',

    questionId: data.questionId || null,
    question: data.question || '',
    questionFile: data.questionFile || null,

    options: Array(4).fill({
      option: data.option || '',
      file: data.file || null,
      attachmentType: data?.attachmentType || '',
      isCorrect: data.isCorrect || false
    })
  };
}
export function getCourseErrorData(data = {}) {
  return {
    master: data?.master || false,
    details: data?.details || false,
    about: data?.about || false
  };
}
