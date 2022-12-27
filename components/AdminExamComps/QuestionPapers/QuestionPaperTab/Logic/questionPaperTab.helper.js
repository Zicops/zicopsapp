import { atom } from 'recoil';
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

export const isSectionWiseAtom = atom({
  key: 'isSectionWise',
  default: false
});
