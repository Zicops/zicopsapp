import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { ExamsTabAtom } from '../../../state/atoms/exam.atom';
import TabContainer from '../../common/TabContainer';
import ExamFooter from './ExamFooter';
import { examsTabData } from './Logic/examTabs.helper';

export default function ExamsTabs() {
  const [examsTab, setExamsTab] = useRecoilState(ExamsTabAtom);
  return (
    <>
      <TabContainer tabData={examsTabData} tab={examsTab} setTab={setExamsTab} />

      <ExamFooter />
    </>
  );
}
