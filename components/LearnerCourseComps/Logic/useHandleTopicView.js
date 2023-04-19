import { useIsMouseIdleForSeconds } from '@/helper/hooks.helper';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { SelectedResourceDataAtom } from '../atoms/learnerCourseComps.atom';

export default function useHandleTopicView() {
  const selectedResourceData = useRecoilValue(SelectedResourceDataAtom);

  // shouldplay === false --> pause video
  // shouldplay === true --> play video
  // shouldplay === null --> no effect
  const [videoState, setVideoState] = useState({
    shouldPlay: null,
    videoSrc: '',

    isPlaying: false,
    isMute: false,
    isFullScreen: false,

    volume: 0.0,
    speed: 0,

    progressPercent: 0,
    timestamp: '00:00:00',
    currentTime: 0,
    duration: 0,
    isVideoLoaded: false,
  });
  const [activeBox, setActiveBox] = useState(null);
  const [isTopBottomBarHidden, setIsTopBottomBarHidden] = useState(false);

  const { isIdle } = useIsMouseIdleForSeconds();

  useEffect(() => {
    // pause video if resources pop up is open
    if (videoState.isPlaying && !!selectedResourceData?.url)
      setVideoState((prev) => ({ ...prev, shouldPlay: false }));
    // play video if resources pop up is closed and video was playing
    if (!selectedResourceData?.url && videoState.shouldPlay === false)
      setVideoState((prev) => ({ ...prev, shouldPlay: true }));
  }, [selectedResourceData?.url]);

  // hide top bottom bar if mouse is idle
  useEffect(() => {
    if (isIdle && isTopBottomBarHidden) return;
    if (isTopBottomBarHidden == null) return;

    setIsTopBottomBarHidden(!!isIdle);
  }, [isIdle]);

  // clear open box state on top bar hide
  useEffect(() => {
    if (!isTopBottomBarHidden && !activeBox) return;

    setActiveBox(null);
  }, [isTopBottomBarHidden]);

  function getVideoData(videoData) {
    setVideoState((prev) => ({ ...prev, ...videoData }));
  }

  function toggleActiveBox(id) {
    if (activeBox !== id) setIsTopBottomBarHidden(null);
    setActiveBox((prev) => (prev === id ? null : id));
  }

  function toggleTopBottomBarDisplay(val = false) {
    if (activeBox) return;
    const _val = val === null ? null : !!val;

    setIsTopBottomBarHidden(_val);
  }

  return {
    activeBox,
    videoState,
    setVideoState,
    getVideoData,
    toggleActiveBox,
    isTopBottomBarHidden,
    toggleTopBottomBarDisplay,
  };
}
