import { useMutation } from '@apollo/client/react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  ADD_QUESTION_PAPER,
  ADD_QUESTION_PAPER_SECTION,
  mutationClient
} from '../../../../../API/Mutations';
import {
  CustomSectionAtom,
  QuestionPaperTabDataAtom
} from '../../../../../state/atoms/exams.atoms';
import { ToastMsgAtom } from '../../../../../state/atoms/toast.atom';
import getQuestionPaperMasterObject, {
  paperTabData,
  QuestionPaperTabAtom
} from './questionPaperTab.helper';

export default function useHandlePaperTab() {
  const [addQuestionPaper, { error: addQuestionPaperError }] = useMutation(ADD_QUESTION_PAPER, {
    client: mutationClient
  });
  const [addPaperSection, { error: addPaperSectionError }] = useMutation(
    ADD_QUESTION_PAPER_SECTION,
    { client: mutationClient }
  );

  // recoil state
  const [tab, setTab] = useRecoilState(QuestionPaperTabAtom);
  const [questionPaperTabData, setQuestionPaperTabData] = useRecoilState(QuestionPaperTabDataAtom);
  const [customSection, udpateCustomSection] = useRecoilState(CustomSectionAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  // local state
  // TODO: replace with get query
  const data = questionPaperTabData?.questionPaperMaster;
  const [questionPaperMaster, setQuestionPaperMaster] = useState(
    getQuestionPaperMasterObject({
      id: data?.id,
      name: data?.name || '',
      category: data?.category || '',
      sub_category: data?.sub_category || '',
      description: data?.description || '',
      section_wise: data?.section_wise || false,
      difficulty_level: data?.difficulty_level || 0,
      suggested_duration: data?.suggested_duration || ''
    })
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

    const res = questionPaperRes?.data?.addQuestionPaper;

    // create a default section
    if (!sendData.section_wise) {
      const defaultSectionData = {
        qpId: res?.id,
        name: 'Default',
        description: '',
        difficulty_level: '',

        // TODO: update later
        total_questions: 0,
        type: 'default',
        is_active: true,
        createdBy: 'Zicops',
        updatedBy: 'Zicops'
      };

      const paperSectionRes = await addPaperSection({ variables: defaultSectionData }).catch(
        (err) => {
          console.log(err);
          isError = !!err;
          return setToastMsg({ type: 'danger', message: 'Add Default Paper Section Error' });
        }
      );
      udpateCustomSection([paperSectionRes?.data?.addQuestionPaperSection]);
    }

    // TODO: update later
    const responseData = {
      id: res?.id,
      name: res?.name || '',
      category: res?.Category || '',
      sub_category: res?.SubCategory || '',
      description: res?.Description || '',
      section_wise: res?.SectionWise || false,
      difficulty_level: res?.DifficultyLevel || 0,
      suggested_duration: res?.SuggestedDuration || ''
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
