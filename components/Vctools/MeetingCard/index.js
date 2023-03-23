import { UserStateAtom } from '@/state/atoms/users.atom';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { OnVideo, StopVideo } from "../help/vctool.helper";
import VctoolButton from '../Vctoolbutton';
import styles from '../vctoolMain.module.scss';
const MeetingCard = ({ startMeeting, startmeetingAudioenable, startmeetingVideoenable, startAudioenableFun, startVideoenableFun }) => {
    const videoref = useRef(null);
    const [video1, setvideo1] = useState(startmeetingVideoenable)
    const [audio1, setaudio1] = useState(startmeetingAudioenable)
    const userData = useRecoilValue(UserStateAtom)
    const nameRef = useRef(null)
    let video = videoref.current;
    let startName = ""
    if (!!userData?.first_name)
        startName = userData.first_name[0] + " " + userData.last_name[0];
    useEffect(() => {
        if (video1) {
            OnVideo(video, videoref)
            nameRef.current.style.display = "none"

        }
        else {
            StopVideo(video, videoref)
            nameRef.current.style.display = "block"
        }
    })
    
    return (
        <div className={`${styles.vcCard}`}>
            <div className={`${styles.videoPlayer}`}>
                <div className={`${styles.subvideo}`}>

                    <video className={`${styles.videoplay}`} id="video" ref={videoref} autoPlay="true">


                    </video>
                    <div ref={nameRef} className={`${styles.subVideo}`}>
                        <h1>{startName}</h1>
                    </div>

                </div>
            </div>
            <div className={`${styles.btns}`}>
                <VctoolButton onClickfun={() => {
                    startAudioenableFun()
                    setaudio1(!audio1)
                }} customId={audio1 ? `${styles.audioBtn}` : `${styles.btnsBg2}`}
                    toggle={audio1} trueSrc={"/images/svg/vctool/mic-on.svg"} falseSrc={"/images/svg/vctool/mic-off.svg"} />


                <VctoolButton onClickfun={() => {
                    startVideoenableFun()
                    setvideo1(!video1)
                }} customId={video1 ? `${styles.btnsBg1}` : `${styles.btnsBg2}`}
                    trueSrc={"/images/svg/vctool/videocam-on.svg"} falseSrc={"/images/svg/vctool/videocam-off.svg"} toggle={video1} />

                <button><img src="/images/svg/vctool/settings.svg" /> </button>

                <div className={`${styles.joinBtn}`}>
                    <button onClick={() => {
                        startMeeting()
                        StopVideo(video, videoref)
                        // console.log(startName)
                    }}>
                        Join
                    </button>

                    {/* <VctoolButton onClickfun={()=>
                    {
                        startMeeting()
                        StopVideo(video,videoref)
                    }} btnValue={"Join"}/> */}
                </div>
            </div>
        </div>
    )
};
export default MeetingCard;