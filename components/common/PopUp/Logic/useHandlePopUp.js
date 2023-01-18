import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { IsDataPresentAtom } from './popUp.helper';

export default function useHandlePopUp(popUpState = [], onClose = () => {}) {
  const [popUpParentState = false, setPopUpParentState = function () {}] = popUpState;
  const [isOpen, setIsOpen] = useState(popUpParentState);
  const [confirmMsg, setConfirmMsg] = useState(null);
  const [isPopUpDataPresent, setIsPopUpDataPresent] = useRecoilState(IsDataPresentAtom);

  // make parent state and child state in sync
  useEffect(() => {
    if (popUpParentState === isOpen) return;
    if (popUpParentState) return setIsOpen(true);

    closePopUp();
  }, [popUpParentState]);

  useEffect(() => {
    if (typeof confirmMsg !== 'boolean') return;

    const isConfirmed = confirmMsg;

    setConfirmMsg(null);
    setIsOpen(!isConfirmed);
    setIsPopUpDataPresent(!isConfirmed);
    setPopUpParentState((prev) => {
      const isPrevBool = typeof prev === 'boolean';

      //  pop up is open and data is not modified
      if (isConfirmed === false) return isPrevBool ? true : prev;

      // if prev data is boolean
      if (isPrevBool) return false;

      return null;
    });
    if (isConfirmed) onClose();
  }, [confirmMsg]);

  function closePopUp() {
    if (!isPopUpDataPresent) {
      setIsOpen(false);
      setPopUpParentState((prev) => (typeof prev === 'boolean' ? false : null));
      onClose();
      return;
    }

    setConfirmMsg('Are you sure you want to close the pop up?');
  }

  return { isOpen, closePopUp, confirmMsg, setConfirmMsg };
}
