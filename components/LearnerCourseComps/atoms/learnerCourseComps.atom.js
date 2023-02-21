import { ALL_COURSE_TYPES, COURSE_MAP_STATUS, COURSE_STATUS } from '@/helper/constants.helper';
import { atom, atomFamily } from 'recoil';

export const courseHeroObj = {
  courseMetaPreview: 'courseMetaPreview',
  coursePreviewVideo: 'coursePreviewVideo',
  topicPreview: 'topicPreview',
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

    courseType: data?.courseType || ALL_COURSE_TYPES.selfPaced,
    addedBy: data?.addedBy || '',
    isMandatory: data?.isMandatory || false,
    endDate: data?.endDate || '',
    courseStatus: data?.courseStatus || COURSE_MAP_STATUS.disable,

    createdAt: data?.createdAt || '',
    updatedAt: data?.updatedAt || '',
    createdBy: data?.createdBy || '',
    updatedBy: data?.updatedBy || '',
  };
}

export const UserTopicProgressDataAtom = atom({
  key: 'UserTopicProgressData',
  default: [],
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
  };
}

export const CourseModuleIdsAtom = atom({
  key: 'CourseModuleIds',
  default: [],
});

export const CourseTopcIdsAtom = atom({
  key: 'CourseTopcIds',
  default: [],
});

export const CourseModulesAtomFamily = atomFamily({
  key: 'CourseModules',
  default: [],
});

export const CourseTopicsAtomFamily = atomFamily({
  key: 'CourseTopics',
  default: [],
});

export const CourseTopicContentAtomFamily = atomFamily({
  key: 'CourseTopicContent',
  default: [],
});
