import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { SelectedResourceDataAtom } from '../atoms/learnerCourseComps.atom';

export default function useHandleTopicView() {
  const selectedResourceData = useRecoilValue(SelectedResourceDataAtom);

  // shouldplay === false --> pause video
  // shouldplay === true --> play video
  // shouldplay === null --> no effect
  const [videoState, setVideoState] = useState({ isPlaying: null, shouldPlay: null });
  const [activeBox, setActiveBox] = useState(null);

  useEffect(() => {
    // pause video if resources pop up is open
    if (videoState.isPlaying && !!selectedResourceData?.url)
      setVideoState((prev) => ({ ...prev, shouldPlay: false }));
    // play video if resources pop up is closed and video was playing
    if (!selectedResourceData?.url && videoState.shouldPlay === false)
      setVideoState((prev) => ({ ...prev, shouldPlay: true }));
  }, [selectedResourceData?.url]);

  function getVideoData(videoData) {
    setVideoState((prev) => ({ ...prev, isPlaying: videoData.isPlaying }));
  }

  function toggleActiveBox(id) {
    setActiveBox((prev) => (prev === id ? null : id));
  }

  return { activeBox, videoState, getVideoData, toggleActiveBox };
}
