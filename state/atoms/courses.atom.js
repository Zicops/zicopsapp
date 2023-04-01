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

export const AllCourseModulesDataAtom = atom({
  key: 'AllCourseModulesData',
  default: null
});

export const AddTrainerPopUpAtom=atom({
  key:'AddTrainerPopUpAtom',
  default:{
    ExistingUserArr:[],
    InviteTrainer:[]
  }
})
