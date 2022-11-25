import { BULK_UPLOAD_QUESTIONS, mutationClient } from '@/api/Mutations';
import { SelectedQuestionBankAtom } from '@/state/atoms/exams.atoms';
import { STATUS, StatusAtom } from '@/state/atoms/utils.atoms';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { GET_QUESTION_OPTIONS, queryClient } from '../../../../API/Queries';
import { ToastMsgAtom } from '../../../../state/atoms/toast.atom';
import TabContainer from '../../../common/TabContainer';
import AddQuestionBank from '../AddQuestionBank';
import useHandleQuestionBankQuestion from '../Logic/useHandleQuestionBankQuestion';
import QuestionMaster from './QuestionMaster';

export default function QuestionMasterTab({ isEdit, editQuestionData, closeQuestionMasterTab }) {
  const [loadOptions, { error: errorOptionsData }] = useLazyQuery(GET_QUESTION_OPTIONS, {
    client: queryClient
  });
  const [bulkUploadQuestions] = useMutation(BULK_UPLOAD_QUESTIONS, { client: mutationClient });

  const selectedQb = useRecoilValue(SelectedQuestionBankAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [status, setStatus] = useRecoilState(StatusAtom);
  const [questionData, setQuestionData] = useState(null);
  const [isBulkUpload, setIsBulkUpload] = useState(null);
  const [uploadData, setUploadData] = useState(null);

  useEffect(async () => {
    if (!editQuestionData) return;

    let allOptions = [];
    // set questions
    const question = { ...editQuestionData };

    // load and set all options
    const { data } = await loadOptions({
      variables: { question_id: editQuestionData.id },
      fetchPolicy: 'no-cache'
    });
    if (errorOptionsData) return setToastMsg({ type: 'danger', message: 'options load error' });

    if (data?.getOptionsForQuestions[0]?.options) {
      data?.getOptionsForQuestions[0].options.map((option) => {
        allOptions.push({
          id: option.id,
          qmId: option.QmId,
          description: option.Description,
          isCorrect: option.IsCorrect,
          attachmentType: option.AttachmentType,
          attachment: option.Attachment
        });
      });
    }
    if (!allOptions?.length) setToastMsg({ type: 'danger', message: 'No Options Available' });

    setQuestionData({
      question: question,
      options: allOptions
    });
    setStatus(question.status);
  }, [isEdit, editQuestionData]);

  const data = useHandleQuestionBankQuestion(questionData, closeQuestionMasterTab);
  const { addQuestionAndOptions, updateQuestionAndOptions, isUploading } = data;

  const tabData = [
    {
      name: 'Question Bank',
      component: <AddQuestionBank isPopUp={false} />
    },
    {
      name: 'Question Master',
      component: (
        <QuestionMaster
          data={data}
          isEdit={isEdit}
          uploadDataState={[uploadData, setUploadData]}
          setIsBulkUpload={setIsBulkUpload}
        />
      )
    }
  ];
  const [tab, setTab] = useState(tabData[1].name);

  async function handleFormSubmit() {
    if (isBulkUpload) {
      const res = await bulkUploadQuestions({
        variables: { csv: uploadData[0], qbId: selectedQb?.id }
      });

      if (res?.data?.bulkAddQuestionBankQuestions) {
        setToastMsg({ type: 'success', message: 'Question Bank Uploaded' });
        closeQuestionMasterTab();
        return;
      }

      return setToastMsg({ type: 'danger', message: 'Failed to upload file' });
    }

    if (isEdit) return updateQuestionAndOptions();
    addQuestionAndOptions();
  }

  return (
    <>
      <TabContainer
        tabData={tabData}
        tab={tab}
        setTab={setTab}
        footerObj={{
          submitDisplay: isBulkUpload ? 'Upload' : isEdit ? 'Update' : 'Save',
          disableSubmit: isUploading,
          status: status ? (status === 'Y' ? STATUS.flow[0] : status) : STATUS.display[0],
          handleSubmit: handleFormSubmit,
          handleCancel: () => closeQuestionMasterTab()
        }}
      />
    </>
  );
}
