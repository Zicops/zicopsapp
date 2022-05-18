import { atom } from 'recoil';

export const QuestionBankAtom = atom({
  key: 'QuestionBank',
  default: []
});

export const QuestionTabDataAtom = atom({
  key: 'QuestionTabData',
  default: getQuestionTabDataObject()
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

export const ExamMasterAtom = atom({
  key: 'ExamMaster',
  default: getExamMasterObject()
});

export function getQuestionBankObject(data = {}) {
  return {
    name: data.name || '',
    category: data.category || '',
    sub_category: data.sub_category || '',

    // maybe discarded
    is_active: data.is_active || '',
    is_default: data.is_default || '',
    owner: data.owner || ''
  };
}

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

// object structures which can be used  for reset or immutable new object
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
    questionBank: data.questionBank,
    numberOfQuestions: data.numberOfQuestions
  };
}

export function getExamMasterObject(data = {}) {
  return {
    type: data.type
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
