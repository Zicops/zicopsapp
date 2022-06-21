import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { IsDataPresentAtom } from './popUp.helper';

export default function useHandlePopUp(popUpState = []) {
  const [popUpParentState = false, setPopUpParentState = function () {}] = popUpState;
  const [isOpen, setIsOpen] = useState(popUpParentState);
  const [isPopUpDataPresent, setIsPopUpDataPresent] = useRecoilState(IsDataPresentAtom);

  // make parent state and child state in sync
  useEffect(() => {
    if (popUpParentState === isOpen) return;
    if (popUpParentState) return setIsOpen(true);

    closePopUp();
  }, [popUpParentState]);

  function closePopUp() {
    if (!isPopUpDataPresent) {
      setPopUpParentState(false);
      setIsOpen(false);
      return true;
    }

    const isConfirmed = confirm('Are you sure you want to close the pop up?');
    setIsOpen(!isConfirmed);
    setIsPopUpDataPresent(!isConfirmed);
    setPopUpParentState((prev) => {
      console.log(prev, isConfirmed);

      //  pop up is open and data is not modified
      if (isConfirmed === false) return prev;

      // if prev data is boolean
      if (typeof prev === 'boolean') return false;

      return null;
    });
    return isConfirmed;
  }

  return { isOpen, closePopUp };
}
