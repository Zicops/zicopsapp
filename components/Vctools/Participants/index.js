import { useState } from "react";
import styles from "../vctoolMain.module.scss"
import { useRecoilState, useRecoilValue } from 'recoil';
import { UserStateAtom } from '@/state/atoms/users.atom';
import StudentFrame from "../StudentFrame";
const Participants = ({ showHide, Info, Iframe }) => {
    const userData = useRecoilValue(UserStateAtom)
    return (
        <div className={`${styles.Participants_bar}`}>
            <div className={`${styles.Participants_head}`}>
                <div>Participants</div>
                <button onClick={() => {
                    showHide()
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
                        Info.map((data) => {
                               return ( data.role=="moderator") &&<StudentFrame name={data.displayName}/>
                            // return (userData.role != "Learner") && <StudentFrame name={data.displayName} />
                        })
                    }
                </div>

                <div className={`${styles.Participants_Screen_head}`}>Learners</div>
                <div className={`${styles.Allinstructors}`}>
                    {
                        Info.map((data) => {
                               return ( data.role=="participant") &&<StudentFrame name={data.displayName}/>
                            // return (userData.role == "Learner") && <StudentFrame name={data.displayName} />
                        })
                    }
                </div>

            </div>
        </div>
    )
};
export default Participants;