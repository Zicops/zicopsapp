import styles from "./VctoolMain.module.scss"
import MeetingCard from "./MeetingCard";
import { useState } from "react";
import Script from 'next/script'
import MainToolbar from "./Toolbar";
const VcMaintool = () => {

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const generateString = (length) => {
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  const [toolbar,settoobar]=useState(false)
  const [toggleAudio,settoggleAudio]=useState(true)
  const [toggleVideo,settoggleVideo]=useState(true)
  const [link, setlink] = useState(generateString(9))
  const [api, setapi] = useState(null)
  const StartMeeting = (givenName) => {
    const domain = 'live.zicops.com';
    const options = {
      roomName: givenName,
      width: 1535,
      height: 744,
      parentNode: document.querySelector('#meet'),
      userInfo: {
        email: 'email@jitsiexamplemail.com',
        displayName: 'John Doe'
    },
    configOverwrite: {
      startWithAudioMuted: true,
      startWithVideoMuted: false,
      prejoinPageEnabled: false
  },

  interfaceConfigOverwrite: {
      SHOW_JITSI_WATERMARK: false,
      DISABLE_DOMINANT_SPEAKER_INDICATOR: true,
      TOOLBAR_ALWAYS_VISIBLE: true,
      TOOLBAR_BUTTONS: [
          // 'closedcaptions',
          // 'filmstrip',
          // 'fullscreen',
          // 'select-background',
          // 'settings'
      ],

  },
    onload :function()
    {
      console.log("onload")
      // settoobar(true)
      setTimeout(()=>
      {
settoobar(true)
      },2000)
    },

    };
    setapi(new JitsiMeetExternalAPI(domain, options))
  }
  return (
    <>
      <div id="meet" className={`${styles.meet}`}>
      
      </div>
      {
        toolbar && <MainToolbar  setaudio={()=>
        {
             settoggleAudio(!toggleAudio)    
             api.executeCommand('toggleAudio');
        }}
        setvideo={()=>
        {
               settoggleVideo(!toggleVideo)
               api.executeCommand('toggleVideo');
        }} 
        audiotoggle={toggleAudio}
        videotoggle={toggleVideo}
        endMeetng={()=>
        {
          api.dispose();
          settoobar(!toolbar)
        }}
        shareScreen={()=>
        {
          api.executeCommand('toggleShareScreen');
        }}/>
      }
      <Script src='https://meet.jit.si/external_api.js'></Script>
      <div className={`${styles.main_div}`}>


        {/* all components ara going to append here */}
        <MeetingCard StartMeeting={()=>
        {
          
          StartMeeting(link)
        }} />
       
      </div>
    </>
  )
};
export default VcMaintool;