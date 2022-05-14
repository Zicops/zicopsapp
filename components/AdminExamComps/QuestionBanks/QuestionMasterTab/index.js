import { useState } from 'react';
import ExamFooter from '../../../common/ExamFooter';
import TabContainer from '../../../common/TabContainer';
import QuestionMaster from './QuestionMaster';

export default function QuestionMasterTab({ closeQuestionMasterTab }) {
  const tabData = [
    {
      name: 'Question Master',
      component: <QuestionMaster />
    }
  ];
  const [tab, setTab] = useState(tabData[0].name);

  return (
    <>
      {/* TODO: add footer in tab */}
      <TabContainer
        tabData={tabData}
        tab={tab}
        setTab={setTab}
        footerObj={{ submitDisplay: 'Add', handleCancel: closeQuestionMasterTab }}
      />

      {/* <ExamFooter cancelHandler={closeQuestionMasterTab} /> */}
    </>
  );
}
