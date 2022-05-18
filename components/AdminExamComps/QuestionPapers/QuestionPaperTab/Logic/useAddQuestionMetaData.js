import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  CustomSectionAtom,
  getCustomSectionObject,
  getQuestionMetaDataObject,
  QuestionMetaDataAtom, QuestionPaperTabDataAtom
} from '../../../../../state/atoms/exams.atoms';
import { PopUpStatesAtomFamily } from '../../../../../state/atoms/popUp.atom';

export default function useAddQuestionMetaData() {
  const [addQuestionMetaDataPopUp, udpateAddQuestionMetaDataPopUp] = useRecoilState(
    PopUpStatesAtomFamily('addQuestionMetaData')
  );
  const [questionMetaData, updateQuestionMetaData] = useRecoilState(QuestionMetaDataAtom);
  const [customSection, udpateCustomSection] = useRecoilState(CustomSectionAtom);
  const questionPaper = useRecoilValue(QuestionPaperTabDataAtom);
  const [newMetaData, setNewMetaData] = useState(getQuestionMetaDataObject());
  const [isNewMetaData, setIsNewMetaData] = useState(false);

  useEffect(() => {
    setIsNewMetaData(newMetaData.numberOfQuestions && newMetaData.questionBank);
  }, [newMetaData]);

  function handleSaveMetaData() {
    if (!questionPaper.isSectionWise && !customSection.length) {
      udpateCustomSection([getCustomSectionObject({ name: 'defaultSection' })]);
    }
    updateQuestionMetaData([...questionMetaData, newMetaData]);
    udpateAddQuestionMetaDataPopUp(false);
  }

  return {
    newMetaData,
    setNewMetaData,
    isNewMetaData,
    handleSaveMetaData
  };
}
