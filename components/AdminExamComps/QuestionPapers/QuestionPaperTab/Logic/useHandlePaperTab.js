import { useMutation } from '@apollo/client/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
  ADD_QUESTION_PAPER,
  ADD_QUESTION_PAPER_SECTION,
  mutationClient,
  UPDATE_QUESTION_PAPER
} from '../../../../../API/Mutations';
import {
  getQuestionPaperTabDataObject,
  QuestionPaperTabDataAtom
} from '../../../../../state/atoms/exams.atoms';
import { ToastMsgAtom } from '../../../../../state/atoms/toast.atom';
import { paperTabData, QuestionPaperTabAtom } from './questionPaperTab.helper';

export default function useHandlePaperTab() {
  const [addQuestionPaper, { error: addPaperError }] = useMutation(ADD_QUESTION_PAPER, {
    client: mutationClient
  });
  const [updatePaper, { error: updatePaperError }] = useMutation(UPDATE_QUESTION_PAPER, {
    client: mutationClient
  });
  const [addPaperSection, { error: addPaperSectionError }] = useMutation(
    ADD_QUESTION_PAPER_SECTION,
    { client: mutationClient }
  );

  const router = useRouter();
  const questionPaperId = router.query?.questionPaperId;
  // recoil state
  const [tab, setTab] = useRecoilState(QuestionPaperTabAtom);
  const [questionPaperTabData, setQuestionPaperTabData] = useRecoilState(QuestionPaperTabDataAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  // reset state if add question paper form
  useEffect(() => {
    if (questionPaperId || questionPaperTabData?.paperMaster?.id) return;

    setQuestionPaperTabData(getQuestionPaperTabDataObject());
  }, []);

  // error notification
  useEffect(() => {
    if (addPaperError) return setToastMsg({ type: 'danger', message: `Add Paper Error` });
    if (updatePaperError) return setToastMsg({ type: 'danger', message: `Update Paper Error` });

    if (addPaperSectionError) return setToastMsg({ type: 'danger', message: `Add Section Error` });
  }, [addPaperError, addPaperSectionError, updatePaperError]);

  // question paper master input handler
  function handleInput(e, inputName = null) {
    const questionPaperMaster = {
      ...questionPaperTabData.paperMaster
    };
    // for react select
    if (inputName) questionPaperMaster[inputName] = e.value;
    // for checkbox
    if (e?.target?.type === 'checkbox') questionPaperMaster[e.target.name] = e.target.checked;
    // for normal input
    if (e?.target?.type !== 'checkbox' && !inputName)
      questionPaperMaster[e.target.name] = e.target.value;

    setQuestionPaperTabData({
      ...questionPaperTabData,
      paperMaster: questionPaperMaster
    });
  }

  // data validation before add or update
  function isDataValid() {
    const paperMaster = questionPaperTabData.paperMaster;
    return (
      paperMaster.name &&
      paperMaster.description &&
      paperMaster.category &&
      paperMaster.sub_category &&
      paperMaster.difficulty_level
    );
  }

  async function addNewQuestionPaper(tabIndex) {
    if (!isDataValid())
      return setToastMsg({ type: 'danger', message: 'Please fill all the details' });

    const tabData = { ...questionPaperTabData };
    const questionPaperData = questionPaperTabData.paperMaster;
    const sendData = {
      name: questionPaperData.name || '',
      category: questionPaperData.category || '',
      sub_category: questionPaperData.sub_category || '',
      description: questionPaperData.description || '',
      section_wise: questionPaperData.section_wise || false,
      difficulty_level: questionPaperData.difficulty_level || 0,
      suggested_duration: questionPaperData.suggested_duration || '',

      // TODO: update later
      is_active: questionPaperData.is_active || false,
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

    if (isError) return setToastMsg({ type: 'danger', message: 'Add Question Paper Error' });

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
      const data = paperSectionRes?.data?.addQuestionPaperSection;

      if (!data) return setToastMsg({ type: 'danger', message: 'Add Section Error' });
      const sectionData = {
        id: data?.id,
        qpId: data?.QpId,
        name: data?.Name,
        description: data?.Description,
        type: data?.Type,
        difficulty_level: data?.DifficultyLevel,
        total_questions: data?.TotalQuestions,
        created_at: data?.CreatedAt,
        updated_at: data?.UpdatedAt,
        created_by: data?.CreatedBy,
        updated_by: data?.UpdatedBy,
        is_active: data?.IsActive
      };

      tabData['sectionData'] = [sectionData];
    }

    const paperMaster = {
      id: res?.id,
      name: res?.name || '',
      category: res?.Category || '',
      sub_category: res?.SubCategory || '',
      description: res?.Description || '',
      section_wise: res?.SectionWise || false,
      difficulty_level: res?.DifficultyLevel || 0,
      suggested_duration: res?.SuggestedDuration || ''
    };
    tabData[paperMaster] = paperMaster;

    setQuestionPaperTabData(tabData);

    if (!isError) setToastMsg({ type: 'success', message: 'New Question Paper Added' });
    if (!isNaN(+tabIndex)) {
      router.push(`${router.asPath}/${paperMaster.id}`);
      setTab(paperTabData[tabIndex].name);
    }
  }

  async function updateQuestionPaper(tabIndex) {
    if (!isDataValid())
      return setToastMsg({ type: 'danger', message: 'Please fill all the details' });

    const questionPaperData = questionPaperTabData.paperMaster;
    const sendData = {
      id: questionPaperData.id,
      name: questionPaperData.name || '',
      category: questionPaperData.category || '',
      sub_category: questionPaperData.sub_category || '',
      description: questionPaperData.description || '',
      section_wise: questionPaperData.section_wise || false,
      difficulty_level: questionPaperData.difficulty_level || 0,
      suggested_duration: questionPaperData.suggested_duration || '',

      // TODO: update later
      is_active: questionPaperData.is_active || false,
      createdBy: 'Zicops',
      updatedBy: 'Zicops'
    };

    console.log(sendData);
    let isError = false;
    const questionPaperRes = await updatePaper({ variables: sendData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Update Question Paper Error' });
    });
    console.log(questionPaperRes?.data);

    const res = questionPaperRes?.data?.updateQuestionPaper;
    if (!res || isError)
      return setToastMsg({ type: 'danger', message: 'Update Question Paper Error' });

    const paperMaster = {
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
      paperMaster: paperMaster
    });

    if (!isError) setToastMsg({ type: 'success', message: 'Question Paper Updated' });
    if (!isNaN(+tabIndex)) setTab(paperTabData[tabIndex].name);
  }

  return {
    handleInput,
    addNewQuestionPaper,
    updateQuestionPaper
  };
}
