import { useState } from "react";
import styles from "../vctoolMain.module.scss"
import { useRecoilState, useRecoilValue } from 'recoil';
import { UserStateAtom } from '@/state/atoms/users.atom';
import StudentFrame from "../StudentFrame";
import { vctoolAlluserinfo } from "@/state/atoms/vctool.atoms";
const Participants = ({ showHide = false, Info, Iframe }) => {
    const userData = useRecoilValue(UserStateAtom)
    const meetingInfo=useRecoilValue(vctoolAlluserinfo)
    const startName = userData.first_name + " " + userData.last_name

    return (
        <div className={`${styles.participantsBar}`}>
            <div className={`${styles.participantsHead}`}>
                <div>Participants</div>
                <button onClick={() => {
                    showHide()
                }}>
                    <img src="/images/svg/vctool/close.svg" />
                </button>
            </div>

            <div className={`${styles.participantsScreen}`}>
                <div className={`${styles.participantsScreenhead}`}>Instructors</div>
                <div className={`${styles.allInstructors}`}>
                </div>

                <div className={`${styles.participantsScreenhead}`}>Moderators</div>
                <div className={`${styles.allInstructors}`}>
                    {
                        meetingInfo.map((data) => {
                            return (data.role == "moderator") && <StudentFrame name={data.displayName} />
                            // return (userData.role != "Learner") && <StudentFrame name={data.displayName} />
                        })
                    }
                </div>

                <div className={`${styles.participantsScreenhead}`}>Learners</div>
                <div className={`${styles.allInstructors}`}>
                    {
                        meetingInfo.map((data) => {
                            return (data.role !== "moderator") && <StudentFrame name={data.displayName} />
                            // return (userData.role == "Learner") && <StudentFrame name={data.displayName} />
                        })


                    }
                </div>

            </div>
        </div>
    )
};
export default Participants;