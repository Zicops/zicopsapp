import { breakoutRoomselectedparticipant } from "@/state/atoms/vctool.atoms";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styles from "../vctoolMain.module.scss"
const ParticipantFrame=({frameName})=>
{

    const [checked,setchecked]=useState(true)
    var [breakoutRoomSelectedParticipantArr,setbreakoutRoomSelectedParticipantArr]=useRecoilState(breakoutRoomselectedparticipant)
    return (
        <div className={`${styles.participantFrame}`}>
         <div>
            <div className={`${styles.participantFrameicon}`}>{frameName.slice(0,2)}</div>
            <div className={`${styles.participantFramename}`}>{frameName}</div>
         </div>
      <input type="checkbox" onClick={()=>
    { setchecked(!checked)

        if(checked)
        {
            setbreakoutRoomSelectedParticipantArr([...breakoutRoomSelectedParticipantArr,frameName])
        }
        else
        {
            // let datas=breakoutRoomSelectedParticipantArr.indexOf(frameName)
                   breakoutRoomSelectedParticipantArr.forEach((data,index)=>
            {
                if(breakoutRoomSelectedParticipantArr[index]===frameName)
                {
                 setbreakoutRoomSelectedParticipantArr(breakoutRoomSelectedParticipantArr.filter((removeData,removeIndex)=>
                 {
                    return removeIndex!==index
                 }))
                }
            })
        }
     
    }}/>
        </div>
    )
};
export default ParticipantFrame;