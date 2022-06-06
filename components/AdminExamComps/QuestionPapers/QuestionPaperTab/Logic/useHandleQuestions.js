import { useLazyQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  ADD_SECTION_FIXED_QUESTIONS,
  MAP_SECTION_TO_BANK,
  mutationClient,
  UPDATE_MAP_SECTION_TO_BANK
} from '../../../../../API/Mutations';
import {
  GET_LATEST_QUESTION_BANK,
  GET_QB_SECTION_MAPPING_BY_SECTION,
  queryClient
} from '../../../../../API/Queries';
import {
  getQuestionMetaDataObject,
  QuestionMetaDataAtom,
  QuestionPaperTabDataAtom
} from '../../../../../state/atoms/exams.atoms';
import { PopUpStatesAtomFamily } from '../../../../../state/atoms/popUp.atom';
import { ToastMsgAtom } from '../../../../../state/atoms/toast.atom';

export default function useHandleQuestions(sectionId) {
  const [addMapToSection, { error: addMapToSectionError }] = useMutation(MAP_SECTION_TO_BANK, {
    client: mutationClient
  });
  const [updateMapToSection, { error: updateMapToSectionError }] = useMutation(
    UPDATE_MAP_SECTION_TO_BANK,
    { client: mutationClient }
  );
  const [addQuestionsToSection, { error: addQuestionsToSectionError }] = useMutation(
    ADD_SECTION_FIXED_QUESTIONS,
    { client: mutationClient }
  );
  const [loadQuestionBank, { error: loadQBError }] = useLazyQuery(GET_LATEST_QUESTION_BANK, {
    client: queryClient
  });
  const [loadQBSectionMapping, { error: loadQBSectionMapError }] = useLazyQuery(
    GET_QB_SECTION_MAPPING_BY_SECTION,
    { client: queryClient }
  );

  // recoil state
  const [addQuestionMetaDataPopUp, udpateAddQuestionMetaDataPopUp] = useRecoilState(
    PopUpStatesAtomFamily('addQuestionMetaData')
  );
  const [editQuestionMetaDataPopUp, udpateEditQuestionMetaDataPopUp] = useRecoilState(
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
    if (addMapToSectionError) setToastMsg({ type: 'danger', message: 'Add Mapping error' });
    if (updateMapToSectionError) setToastMsg({ type: 'danger', message: 'Update Mapping error' });
    if (loadQBError) setToastMsg({ type: 'danger', message: 'Question Bank Load Error' });

    if (addMapToSectionError) setToastMsg({ type: 'danger', message: 'Add Question Error' });
  }, [addMapToSectionError, updateMapToSectionError, loadQBError, addMapToSectionError]);

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
    if (currentMetaData.retrieve_type === 'manual') await saveFixedQuestions();

    const mappedQb = await questionPaperTabData?.refetchQBSectionMapping(sendData.sectionId);
    if (mappedQb === null) return udpateAddQuestionMetaDataPopUp(false);

    setQuestionPaperTabData({
      ...questionPaperTabData,
      qbSectionMapData: mapData,
      mappedQb: mappedQb
    });
    udpateAddQuestionMetaDataPopUp(false);
  }

  async function saveFixedQuestions() {
    const sendData = {
      sectionId: metaData.sectionId || null,
      questionId: selectedQuestionIds.join(','),

      // TODO: update later
      is_active: metaData.is_active || false,
      created_by: 'Zicops',
      updated_by: 'Zicops'
    };

    console.log(sendData);
    let isError = false;
    const addMapToSectionRes = await addQuestionsToSection({ variables: sendData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Add Fixed Question Error' });
    });

    if (isError) return setToastMsg({ type: 'danger', message: 'Add Fixed Question Error' });
    if (!isError) setToastMsg({ type: 'success', message: 'Add Fixed Question Error' });

    console.log(addMapToSectionRes);
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

    if (sendData.retrieve_type === 'manual')
      return setToastMsg({
        type: 'danger',
        message: 'Update Question Meta Data for manual not implemented'
      });

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

    const mappedQb = await questionPaperTabData?.refetchQBSectionMapping(sendData.sectionId);
    if (mappedQb === null) return udpateEditQuestionMetaDataPopUp(false);

    setQuestionPaperTabData({
      ...questionPaperTabData,
      qbSectionMapData: mapData,
      mappedQb: mappedQb
    });
    if (updatedMetaData.retrieve_type === 'random') return udpateEditQuestionMetaDataPopUp(false);

    setShowQuestionTable(true);
  }

  return {
    metaData,
    questionBankOptions,
    setMetaData,
    isMetaDataReady,
    handleSelectedQuestions,
    addMetaData,
    showQuestionTable,
    isFixedDataReady,
    setShowQuestionTable,
    updateMetaData
  };
}
