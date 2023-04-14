import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  ActiveCourseDataAtom,
  ActiveCourseHeroAtom,
  CourseActiveTabAtom,
  SelectedResourceDataAtom,
  courseHeroObj,
} from '../atoms/learnerCourseComps.atom';

export default function useHandleTopicView() {
  const [activeHero, setActiveHero] = useRecoilState(ActiveCourseHeroAtom);
  const [activeCourseData, setActiveCourseData] = useRecoilState(ActiveCourseDataAtom);
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

  useEffect(() => {
    // pause video if resources pop up is open
    if (videoState.isPlaying && !!selectedResourceData?.url)
      setVideoState((prev) => ({ ...prev, shouldPlay: false }));
    // play video if resources pop up is closed and video was playing
    if (!selectedResourceData?.url && videoState.shouldPlay === false)
      setVideoState((prev) => ({ ...prev, shouldPlay: true }));
  }, [selectedResourceData?.url]);

  function getVideoData(videoData) {
    setVideoState((prev) => ({ ...prev, ...videoData }));
  }

  function toggleActiveBox(id) {
    setActiveBox((prev) => (prev === id ? null : id));
  }

  function closePlayer() {
    setActiveHero(courseHeroObj.courseMetaPreview);
    setActiveCourseData((prev) => ({ ...prev, topicId: null, topicContentId: null }));
  }

  return { activeBox, videoState, getVideoData, toggleActiveBox, closePlayer };
}
