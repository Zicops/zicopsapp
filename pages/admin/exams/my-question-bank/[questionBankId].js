import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { GET_QUESTION_BANK_META, queryClient } from '../../../../API/Queries';
import QuestionMasterTab from '../../../../components/AdminExamComps/QuestionBanks/QuestionMasterTab';
import QuestionsTable from '../../../../components/AdminExamComps/QuestionBanks/QuestionsTable';
import AdminHeader from '../../../../components/common/AdminHeader';
import MainBody from '../../../../components/common/MainBody';
import MainBodyBox from '../../../../components/common/MainBodyBox';
import Sidebar from '../../../../components/common/Sidebar';
import { examSidebarData } from '../../../../components/common/Sidebar/Logic/sidebar.helper';
import {
  getQuestionBankObject,
  SelectedQuestionBankAtom
} from '../../../../state/atoms/exams.atoms';
import { ToastMsgAtom } from '../../../../state/atoms/toast.atom';

export default function MyQuestionBanks() {
  const [loadBankMeta, { error: loadMetaError }] = useLazyQuery(GET_QUESTION_BANK_META, {
    client: queryClient
  });

  const [selectedQB, setSelectedQb] = useRecoilState(SelectedQuestionBankAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const [showQuestionForm, setShowQuestionForm] = useState(null);
  const [editQuestionData, setEditQuestionData] = useState(null);

  const router = useRouter();
  const isTabOpen = !!router.query.isTabOpen;
  const questionBankId = router?.query?.questionBankId;

  // open question master tab
  useEffect(() => {
    setShowQuestionForm(isTabOpen);
  }, [isTabOpen]);

  useEffect(() => {
    if (selectedQB?.id) return;
    if (!questionBankId) return;

    loadBankMeta({ variables: { question_bank_id: [questionBankId] } })
      .then((res) => {
        const qBmeta = res?.data?.getQBMeta[0];
        setSelectedQb(getQuestionBankObject(qBmeta));
      })
      .catch((err) => {
        console.log(err);
        return setToastMsg({ type: 'danger', message: 'Bank load error' });
      });
  }, [questionBankId]);

  // error notification
  useEffect(() => {
    if (loadMetaError) return setToastMsg({ type: 'danger', message: 'Bank load error' });
  }, [loadMetaError]);

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
              closeQuestionMasterTab={() => {
                setEditQuestionData(null);
                setShowQuestionForm(false);
              }}
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
