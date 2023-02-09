import { useEffect, useState,useRef } from 'react';
import { stream } from 'xlsx';
import styles from '../VctoolMain.module.scss'
const MeetingCard = ({ StartMeeting, StartmeetingAudioenable, StartmeetingVideoenable, StartAudioenableFun, StartVideoenableFun }) => {
    const videoref=useRef(null);
    const OnVideo=()=>
    {
        videoref.current.style.borderRadius="50%"
        navigator.mediaDevices
        .getUserMedia(
            {
            video :{width:200,height:200}
        }
        ).then((stream)=>
        {
            let video=videoref.current;
            video.srcObject=stream;
            video.play()
        }).catch((err)=>
        {
            console.log(err)
        })
    }
    const StopVideo=  ()=>
    {
        try
        {
            let video=videoref.current;
        const stream = video.srcObject;
        const tracks = stream.getTracks();
      
        for (let i = 0; i < tracks.length; i++) {
          let track = tracks[i];
          track.stop();
        }
      
        video.srcObject = null;
        }
        catch(e)
        {
            console.log(e)
        }
    }

    useEffect(()=>
    {
        if(StartmeetingVideoenable)
        {
            OnVideo()
        }
        else
        {
            StopVideo()
        }
    })
    return (
        <div className={`${styles.Vccard}`}>
            <div className={`${styles.video1}`}>
                <div className={`${styles.subvideo}`}>
                        <video className={`${styles.videoplay}`} id="video" ref={videoref}></video>
                </div>
            </div>
            <div className={`${styles.btns}`}>
                <button onClick={() => {
                    StartAudioenableFun()
                }} style={StartmeetingAudioenable ? { backgroundColor: "#202222" } : { backgroundColor: "#F53D41" }}>
                    {

                        StartmeetingAudioenable ?
                            <img src="/images/svg/vctool/mic-on.svg" />
                            :
                            <img src="/images/svg/vctool/mic-off.svg" />
                    }
                </button>

                <button onClick={() => {
                    StartVideoenableFun()
                }} style={StartmeetingVideoenable ? { backgroundColor: "#202222" } : { backgroundColor: "#F53D41" }}>
                    {

                        StartmeetingVideoenable ?
                            <img src="/images/svg/vctool/videocam-on.svg" />
                            :
                            <img src="/images/svg/vctool/videocam-off.svg" />
                    }
                </button>

                <button><img src="/images/svg/vctool/settings.svg" /> </button>

                <div className={`${styles.join_btn}`}>
                    <button onClick={() => {
                        StartMeeting()
                    }}>
                        Join
                    </button>
                </div>
            </div>
        </div>
    )
};
export default MeetingCard;