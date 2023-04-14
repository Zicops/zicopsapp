import SwitchButton from "@/components/common/FormComponents/SwitchButton";
import { ClassRoomFlagsInput, vcModeratorControlls } from "@/state/atoms/vctool.atoms";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styles from "../vctoolMain.module.scss"
import { collection, onSnapshot } from "firebase/firestore";
import useLoadClassroomData from "../Logic/useLoadClassroomData";
const ManageAccount = ({ hide }) => {
    const {addUpdateClassRoom}=useLoadClassroomData();
    const [controlls, setControlls] = useRecoilState(ClassRoomFlagsInput);

    useEffect(()=>
    {
        console.log(controlls)
    },[controlls])
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
                        isChecked={controlls?.is_trainer_joined}
                        handleChange={() => {
                            setControlls({
                                ...controlls,
                                is_trainer_joined:!controlls?.is_trainer_joined
                            })
                            // addUpdateClassRoom()
                        }}
                    />
                </div>
                <div className={`${styles.hostControlls}`}>
                    <div>Turn on their video</div>
                    <SwitchButton
                        inputName="qa_required"
                        isChecked={''}
                        handleChange={() => {
                           
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