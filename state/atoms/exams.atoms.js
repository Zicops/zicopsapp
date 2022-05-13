import { atom } from 'recoil';

export const QuestionPaperMasterAtom = atom({
  key: 'QuestionPaperMaster',
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

export function getQuestionPaperMasterObject(data = {}) {
  return {
    isSectionWise: data.isSectionWise || false
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
