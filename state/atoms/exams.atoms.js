import { atom } from 'recoil';

// refetch queries are saved here
// maybe not required, delete later if not used
export const RefetchDataAtom = atom({
  key: 'RefetchData',
  default: {
    questionBank: function () {},
    questionBankQuestions: function () {},
    questionBankOptions: function () {},
    questionPaper: function () {},
    questionPaperSections: function () {},
    QbSectionsMapping: function () {},
    fixedQuestion: function () {},
    exam: function () {},
    examMaster: function () {},
    examInstruction: function () {},
    examSchedule: function () {},
    examConfiguration: function () {}
  }
});

// atom for storing single active question bank used for edit, or reference for questions from bank
export const SelectedQuestionBankAtom = atom({
  key: 'SelectedQuestionBank',
  default: getQuestionBankObject()
});

export function getQuestionBankObject(data = {}) {
  return {
    id: data.id || null,
    name: data.name || '',
    description: data.description || '',
    category: data.category || '',
    sub_category: data.sub_category || '',

    owner: data.owner || '',
    is_active: data.is_active || '',
    is_default: data.is_default || '',
    created_at: data.created_at || '',
    updated_at: data.updated_at || '',
    created_by: data.created_by || '',
    updated_by: data.updated_by || ''
  };
}

export const QuestionPaperTabDataAtom = atom({
  key: 'QuestionPaperTabData',
  default: getQuestionPaperTabDataObject()
});

export function getQuestionPaperTabDataObject(data = {}) {
  return {
    paperMaster: data.paperMaster || getQuestionPaperMasterObject(),
    sectionData: data.sectionData || [],
    qbSectionMapData: data.qbSectionMapData || [],
    mappedQb: data.mappedQb || [],
    currentFixedQuestion: data.currentFixedQuestion || getFixedQuestionObject(),
    refetchQBSectionMapping: async function () {}
  };
}

export function getQuestionPaperMasterObject(data = {}) {
  return {
    id: data.id || null,
    name: data.name || '',
    category: data.category || '',
    sub_category: data.sub_category || '',
    description: data.description || '',
    section_wise: data.section_wise || false,
    difficulty_level: data.difficulty_level || 0,
    suggested_duration: data.suggested_duration || '',

    status: data.status || 'DRAFT',
    is_active: data.is_active || false,
    is_default: data.is_default || false,
    created_at: data.created_at || '',
    updated_at: data.updated_at || '',
    created_by: data.created_by || '',
    updated_by: data.updated_by || ''
  };
}

export function getCustomSectionObject(data = {}) {
  return {
    id: data?.id || null,
    qpId: data?.QpId || '',
    name: data?.Name || '',
    description: data?.Description || '',
    type: data?.Type || '',
    difficulty_level: data?.DifficultyLevel || '',
    total_questions: data?.TotalQuestions || '',

    is_active: data?.IsActive || '',
    created_at: data?.CreatedAt || '',
    updated_at: data?.UpdatedAt || '',
    created_by: data?.CreatedBy || '',
    updated_by: data?.UpdatedBy || ''
  };
}

export function getQuestionMetaDataObject(data = {}) {
  return {
    id: data?.id || null,
    sectionId: data?.sectionId || '',
    qbId: data.qbId || '',
    difficulty_level: data?.difficulty_level || '',
    category: data.category || '',
    sub_category: data.sub_category || '',
    total_questions: data?.total_questions || 0,
    question_marks: data?.question_marks || 0,
    question_type: data?.question_type || 0,
    retrieve_type: data?.retrieve_type || 'random',

    is_active: data?.is_active || '',
    created_at: data?.created_at || '',
    updated_at: data?.updated_at || '',
    created_by: data?.Created_by || '',
    updated_by: data?.updated_by || ''
  };
}

export function getFixedQuestionObject(data = {}) {
  return {
    id: data?.id || null,
    mappingId: data?.mappingId || '',
    questionId: data?.questionId || '',

    is_active: data?.is_active || '',
    created_at: data?.created_at || '',
    updated_at: data?.updated_at || '',
    created_by: data?.Created_by || '',
    updated_by: data?.updated_by || ''
  };
}

export const ExamTabDataAtom = atom({
  key: 'ExamTabData',
  default: getExamTabDataObject()
});

export function getExamTabDataObject(data = {}) {
  return {
    id: data.id || null,
    name: data.name || '',
    description: data.description || '',
    qpId: data.qpId || '',
    duration: data.duration || 0,
    schedule_type: data.schedule_type || '',

    code: data.code || '',
    type: data.type || '',
    category: data.category || '',
    sub_category: data.sub_category || '',
    total_marks: data.total_marks || 0,

    is_exam_active: data.is_exam_active || false,
    status: data.status || '',

    // instruction
    instructionId: data.instructionId || null,
    passing_criteria: data.passing_criteria || '',
    passing_criteria_type: data.passing_criteria_type || 'Marks',
    is_attempts_visible: data.is_attempts_visible || false,
    no_attempts: data.no_attempts || 0,
    instructions: data.instructions || '',
    access_type: data.access_type || '',
    is_ins_active: data.is_ins_active || '',

    // schedule
    scheduleId: data.schedule || null,
    exam_start_date: data.exam_start_date || Date.now(),
    exam_start_time: data.exam_start_time || Date.now(),
    exam_end_date: data.exam_end_date || Date.now(),
    exam_end_time: data.exam_end_time || Date.now(),
    buffer_time: data.buffer_time || 0,
    is_stretch: data.is_stretch || false,
    is_schedule_active: data.is_schedule_active || false,

    // configuration
    configId: data.configId || null,
    shuffle: data.shuffle || false,
    show_result: data.show_result || false,
    show_answer: data.show_answer || false,
    display_hints: data.display_hints || false,
    is_config_active: data.is_config_active || false
  };
}
// rethink about the atoms below here

// this needs to be removed, in progress, removed from 3 files

// export const QuestionTabDataAtom = atom({
//   key: 'QuestionTabData',
//   default: getQuestionTabDataObject()
// });

// export const QBQuestionsaAtom = atom({
//   key: 'QBQuestions',
//   default: []
// });

export const CustomSectionAtom = atom({
  key: 'CustomSection',
  default: []
});

export const QuestionMetaDataAtom = atom({
  key: 'QuestionMetaData',
  default: []
});

// export function getQuestionBankObject(data = {}) {
//   return {
//     id: data.id || null,
//     name: data.name || '',
//     category: data.category || '',
//     sub_category: data.sub_category || '',

//     // maybe discarded
//     is_active: data.is_active || '',
//     is_default: data.is_default || '',
//     owner: data.owner || ''
//   };
// }

// export function getQuestionTabDataObject(data = {}) {
//   return {
//     question: data.question || {},
//     options: data.options || []
//   };
// }

// remove later below

export const examRadioButton = atom({
  key: 'examRadioButton', // unique ID (with respect to other atoms/selectors)
  default: [] // default value (aka initial value)
});
export const qBankNameAtom = atom({
  key: 'qBankName',
  default: []
});
export const qBankDescAtom = atom({
  key: 'qBankDesc',
  default: []
});
export const categoryAtom = atom({
  key: 'charAtom',
  default: []
});
export const subCategoryAtom = atom({
  key: 'subCategoryAtom',
  default: []
});
