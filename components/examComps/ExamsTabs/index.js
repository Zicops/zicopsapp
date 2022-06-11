import { useState } from 'react';
import TabContainer from '../../common/TabContainer';
import ExamFooter from './ExamFooter';
import { examsTabData } from './Logic/examTabs.helper';

export default function ExamsTabs() {
  const [examsTab, setExamsTab] = useState(examsTabData[0].name);
  return (
    <>
      <TabContainer tabData={examsTabData} tab={examsTab} setTab={setExamsTab} />

      <ExamFooter />
    </>
  );
}
