import { breakoutRoomselectedparticipant, particiantPopup, vctoolAlluserinfo } from "@/state/atoms/vctool.atoms";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styles from "../vctoolMain.module.scss"
import ParticipantFrame from "./ParticipantFrame";
const AddParticipantpopup = ({ presetRoom, totalRooms,autoAssignRoom }) => {
    const [isRoom, setisRoom] = useRecoilState(particiantPopup)
    const participantName=useRecoilValue(vctoolAlluserinfo)
    const breakoutRoomselectedparticipantarr=useRecoilValue(breakoutRoomselectedparticipant)
  
    return (
        <div className={`${styles.addParticipantpopup}`}>
            <div className={`${styles.addParticipantpopuphead}`}>Add participants-Room ({presetRoom}/{totalRooms})</div>
            <div className={`${styles.addParticipantsubhead}`}>
                <div>Selected Participants</div>
                <p>({breakoutRoomselectedparticipantarr?.length ?? ""})</p>
            </div>
            <div className={`${styles.addParticipantpopupscreen}`}>
           {
              participantName.map((data)=>
              { 
                return (data?.role!=="moderator")&& <ParticipantFrame frameName={data.displayName}/>
              })
           }
            </div>
            <div className={`${styles.addParticipantbtn}`}>
                <button className={`${styles.addParticipantbtn1}`} onClick={() => {
                    setisRoom({
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