import { atom } from 'recoil';

// atom for storing single active question bank used for edit, or reference for questions from bank
export const SelectedQuestionBankAtom = atom({
  key: 'SelectedQuestionBank',
  default: {}
});

export function getQuestionBankObject(data = {}) {
  return {
    id: data.id || null,
    name: data.name || '',
    category: data.category || '',
    sub_category: data.sub_category || '',
    is_active: data.is_active || '',
    is_default: data.is_default || '',
    created_at: data.created_at || '',
    updated_at: data.updated_at || '',
    created_by: data.created_by || '',
    updated_by: data.updated_by || '',
    owner: data.owner || ''
  };
}

// rethink about the atoms below here

// this needs to be removed, in progress, removed from 3 files
export const QuestionBankAtom = atom({
  key: 'QuestionBank',
  default: []
});

export const QuestionTabDataAtom = atom({
  key: 'QuestionTabData',
  default: getQuestionTabDataObject()
});

export const QBQuestionsaAtom = atom({
  key: 'QBQuestions',
  default: []
});

export const QuestionPaperTabDataAtom = atom({
  key: 'QuestionPaperTabData',
  default: {}
});

export const CustomSectionAtom = atom({
  key: 'CustomSection',
  default: []
});

export const QuestionMetaDataAtom = atom({
  key: 'QuestionMetaData',
  default: []
});

export const ExamTabDataAtom = atom({
  key: 'ExamTabData',
  default: getExamTabDataObject()
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

export function getQuestionTabDataObject(data = {}) {
  return {
    question: data.question || {},
    options: data.options || []
  };
}

export function getQuestionPaperTabDataObject(data = {}) {
  return {
    questionPaperMaster: data.questionPaperMaster || {},
    question: data.question || {}
  };
}

export function getCustomSectionObject(data = {}) {
  return {
    // id: data.id || '',
    // sequence: data.sequence || 1,
    // type: data.type,
    name: data.name || '',
    description: data.description || ''
  };
}

export function getQuestionMetaDataObject(data = {}) {
  return {
    qbId: data.qbId || null,
    qbName: data.qbName || null,
    category: data.category || null,
    sub_category: data.sub_category || null,
    sectionId: data.sectionId || null,
    difficultyLevel: data.difficultyLevel || '',
    totalQuestions: data.totalQuestions || 0,
    questionMarks: data.questionMarks || 0,
    questionType: data.questionType || '',
    retrieveType: data.retrieveType || '',
    is_active: data.is_active || false
  };
}

export function getExamTabDataObject(data = {}) {
  return {
    name: data.name || '',
    description: data.description || '',
    qbId: data.qbId || '',
    questionPaperName: data.questionPaperName || '',
    duration: data.duration || '',

    code: data.code || '',
    is_exam_active: data.is_exam_active || false,
    type: data.type || '',
    scheduleType: data.scheduleType || '',
    status: data.status || '',
    category: data.category || '',
    sub_category: data.sub_category || '',

    // schedule
    start: data.start || '',
    end: data.end || '',
    bufferTime: data.bufferTime || '',
    is_schedule_active: data.is_schedule_active || '',

    // instruction
    passingCriteria: data.passingCriteria || '',
    noAttempts: data.noAttempts || '',
    accessType: data.accessType || '',
    is_ins_active: data.is_ins_active || ''
  };
}

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
