import { ALL_COURSE_TYPES, COURSE_STATUS } from '@/helper/constants.helper';
import { atom, atomFamily } from 'recoil';

export const courseHeroObj = {
  courseMetaPreview: 'courseMetaPreview',
  coursePreviewVideo: 'coursePreviewVideo',
  content: 'content',
  classroom: 'classroom',
  assessment: 'assessment',
  labs: 'labs',
};

// used for displaying different sections in course hero
export const ActiveCourseHeroAtom = atom({
  key: 'ActiveCourseHero',
  default: courseHeroObj.courseMetaPreview,
});

export const CourseMetaDataAtom = atom({
  key: 'CourseMetaData',
  default: getCourseMetaDataObj(),
});

export function getCourseMetaDataObj(data = {}) {
  return {
    id: data?.id || null,
    lspId: data?.lspId || null,
    name: data?.name || '',
    category: data?.category || '', // should take cat id?
    subCategory: data?.subCategory || '', // should take sub cat id?
    publisher: data?.publisher || '',
    owner: data?.owner || '', // should take user id?
    language: data?.language || [],
    isDisplay: data?.isDisplay || false,
    isActive: data?.isActive || true,

    subCategories: data?.subCategories || [], // should take sub cat id?
    expertiseLevel: data?.expertiseLevel || '', // should be array of enum value?
    image: data?.image || null,
    previewVideo: data?.previewVideo || null,
    tileImage: data?.tileImage || null,
    summary: data?.summary || '',

    description: data?.description || '',
    outcomes: data?.outcomes || [],
    benefits: data?.benefits || [],
    prequisites: data?.prequisites || [],
    goodFor: data?.goodFor || [],
    mustFor: data?.mustFor || [],
    relatedSkills: data?.relatedSkills || [],

    publishDate: data?.publishDate || null, // some issue in backend
    expiryDate: data?.expiryDate || null, // some issue in backend

    instructor: data?.instructor || '',
    qaRequired: data?.qaRequired || false,
    approvers: data?.approvers || [],
    publisher: data?.publisher || [],

    createdAt: data?.createdAt || '',
    updatedAt: data?.updatedAt || '',
    createdBy: data?.createdBy || '',
    updatedBy: data?.updatedBy || '',
    status: data?.status || COURSE_STATUS.draft,

    duration: data?.duration || 0, // expected to be in seconds
    type: data?.type || ALL_COURSE_TYPES.selfPaced,

    expectedCompletion: data?.expectedCompletion || 0,
  };
}

export const UserCourseMapDataAtom = atom({
  key: 'UserCourseData',
  default: getUserCourseMapDataObj(),
});

export function getUserCourseMapDataObj(data = {}) {
  return {
    userCourseId: data?.userCourseId || null,
    userId: data?.userId || null,
    userLspId: data?.userLspId || null,
    courseId: data?.courseId || null,
    courseType: data?.courseType || null,
    addedBy: data?.addedBy || '',
    isMandatory: data?.isMandatory || false,
    endDate: data?.endDate || '',
    courseStatus: data?.courseStatus || null,

    createdAt: data?.createdAt || '',
    updatedAt: data?.updatedAt || '',
    createdBy: data?.createdBy || '',
    updatedBy: data?.updatedBy || '',
  };
}

export const UserTopicProgressDataAtom = atom({
  key: 'UserTopicProgressData',
  default: null,
});

export function getUserTopicProgressDataObj(data = {}) {
  return {
    userCpId: data?.userCpId || null,
    userId: data?.userId || null,
    userCourseId: data?.userCourseId || null,
    topicId: data?.topicId || '',
    topicType: data?.topicType || '',
    status: data?.status || '',
    videoProgress: data?.videoProgress || 0,
    timestamp: data?.timestamp || '',

    createdAt: data?.createdAt || '',
    updatedAt: data?.updatedAt || '',
    createdBy: data?.createdBy || '',
    updatedBy: data?.updatedBy || '',
  };
}

export const activeCourseTabNames = {
  topic: 'Topics',
  resources: 'Resources',
  notes: 'Notes',
  discussion: 'Discussion',
  about: 'About',
};

// used to set active course body tab
export const CourseActiveTabAtom = atom({
  key: 'CourseActiveTabAtom',
  default: null,
});

// used to set active topic and display topic preview accordingly
export const ActiveCourseDataAtom = atom({
  key: 'ActiveCourseData',
  default: getActiveCourseDataObj(),
});

export function getActiveCourseDataObj(data = {}) {
  return {
    moduleId: data?.moduleId || null,
    chapterId: data?.chapterId || null,
    topicId: data?.topicId || null,
    topicContentId: data?.topicContentId || null,
    language: data?.language || null,
    subTitle: data?.subTitle || null,
  };
}

export const CourseModulesAtomFamily = atomFamily({
  key: 'CourseModules',
  default: null,
});

export const CourseTopicsAtomFamily = atomFamily({
  key: 'CourseTopics',
  default: null,
});

export const CourseTopicContentAtomFamily = atomFamily({
  key: 'CourseTopicContent',
  default: null,
});

export const TopicResourcesAtom = atom({
  key: 'TopicResources',
  default: null,
});

export const SelectedResourceDataAtom = atom({
  key: 'SelectedResourceData',
  default: getSelectedResourcesDataObj(),
});

export function getSelectedResourcesDataObj(data = {}) {
  return {
    title: data?.title || null,
    url: data?.url || null,
  };
}

export const TopicQuizAtom = atom({
  key: 'TopicQuiz',
  default: [],
});

export const TopicQuizAttemptsAtom = atom({
  key: 'TopicQuizAttempts',
  default: [],
});

export function getTopicQuizAttemptsDataObj(data = {}) {
  return {
    userQaId: data?.userQaId,
    userId: data?.userId,
    userCpId: data?.userCpId,
    userCourseId: data?.userCourseId,
    quizId: data?.quizId,
    quizAttempt: data?.quizAttempt,
    topicId: data?.topicId,
    result: data?.result,
    isActive: data?.isActive,
    createdBy: data?.createdBy,
    updatedBy: data?.updatedBy,
    createdAt: data?.createdAt,
    updatedAt: data?.updatedAt,
  };
}
