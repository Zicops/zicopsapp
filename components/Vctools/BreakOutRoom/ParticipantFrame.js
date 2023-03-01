import { breakoutRoomselectedparticipant } from "@/state/atoms/vctool.atoms";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styles from "../vctoolMain.module.scss"
const ParticipantFrame=({frameName})=>
{

    const [checked,setchecked]=useState(true)
    var [breakoutRoomselectedparticipantarr,setbreakoutRoomselectedparticipantarr]=useRecoilState(breakoutRoomselectedparticipant)
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
            setbreakoutRoomselectedparticipantarr([...breakoutRoomselectedparticipantarr,frameName])
        }
        else
        {
            // let datas=breakoutRoomselectedparticipantarr.indexOf(frameName)
                   breakoutRoomselectedparticipantarr.forEach((data,index)=>
            {
                if(breakoutRoomselectedparticipantarr[index]===frameName)
                {
                 setbreakoutRoomselectedparticipantarr(breakoutRoomselectedparticipantarr.filter((removeData,removeIndex)=>
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