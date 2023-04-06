import SwitchButton from "@/components/common/FormComponents/SwitchButton";
import styles from "../vctoolMain.module.scss"
const StartSessionPopUp = ({concelMeetingFunc,startMeetingFunc}) => {
    return (
        <div className={`${styles.startSessionPopup}`}>
            <div className={`${styles.starSessionInnerContainer}`}>
                <p>Start Session</p>

                <div className={`${styles.startSessionInstruction}`}>
                    Are you sure you want to start the session?Session recording
                    will start automatically once the session starts.
                </div>
                <div className={`${styles.startSessionStartRecordBtn}`}>
                    <div>
                        <p>Recording</p>
                        <div>
                            <SwitchButton
                                // label="Freeze"
                                inputName="start Recording"
                                // isDisabled={isDisabled}
                                // isChecked={fullCourse?.qa_required || false}
                                // handleChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className={`${styles.startSessionBtns}`}>
                  <button className={`${styles.SessionCanselBtn}`} onClick={()=>
                {
                    concelMeetingFunc()
                }}>Cancel</button>
                  <button className={`${styles.startSessionBtn}`} onClick={()=>
                {
                    startMeetingFunc()
                }}>Start Session</button>
                </div>
            </div>
        </div>
    )
};
export default StartSessionPopUp;