import { useEffect, useState, useRef } from 'react';
import styles from '../VctoolMain.module.scss'
const MeetingCard = ({ StartMeeting, StartmeetingAudioenable, StartmeetingVideoenable, StartAudioenableFun, StartVideoenableFun }) => {
    const videoref = useRef(null);
    const [video1, setvideo1] = useState(StartmeetingVideoenable)
    const [audio1, setaudio1] = useState(StartmeetingAudioenable)
    const OnVideo = async () => {
        let video = videoref.current;
        videoref.current.style.backgroundColor = "black"
        videoref.current.style.width = "200px"
        videoref.current.style.height = "200px"
        videoref.current.style.borderRadius = "50%"
        await navigator.mediaDevices
            .getUserMedia(
                {
                    video: { width: 200, height: 200 }
                }
            ).then((stream) => {
                video.srcObject = stream;
                // video.play()
            }).catch((err) => {
                console.log(err)
            })
    }

    const StopVideo = async () => {
        let video = videoref.current;
        videoref.current.style.backgroundColor = "black"
        videoref.current.style.width = "200px"
        videoref.current.style.height = "200px"
        videoref.current.style.borderRadius = "50%"
        try {
            const stream = video.srcObject;
            const tracks = stream.getTracks();
            for (let i = 0; i < tracks.length; i++) {
                let track = tracks[i];
                track.stop();
            }

            video.srcObject = null;
        }
        catch (e) {
            console.log(e)
        }
    //     let stream =video.srcObject;
    // const tracks = stream.getTracks();
    
    // tracks.forEach(track => track.stop());
    // video.srcObject = null;

    }
    useEffect(() => {

        if (video1) {
            OnVideo()
        }
        else {
            StopVideo()
        }
    })

    return (
        <div className={`${styles.Vccard}`}>
            <div className={`${styles.video1}`}>
                <div className={`${styles.subvideo}`}>
                    <video className={`${styles.videoplay}`} id="video" ref={videoref} autoPlay="true"></video>
                </div>
            </div>
            <div className={`${styles.btns}`}>
                <button onClick={() => {
                    StartAudioenableFun()
                    setaudio1(!audio1)
                    {
                        video1 ? OnVideo() :StopVideo()
                    }
                }} style={audio1 ? { backgroundColor: "#202222" } : { backgroundColor: "#F53D41" }}>
                    {

                        audio1 ?
                            <img src="/images/svg/vctool/mic-on.svg" />
                            :
                            <img src="/images/svg/vctool/mic-off.svg" />
                    }
                </button>

                <button onClick={() => {
                    StartVideoenableFun()
                    setvideo1(!video1)
                    {
                        video1 ? OnVideo() :StopVideo()
                    }
                }} style={video1 ? { backgroundColor: "#202222" } : { backgroundColor: "#F53D41" }}>
                    {

                        video1 ?
                            <img src="/images/svg/vctool/videocam-on.svg" />
                            :
                            <img src="/images/svg/vctool/videocam-off.svg" />
                    }
                </button>

                <button><img src="/images/svg/vctool/settings.svg" /> </button>

                <div className={`${styles.join_btn}`}>
                    <button onClick={() => {
                        StartMeeting()
                        StopVideo()
                    }}>
                        Join
                    </button>
                </div>
            </div>
        </div>
    )
};
export default MeetingCard;