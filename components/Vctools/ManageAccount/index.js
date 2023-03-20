import SwitchButton from "@/components/common/FormComponents/SwitchButton";
import styles from "../vctoolMain.module.scss"
const ManageAccount = ({ showHide }) => {
    return (
        <div className={`${styles.manageAccountBar}`}>
            <div className={`${styles.manageAccountHead}`}>
                <div>Host controls</div>
                <button onClick={() => {
                    showHide()
                }}>
                    <img src="/images/svg/vctool/close.svg" />
                </button>
            </div>

            <div className={`${styles.manageAccountScreen}`}>
                <div className={`${styles.manageAccountScreenHeading}`}>LET EVERYONE</div>
                <div className={`${styles.hostControlls}`}>
                    <div>Turn on their microphone</div>
                    <SwitchButton
                        // label="Freeze"
                        inputName="qa_required"
                        // isDisabled={isDisabled}
                        // isChecked={fullCourse?.qa_required || false}
                        // handleChange={handleChange}
                    />
                </div>
                <div className={`${styles.hostControlls}`}>
                    <div>Turn on their vidoe</div>
                    <SwitchButton
                        // label="Freeze"
                        inputName="qa_required"
                        // isDisabled={isDisabled}
                        // isChecked={fullCourse?.qa_required || false}
                        // handleChange={handleChange}
                    />
                </div>
                <div className={`${styles.hostControlls}`}>
                    <div>Share their screen</div>
                    <SwitchButton
                        // label="Freeze"
                        inputName="qa_required"
                        // isDisabled={isDisabled}
                        // isChecked={fullCourse?.qa_required || false}
                        // handleChange={handleChange}
                    />
                </div>
                <div className={`${styles.hostControlls}`}>
                    <div>Post questions to Q & A </div>
                    <SwitchButton
                        // label="Freeze"
                        inputName="qa_required"
                        // isDisabled={isDisabled}
                        // isChecked={fullCourse?.qa_required || false}
                        // handleChange={handleChange}
                    />
                </div>
                <div className={`${styles.hostControlls}`}>
                    <div>Post messages in chat</div>
                    <SwitchButton
                        // label="Freeze"
                        inputName="qa_required"
                        // isDisabled={isDisabled}
                        // isChecked={fullCourse?.qa_required || false}
                        // handleChange={handleChange}
                    />
                </div>


            </div>
        </div>
    )
};
export default ManageAccount;