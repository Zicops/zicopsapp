import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { CustomSectionAtom, getCustomSectionObject } from '../../../../../state/atoms/exams.atoms';
import { PopUpStatesAtomFamily } from '../../../../../state/atoms/popUp.atom';
import { questionPaperTabData } from './questionPaperTab.helper';

export default function useAddCustomSection() {
  const [customSectionPopUp, udpateCustomSectionPopUp] = useRecoilState(
    PopUpStatesAtomFamily('addCustomSection')
  );
  const [customSection, udpateCustomSection] = useRecoilState(CustomSectionAtom);
  const [newCustomSection, setNewCustomSection] = useState(getCustomSectionObject());
  const [isNewCustomSectionReady, setIsNewCustomSectionReady] = useState(false);

  useEffect(() => {
    setIsNewCustomSectionReady(
      newCustomSection.name && newCustomSection.description && newCustomSection.type
    );
  }, [newCustomSection]);

  function handleSaveCustomSection() {
    udpateCustomSection([...customSection, newCustomSection]);
    udpateCustomSectionPopUp(false);
  }

  return {
    newCustomSection,
    setNewCustomSection,
    isNewCustomSectionReady,
    handleSaveCustomSection
  };
}
