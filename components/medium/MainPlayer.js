import Image from 'next/image';
import React from 'react';
import { useState, useEffect } from 'react'
import videojs from "video.js";
import VideoJS from '../small/Video';

const MainPlayer = ({set}) => {
    const PlayerClose = () => set(false);

    const playerRef = React.useRef(null);
    const videoJsOptions = {
        // autoplay: true,
        controls: true,
        aspectRatio: "18:7", 

        responsive: true,
        fluid: true,
        sources: [{
          src: '/videos/zicops-product-demo-learner-panel.mp4',
          type: 'video/mp4'
        }]
      }

    const handlePlayerReady = (player) => {
        playerRef.current = player;

        // you can handle player events here
        player.on('waiting', () => {
            console.log('player is waiting');
        });

        player.on('dispose', () => {
            console.log('player will dispose');
        });
    };

    const addBookmark = () => {
        var myPlayer = videojs('contentPlayer');
        alert(myPlayer.currentTime())
    }

    return (
        <>

            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
            {/* <div className="close-player" onClick={PlayerClose}>
                Close Player
            </div> */}
            <div className="overlay">
                <div className="back_arrow" onClick={PlayerClose}>
                    <Image 
                    src="/images/bigarrowleft.png" 
                    width="20"
                    height="20"
                    />
                </div>
                <div className="bookmark" onClick={addBookmark}>
                    <button>Bookmark</button>
                </div>
            </div>

        <style jsx>{`

            .overlay {
                position: absolute;
                top: 0;
                left: 0;
                margin-top: 80px;
                width: 100%;
            }

            .back_arrow{
                margin-top: 20px;
                margin-left: 100px;
                cursor: pointer;
            }

            .bookmark{
                position: absolute;
                top: 20px;
                right: 100px;
                cursor: pointer;
            }
        `}</style>
        </>
    )
}

export default MainPlayer