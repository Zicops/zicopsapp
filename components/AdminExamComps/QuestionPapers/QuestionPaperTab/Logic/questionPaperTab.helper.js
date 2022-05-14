import { atom } from 'recoil';
import QuestionPaperMaster from '../QuestionPaperMaster';
import Questions from '../Questions';

export const questionPaperTabData = [
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
  default: questionPaperTabData[0].name
});
