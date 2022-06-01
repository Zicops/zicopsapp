import { useMutation } from '@apollo/client/react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { ADD_QUESTION_PAPER_SECTION, mutationClient } from '../../../../../API/Mutations';
import {
  CustomSectionAtom,
  getCustomSectionObject,
  QuestionPaperTabDataAtom
} from '../../../../../state/atoms/exams.atoms';
import { PopUpStatesAtomFamily } from '../../../../../state/atoms/popUp.atom';
import { ToastMsgAtom } from '../../../../../state/atoms/toast.atom';

export default function useAddCustomSection() {
  const [addPaperSection, { error: addPaperSectionError }] = useMutation(
    ADD_QUESTION_PAPER_SECTION,
    { client: mutationClient }
  );

  // recoil state
  const [customSectionPopUp, udpateCustomSectionPopUp] = useRecoilState(
    PopUpStatesAtomFamily('addCustomSection')
  );
  const [questionPaperTabData, setQuestionPaperTabData] = useRecoilState(QuestionPaperTabDataAtom);
  const [customSection, udpateCustomSection] = useRecoilState(CustomSectionAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  // local state
  const [newCustomSection, setNewCustomSection] = useState(getCustomSectionObject());
  const [isNewCustomSectionReady, setIsNewCustomSectionReady] = useState(false);

  useEffect(() => {
    setIsNewCustomSectionReady(
      newCustomSection.name && newCustomSection.description && newCustomSection.difficulty_level
    );
  }, [newCustomSection]);

  async function handleSaveCustomSection() {
    if (!questionPaperTabData.questionPaperMaster.id)
      return setToastMsg({ type: 'danger', message: 'Add Question Paper First' });
    const sendData = {
      qpId: questionPaperTabData.questionPaperMaster.id,
      name: newCustomSection.name || '',
      description: newCustomSection.description || '',
      difficulty_level: newCustomSection.difficulty_level || '',

      // TODO: update later
      total_questions: 10,
      type: 'type',
      is_active: true,
      createdBy: 'Zicops',
      updatedBy: 'Zicops'
    };

    console.log(sendData);
    let isError = false;
    const paperSectionRes = await addPaperSection({ variables: sendData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Add Paper Section Error' });
    });
    console.log(paperSectionRes?.data);

    if (!isError) setToastMsg({ type: 'success', message: 'New Question Paper Added' });
    const newResData = paperSectionRes?.data?.addQuestionPaperSection;
    udpateCustomSection([
      ...customSection,
      {
        qpId: newResData?.QpId,
        name: newResData?.Name || '',
        description: newResData?.Description || '',
        difficulty_level: newResData?.DifficultyLevel || '',
        id: newResData?.id
      }
    ]);
    udpateCustomSectionPopUp(false);
  }

  return {
    newCustomSection,
    setNewCustomSection,
    isNewCustomSectionReady,
    handleSaveCustomSection
  };
}
