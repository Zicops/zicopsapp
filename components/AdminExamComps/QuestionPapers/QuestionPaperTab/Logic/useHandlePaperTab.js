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

  useEffect(() => {
    if (!questionPaperId) return;
    if (status !== STATUS[0]) return;

    // after saving paper master for first time
    if (toastMsg[0]?.type === 'success') return;

    if (questionPaperTabData.paperMaster?.isUpdated && tab === paperTabData[1].name) {
      setTab(paperTabData[0].name);
      setToastMsg({ type: 'danger', message: 'Please save Question Paper Master data' });
      return;
    }
  }, [tab]);

  // error notification
  useEffect(() => {
    if (addPaperError) return setToastMsg({ type: 'danger', message: `Add Paper Error` });
    if (updatePaperError) return setToastMsg({ type: 'danger', message: `Update Paper Error` });

    if (addPaperSectionError) return setToastMsg({ type: 'danger', message: `Add Section Error` });
  }, [addPaperError, addPaperSectionError, updatePaperError]);

  useEffect(() => {
    if (toastMsg[0]?.type === 'danger') setStatus(STATUS[0]);
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
    return (
      paperMaster.name &&
      paperMaster.description &&
      paperMaster.category &&
      paperMaster.sub_category &&
      paperMaster.difficulty_level
    );
  }

  async function addNewQuestionPaper(tabIndex) {
    setStatus('UPDATING');
    if (!isDataValid())
      return setToastMsg({ type: 'danger', message: 'Please fill all the details' });

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
      suggested_duration: questionPaperData.suggested_duration || '',

      // TODO: update later
      status: STATUS[1],
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
      suggested_duration: res?.SuggestedDuration || ''
    };
    tabData[paperMaster] = paperMaster;

    setQuestionPaperTabData(tabData);

    if (!isError) setToastMsg({ type: 'success', message: 'New Question Paper Added' });
    if (!isNaN(+tabIndex)) {
      router.push(`${router.asPath}/${paperMaster.id}`);
      setTab(paperTabData[tabIndex].name);
    }

    setStatus(STATUS[1]);
  }

  async function updateQuestionPaper(tabIndex) {
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

    setStatus('UPDATING');
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
      status: STATUS[1],
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
      suggested_duration: res?.SuggestedDuration || '',

      isUpdated: null
    };

    setQuestionPaperTabData({
      ...questionPaperTabData,
      paperMaster: paperMaster
    });

    if (!isError) setToastMsg({ type: 'success', message: 'Question Paper Updated' });
    if (!isNaN(+tabIndex)) setTab(paperTabData[tabIndex].name);

    setStatus(STATUS[1]);
  }

  return { handleInput, addNewQuestionPaper, updateQuestionPaper };
}
