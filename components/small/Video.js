// import React from "react";
// import videojs from "video.js";
// import "video.js/dist/video-js.css";
// import styles from "../../styles/ContentPlayer.module.css";

// export const VideoJS = ( props ) => {

//   const videoRef = React.useRef(null);
//   const playerRef = React.useRef(null);
//   const { options, onReady } = props;
  
//   // function newButtonToggle () {

//   //   videojs.newButton = videojs.Button.extend({
//   //     init: function (player, options) {
//   //       videojs.Button.call(this, player, options);
//   //       this.on('click', this.onClick);
//   //     }
//   //   });

//   //   videojs.newButton.prototype.onClick = function () {
//   //     //Add click routine here..
//   //   };

//   //   //Creating New Button
//   //   var createNewButton = function () {
//   //     var props = {
//   //       className: 'vjs-new-button vjs-control',
//   //       innerHTML: '<div class="vjs-control-content">' + ('New') + '</div>',
//   //       role: 'button',
//   //       'aria-live': 'polite',
//   //       tabIndex: 0
//   //     };
//   //     return videojs.Component.prototype.createEl(null, props);
//   //   };

//   //   //Adding the newly created button to Control Bar

//   //   videojs.plugin('newButton', function () {
//   //     var options = { 'el': createNewButton() };
//   //     newButton = new videojs.newButton(this, options);
//   //     this.controlBar.el().appendChild(newButton.el());
//   //   });

//   //   //Now setting up Player
//   //   var vid = videojs("sampleVideo", {
//   //     plugins: { newButton: {} }
//   //   });
//   // }

// // newButtonToggle();

//   React.useEffect(() => {
//     // make sure Video.js player is only initialized once
//     if (!playerRef.current) {
//       const videoElement = videoRef.current;
//       if (!videoElement) return;
//       const player = playerRef.current = videojs(videoElement, options, () => {
//         console.log("player is ready");
//         onReady && onReady(player);
//       });
//     } else {
//       // you can update player here [update player through props]
//       const player = playerRef.current;
//       // player.addChild('BigPlayButton');
//       player.autoplay(options.autoplay);
//       // player.children.controlBar.children.volumeControl(false);
//       // player.userActions();
//       // player.src(options.sources);
//     }
//   }, [options, videoRef]);

//   // Dispose the Video.js player when the functional component unmounts
//   React.useEffect(() => {
//     const player = playerRef.current;

//     return () => {
//       if (player) {
//         player.dispose();
//         playerRef.current = null;
//       }
//     };
//   }, [playerRef]);

//   React.useEffect(() => {
//       // let playerId = videoRef.current.parentNode.id;
//       // let player = document.getElementById(playerId);
//       var player = videojs(document.querySelector('#contentPlayer'))
//       var ButtonComp = videojs.getComponent('Button');
//       var restartBtn = new ButtonComp(player, {
//         clickHandler: function(event) {
//           videojs.log('Custom Button Clicked');
//           //Perform your logic here !
//           alert('restart')
//         }
//       });
//       var previousBtn = new ButtonComp(player, {
//         clickHandler: function(event) {
//           videojs.log('Custom Button Clicked');
//           //Perform your logic here !
//           alert('Previous')
//         }
//       });
//       var littleBack = new ButtonComp(player, {
//         clickHandler: function(event) {
//           videojs.log('Custom Button Clicked');
//           //Perform your logic here !
//           alert('minus 10 sec')
//         }
//       });
//       var playButton = new ButtonComp(player, {
//         clickHandler: function(event) {
//           if (this.player().paused()) {
//             this.player().play();
//           } else {
//             this.player().pause();
//           }
//         }
//       });
//       var littleForward = new ButtonComp(player, {
//         clickHandler: function(event) {
//           videojs.log('Custom Button Clicked');
//           //Perform your logic here !
//           alert('plus 10 sec')
//         }
//       });
//       var nextBtn = new ButtonComp(player, {
//         clickHandler: function(event) {
//           videojs.log('Custom Button Clicked');
//           //Perform your logic here !
//           alert('Next')
//         }
//       });
//       var volumeBtn = new ButtonComp(player, {
//         clickHandler: function(event) {
//           videojs.log('Custom Button Clicked');
//           //Perform your logic here !
//           alert('Volume')
//         }
//       });
//       var fullScreenBtn = new ButtonComp(player, {
//         clickHandler: function(event) {
//           //Perform your logic here !
//           if (this.player().isFullscreen()) {
//             this.player().exitFullscreen();
//           } else {
//             this.player().requestFullscreen();
//           }
//         }
//       });

//       restartBtn.addClass('zicopsRestartBtn')
//       previousBtn.addClass('zicopsPreviousBtn')
//       littleBack.addClass('zicopsLittleBack')
//       playButton.addClass('zicopsPlayButton')
//       littleForward.addClass('zicopsLittleForward')
//       nextBtn.addClass('zicopsNextBtn')
//       volumeBtn.addClass('zicopsVolumeBtn')
//       fullScreenBtn.addClass('zicopsFullScreenBtn')

//       player.controlBar.addChild(restartBtn,{},0)
//       // player.controlBar.addChild(previousBtn,{},2)
//       // player.controlBar.addChild(littleBack,{},3)
//       // player.controlBar.addChild(playButton,{},4)
//       // player.controlBar.addChild(littleForward,{},5)
//       // player.controlBar.addChild(nextBtn,{},6)
//       // player.controlBar.addChild(volumeBtn,{},7)
//       // player.controlBar.addChild(fullScreenBtn,{},8)
//       // console.log(playButton.contentEl());
//       // var Button = videojs.getComponent('Button');
//       // var button = new Button(player, {
//       //   clickHandler: function (event) {
//       //     videojs.log('Clicked');
//       //   }
//     // });
//   //     player.querySelector('.vjs-control-bar').innerHTML = `<button class="vjs-play-control vjs-control vjs-button vjs-paused" type="button" title="Play" aria-disabled="false">
//   //     <span class="vjs-icon-placeholder" aria-hidden="true"></span>
//   //     <span class="vjs-control-text" aria-live="polite">Play</span>
//   // </button>`;
//   }, []);
  

  
//   return (
//     <>
//     <div data-vjs-player>
//       <video ref={videoRef} className="vjs-zicops video-js vjs-big-play-centered" id="contentPlayer"/>
//     </div>
//     <style jsx>
//     {`
//       .vjs-zicops .vjs-has-started .vjs-control-bar, .vjs-zicops.video-js.vjs-progress-control{
//         background-color: #ff0000!important;  
//       }
//     `}
//     </style>
//     </>
//   );
// }

// export default VideoJS;