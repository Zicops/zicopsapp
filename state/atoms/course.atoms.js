import { COURSE_STATUS, COURSE_TYPES } from '@/helper/constants.helper';
import { atom } from 'recoil';

export const FullCourseDataAtom = atom({
  key: 'FullCourseData',
  default: getFullCourseDataObj()
});

export function getFullCourseDataObj(data = {}) {
  return {
    // meta data
    id: data.id || null,
    is_display: data.is_display || false,
    is_active: typeof data.is_active === 'boolean' ? data.is_active : true,
    created_by: data.created_by || '',
    updated_by: data.updated_by || '',
    created_at: data.created_at || '',
    updated_at: data.updated_at || '',
    status: data.status || COURSE_STATUS.draft,
    type: data.type || COURSE_TYPES[0],

    // course master
    name: data.name || '',
    category: data.category || '',
    sub_category: data.sub_category || '',
    owner: data.owner || '',
    publisher: data.publisher || '',
    language: data.language || [],
    lspId: data.lspId || '',

    // course details
    sub_categories: data.sub_categories?.filter((s) => s.name) || [],
    expertise_level: data.expertise_level || '',
    expected_completion: data.expected_completion || '',
    image: data.image || '',
    previewVideo: data.previewVideo || '',
    tileImage: data.tileImage || '',
    summary: data.summary || '',

    // course about
    outcomes: data.outcomes || [],
    benefits: data.benefits || [],
    description: data.description || '',
    prequisites: data.prequisites || [],
    goodFor: data.goodFor || [],
    mustFor: data.mustFor || [],
    related_skills: data.related_skills || [],

    // course topic
    duration: data.duration || 0,
    allModules: data?.allModules || [],
    allChapters: data?.allChapters || [],
    allTopics: data?.allTopics || [],

    // course configuration
    publish_date: data.publish_date || '',
    expiry_date: data.expiry_date || '',
    qa_required: data.qa_required || false,
    approvers: data.approvers || [],

    instructor: data.instructor || ''
  };
}
