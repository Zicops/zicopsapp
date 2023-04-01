import SwitchButton from "@/components/common/FormComponents/SwitchButton";
import { vcModeratorControlls } from "@/state/atoms/vctool.atoms";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styles from "../vctoolMain.module.scss"
const ManageAccount = ({ hide }) => {
    const [controlls, setControlls] = useRecoilState(vcModeratorControlls)
    const [isMicOn, setIsMicOn] = useState(controlls.onMic)
    const [isVideoOn, setIsVideoOn] = useState(controlls.onVideo)
    return (
        <div className={`${styles.manageAccountBar}`}>
            <div className={`${styles.manageAccountHead}`}>
                <div>Host controls</div>
                <button onClick={() => {
                    hide()
                }}>
                    <img src="/images/svg/vctool/close.svg" />
                </button>
            </div>

            <div className={`${styles.manageAccountScreen}`}>
                <div className={`${styles.manageAccountScreenHeading}`}>LET EVERYONE</div>
                <div className={`${styles.hostControlls}`}>
                    <div>Turn on their microphone</div>
                    <SwitchButton
                        inputName="qa_required"
                        isChecked={isMicOn}
                        handleChange={() => {
                            setIsMicOn(!isMicOn)
                            setControlls({
                                ...controlls,
                                onMic: isMicOn
                            })
                        }}
                    />
                </div>
                <div className={`${styles.hostControlls}`}>
                    <div>Turn on their vidoe</div>
                    <SwitchButton
                        inputName="qa_required"
                        isChecked={isVideoOn}
                        handleChange={() => {
                            setIsVideoOn(!isVideoOn)
                            setControlls({
                                ...controlls,
                                onVideo: isVideoOn
                            })
                        }}
                    />
                </div>
                <div className={`${styles.hostControlls}`}>
                    <div>Share their screen</div>
                    <SwitchButton
                        inputName="qa_required"
                    />
                </div>
                <div className={`${styles.hostControlls}`}>
                    <div>Post questions to Q & A </div>
                    <SwitchButton
                        inputName="qa_required"
                    />
                </div>
                <div className={`${styles.hostControlls}`}>
                    <div>Post messages in chat</div>
                    <SwitchButton
                        inputName="qa_required"
                    />
                </div>


            </div>
        </div>
    )
};
export default ManageAccount;