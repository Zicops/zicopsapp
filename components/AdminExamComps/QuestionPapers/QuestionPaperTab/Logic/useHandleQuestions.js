import { useLazyQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  ADD_SECTION_FIXED_QUESTIONS,
  MAP_SECTION_TO_BANK,
  mutationClient,
  UPDATE_MAP_SECTION_TO_BANK,
  UPDATE_SECTION_FIXED_QUESTIONS
} from '../../../../../API/Mutations';
import { GET_LATEST_QUESTION_BANK, queryClient } from '../../../../../API/Queries';
import {
  getQuestionMetaDataObject,
  QuestionPaperTabDataAtom
} from '../../../../../state/atoms/exams.atoms';
import { PopUpStatesAtomFamily } from '../../../../../state/atoms/popUp.atom';
import { ToastMsgAtom } from '../../../../../state/atoms/toast.atom';

export default function useHandleQuestions(sectionId) {
  const [addMapToSection, { error: addMapErr }] = useMutation(MAP_SECTION_TO_BANK, {
    client: mutationClient
  });
  const [updateMapToSection, { error: updateMapErr }] = useMutation(UPDATE_MAP_SECTION_TO_BANK, {
    client: mutationClient
  });
  const [addFixedQuestion, { error: addFixedErr }] = useMutation(ADD_SECTION_FIXED_QUESTIONS, {
    client: mutationClient
  });
  const [updateFixedQuestion, { error: updateFixedError }] = useMutation(
    UPDATE_SECTION_FIXED_QUESTIONS,
    { client: mutationClient }
  );
  const [loadQuestionBank, { error: loadQBError }] = useLazyQuery(GET_LATEST_QUESTION_BANK, {
    client: queryClient
  });

  // recoil state
  const [addMetaDataPopUp, udpateAddMetaDataPopUp] = useRecoilState(
    PopUpStatesAtomFamily('addQuestionMetaData')
  );
  const [editMetaDataPopUp, udpateEditMetaDataPopUp] = useRecoilState(
    PopUpStatesAtomFamily('editQuestionMetaData')
  );
  const [questionPaperTabData, setQuestionPaperTabData] = useRecoilState(QuestionPaperTabDataAtom);
  const [metaData, setMetaData] = useState(getQuestionMetaDataObject({ sectionId }));
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  // local state
  const [showQuestionTable, setShowQuestionTable] = useState(null);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);
  const [isMetaDataReady, setIsMetaDataReady] = useState(false);
  const [isFixedDataReady, setIsFixedDataReady] = useState(false);
  const [questionBankOptions, setQuestionBankOptions] = useState([]);

  // load question bank data
  useEffect(() => {
    const LARGE_PAGE_SIZE = 999999999999;
    const queryVariables = { publish_time: Date.now(), pageSize: LARGE_PAGE_SIZE, pageCursor: '' };

    loadQuestionBank({ variables: queryVariables }).then(({ data }) => {
      if (loadQBError) return setToastMsg({ type: 'danger', message: 'question bank load error' });

      const qbOptions = data?.getLatestQuestionBank?.questionBanks.map((qb) => {
        return { value: qb.id, label: qb.name, ...qb };
      });
      setQuestionBankOptions(qbOptions);
    });
  }, []);

  useEffect(() => {
    setMetaData({ ...metaData, sectionId: sectionId });
  }, [sectionId]);

  // error notifier
  useEffect(() => {
    if (loadQBError) setToastMsg({ type: 'danger', message: 'Question Bank Load Error' });

    if (addMapErr) setToastMsg({ type: 'danger', message: 'Add Mapping error' });
    if (updateMapErr) setToastMsg({ type: 'danger', message: 'Update Mapping error' });

    if (addFixedErr) setToastMsg({ type: 'danger', message: 'Add Fixed Question Error' });
    if (updateFixedError) setToastMsg({ type: 'danger', message: 'Update Fixed Question Error' });
  }, [addMapErr, updateMapErr, loadQBError, addFixedErr, updateFixedError]);

  // disable next button if data in complete
  useEffect(() => {
    setIsMetaDataReady(
      metaData.qbId &&
        metaData.difficulty_level &&
        metaData.total_questions &&
        metaData.question_marks &&
        metaData.retrieve_type
    );
  }, [metaData]);

  // disable save button if data in complete
  useEffect(() => {
    if (!selectedQuestionIds.length) return;
    setIsFixedDataReady(+metaData.total_questions === selectedQuestionIds.length);

    if (selectedQuestionIds.length > +metaData.total_questions)
      return setToastMsg({
        type: 'danger',
        message: `Select only ${metaData.total_questions} questions`
      });
  }, [selectedQuestionIds]);

  // add or remove selcted question id
  function handleSelectedQuestions(questionId, isAdd) {
    let questionIdArr = [...selectedQuestionIds];
    if (isAdd) {
      questionIdArr.push(questionId);
    } else {
      questionIdArr = questionIdArr.filter((id) => id !== questionId);
    }

    setSelectedQuestionIds(questionIdArr);
  }

  async function addMetaData() {
    // return;
    const sendData = {
      qbId: metaData.qbId || null,
      sectionId: metaData.sectionId || null,
      difficulty_level: metaData.difficulty_level || '',
      total_questions: metaData.total_questions || 0,
      question_marks: metaData.question_marks || 0,
      question_type: metaData.question_type || '',
      retrieve_type: metaData.retrieve_type || '',

      // TODO: update later
      is_active: metaData.is_active || false,
      created_by: 'Zicops',
      updated_by: 'Zicops'
    };

    console.log(sendData);
    let isError = false;
    const addMapToSectionRes = await addMapToSection({ variables: sendData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Add Question Meta Data Error' });
    });

    if (isError) return setToastMsg({ type: 'danger', message: 'Add Question Meta Data Error' });
    if (!isError) setToastMsg({ type: 'success', message: 'New Question Meta Data Added' });

    console.log(addMapToSectionRes);
    const resData = addMapToSectionRes?.data?.mapSectionToBank;

    // add response data to array and udpate state
    const mapData = [...questionPaperTabData.qbSectionMapData];
    const currentMetaData = {
      id: resData.id,
      qbId: resData.QbId || null,
      sectionId: resData.SectionId || null,
      difficulty_level: resData.DifficultyLevel || '',
      total_questions: resData.TotalQuestions || 0,
      question_marks: resData.QuestionMarks || 0,
      question_type: resData.QuestionType || '',
      retrieve_type: resData.RetrieveType || ''
    };
    mapData.push(currentMetaData);

    setMetaData(currentMetaData);
    if (currentMetaData.retrieve_type === 'manual') await saveFixedQuestions(resData.id);

    const mappedQb = await questionPaperTabData?.refetchQBSectionMapping(sendData.sectionId);
    if (mappedQb === null) return udpateAddMetaDataPopUp(false);

    setQuestionPaperTabData({
      ...questionPaperTabData,
      qbSectionMapData: mapData,
      mappedQb: mappedQb
    });
    udpateAddMetaDataPopUp(false);
  }

  async function saveFixedQuestions(mappingId, isUpdate) {
    const sendData = {
      mappingId: metaData.id || mappingId,
      questionId: selectedQuestionIds.join(','),

      is_active: metaData.is_active || false,
      created_by: 'Zicops',
      updated_by: 'Zicops'
    };

    let isError = false;
    console.log(sendData);
    if (isUpdate && questionPaperTabData.currentFixedQuestion.id) {
      sendData.id = questionPaperTabData.currentFixedQuestion.id;
      await updateFixedQuestion({ variables: sendData }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Update Fixed Question Error' });
      });

      if (isError) return;
      if (!isError) return setToastMsg({ type: 'success', message: 'Updated Fixed Question' });
    }

    await addFixedQuestion({ variables: sendData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Add Fixed Question Error' });
    });

    if (isError) return;
    if (!isError) setToastMsg({ type: 'success', message: 'Added Fixed Question' });
  }

  async function updateMetaData() {
    const sendData = {
      id: metaData.id,
      qbId: metaData.qbId,
      sectionId: metaData.sectionId,
      difficulty_level: metaData.difficulty_level || '',
      total_questions: metaData.total_questions || 0,
      question_marks: metaData.question_marks || 0,
      question_type: metaData.question_type || '',
      retrieve_type: metaData.retrieve_type || 'manual',

      // TODO: update later
      is_active: metaData.is_active || false,
      created_by: 'Zicops',
      updated_by: 'Zicops'
    };

    console.log(sendData);
    let isError = false;
    const mapToSectionRes = await updateMapToSection({ variables: sendData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Update Question Meta Data Error' });
    });

    if (!isError) setToastMsg({ type: 'success', message: 'Question Meta Data Updated' });

    console.log(mapToSectionRes);
    const resData = mapToSectionRes?.data?.updateSectionToBank || {};

    const updatedMetaData = {
      id: resData.id,
      qbId: resData.QbId || null,
      sectionId: resData.SectionId || null,
      difficulty_level: resData.DifficultyLevel || '',
      total_questions: resData.TotalQuestions || 0,
      question_marks: resData.QuestionMarks || 0,
      question_type: resData.QuestionType || '',
      retrieve_type: resData.RetrieveType || ''
    };
    const mapData = [...questionPaperTabData.qbSectionMapData].map((data) => {
      if (data.id === resData.id) return updatedMetaData;
      return data;
    });

    if (updatedMetaData.retrieve_type === 'manual') await saveFixedQuestions(resData.id, true);

    const mappedQb = await questionPaperTabData?.refetchQBSectionMapping(sendData.sectionId);
    if (mappedQb === null) return udpateEditMetaDataPopUp(false);

    setQuestionPaperTabData({
      ...questionPaperTabData,
      qbSectionMapData: mapData,
      mappedQb: mappedQb
    });
    udpateEditMetaDataPopUp(false);
  }

  return {
    metaData,
    questionBankOptions,
    setMetaData,
    isMetaDataReady,
    handleSelectedQuestions,
    addMetaData,
    selectedQuestionIds,
    setSelectedQuestionIds,
    showQuestionTable,
    isFixedDataReady,
    setShowQuestionTable,
    updateMetaData
  };
}
