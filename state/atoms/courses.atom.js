import { COURSE_STATUS, COURSE_TYPES } from '@/helper/constants.helper';
import { atom } from 'recoil';

export const ActiveCourseTabNameAtom = atom({
  key: 'ActiveCourseTabName',
  default: null
});

export const CourseMetaDataAtom = atom({
  key: 'CourseMetaData',
  default: getCourseMetaDataObj()
});

export function getCourseMetaDataObj(data = {}) {
  return {
    // meta data
    id: data?.id || null,
    type: data?.type || COURSE_TYPES[0],
    status: data?.status || COURSE_STATUS.draft,
    isActive: data?.isActive || true,

    createdAt: data?.createdAt || null,
    updatedAt: data?.updatedAt || null,
    createdBy: data?.createdBy || null,
    updatedBy: data?.updatedBy || null,

    // course master
    name: data?.name || '',
    category: data?.category || '',
    subCategory: data?.subCategory || '',
    expertiseLevel: data?.expertiseLevel || '',
    owner: data?.owner || '',
    publisher: data?.publisher || '', // provisioner
    language: data?.language || [],
    isDisplay: data?.isDisplay || false,
    lspId: data?.lspId || null,

    // course details
    subCategories: data?.subCategories || [], // should take sub cat id?
    expectedCompletion: data?.expectedCompletion || null,
    image: data?.image || null,
    previewVideo: data?.previewVideo || null,
    tileImage: data?.tileImage || null,
    summary: data?.summary || '',

    // course about
    // Trainers:data?.Trainers || [],
    // Moderators:data?.Moderators || [],
    // Curriculum:data?.Curriculum || '',
    description: data?.description || '',
    outcomes: data?.outcomes || [],
    benefits: data?.benefits || [], // highlights
    prequisites: data?.prequisites || [],
    relatedSkills: data?.relatedSkills || [],
    goodFor: data?.goodFor || [],
    mustFor: data?.mustFor || [],

    // course topics
    duration: data?.duration || 0,

    // course configuration
    publishDate: data?.publish_date || null, // some issue in backend
    expiryDate: data?.expiry_date || null, // some issue in backend
    qaRequired: data?.qaRequired || false,
    approvers: data?.approvers || [],

    // extra field
    instructor: data?.instructor || ''
  };
}

export const CourseCurrentStateAtom = atom({
  key: 'CourseCurrentState',
  default: getCourseCurrentStateObj()
});

export function getCourseCurrentStateObj(data = {}) {
  return {
    error: data?.error || [],
    isUpdating: data?.isUpdating || false,
    isSaved: data?.isSaved || false,
    isDisabled: data?.isDisabled || false
  };
}

export const ClassroomMasterAtom = atom({
  key: 'ClassroomMaster',
  default: getClassroomMasterDataObj()
});

export function getClassroomMasterDataObj(data = {}) {
  return {
    courseId: data?.courseId || null,
    noOfLearners: data?.noOfLearners || 0,
    trainers: data?.trainers || [],
    moderators: data?.moderators || [],
    courseStartDate: data?.courseStartDate || '',
    courseEndDate: data?.courseEndDate || '',
    curriculum: data?.curriculum,
    createdAt: data?.createdAt || '',
    createdBy: data?.createdBy || '',
    updatedAt: data?.updatedAt || '',
    updatedBy: data?.updatedBy || '',
    status: data?.status || null
  };
}

export const AllCourseModulesDataAtom = atom({
  key: 'AllCourseModulesData',
  default: null
});

export const TopicContentListAtom = atom({
  key: 'TopicContentList',
  default: null
});

export const TopicSubtitlesAtom = atom({
  key: 'TopicSubtitles',
  default: null
});

export function getTopicSubtitlesObject(data) {
  return {
    topicId: data.topicId || null,
    file: data?.file || null,
    subtitleUrl: data.subtitleUrl || null,
    language: data.language || null
  };
}
export const BingeDataAtom = atom({
  key: 'BingeData',
  default: getBingeDataObj()
});

export function getBingeDataObj(data) {
  return {
    skipIntroDuration: data?.skipIntroDuration || 0,
    startTime: data?.startTime || 0,
    nextShowTime: data?.nextShowTime || 0,
    fromEndTime: data?.fromEndTime || 0
  };
}

export const TopicResourcesAtom = atom({
  key: 'TopicResources',
  default: null
});

export function getTopicResourcesObject(data) {
  return {
    id: data.id || null,
    topicId: data.topicId || null,
    name: data.name || '',
    type: data.type || '',
    url: data.url || null,
    file: data.file || null
  };
}
