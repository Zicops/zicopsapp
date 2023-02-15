import { useState } from "react";
import styles from "../VctoolMain.module.scss"
const Participants = ({ ShowHide,Info,Iframe }) => {
    const StudentFrame = ({name,UserIfram}) => {
        return (
            <div className={`${styles.Student_Frame}`}>
                <div className={`${styles.avtar}`}>{name[0]+name[1]}</div>
                <div className={styles.student_frame_name}>{name}</div>
                <div className={`${styles.student_frame_icons}`}>
                    <img src="/images/svg/vctool/back-hand.svg" />
                    <img src="/images/svg/vctool/mic-off.svg" />
                    <img src="/images/svg/vctool/videocam-off.svg" />
                </div>
            </div>
        )
    }
    return (
        <div className={`${styles.Participants_bar}`}>
            <div className={`${styles.Participants_head}`}>
                <div>Participants</div>
                <button onClick={() => {
                    ShowHide()
                }}>
                    <img src="/images/svg/vctool/close.svg" />
                </button>
            </div>

            <div className={`${styles.Participants_Screen}`}>
                <div className={`${styles.Participants_Screen_head}`}>Instructors</div>
                <div className={`${styles.Allinstructors}`}>
                </div>

                <div className={`${styles.Participants_Screen_head}`}>Moderators</div>
                <div className={`${styles.Allinstructors}`}>
                   {
                   Info.map((data)=>
                    {
                       return ( data.role=="moderator") &&<StudentFrame name={data.displayName}/>
                    })
                   }
                </div>

                <div className={`${styles.Participants_Screen_head}`}>Learners</div>
                <div className={`${styles.Allinstructors}`}>
                {
                   Info.map((data)=>
                    {
                       return ( data.role=="participant") &&<StudentFrame name={data.displayName}/>
                    })
                   }
                </div>

            </div>
        </div>
    )
};
export default Participants;