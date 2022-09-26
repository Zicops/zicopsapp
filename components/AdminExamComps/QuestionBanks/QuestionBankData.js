import TabContainer from '@/common/TabContainer';
import { useState } from 'react';
import AddQuestionBank from './AddQuestionBank';
import QuestionsTable from './QuestionsTable';

export default function QuestionBankData({ isEdit, openEditQuestionMasterTab }) {
  const tabData = [
    {
      name: 'Question Bank',
      component: <AddQuestionBank isPopUp={false} />
    },
    {
      name: 'Questions',
      component: (
        <QuestionsTable openEditQuestionMasterTab={openEditQuestionMasterTab} isEdit={isEdit} />
      )
    }
  ];
  const [tab, setTab] = useState(tabData[1].name);

  return (
    <>
      <TabContainer
        tabData={tabData}
        tab={tab}
        setTab={setTab}
        customStyles={tab?.toLowerCase()?.includes('questions') ? { padding: '0px' } : {}}
        footerObj={{
          showFooter: false
          // submitDisplay: isEdit ? 'Update' : 'Save',
          // disableSubmit: isUploading,
          // status: status || STATUS.display[0],
          // handleSubmit: isEdit ? updateQuestionAndOptions : addQuestionAndOptions,
          // handleCancel: () => closeQuestionMasterTab()
        }}
      />
    </>
  );
}
