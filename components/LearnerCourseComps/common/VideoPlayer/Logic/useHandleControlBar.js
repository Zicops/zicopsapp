import { useState } from 'react';

export default function useHandleControlBar(playerState = {}, updateVideoProgress = () => {}) {
  const [activeBtn, setActiveBtn] = useState(null);
  const [selectedWidth, setSelectedWidth] = useState(null);
  const [isSelected, setIsSelected] = useState(null);

  function toggleActiveId(id) {
    setActiveBtn(!!id ? id : null);
  }

  function activateSelection(e, isSelected = false) {
    if (isSelected) setIsSelected(true);

    setSelectedWidth(getDataFromEvent(e).seekPercent);
  }

  function deactivateSelection(e, isSelected = false) {
    if (isSelected) return;

    setIsSelected(null);
    setSelectedWidth(null);
    updateVideoProgress(getDataFromEvent(e).timeInSeconds);
  }

  // internal helper function
  function getDataFromEvent(e) {
    const seekPercent = (e.clientX * 100) / e.target.offsetWidth;
    const timeInSeconds = (playerState?.duration * seekPercent) / 100;

    return { timeInSeconds, seekPercent };
  }

  return {
    activeBtn,
    toggleActiveId,
    selectedWidth,
    isSelected,
    activateSelection,
    deactivateSelection,
  };
}
