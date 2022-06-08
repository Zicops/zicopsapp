import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { GET_QUESTION_OPTIONS, queryClient } from '../../../../API/Queries';
import { ToastMsgAtom } from '../../../../state/atoms/toast.atom';
import TabContainer from '../../../common/TabContainer';
import useHandleQuestionBankQuestion from '../Logic/useHandleQuestionBankQuestion';
import QuestionMaster from './QuestionMaster';

export default function QuestionMasterTab({ isEdit, editQuestionData, closeQuestionMasterTab }) {
  const [loadOptions, { error: errorOptionsData }] = useLazyQuery(GET_QUESTION_OPTIONS, {
    client: queryClient
  });

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [questionData, setQuestionData] = useState(null);

  useEffect(async () => {
    if (!editQuestionData) return;

    let allOptions = Array(4).fill({});
    // set questions
    const question = {
      id: editQuestionData.id,
      description: editQuestionData.Description,
      type: editQuestionData.Type,
      difficulty: editQuestionData.Difficulty,
      attachment: editQuestionData.Attachment,
      attachmentType: editQuestionData.AttachmentType,
      hint: editQuestionData.Hint,
      qbmId: editQuestionData.QbmId
    };

    // load and set all options
    const { data } = await loadOptions({ variables: { question_id: editQuestionData.id } });
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

    setQuestionData({
      question: question,
      options: allOptions
    });
  }, [isEdit, editQuestionData]);

  const data = useHandleQuestionBankQuestion(questionData, closeQuestionMasterTab);
  const { addQuestionAndOptions, updateQuestionAndOptions, isUploading } = data;

  const tabData = [
    {
      name: 'Question Master',
      component: <QuestionMaster data={data} isEdit={isEdit} />
    }
  ];
  const [tab, setTab] = useState(tabData[0].name);

  return (
    <>
      <TabContainer
        tabData={tabData}
        tab={tab}
        setTab={setTab}
        footerObj={{
          submitDisplay: isEdit ? 'Update' : 'Save',
          disableSubmit: isUploading,
          handleSubmit: isEdit ? updateQuestionAndOptions : addQuestionAndOptions,
          handleCancel: () => closeQuestionMasterTab()
        }}
      />
    </>
  );
}
