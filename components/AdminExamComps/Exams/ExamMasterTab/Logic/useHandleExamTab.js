import { useRecoilState } from 'recoil';
import { QuestionPaperMasterAtom } from '../../../../../state/atoms/exams.atoms';
import { QuestionPaperTabAtom, questionPaperTabData } from './questionPaperTab.helper';

export default function useHandlePaperTab() {
  const [tab, setTab] = useRecoilState(QuestionPaperTabAtom);
  const [newQuestionPaper, updateNewQuestionPaper] = useRecoilState(QuestionPaperMasterAtom);

  function handleCheckboxInput(e) {
    updateNewQuestionPaper({
      ...newQuestionPaper,
      isSectionWise: e.target.checked
    });
  }

  function handleNextClick(tabIndex) {
    setTab(questionPaperTabData[tabIndex].name);
  }

  return {
    handleNextClick,
    handleCheckboxInput
  };
}
