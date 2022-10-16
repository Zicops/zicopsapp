import { useMutation } from '@apollo/client/react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  ADD_QUESTION_PAPER_SECTION,
  mutationClient,
  UPDATE_QUESTION_PAPER_SECTION
} from '../../../../../API/Mutations';
import {
  getCustomSectionObject,
  QuestionPaperTabDataAtom
} from '../../../../../state/atoms/exams.atoms';
import { PopUpStatesAtomFamily } from '../../../../../state/atoms/popUp.atom';
import { ToastMsgAtom } from '../../../../../state/atoms/toast.atom';

export default function useAddCustomSection() {
  const [addPaperSection, { error: addSectionError }] = useMutation(ADD_QUESTION_PAPER_SECTION, {
    client: mutationClient
  });
  const [editPaperSection, { error: editSectionError }] = useMutation(
    UPDATE_QUESTION_PAPER_SECTION,
    { client: mutationClient }
  );

  // recoil state
  const [addSectionPopUp, udpateAddSectionPopUp] = useRecoilState(
    PopUpStatesAtomFamily('addCustomSection')
  );
  const [editSectionPopUp, udpateEditSectionPopUp] = useRecoilState(
    PopUpStatesAtomFamily('editCustomSection')
  );
  const [questionPaperTabData, setQuestionPaperTabData] = useRecoilState(QuestionPaperTabDataAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  // local state
  const [customSection, setCustomSection] = useState(getCustomSectionObject());
  const [isCustomSectionReady, setIsCustomSectionReady] = useState(false);

  // disable add button
  useEffect(() => {
    setIsCustomSectionReady(
      customSection.name && customSection.description && customSection.difficulty_level
    );
  }, [customSection]);

  // error notification
  useEffect(() => {
    if (addSectionError) return setToastMsg({ type: 'danger', message: `Add Section Error` });
    if (editSectionError) return setToastMsg({ type: 'danger', message: `Update Section Error` });
  }, [addSectionError, editSectionError]);

  function isDuplicate(sectionId = null) {
    const sections = questionPaperTabData?.sectionData || [];
    if (!sections?.length) return false;

    const isExist = sections.some(
      (sect) =>
        sect?.name?.trim()?.toLowerCase() === customSection?.name?.trim()?.toLowerCase() &&
        sect?.id !== sectionId
    );

    if (isExist) setToastMsg({ type: 'danger', message: 'Section with name already exist' });
    return isExist;
  }

  async function addNewSection() {
    if (!questionPaperTabData.paperMaster.id)
      return setToastMsg({ type: 'danger', message: 'Add Question Paper First' });
    if (isDuplicate()) return;

    const sendData = {
      qpId: questionPaperTabData.paperMaster.id,
      name: customSection.name || '',
      description: customSection.description || '',
      difficulty_level: customSection.difficulty_level || '',

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

    if (!isError) setToastMsg({ type: 'success', message: 'New Section Added' });
    const newResData = paperSectionRes?.data?.addQuestionPaperSection;
    if (!newResData || isError)
      return setToastMsg({ type: 'danger', message: 'Add Paper Section Error' });

    setQuestionPaperTabData({
      ...questionPaperTabData,
      sectionData: [
        ...questionPaperTabData.sectionData,
        {
          qpId: newResData?.QpId,
          name: newResData?.Name || '',
          description: newResData?.Description || '',
          difficulty_level: newResData?.DifficultyLevel || '',
          id: newResData?.id
        }
      ]
    });

    udpateAddSectionPopUp(false);
  }

  async function updateSection() {
    if (!questionPaperTabData.paperMaster.id)
      return setToastMsg({ type: 'danger', message: 'Add Question Paper First' });
    if (isDuplicate(customSection.id)) return;

    const sendData = {
      id: customSection.id,
      qpId: questionPaperTabData.paperMaster.id,
      name: customSection.name || '',
      description: customSection.description || '',
      difficulty_level: customSection.difficulty_level || '',

      // TODO: update later
      total_questions: 10,
      type: 'type',
      is_active: true,
      createdBy: 'Zicops',
      updatedBy: 'Zicops'
    };

    console.log(sendData);
    let isError = false;
    const paperSectionRes = await editPaperSection({ variables: sendData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Update Paper Section Error' });
    });
    console.log(paperSectionRes?.data);

    if (!isError) setToastMsg({ type: 'success', message: 'Section Updated' });
    const resData = paperSectionRes?.data?.updateQuestionPaperSection;

    if (!resData || isError)
      return setToastMsg({ type: 'danger', message: 'Update Paper Section Error' });

    const sectionArr = [...questionPaperTabData.sectionData];
    const updatedSectionIndex = sectionArr.findIndex((section) => section.id === resData.id);
    const updatedSection = {
      qpId: resData?.QpId,
      name: resData?.Name || '',
      description: resData?.Description || '',
      difficulty_level: resData?.DifficultyLevel || '',
      id: resData?.id
    };

    sectionArr.splice(updatedSectionIndex, 1, updatedSection);

    setQuestionPaperTabData({
      ...questionPaperTabData,
      sectionData: sectionArr
    });

    udpateEditSectionPopUp(false);
  }

  return {
    customSection,
    setCustomSection,
    isCustomSectionReady,
    addNewSection,
    updateSection
  };
}
