export const startJitsiMeet = (meetSetupObj = {}) => {
  const domain = meetSetupObj?.domain;
  const options = {
    roomName: meetSetupObj?.uniqueRoomName,
    parentNode: meetSetupObj?.parentNode,
    configOverwrite: {
      startWithAudioMuted: !meetSetupObj?.isMicOn,
      startWithVideoMuted: !meetSetupObj?.isCameraOn,
      prejoinPageEnabled: false,
      disableFilmstripAutohiding: true
    },
    interfaceConfigOverwrite: {
      SHOW_JITSI_WATERMARK: false,
      BRAND_WATERMARK_LINK: '',
      DISABLE_DOMINANT_SPEAKER_INDICATOR: true,
      TOOLBAR_ALWAYS_VISIBLE: true,
      DISABLE_FOCUS_INDICATOR: true,
      TOOLBAR_BUTTONS: [],
      DEFAULT_REMOTE_DISPLAY_NAME: 'Zicops User'
    },
    onload: meetSetupObj?.onLoad()
  };

  console.info(options);

  return new JitsiMeetExternalAPI(domain, options);
};
