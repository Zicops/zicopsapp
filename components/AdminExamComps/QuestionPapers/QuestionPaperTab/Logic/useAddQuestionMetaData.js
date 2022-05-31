import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  CustomSectionAtom,
  QuestionMetaDataAtom,
  QuestionPaperTabDataAtom
} from '../../../../../state/atoms/exams.atoms';
import { PopUpStatesAtomFamily } from '../../../../../state/atoms/popUp.atom';
import { NewQuestionMetaDataAtom } from './questionPaperTab.helper';
import { MAP_SECTION_TO_BANK, mutationClient } from '../../../../../API/Mutations';
import { useMutation } from '@apollo/client';
import { ToastMsgAtom } from '../../../../../state/atoms/toast.atom';

export default function useAddQuestionMetaData() {
  const [addMapToSection, { error: addMapToSectionError }] = useMutation(MAP_SECTION_TO_BANK, {
    client: mutationClient
  });
  const [addQuestionMetaDataPopUp, udpateAddQuestionMetaDataPopUp] = useRecoilState(
    PopUpStatesAtomFamily('addQuestionMetaData')
  );

  // recoil state
  const [questionMetaData, updateQuestionMetaData] = useRecoilState(QuestionMetaDataAtom);
  const { questionPaperMaster } = useRecoilValue(QuestionPaperTabDataAtom);
  const customSection = useRecoilValue(CustomSectionAtom);
  const [newMetaData, setNewMetaData] = useRecoilState(NewQuestionMetaDataAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  // local state
  const [isNewMetaDataReady, setIsNewMetaDataReady] = useState(false);

  useEffect(() => {
    setIsNewMetaDataReady(
      newMetaData.qbId &&
        newMetaData.difficultyLevel &&
        newMetaData.totalQuestions &&
        newMetaData.questionMarks &&
        newMetaData.retrieveType
    );
  }, [newMetaData]);

  async function handleSaveMetaData() {
    console.log(newMetaData);
    const sendData = {
      qbId: newMetaData.qbId || null,
      sectionId: newMetaData.sectionId || null,
      difficultyLevel: newMetaData.difficultyLevel || '',
      totalQuestions: newMetaData.totalQuestions || 0,
      questionMarks: newMetaData.questionMarks || 0,
      questionType: newMetaData.questionType || '',
      retrieveType: newMetaData.retrieveType || '',

      // TODO: update later
      is_active: newMetaData.is_active || false,
      createdBy: 'Zicops',
      updatedBy: 'Zicops'
    };

    console.log(sendData);
    let isError = false;
    const addMapToSectionRes = await addMapToSection({ variables: sendData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Add Question Meta Data Error' });
    });

    if (!isError) setToastMsg({ type: 'success', message: 'New Question Meta Data Added' });

    console.log(addMapToSectionRes);
    const resData = addMapToSectionRes?.data?.mapSectionToBank;
    updateQuestionMetaData([
      ...questionMetaData,
      {
        qbId: resData.QbId || null,
        sectionId: resData.SectionId || null,
        difficultyLevel: resData.DifficultyLevel || '',
        totalQuestions: resData.TotalQuestions || 0,
        questionMarks: resData.QuestionMarks || 0,
        questionType: resData.QuestionType || '',
        retrieveType: resData.RetrieveType || ''
      }
    ]);
    udpateAddQuestionMetaDataPopUp(false);
  }

  return {
    newMetaData,
    setNewMetaData,
    isNewMetaDataReady,
    handleSaveMetaData
  };
}
