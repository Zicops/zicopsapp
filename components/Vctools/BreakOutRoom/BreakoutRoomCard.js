import { breakoutList, breakoutRoomId } from "@/state/atoms/vctool.atoms";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styles from "../vctoolMain.module.scss"
const BreakoutRoomCard = ({ roomNumber, showAddparticipantpopup, roomLength }) => {
    const [cardTitle, setCardTitle] = useState("")
    const [showDropdown, setShowDropdown] = useState(false)
    const [clickedRoomid, setClikcedRoomid] = useRecoilState(breakoutRoomId)
    const breakoutRoomlist = useRecoilValue(breakoutList)
    function showTooltips(title) {
        if (title === "") return <></>
        const obj = cards?.find(data => data?.title === title);
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
            <div className={`${styles.breakoutRoomCard}`}>
                <div className={`${styles.breakoutRoomCardLeft}`}>
                    <div className={`${styles.breakoutRoomCardIcon}`}>
                        <img src='/images/svg/vctool/videocam-on.svg' />
                    </div>
                    <div className={`${styles.breakoutRoomCardLeftHeading}`}>Room {roomNumber} ({roomLength})</div>
                </div>
                <div className={`${styles.breakoutRoomCardRight}`}>
                    <button onClick={() => {
                        setShowDropdown(!showDropdown)
                    }}>
                        {
                            <img src={showDropdown ? "/images/svg/vctool/expand-less.svg" : "/images/svg/vctool/expand-more.svg"} />
                        }
                    </button>
                    <button onClick={() => {
                        cardTitle === "tooltips" ? setCardTitle("") : setCardTitle("tooltips")
                    }}>
                        <img src='/images/svg/vctool/more-horiz.svg' />
                        <>{showTooltips(cardTitle)}</>

                    </button>
                </div>

            </div>
            {
                showDropdown && (
                    <><div className={`${styles.breakoutRoomparticipants}`}>
                        <button onClick={() => {
                            showAddparticipantpopup()
                        }} >Add participants</button>
                        <div className={`${styles.breakoutRoomParticipantHeading}`}>Participants (0)</div>
                        <div className={`${styles.breakoutRoomParticipantScreen}`}>

                        </div>
                    </div></>
                )
            }
        </>
    )
};
export default BreakoutRoomCard;