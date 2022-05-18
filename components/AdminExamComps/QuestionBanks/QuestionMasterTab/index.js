import { useState } from 'react';
import ExamFooter from '../../../common/ExamFooter';
import TabContainer from '../../../common/TabContainer';
import useHandleQuestionBankQuestion from '../Logic/useHandleQuestionBankQuestion';
import QuestionMaster from './QuestionMaster';

export default function QuestionMasterTab({ closeQuestionMasterTab }) {
  const tabData = [
    {
      name: 'Question Master',
      component: <QuestionMaster />
    }
  ];
  const [tab, setTab] = useState(tabData[0].name);

  const { addQuestionAndOptions } = useHandleQuestionBankQuestion();

  return (
    <>
      {/* TODO: add footer in tab */}
      <TabContainer
        tabData={tabData}
        tab={tab}
        setTab={setTab}
        footerObj={{
          submitDisplay: 'Add',
          handleSubmit: addQuestionAndOptions,
          handleCancel: closeQuestionMasterTab
        }}
      />

      {/* <ExamFooter cancelHandler={closeQuestionMasterTab} /> */}
    </>
  );
}
