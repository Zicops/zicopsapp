import { useRecoilState } from 'recoil';
import TabContainer from '../../../common/TabContainer';
import { paperTabData, QuestionPaperTabAtom } from './Logic/questionPaperTab.helper';
import useHandlePaperTab from './Logic/useHandlePaperTab';

export default function QuestionPaperTab() {
  const [tab, setTab] = useRecoilState(QuestionPaperTabAtom);

  const { handleSubmit } = useHandlePaperTab();
  return (
    <>
      {/* TODO: add footer in tab */}
      <TabContainer
        tabData={paperTabData}
        tab={tab}
        setTab={setTab}
        footerObj={{ submitDisplay: 'Save', handleSubmit: handleSubmit }}
      />
    </>
  );
}
