import ExamConfigration from '../../ExamConfigration/Index';
import QuestionBankCard from '../../AddQuestionBank';
import AddQuestionMetaData from '../AddQuestionMetaData';
import Question from '../Question';
import QuestionPaperMaster from '../QuestionPaperMaster';
import ExamMaster from '../../ExamMaster';

export const examsTabData = [
  {
    name: 'Question Bank',
    component: <QuestionBankCard />
  },
  {
    name: 'Question Paper Master',
    component: <QuestionPaperMaster />
  },
  {
    name: 'Questions',
    component: <Question />
  },
  {
    name: 'Question Meta Data',
    component: <AddQuestionMetaData />
  },
  {
    name: 'Configuration',
    component: <ExamMaster />
  }
];
