import { async } from '@firebase/util';
import { enableNetwork } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import styles from '../VctoolMain.module.scss'
const MeetingCard = ({ StartMeeting }) => {
    // const [stream,setstream]=useState(null)
    const [audioenable, setaudioenable] = useState(false)
    const [videoenable, setvideoenable] = useState(false)
    return (
        <div className={`${styles.Vccard}`}>
            <div className={`${styles.video1}`}>
                <div className={`${styles.subvideo}`}>
                    {/* {
                        videoenable ? <video className={`${styles.videoplay}`} id="video"></video>

                            : ""
                            //  <div className={`${styles.disablevideo}`}>
                            //     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                            //         <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            //         <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                            //     </svg>
                            //     <h4>Sandeep</h4>
                            // </div>
                    } */}
                </div>
            </div>
            <div className={`${styles.btns}`}>
                <button onClick={() => {
                    setaudioenable(!audioenable)
                }} style={audioenable ? { backgroundColor: "#202222" } : { backgroundColor: "#F53D41" }}>
                    {

                        audioenable ?
                            <img src="/images/svg/vctool/mic_on.svg" />
                            :
                            <img src="/images/svg/vctool/mic_off.svg" />
                    }
                </button>

                <button onClick={() => {
                    setvideoenable(!videoenable)
                }} style={videoenable ? { backgroundColor: "#202222" } : { backgroundColor: "#F53D41" }}>
                    {

                        videoenable ?
                            <img src="/images/svg/vctool/videocam_on.svg" />
                            :
                            <img src="/images/svg/vctool/videocam_off.svg" />
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