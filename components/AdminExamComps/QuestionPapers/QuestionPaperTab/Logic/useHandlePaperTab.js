import { useMutation } from '@apollo/client/react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { ADD_QUESTION_PAPER, mutationClient } from '../../../../../API/Mutations';
import { QuestionPaperTabDataAtom } from '../../../../../state/atoms/exams.atoms';
import { ToastMsgAtom } from '../../../../../state/atoms/toast.atom';
import getQuestionPaperMasterObject, {
  paperTabData,
  QuestionPaperTabAtom
} from './questionPaperTab.helper';

export default function useHandlePaperTab() {
  const [addQuestionPaper, { error: addQuestionPaperError }] = useMutation(ADD_QUESTION_PAPER, {
    client: mutationClient
  });

  // recoil state
  const [tab, setTab] = useRecoilState(QuestionPaperTabAtom);
  const [questionPaperTabData, setQuestionPaperTabData] = useRecoilState(QuestionPaperTabDataAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  // local state
  const [questionPaperMaster, setQuestionPaperMaster] = useState(
    getQuestionPaperMasterObject(questionPaperTabData?.questionPaperMaster)
  );

  useEffect(() => {
    setQuestionPaperTabData({
      ...questionPaperTabData,
      questionPaperMaster: questionPaperMaster
    });
  }, [questionPaperMaster]);

  function isDataValid() {
    const paperMaster = questionPaperTabData.questionPaperMaster;
    return (
      paperMaster.name &&
      paperMaster.description &&
      paperMaster.category &&
      paperMaster.sub_category &&
      paperMaster.difficulty_level
    );
  }

  async function handleSubmit(tabIndex) {
    if (!isDataValid())
      return setToastMsg({ type: 'danger', message: 'Please fill all the details' });

    const questionPaperMaster = questionPaperTabData.questionPaperMaster;
    const sendData = {
      name: questionPaperMaster.name || '',
      category: questionPaperMaster.category || '',
      sub_category: questionPaperMaster.sub_category || '',
      description: questionPaperMaster.description || '',
      section_wise: questionPaperMaster.section_wise || false,
      difficulty_level: questionPaperMaster.difficulty_level || 0,
      suggested_duration: questionPaperMaster.suggested_duration || '',

      // TODO: update later
      is_active: questionPaperMaster.is_active || false,
      createdBy: 'Zicops',
      updatedBy: 'Zicops'
    };

    console.log(sendData);
    let isError = false;
    const questionPaperRes = await addQuestionPaper({ variables: sendData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Add Question Paper Error' });
    });
    console.log(questionPaperRes?.data);

    // TODO: update later
    const res = questionPaperRes?.data?.addQuestionPaper;
    const responseData = {
      id: res.id,
      name: res.name || '',
      category: res.Category || '',
      sub_category: res.SubCategory || '',
      description: res.Description || '',
      section_wise: res.SectionWise || false,
      difficulty_level: res.DifficultyLevel || 0,
      suggested_duration: res.SuggestedDuration || ''
    };

    setQuestionPaperTabData({
      ...questionPaperTabData,
      questionPaperMaster: responseData
    });

    if (!isError) setToastMsg({ type: 'success', message: 'New Question Paper Added' });
    if (!isNaN(+tabIndex)) setTab(paperTabData[tabIndex].name);
  }

  return {
    questionPaperMaster,
    setQuestionPaperMaster,
    handleSubmit
  };
}
