import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { GET_QUESTION_OPTIONS, queryClient } from '../../../../API/Queries';
import { ToastMsgAtom } from '../../../../state/atoms/toast.atom';
import TabContainer from '../../../common/TabContainer';
import useHandleQuestionBankQuestion from '../Logic/useHandleQuestionBankQuestion';
import QuestionMaster from './QuestionMaster';
import AddQuestionBank from '../AddQuestionBank';

export default function QuestionMasterTab({ isEdit, editQuestionData, closeQuestionMasterTab }) {
  const [loadOptions, { error: errorOptionsData }] = useLazyQuery(GET_QUESTION_OPTIONS, {
    client: queryClient
  });

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [questionData, setQuestionData] = useState(null);

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
      component: <QuestionMaster data={data} isEdit={isEdit} />
    }
  ];
  const [tab, setTab] = useState(tabData[1].name);

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
