import { atom } from 'recoil';
import { getQuestionMetaDataObject } from '../../../../../state/atoms/exams.atoms';
import QuestionPaperMaster from '../QuestionPaperMaster';
import Questions from '../Questions';

export const paperTabData = [
  {
    name: 'Question Paper Master',
    component: <QuestionPaperMaster />
  },
  {
    name: 'Questions',
    component: <Questions />
  }
];

export const QuestionPaperTabAtom = atom({
  key: 'QuestionPaperTab',
  default: paperTabData[0].name
});

export default function getQuestionPaperMasterObject(data = {}) {
  return {
    id: data.id,
    name: data.name || '',
    category: data.category || '',
    sub_category: data.sub_category || '',
    description: data.description || '',
    section_wise: data.section_wise || false,
    difficulty_level: data.difficulty_level || 0,
    suggested_duration: data.suggested_duration || '',

    // TODO: update later
    is_active: data.is_active || false,
    is_default: data.is_default || false
  };
}

export const NewQuestionMetaDataAtom = atom({
  key: 'NewQuestionMetaData',
  default: getQuestionMetaDataObject()
});
