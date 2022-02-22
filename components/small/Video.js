import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import styles from "../../styles/ContentPlayer.module.css";

export const VideoJS = ( props ) => {

  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const { options, onReady } = props;

  React.useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = playerRef.current = videojs(videoElement, options, () => {
        console.log("player is ready");
        onReady && onReady(player);
      });
    } else {
      // you can update player here [update player through props]
      // const player = playerRef.current;
      // player.autoplay(options.autoplay);
      // player.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <>
    <div data-vjs-player>
      <video ref={videoRef} className="vjs-zicops video-js vjs-big-play-centered" id="contentPlayer"/>
    </div>
    <style jsx>
    {`
      .vjs-zicops .vjs-has-started .vjs-control-bar, .vjs-zicops.video-js.vjs-progress-control{
        background-color: #ff0000!important;  
      }
    `}
    </style>
    </>
  );
}

export default VideoJS;