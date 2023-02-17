import { useEffect, useState, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { UserStateAtom } from '@/state/atoms/users.atom';
import styles from '../VctoolMain.module.scss'
import {OnVideo,StopVideo} from "../help/vctool.helper"
import VctoolButton from '../Vctoolbutton';
const MeetingCard = ({ startMeeting, startmeetingAudioenable, startmeetingVideoenable, startAudioenableFun, startVideoenableFun }) => {
    const videoref = useRef(null);
    const [video1, setvideo1] = useState(startmeetingVideoenable)
    const [audio1, setaudio1] = useState(startmeetingAudioenable)
    const userData = useRecoilValue(UserStateAtom)
    const nameRef=useRef(null)
    let video = videoref.current;
    let startName = ""
   if(!!userData?.first_name)
   startName=userData.first_name[0] + " " + userData.last_name[0];
    useEffect(() => {
        if (video1) {
            OnVideo(video,videoref)
            nameRef.current.style.display="none"
        
        }
        else {
            StopVideo(video,videoref)
            nameRef.current.style.display="block"
        }
    }, [video1])

    return (
        <div className={`${styles.Vccard}`}>
            <div className={`${styles.video1}`}>
                <div className={`${styles.subvideo}`}>

                    <video className={`${styles.videoplay}`} id="video" ref={videoref} autoPlay="true">


                    </video>
                    <div ref={nameRef} className={`${styles.subvideo1}`}>
                                <h1>{startName}</h1>
                            </div>

                </div>
            </div>
            <div className={`${styles.btns}`}>
                <VctoolButton onClickfun={()=>
                {
                    startAudioenableFun()
                    setaudio1(!audio1)
                }} custamId={audio1 ? `${styles.btns_bg1}`:`${styles.btns_bg2}`}
                toggle={audio1} trueSrc={"/images/svg/vctool/mic-on.svg"} falseSrc={"/images/svg/vctool/mic-off.svg"}/>


                <VctoolButton onClickfun={()=>{ startVideoenableFun()
                    setvideo1(!video1)}} custamId={video1 ? `${styles.btns_bg1}`:`${styles.btns_bg2}` }
                    trueSrc={"/images/svg/vctool/videocam-on.svg" } falseSrc={"/images/svg/vctool/videocam-off.svg"} toggle={video1}/>

                <button><img src="/images/svg/vctool/settings.svg" /> </button>

                <div className={`${styles.join_btn}`}>
                    <button onClick={() => {
                        console.log("cliked")
                        startMeeting()
                        StopVideo(video,videoref)
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