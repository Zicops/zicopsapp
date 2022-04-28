import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { filterTopicContent } from '../../../helper/data.helper';
import { secondsToMinutes } from '../../../helper/utils.helper';
import { TopicContentAtom } from '../../../state/atoms/module.atoms';
import { VideoAtom } from '../../../state/atoms/video.atom';

export default function useVideoPlayer(videoElement, videoContainer, type) {
  // [play,pause,forward,backward,volumeUp,volumeDown,enterFullScreen,exitFullScreen,reload,unmute,mute,next,previous]
  const [playPauseActivated, setPlayPauseActivated] = useState(null);
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    speed: 1,
    isMuted: false,
    volume: 0.8
  });

  const [videoData, updateVideoData] = useRecoilState(VideoAtom);
  const topicContent = useRecoilValue(TopicContentAtom);
  const [seek, setSeek] = useState(0);
  const [hideControls, setHideControls] = useState(0);
  const [hideTopBar, setHideTopBar] = useState(0);
  const tooltip = useRef(null);

// hide control bar if no mouse movement for 2.5 sec

  let timeout;
  useEffect(() => {
    videoElement.current?.focus();
    togglePlay();

    const duration = 2500;
    videoContainer.current?.addEventListener('mousemove', function () {
      if (type !== 'mp4') return;

      setHideControls(0);
      setHideTopBar(0);
      clearTimeout(timeout);

      timeout = setTimeout(function () {
        setHideControls(1);
        setHideTopBar(1);
      }, duration);
    });
  }, []);

  useEffect(() => {
    if (type !== 'mp4') setHideControls(1);
  }, [type]);

  // reset playpause to null after few seconds
  useEffect(() => {
    clearTimeout(timeout);
    const timeout = setTimeout(() => {
      setPlayPauseActivated(null);
    }, 1000);
  }, [playPauseActivated]);

  useEffect(() => {
    playerState.isPlaying ? videoElement.current?.play() : videoElement.current?.pause();
  }, [playerState.isPlaying, videoElement]);

  // TODO : Change this to Ref OR change entire input range to DIV
  useEffect(() => {
    document.getElementById('vidInput').style.background =
      'linear-gradient(to right, #6bcfcf 0%, #6bcfcf ' +
      playerState.progress +
      '%, #22252980 ' +
      playerState.progress +
      '%, #22252980 100%)';
  }, [playerState.progress]);

  // keyboard events
  function handleKeyDownEvents(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.code === 'Space') {
      togglePlay();
      return;
    }
    if (e.code === 'KeyR' && e.shiftKey) {
      reloadVideo();
      return;
    }
    if (e.code === 'KeyN' && e.shiftKey) {
      playNextVideo();
      return;
    }
    if (e.code === 'KeyP' && e.shiftKey) {
      playPreviousVideo();
      return;
    }
    if (e.code === 'KeyF') {
      toggleFullScreen();
      return;
    }
    if (e.code === 'KeyM') {
      toggleMute();
      return;
    }

    if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
      updateVolumeValue(e.code === 'ArrowUp');
      return;
    }

    if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
      moveVideoProgress(e.code === 'ArrowRight');
      return;
    }
  }

  function handleMouseMove(e) {
    if (!videoElement.current) return;
    tooltip.current.style.left = e.pageX + 'px';

    var videoDuration = videoElement.current?.duration;
    const timestamp = (e.pageX / screen.width) * videoDuration;

    const timeObj = secondsToMinutes(timestamp);
    setSeek(`${timeObj.minute}: ${timeObj.second}`);
  }

  function handleMouseExit(e) {
    setSeek(0);
  }

  function updateVolumeValue(isIncrement) {
    let vol = playerState.volume - 0.1;
    if (isIncrement) vol = playerState.volume + 0.1;

    if (vol > 1) vol = 1;
    if (vol < 0) vol = 0;

    setPlayPauseActivated(isIncrement ? 'volumeUp' : 'volumeDown');
    setPlayerState({
      ...playerState,
      volume: vol
    });
    videoElement.current.volume = vol;
  }

  function togglePlay() {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying
    });

    setPlayPauseActivated(!playerState.isPlaying ? 'play' : 'pause');
  }

  function playNextVideo() {
    if (!videoData.allModuleTopic) return;
    if (videoData.allModuleTopic.length === videoData.currentTopicIndex) return;

    const topicId = videoData.allModuleTopic[videoData.currentTopicIndex + 1].id;
    const filteredTopicContent = filterTopicContent(topicContent, topicId);
    const isTopicContentPresent = filteredTopicContent.length > 0;
    console.log(filteredTopicContent);

    updateVideoData({
      ...videoData,
      videoSrc: isTopicContentPresent ? filteredTopicContent[0].contentUrl : null,
      type: isTopicContentPresent ? filteredTopicContent[0].type : null,
      currentTopicIndex: isTopicContentPresent ? videoData.currentTopicIndex + 1 : null,
      topicContent: isTopicContentPresent ? filteredTopicContent : null,
      allModuleTopic: isTopicContentPresent ? videoData.allModuleTopic : null
    });

    setPlayPauseActivated('next');
  }

  function playPreviousVideo() {
    if (!videoData.allModuleTopic) return;
    if (videoData.currentTopicIndex === 0) return;

    const topicId = videoData.allModuleTopic[videoData.currentTopicIndex - 1].id;
    const filteredTopicContent = filterTopicContent(topicContent, topicId);
    const isTopicContentPresent = filteredTopicContent.length > 0;
    updateVideoData({
      ...videoData,
      videoSrc: isTopicContentPresent ? filteredTopicContent[0].contentUrl : null,
      type: isTopicContentPresent ? filteredTopicContent[0].type : null,
      currentTopicIndex: isTopicContentPresent ? videoData.currentTopicIndex - 1 : null,
      topicContent: isTopicContentPresent ? filteredTopicContent : null,
      allModuleTopic: isTopicContentPresent ? videoData.allModuleTopic : null
    });

    setPlayPauseActivated('previous');
  }

  // pass true or false
  function updateIsPlayingTo(play) {
    setPlayerState({
      ...playerState,
      isPlaying: !!play
    });

    setPlayPauseActivated(!!play ? 'play' : 'pause');
  }

  const handleOnTimeUpdate = () => {
    const progress = (videoElement.current?.currentTime / videoElement.current?.duration) * 100;
    // document.getElementById('vidInput').style.background = 'linear-gradient(to right, #6bcfcf 0%, #6bcfcf ' + progress + '%, #22252980 ' + progress + '%, #22252980 100%)'
    setPlayerState({
      ...playerState,
      progress: progress || 0
    });
  };

  const handleVideoProgress = (event) => {
    const manualChange = Number(event.target.value);
    // event.target.style.background = 'linear-gradient(to right, #6bcfcf 0%, #6bcfcf ' + manualChange + '%, #22252980 ' + manualChange + '%, #22252980 100%)'
    setVideoTime(manualChange);
  };

  function setVideoTime(time) {
    if (!videoElement.current) return;

    videoElement.current.currentTime = (videoElement.current?.duration / 100) * time;
    setPlayerState({
      ...playerState,
      progress: time
    });
  }

  const handleVideoSpeed = (event) => {
    const speed = Number(event.target.value);
    videoElement.current.playbackRate = speed;
    setPlayerState({
      ...playerState,
      speed
    });
  };

  function toggleMute() {
    setPlayerState({
      ...playerState,
      isMuted: !playerState.isMuted
    });

    setPlayPauseActivated(!playerState.isMuted ? 'mute' : 'unmute');
  }

  function reloadVideo() {
    setVideoTime(0);
    setPlayPauseActivated('reload');
  }

  function moveVideoProgress(isForward) {
    let time = Math.floor(videoElement.current?.currentTime);

    if (isForward) {
      time += 10;
      if (videoElement.current?.duration < time) {
        time = videoElement.current?.duration - 1;
      }
    } else {
      time -= 10;
      if (time < 0) time = 0;
    }

    videoElement.current.currentTime = time;
    setPlayerState({
      ...playerState,
      progress: time
    });

    setPlayPauseActivated(isForward ? 'forward' : 'backward');
    // postion is not accurate
    tooltip.current.style.left = (time / videoElement.current.duration) * screen.width + 'px';

    const timeObj = secondsToMinutes(time);
    setSeek(`${timeObj.minute}: ${timeObj.second}`);
  }

  /* View in fullscreen */
  function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  }
  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
  }
  // fix fullscreen issue
  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      // videoContainer.current?.requestFullscreen();
      openFullscreen(videoContainer.current);
    } else {
      // document.exitFullscreen();
      closeFullscreen();
    }

    setPlayPauseActivated(!document.fullscreenElement ? 'enterFullScreen' : 'exitFullScreen');
  }

  function handleVolume(e) {
    const volume = parseFloat(e.target.value);

    setPlayerState({
      ...playerState,
      volume: volume
    });
    videoElement.current.volume = volume;
  }

  return {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
    reloadVideo,
    moveVideoProgress,
    handleVolume,
    toggleFullScreen,
    updateIsPlayingTo,
    playPauseActivated,
    setPlayPauseActivated,
    handleKeyDownEvents,
    hideControls,
    hideTopBar,
    handleMouseExit,
    handleMouseMove,
    seek,
    tooltip,
    playNextVideo,
    playPreviousVideo
  };
}
