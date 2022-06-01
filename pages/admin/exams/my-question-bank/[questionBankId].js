import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import QuestionMasterTab from '../../../../components/AdminExamComps/QuestionBanks/QuestionMasterTab';
import QuestionsTable from '../../../../components/AdminExamComps/QuestionBanks/QuestionsTable';
import AdminHeader from '../../../../components/common/AdminHeader';
import MainBody from '../../../../components/common/MainBody';
import MainBodyBox from '../../../../components/common/MainBodyBox';
import Sidebar from '../../../../components/common/Sidebar';
import { examSidebarData } from '../../../../components/common/Sidebar/Logic/sidebar.helper';
import { SelectedQuestionBankAtom } from '../../../../state/atoms/exams.atoms';

export default function MyQuestionBanks() {
  const selectedQB = useRecoilValue(SelectedQuestionBankAtom);

  const [showQuestionForm, setShowQuestionForm] = useState(null);
  const [editQuestionData, setEditQuestionData] = useState(null);

  useEffect(() => {
    if (!showQuestionForm) setEditQuestionData(null);
  }, [showQuestionForm]);

  return (
    <>
      <Sidebar sidebarItemsArr={examSidebarData} />
      <MainBody>
        <AdminHeader
          title={selectedQB.name || 'Questions'}
          isAddShown={!showQuestionForm}
          // pageRoute="/admin/exams/question-bank"
          handleClickForPlus={() => setShowQuestionForm(true)}
        />
        <MainBodyBox>
          {showQuestionForm ? (
            <QuestionMasterTab
              isEdit={editQuestionData !== null}
              editQuestionData={editQuestionData}
              closeQuestionMasterTab={() => setShowQuestionForm(false)}
            />
          ) : (
            <QuestionsTable
              isEdit={true}
              openEditQuestionMasterTab={(questionData) => {
                setEditQuestionData(questionData);
                setShowQuestionForm(true);
              }}
            />
          )}
        </MainBodyBox>
      </MainBody>
    </>
  );
}
