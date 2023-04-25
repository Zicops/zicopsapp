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

  function deactivateSelection(e, options = {}) {
    const { isSelected = false, updateVideo = false } = options;
    if (isSelected) return;

    setIsSelected(null);
    setSelectedWidth(null);

    if (updateVideo) updateVideoProgress(getDataFromEvent(e).timeInSeconds);
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
