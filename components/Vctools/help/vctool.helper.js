import moment from 'moment';

export const StartMeeting = (
  givenName,
  containerRef,
  toggleAudio,
  setToobar,
  setApi,
  toggleVideo
) => {
  const domain = 'live.zicops.com';
  const options = {
    roomName: givenName,
    parentNode: containerRef.current,
    configOverwrite: {
      startWithAudioMuted: !toggleAudio,
      startWithVideoMuted: !toggleVideo,
      prejoinPageEnabled: false,
      notifications: [],
      disabledNotifications: ['notify.grantedTo'],
      disableFilmstripAutohiding: true
    },
    interfaceConfigOverwrite: {
      SHOW_JITSI_WATERMARK: false,
      BRAND_WATERMARK_LINK: '',
      DISABLE_DOMINANT_SPEAKER_INDICATOR: true,
      TOOLBAR_ALWAYS_VISIBLE: true,
      DISABLE_FOCUS_INDICATOR: true,
      TOOLBAR_BUTTONS: [],
      DEFAULT_REMOTE_DISPLAY_NAMEA: 'Zicops User'
    },
    onload: function () {
      setToobar(true);
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
}

export function OnVideo(video, videoref) {
  video = videoref.current;
  videoref.current.style.display = 'block';
  videoref.current.style.backgroundColor = 'black';
  videoref.current.style.width = '516px';
  videoref.current.style.height = '270px';
  videoref.current.style.borderTopRightRadius = '8px';
  videoref.current.style.borderTopLeftRadius = '8px';

  // videoref.current.style.borderRadius = "50%"
  // nameRef.current.style.display="none"
  navigator.mediaDevices
    .getUserMedia({
      video: { width: 516, height: 270 }
    })
    .then((stream) => {
      video.srcObject = stream;
      video.play();
    })
    .catch((err) => {});
}

export function StopVideo(video, videoref) {
  video = videoref.current;
  videoref.current.style.display = 'none';
  try {
    let stream = video.srcObject;
    let tracks = stream.getTracks();
    for (let i = 0; i < tracks.length; i++) {
      let track = tracks[i];
      track.stop();
    }

    video.srcObject = null;
  } catch (e) {}
}

export function Draw(e, canvasRef, ctx, lineWidth, Color, isDrawing, timeout) {
  if (!isDrawing) {
    return;
  }
  const canvas = canvasRef.current;
  ctx.current = canvas.getContext('2d');
  ctx.current.lineWidth = lineWidth;
  ctx.current.lineCap = 'round';
  ctx.current.strokeStyle = Color;
  ctx.current.lineTo(e.clientX, e.clientY);
  ctx.current.stroke();
  ctx.current.beginPath();
  ctx.current.moveTo(e.clientX, e.clientY);

  if (timeout.current !== undefined) {
    clearTimeout(timeout.current);
  }
  timeout.current = setTimeout(() => {
    var savedimg = canvas.toDataURL('image/png');
    localStorage.setItem('canvasimg', savedimg);
  }, 1);
}

// null -> not started
// 1 -> live
// 2 -> ended
export function getSessionStatus(startTimeUnix = null, endTimeUnix = null) {
  // return null if args are not proper
  if (!+startTimeUnix) return null;
  if (!+endTimeUnix) return null;

  // now > start time  -> session live
  // now > end time  -> session ended
  const startTime = moment(+startTimeUnix * 1000);
  const now = new Date();
  const endTime = moment(+endTimeUnix * 1000);

  const isEnded = endTime.diff(now, 'minute') < 0;

  if (startTime.diff(now, 'minute') <= 0 && !isEnded) return 1;
  if (isEnded) return 2;

  return null;
}
