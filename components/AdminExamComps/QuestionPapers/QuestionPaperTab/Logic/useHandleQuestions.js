import { loadMultipleLspDataWithMultipleQueries, loadQueryDataAsync } from '@/helper/api.helper';
import { COMMON_LSPS } from '@/helper/constants.helper';
import { getUnixFromDate } from '@/helper/utils.helper';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  ADD_QUESTION_PAPER_SECTION,
  ADD_SECTION_FIXED_QUESTIONS,
  MAP_SECTION_TO_BANK,
  mutationClient,
  UPDATE_MAP_SECTION_TO_BANK,
  UPDATE_SECTION_FIXED_QUESTIONS
} from '../../../../../API/Mutations';
import {
  GET_LATEST_QUESTION_BANK,
  GET_QUESTIONS_NAMES,
  queryClient
} from '../../../../../API/Queries';
import {
  getQuestionMetaDataObject,
  QuestionPaperTabDataAtom
} from '../../../../../state/atoms/exams.atoms';
import { PopUpStatesAtomFamily } from '../../../../../state/atoms/popUp.atom';
import { ToastMsgAtom } from '../../../../../state/atoms/toast.atom';
import { IsDataPresentAtom } from '../../../../common/PopUp/Logic/popUp.helper';

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
  const [addPaperSection, { error: addPaperSectionError }] = useMutation(
    ADD_QUESTION_PAPER_SECTION,
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
  const [isPopUpDataPresent, setIsPopUpDataPresent] = useRecoilState(IsDataPresentAtom);

  // local state
  const [showQuestionTable, setShowQuestionTable] = useState(null);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);
  const [isMetaDataReady, setIsMetaDataReady] = useState(false);
  const [isFixedDataReady, setIsFixedDataReady] = useState(false);
  const [questionBankOptions, setQuestionBankOptions] = useState([]);

  // load question bank data
  useEffect(async () => {
    const LARGE_PAGE_SIZE = 9999;
    const queryVariables = {
      publish_time: getUnixFromDate(),
      pageSize: LARGE_PAGE_SIZE,
      pageCursor: ''
    };

    const qbDataResArr = await loadMultipleLspDataWithMultipleQueries(
      GET_LATEST_QUESTION_BANK,
      queryVariables,
      {},
      queryClient,
      [COMMON_LSPS.zicops]
    );
    const questionBankData = [];
    qbDataResArr?.forEach((res) =>
      questionBankData.push(...(res?.getLatestQuestionBank?.questionBanks || []))
    );

    // const currentQbRes = await loadQueryDataAsync(GET_LATEST_QUESTION_BANK, queryVariables);
    // const zicopsQbRes = await loadQueryDataAsync(GET_LATEST_QUESTION_BANK, queryVariables, {
    //   context: { headers: { tenant: COMMON_LSPS.zicops } }
    // });
    // if (currentQbRes?.error || zicopsQbRes?.error)
    //   return setToastMsg({ type: 'danger', message: 'question bank load error' });

    // const currentQB = structuredClone(currentQbRes?.getLatestQuestionBank?.questionBanks || []);
    // const zicopsQB = structuredClone(zicopsQbRes?.getLatestQuestionBank?.questionBanks || []);

    // const questionBankData = [...currentQB, ...zicopsQB];
    console.log(questionBankData, qbDataResArr);
    if (!questionBankData.length) return;

    for (let i = 0; i < questionBankData.length; i++) {
      const qb = questionBankData[i];
      const questionsRes = await loadQueryDataAsync(GET_QUESTIONS_NAMES, {
        question_bank_id: qb.id
      });

      const questionsArr =
        questionsRes?.getQuestionBankQuestions?.filter((q) => q?.Status === 'Y') || [];
      const alreadyUsedQuestions =
        questionPaperTabData?.mappedQb?.find((qbMap) => qbMap?.qbId === qb?.id)?.total_questions ||
        0;
      questionBankData[i].noOfQuestions = questionsArr.length - alreadyUsedQuestions;
    }

    const qbOptions = questionBankData.map((qb) => {
      return { value: qb.id, label: qb.name, ...qb };
    });
    setQuestionBankOptions(qbOptions);
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

    setIsPopUpDataPresent(
      metaData.qbId ||
        metaData.difficulty_level ||
        metaData.total_questions ||
        metaData.question_marks
    );
  }, [metaData]);

  // disable save button if data in complete
  useEffect(() => {
    if (!selectedQuestionIds.length) return setIsFixedDataReady(false);
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
    setIsMetaDataReady(false);
    // create a default section
    let isError = false,
      sectionData = null;
    if (!questionPaperTabData?.paperMaster?.section_wise && !metaData.sectionId) {
      const defaultSectionData = {
        qpId: questionPaperTabData?.paperMaster?.id,
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
      if (isError) return setIsMetaDataReady(true);
      const data = paperSectionRes?.data?.addQuestionPaperSection;

      if (!data) {
        setIsMetaDataReady(true);
        return setToastMsg({ type: 'danger', message: 'Add Section Error' });
      }
      sectionData = [
        {
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
          is_active: data?.IsActive || true
        }
      ];
    }

    const sendData = {
      qbId: metaData.qbId || null,
      sectionId: metaData.sectionId || sectionData[0].id || null,
      difficulty_level: metaData.difficulty_level || '',
      total_questions: metaData.total_questions || 0,
      question_marks: metaData.question_marks || 0,
      question_type: metaData.question_type || '',
      retrieve_type: metaData.retrieve_type || '',

      // TODO: update later
      is_active: metaData.is_active || true,
      created_by: 'Zicops',
      updated_by: 'Zicops'
    };

    console.log(sendData);
    const addMapToSectionRes = await addMapToSection({ variables: sendData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Add Question Meta Data Error' });
    });

    if (isError) {
      setIsMetaDataReady(true);
      return setToastMsg({ type: 'danger', message: 'Add Question Meta Data Error' });
    }
    if (!isError) setToastMsg({ type: 'success', message: 'New Question Meta Data Added' });

    console.log(addMapToSectionRes);
    const resData = addMapToSectionRes?.data?.mapSectionToBank;

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

    setMetaData(currentMetaData);
    if (currentMetaData.retrieve_type === 'manual') await saveFixedQuestions(resData.id);

    const updatedMappedQb = await questionPaperTabData?.refetchQBSectionMapping(sendData.sectionId);
    if (updatedMappedQb == null) {
      setIsMetaDataReady(true);
      return udpateAddMetaDataPopUp(false);
    }

    const allMappedQb = [];
    questionPaperTabData?.mappedQb?.forEach((mapQb) => {
      const isPresent = allMappedQb.find((allMapQb) => allMapQb?.id === mapQb?.id);
      if (!isPresent) allMappedQb.push(mapQb);
    });

    updatedMappedQb?.forEach((mapQb) => {
      const isPresent = allMappedQb.find((allMapQb) => allMapQb?.id === mapQb?.id);
      if (!isPresent) allMappedQb.push(mapQb);
    });

    setQuestionPaperTabData({
      ...questionPaperTabData,
      mappedQb: allMappedQb,
      sectionData: sectionData ? sectionData : questionPaperTabData?.sectionData
    });

    setIsPopUpDataPresent(false);
    udpateAddMetaDataPopUp(false);
    setIsMetaDataReady(true);
  }

  async function saveFixedQuestions(mappingId, isUpdate) {
    setIsFixedDataReady(false);
    const sendData = {
      mappingId: metaData.id || mappingId,
      questionId: selectedQuestionIds.join(','),

      is_active: metaData.is_active || true,
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

      if (isError) return setIsFixedDataReady(true);
      if (!isError) return setToastMsg({ type: 'success', message: 'Updated Fixed Question' });
    }

    await addFixedQuestion({ variables: sendData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Add Fixed Question Error' });
    });

    if (isError) return setIsFixedDataReady(true);
    if (!isError) setToastMsg({ type: 'success', message: 'Added Fixed Question' });
    setIsFixedDataReady(true);
  }

  async function updateMetaData() {
    setIsMetaDataReady(false);
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
      is_active: metaData.is_active || true,
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

    if (updatedMetaData.retrieve_type === 'manual') await saveFixedQuestions(resData.id, true);

    const updatedMappedQb = await questionPaperTabData?.refetchQBSectionMapping(sendData.sectionId);
    if (updatedMappedQb == null) {
      setIsMetaDataReady(true);
      return udpateEditMetaDataPopUp(false);
    }

    const allMappedQb = structuredClone(questionPaperTabData?.mappedQb) || [];

    // questionPaperTabData?.mappedQb?.forEach((mapQb) => {
    //   const isPresent = allMappedQb.find((allMapQb) => allMapQb?.id === mapQb?.id);
    //   if (!isPresent) allMappedQb.push(mapQb);
    // });

    updatedMappedQb?.forEach((mapQb) => {
      const index = allMappedQb.findIndex((allMapQb) => allMapQb?.id === mapQb?.id);
      if (index >= 0) allMappedQb[index] = mapQb;
    });

    setQuestionPaperTabData({
      ...questionPaperTabData,
      mappedQb: allMappedQb
    });

    setIsPopUpDataPresent(false);
    udpateEditMetaDataPopUp(false);
    setIsMetaDataReady(true);
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
