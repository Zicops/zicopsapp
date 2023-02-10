import styles from "../VctoolMain.module.scss"
const Participants = ({ ShowHide }) => {
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

                </div>

                <div className={`${styles.Participants_Screen_head}`}>Learners</div>
                <div className={`${styles.Allinstructors}`}>

                </div>

            </div>
        </div>
    )
};
export default Participants;