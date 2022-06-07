import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
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
  const [shouldDataBeRefetched, setShouldDataBeRefetched] = useState(false);

  const router = useRouter();
  const isTabOpen = !!router.query.isTabOpen;

  // open question master tab
  useEffect(() => {
    setShowQuestionForm(isTabOpen);
  }, [isTabOpen]);

  return (
    <>
      <Sidebar sidebarItemsArr={examSidebarData} />
      <MainBody>
        <AdminHeader
          title={selectedQB.name || 'Questions'}
          isAddShown={!showQuestionForm}
          handleClickForPlus={() => setShowQuestionForm(true)}
        />
        <MainBodyBox>
          {showQuestionForm ? (
            <QuestionMasterTab
              isEdit={editQuestionData != null}
              editQuestionData={editQuestionData}
              closeQuestionMasterTab={(isDataLoaded) => {
                setShouldDataBeRefetched(!!isDataLoaded);
                setEditQuestionData(null);
                setShowQuestionForm(false);
              }}
            />
          ) : (
            <QuestionsTable
              isEdit={true}
              shouldDataBeRefetched={shouldDataBeRefetched}
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
