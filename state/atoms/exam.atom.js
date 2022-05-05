import { atom } from 'recoil';
import { examsTabData } from '../../components/examComps/ExamsTabs/Logic/examTabs.helper';

export const ExamsTabAtom = atom({
  key: 'ExamsTab',
  default: examsTabData[0].name
});

// testing data need to be removed later ----file end --- remove below

// data model
const questionBank = {
  name: '',
  description: '',
  category: '',
  sub_category: ''
};

const question = {
  name: '',
  type: '',
  imageUrl: '',
  audioUrl: '',
  videoUrl: '',
  attachmentUrl: '',
  hint: '',
  options: [
    { value: '', isCorrect: false, type: 'text' },
    { value: '', isCorrect: false, type: 'video' },
    { value: '', isCorrect: false, type: 'attachment' },
    { value: '', isCorrect: true, type: 'image' }
  ]
};

const uploadQuestionFile = {
  file: '',
  url: ''
};

const questionPaper = {
  name: '',
  description: '',
  category: '',
  sub_category: '',
  level: '',
  isSectionWise: false
};

const section = {
  name: '',
  description: '',
  type: ''
};

const questionMetaData = {};
