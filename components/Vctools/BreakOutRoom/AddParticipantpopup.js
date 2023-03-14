import { breakoutRoomselectedparticipant, particiantPopup, vctoolAlluserinfo } from "@/state/atoms/vctool.atoms";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styles from "../vctoolMain.module.scss"
import ParticipantFrame from "./ParticipantFrame";
const AddParticipantpopup= ({ presetRoom, totalRooms,autoAssignRoom }) => {
    const [isRoom, setIsRoom] = useRecoilState(particiantPopup)
    const participantName=useRecoilValue(vctoolAlluserinfo)
    const breakoutRoomSelectedParticipantArr=useRecoilValue(breakoutRoomselectedparticipant)
  
    return (
        <div className={`${styles.addParticipantPopup}`}>
            <div className={`${styles.addParticipantPopupHead}`}>Add participants-Room ({presetRoom}/{totalRooms})</div>
            <div className={`${styles.addParticipantSubHead}`}>
                <div>Selected Participants</div>
                <p>({breakoutRoomSelectedParticipantArr?.length || 0 })</p>
            </div>
            <div className={`${styles.addParticipantPopupScreen}`}>
           {
              participantName.map((data)=>
              { 
                return (data?.role!=="moderator")&& <ParticipantFrame frameName={data?.displayName}/>
              })
           }
            </div>
            <div className={`${styles.addParticipantbtn}`}>
                <button className={`${styles.addParticipantbtn1}`} onClick={() => {
                    setIsRoom({
                        roomId: "",
                        isRoom: false
                    })
                }}>cancel</button>
                <button className={`${styles.addParticipantbtn2}`}onClick={()=>
                {
                    autoAssignRoom()
                }}>Add</button>
            </div>
        </div>

    )
};
export default AddParticipantpopup;