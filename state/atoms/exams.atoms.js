import { atom } from 'recoil';

// refetch queries are saved here
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
  default: {}
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
  default: getQuestionPaperTabDataObject({
    paperMaster: getQuestionPaperMasterObject(),
    sectionData: [],
    qbSectionMapData: [],
    mappedQb: []
  })
});

export function getQuestionPaperTabDataObject(data = {}) {
  return {
    paperMaster: data.paperMaster || {},
    sectionData: data.sectionData || [],
    qbSectionMapData: data.qbSectionMapData || [],
    mappedQb: data.mappedQb || [],
    refetchQBSectionMapping: async function () {}
  };
}

export default function getQuestionPaperMasterObject(data = {}) {
  return {
    id: data.id || null,
    name: data.name || '',
    category: data.category || '',
    sub_category: data.sub_category || '',
    description: data.description || '',
    section_wise: data.section_wise || false,
    difficulty_level: data.difficulty_level || 0,
    suggested_duration: data.suggested_duration || '',

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
    qpId: data?.qpId || '',
    sectionId: data?.sectionId || '',
    difficulty_level: data?.difficulty_level || '',
    category: data.category || '',
    sub_category: data.sub_category || '',
    qbId: data.qbId || '',
    total_questions: data?.total_questions || 0,
    question_marks: data?.question_marks || 0,
    question_type: data?.question_type || 0,
    retrieve_type: data?.retrieve_type || 'manual',

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
    scheduleType: data.scheduleType || '',

    code: data.code || '',
    type: data.type || '',
    category: data.category || '',
    sub_category: data.sub_category || '',

    is_exam_active: data.is_exam_active || false,
    status: data.status || '',

    // instruction
    instructionId: data.instructionId || null,
    passingCriteria: data.passingCriteria || '',
    passingCriteriaType: data.passingCriteriaType || 'Marks',
    isAttemptsVisible: data.isAttemptsVisible || false,
    noAttempts: data.noAttempts || 0,
    accessType: data.accessType || '',
    is_ins_active: data.is_ins_active || '',

    // schedule
    scheduleId: data.schedule || null,
    examStartDate: data.examStartDate || Date.now(),
    examStartTime: data.examStartTime || Date.now(),
    examEndDate: data.examEndDate || Date.now(),
    examEndTime: data.examEndTime || Date.now(),
    bufferTime: data.bufferTime || 0,
    isStretch: data.isStretch || false,
    is_schedule_active: data.is_schedule_active || false,

    // configuration
    configId: data.configId || null,
    shuffle: data.shuffle || false,
    showResult: data.showResult || false,
    showAnswer: data.showAnswer || false,
    displayHints: data.displayHints || false,
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
