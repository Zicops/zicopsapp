import styles from "../vctoolMain.module.scss";
const StudentFrame = ({ name, UserIfram }) => {
    return (
        <div className={`${styles.Student_Frame}`}>
            <div className={`${styles.avtar}`}>{name?.[0] + name?.[1]}</div>
            <div className={styles.student_frame_name}>{name}</div>
            <div className={`${styles.student_frame_icons}`}>
                <img src="/images/svg/vctool/back-hand.svg" />
                <img src="/images/svg/vctool/mic-off.svg" />
                <img src="/images/svg/vctool/videocam-off.svg" />
            </div>
        </div>
    )
};
export default StudentFrame;