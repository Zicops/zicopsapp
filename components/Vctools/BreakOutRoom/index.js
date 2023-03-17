import { UserStateAtom } from "@/state/atoms/users.atom";
import { breakoutList, participantRole, vctoolAlluserinfo } from "@/state/atoms/vctool.atoms";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styles from "../vctoolMain.module.scss";
import BreakoutRoomSetting from "./BreakoutRoomSetting";
import CreateBreakoutRoom from "./CreateBreakoutRoom";
import ManageRoom from "./ManageRoom";
const BreakoutRoom = ({ showHide = false, createRooms }) => {
    const allUserdata = useRecoilValue(vctoolAlluserinfo)
    const [isModerator, setIsModerator] = useState(true)
    const userdata = useRecoilValue(UserStateAtom)
    const breakoutRoomlist = useRecoilValue(breakoutList)
    const [title1, settitle] = useState("")
    useEffect(() => {

        if ([userData?.email]?.toString()?.includes("@zicops")) {
            setIsModerator(true)
        }
    })
    function showData(titles) {
        if (titles === "") return <>{(breakoutRoomlist.length < 2)? <CreateBreakoutRoom addRoom={() => { settitle("BreakoutRoomSetting") }} />:
        <BreakoutRoomSetting
        cancelRoom={() => {
            if (breakoutRoomlist.length == 1) {
                settitle("CreateBreakoutRoom")
            }
            else {
                settitle("ManageRoom")
            }
        }} listTheroom={() => {
            createRooms()
            settitle("ManageRoom")
        }} 
        />}</>;
        const arr = showComponent.find(data => data?.title === titles)
        return arr.component;
    }

    const showComponent = [
        {
            title: "CreateBreakoutRoom",
            component: (
                <CreateBreakoutRoom
                    addRoom={() => {
                        settitle("BreakoutRoomSetting")
                    }} 
                    />
            )
        },
        {
            title: "BreakoutRoomSetting",
            component: (
                <BreakoutRoomSetting
                    cancelRoom={() => {
                        if (breakoutRoomlist.length == 1) {
                            settitle("CreateBreakoutRoom")
                        }
                        else {
                            settitle("ManageRoom")
                        }
                    }} listTheroom={() => {
                        createRooms()
                        settitle("ManageRoom")
                    }} 
                    />
            )
        },
        {
            title: "ManageRoom",
            component: (
                <ManageRoom
                    addAgain={() => {
                        settitle("BreakoutRoomSetting")
                    }} 
                     />
            )
        }
    ]
    const userData = useRecoilValue(UserStateAtom)
    return (
        <>
            <div className={`${styles.breakoutRoombar}`}>
                <div className={`${styles.breakoutHead}`}>
                    <div>Breakout Rooms</div>
                    <button onClick={() => {
                        showHide()
                    }}>
                        <img src="/images/svg/vctool/close.svg" />
                    </button>
                </div>
                <div className={`${styles.breakoutRoomscreen}`}>
                    {
                        isModerator ? (<>{showData(title1)}</>) : <h1>not moderator</h1>
                    }
                </div>
            </div>
        </>
    )
};
export default BreakoutRoom;