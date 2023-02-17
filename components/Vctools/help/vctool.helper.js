export const StartMeeting = (givenName, startingName, containerRef, email, toggleAudio, setToobar, setApi, toggleVideo) => {
  const domain = 'live.zicops.com';
  const options = {
    roomName: givenName,
    parentNode: containerRef.current,
    userinfo: {
      email: email,
      displayName: startingName //default name
    },
    configOverwrite: {
      startWithAudioMuted: !toggleAudio,
      startWithVideoMuted: !toggleVideo,
      prejoinPageEnabled: false
    },

    interfaceConfigOverwrite: {
      SHOW_JITSI_WATERMARK: false,
      DISABLE_DOMINANT_SPEAKER_INDICATOR: true,
      TOOLBAR_ALWAYS_VISIBLE: true,
      TOOLBAR_BUTTONS: []
    },
    onload: function () {
      console.log('onload');
      setToobar(true)
    }
  };
  setApi(new JitsiMeetExternalAPI(domain, options));

};


export function GenerateString(length, characters) {
  let result = ' ';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export function OnVideo(video, videoref) {
  video = videoref.current;
  videoref.current.style.display = "block"
  videoref.current.style.backgroundColor = "black"
  videoref.current.style.width = "200px"
  videoref.current.style.height = "200px"
  videoref.current.style.borderRadius = "50%"
  // nameRef.current.style.display="none"
  navigator.mediaDevices
    .getUserMedia(
      {
        video: { width: 200, height: 200 }
      }
    ).then((stream) => {
      video.srcObject = stream;
      video.play()
    }).catch((err) => {
      console.log(err)
    })
}

export function StopVideo(video, videoref) {
  video = videoref.current;
  videoref.current.style.display = "none"
  try {
    let stream = video.srcObject;
    let tracks = stream.getTracks();
    for (let i = 0; i < tracks.length; i++) {
      let track = tracks[i];
      track.stop();
    }

    video.srcObject = null;
  }
  catch (e) {
    console.log(e)
  }
}

export function Draw(e, canvasRef, ctx, lineWidth, Color, isDrawing, timeout) {
  if (!isDrawing) {
    return;
  }
  const canvas = canvasRef.current;
  ctx.current = canvas.getContext("2d");
  ctx.current.lineWidth = lineWidth;
  ctx.current.lineCap = "round";
  ctx.current.strokeStyle = Color;
  ctx.current.lineTo(e.clientX, e.clientY)
  ctx.current.stroke();
  ctx.current.beginPath();
  ctx.current.moveTo(e.clientX, e.clientY);

  if (timeout.current !== undefined) {
    clearTimeout(timeout.current);
  }
  timeout.current = setTimeout(() => {
    var savedimg = canvas.toDataURL("image/png");
    localStorage.setItem("canvasimg", savedimg);
  }, 1);
}