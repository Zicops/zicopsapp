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
import { GET_LATEST_QUESTION_PAPERS_NAMES } from '../../../../../API/Queries';
import { isNameDuplicate } from '../../../../../helper/data.helper';
import {
  getQuestionPaperTabDataObject,
  QuestionPaperTabDataAtom
} from '../../../../../state/atoms/exams.atoms';
import { ToastMsgAtom } from '../../../../../state/atoms/toast.atom';
import { STATUS, StatusAtom } from '../../../../../state/atoms/utils.atoms';
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
  const [status, setStatus] = useRecoilState(StatusAtom);
  const [questionPaperTabData, setQuestionPaperTabData] = useRecoilState(QuestionPaperTabDataAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  // reset state if add question paper form
  useEffect(() => {
    if (questionPaperId || questionPaperTabData?.paperMaster?.id) return;
    if (questionPaperTabData?.paperMaster?.isUpdated) return;

    setQuestionPaperTabData(getQuestionPaperTabDataObject());
  }, []);

  // useEffect(() => {
  //   if (!questionPaperId) return;
  //   if (STATUS.flow.includes(status)) return;

  //   // after saving paper master for first time
  //   if (toastMsg[0]?.type === 'success') return;
  //   if (questionPaperTabData.paperMaster?.isUpdated && tab === paperTabData[1].name) {
  //     setTab(paperTabData[0].name);
  //     setToastMsg({ type: 'danger', message: 'Please save Question Paper Master data' });
  //     return;
  //   }
  // }, [tab]);

  // error notification
  useEffect(() => {
    if (addPaperError) return setToastMsg({ type: 'danger', message: `Add Paper Error` });
    if (updatePaperError) return setToastMsg({ type: 'danger', message: `Update Paper Error` });

    if (addPaperSectionError) return setToastMsg({ type: 'danger', message: `Add Section Error` });
  }, [addPaperError, addPaperSectionError, updatePaperError]);

  // set the footer status
  useEffect(() => {
    if (toastMsg[0]?.type === 'danger') {
      setStatus(STATUS.display[1]);

      if (questionPaperTabData.paperMaster?.status) {
        setTimeout(() => {
          setStatus(questionPaperTabData.paperMaster?.status || STATUS.display[1]);
        }, 2000);
      }
    }
  }, [toastMsg]);

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

    questionPaperMaster.isUpdated = true;
    setQuestionPaperTabData({
      ...questionPaperTabData,
      paperMaster: questionPaperMaster
    });
  }

  // data validation before add or update
  function isDataValid() {
    const paperMaster = questionPaperTabData.paperMaster;

    let errMsg = null;
    if (!paperMaster.suggested_duration) errMsg = 'Please add paper suggested duration';
    if (!paperMaster.difficulty_level) errMsg = 'Please add paper difficulty level';
    if (!paperMaster.sub_category) errMsg = 'Please select paper sub category';
    if (!paperMaster.category) errMsg = 'Please select paper category';
    if (!paperMaster.description) errMsg = 'Please add paper description';
    if (!paperMaster.name) errMsg = 'Please add paper name';

    if (errMsg) setToastMsg({ type: 'danger', message: errMsg });
    return !errMsg;
  }

  async function addNewQuestionPaper(tabIndex) {
    setStatus('UPDATING');
    if (!isDataValid()) return;

    const tabData = { ...questionPaperTabData };
    const questionPaperData = questionPaperTabData.paperMaster;
    // duplicate name check
    if (
      await isNameDuplicate(
        GET_LATEST_QUESTION_PAPERS_NAMES,
        questionPaperData?.name,
        'getLatestQuestionPapers.questionPapers'
      )
    ) {
      return setToastMsg({ type: 'danger', message: 'Paper with same name already exist' });
    }

    const sendData = {
      name: questionPaperData.name || '',
      category: questionPaperData.category || '',
      sub_category: questionPaperData.sub_category || '',
      description: questionPaperData.description || '',
      section_wise: questionPaperData.section_wise || false,
      difficulty_level: questionPaperData.difficulty_level || 0,
      suggested_duration: questionPaperData.suggested_duration || '0',

      // TODO: update later
      status: STATUS.flow[0],
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

    const paperMaster = {
      id: res?.id,
      name: res?.name || '',
      category: res?.Category || '',
      sub_category: res?.SubCategory || '',
      description: res?.Description || '',
      section_wise: res?.SectionWise || false,
      difficulty_level: res?.DifficultyLevel || 0,
      suggested_duration: res?.SuggestedDuration || '0',
      status: res?.Status || ''
    };
    tabData[paperMaster] = paperMaster;

    setQuestionPaperTabData(tabData);

    if (!isError) setToastMsg({ type: 'success', message: 'New Question Paper Added' });
    if (!isNaN(+tabIndex)) {
      router.push(`${router.asPath}/${paperMaster.id}`);
      setTab(paperTabData[tabIndex].name);
    }

    setStatus(STATUS.flow[0]);
  }

  async function updateQuestionPaper(tabIndex) {
    setStatus('UPDATING');
    if (!isDataValid()) return;

    const questionPaperData = questionPaperTabData.paperMaster;
    // duplicate name check
    if (
      await isNameDuplicate(
        GET_LATEST_QUESTION_PAPERS_NAMES,
        questionPaperData?.name,
        'getLatestQuestionPapers.questionPapers',
        questionPaperData?.id
      )
    ) {
      return setToastMsg({ type: 'danger', message: 'Paper with same name already exist' });
    }

    const sendData = {
      id: questionPaperData.id,
      name: questionPaperData.name || '',
      category: questionPaperData.category || '',
      sub_category: questionPaperData.sub_category || '',
      description: questionPaperData.description || '',
      section_wise: questionPaperData.section_wise || false,
      difficulty_level: questionPaperData.difficulty_level || 0,
      suggested_duration: questionPaperData.suggested_duration || '0',

      // TODO: update later
      status: STATUS.flow[0],
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
      suggested_duration: res?.SuggestedDuration || '0',
      status: res?.Status || '',

      isUpdated: null
    };

    setQuestionPaperTabData({
      ...questionPaperTabData,
      paperMaster: paperMaster
    });

    if (!isError) setToastMsg({ type: 'success', message: 'Question Paper Updated' });
    if (!isNaN(+tabIndex)) setTab(paperTabData[tabIndex].name);

    setStatus(STATUS.flow[0]);
  }

  return { handleInput, addNewQuestionPaper, updateQuestionPaper };
}
