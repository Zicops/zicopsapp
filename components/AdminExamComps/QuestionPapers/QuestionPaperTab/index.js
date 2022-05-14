import { useRecoilState } from 'recoil';
import TabContainer from '../../../common/TabContainer';
import { QuestionPaperTabAtom, questionPaperTabData } from './Logic/questionPaperTab.helper';

export default function QuestionPaperTab() {
  const [tab, setTab] = useRecoilState(QuestionPaperTabAtom);

  return (
    <>
      {/* TODO: add footer in tab */}
      <TabContainer
        tabData={questionPaperTabData}
        tab={tab}
        setTab={setTab}
        footerObj={{ submitDisplay: 'Save' }}
      />

      {/* <ExamFooter cancelHandler={closeQuestionMasterTab} /> */}
    </>
  );
}
