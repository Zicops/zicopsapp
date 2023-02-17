import { UserStateAtom } from '@/state/atoms/users.atom';
import { useRecoilValue } from 'recoil';
import StudentFrame from "../StudentFrame";
import styles from "../vctoolMain.module.scss";
const Participants = ({ showHide, Info, Iframe }) => {
    const userData = useRecoilValue(UserStateAtom)
    const startName = userData.first_name + " " + userData.last_name

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
                            // console.log(data)
                            console.log(Info)
                            return (data.role == "moderator") && <StudentFrame name={data.displayName} />
                            // return (userData.role != "Learner") && <StudentFrame name={data.displayName} />
                        })
                    }
                </div>

                <div className={`${styles.Participants_Screen_head}`}>Learners</div>
                <div className={`${styles.Allinstructors}`}>
                    {
                        Info.map((data) => {
                            return (data.role == "participant") && <StudentFrame name={data.displayName} />
                            // return (userData.role == "Learner") && <StudentFrame name={data.displayName} />
                        })

                    }
                    {
                        Info.map((data) => {
                            return (data.role == "none") && <StudentFrame name={data.displayName} />
                            // return (userData.role == "Learner") && <StudentFrame name={data.displayName} />
                        })

                    }
                </div>

            </div>
        </div>
    )
};
export default Participants;