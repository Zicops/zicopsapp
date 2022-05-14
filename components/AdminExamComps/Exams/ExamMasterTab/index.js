import { useRecoilState, useRecoilValue } from 'recoil';
import TabContainer from '../../../common/TabContainer';
import { ExamMasterTabAtom, ExamMasterTabDataSelector } from './Logic/examMasterTab.helper';

export default function ExamMasterTab() {
  const [tab, setTab] = useRecoilState(ExamMasterTabAtom);
  const examMasterTabData = useRecoilValue(ExamMasterTabDataSelector);

  return (
    <TabContainer
      tabData={examMasterTabData}
      tab={tab}
      setTab={setTab}
      footerObj={{ submitDisplay: 'Save' }}
    />
  );
}
