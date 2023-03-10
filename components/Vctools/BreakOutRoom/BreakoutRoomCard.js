import { breakoutList, breakoutRoomId } from "@/state/atoms/vctool.atoms";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styles from "../vctoolMain.module.scss"
const BreakoutRoomCard = ({ num,showAddparticipantpopup ,roomLength}) => {
    const [cardTitle, setcardTitle] = useState("")
    const [showDropdown, setshowDropdown] = useState(false)
    const [clickedRoomid,setclikcedRoomid]=useRecoilState(breakoutRoomId)
    const breakoutRoomlist=useRecoilValue(breakoutList)
    function showTooltips(title) {
        if (title === "") return <></>
        const obj = cards?.find(data => data.title === title);
        return obj.components;
    }
    const cards = [{
        title: "tooltips",
        components: (
            <div className={`${styles.BreakoutRoomtootips}`}>
                <button>Rename room</button>
                <button>Delete room</button>
                <button>Publish room</button>
            </div>
        )
    }]
    return (
        <>
            <div className={`${styles.breakoutRoomcard}`}>
                <div className={`${styles.breakoutRoomcardleft}`}>
                    <div className={`${styles.breakoutRoomcardicon}`}>
                        <img src='/images/svg/vctool/videocam-on.svg' />
                    </div>
                    <div className={`${styles.breakoutRoomcardleftheading}`}>Room {num} ({roomLength})</div>
                </div>
                <div className={`${styles.breakoutRoomcardright}`}>
                    <button onClick={() => {
                        setshowDropdown(!showDropdown)
                    }}>
                        {
                            showDropdown ? <img src="/images/svg/vctool/expand-less.svg" />
                                : <img src='/images/svg/vctool/expand-more.svg' />
                        }
                    </button>
                    <button onClick={() => {
                        cardTitle === "tooltips" ? setcardTitle("") : setcardTitle("tooltips")
                    }}>
                        <img src='/images/svg/vctool/more-horiz.svg' />
                        <>{showTooltips(cardTitle)}</>

                    </button>
                </div>

            </div>
            {
                showDropdown && (
                    <><div className={`${styles.breakoutRoomparticipants}`}>
                        <button onClick={()=>{
                            showAddparticipantpopup()
                            console.log(clickedRoomid)
                        }} >Add participants</button>
                        <div className={`${styles.breakoutRoomparticipantheading}`}>Participants (0)</div>
                        <div className={`${styles.breakoutRoomparticipantscreen}`}>

                        </div>
                    </div></>
                )
            }
        </>
    )
};
export default BreakoutRoomCard;