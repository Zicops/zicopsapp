import { allPartcipantinfo, breakoutList, particiantPopup } from "@/state/atoms/vctool.atoms";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styles from "../vctoolMain.module.scss"
import BreakoutRoomCard from "./BreakoutRoomCard";
const ManageRoom = ({ addAgain }) => {
    // breakoutList
    const breakoutLists = useRecoilValue(breakoutList)
    const participantbreakoutpopup = useRecoilValue(particiantPopup)
    const [isParticipantpanel, setisParticipantpanel] = useRecoilState(particiantPopup)
    const [participantBreakoutroompanel, setparticipantBreakoutroompanel] = useRecoilState(particiantPopup)
    const [totalRoomno, settotalRoomno] = useRecoilState(allPartcipantinfo)
    return (
        <>
            <div className={`${styles.manageRooms}`}>
                <div className={`${styles.manageRoomshead}`}>
                    <div>Manage rooms</div>
                    <img src='/images/svg/vctool/campaign.svg' />
                </div>
                <div className={`${styles.manageRoombtns}`}>
                    <button className={`${styles.manageRoombtn1}`} onClick={() => {
                        addAgain()
                    }}>Add Room</button>
                    <button className={`${styles.manageRoombtn2}`}>Publish All</button>
                </div>
                <div className={`${styles.availableRoomcontainerhead}`}>Available rooms</div>
                <div className={`${styles.availableRoomcontainer}`}>
                    {/* all breakout room list comes below */}

                    {
                        breakoutLists.map((data, index) => {
                            return (data.isMainRoom) ?<></>:
// participants
                            <BreakoutRoomCard num={index} showAddparticipantpopup={() => {

                                settotalRoomno({
                                    totalRoomno: breakoutLists.length-1,
                                    presentRoom: index 
                                })
                                
                                setparticipantBreakoutroompanel({
                                    isRoom:!participantbreakoutpopup.isRoom   //toggle between true and false
                                })

                                isParticipantpanel.isRoom===true ? setparticipantBreakoutroompanel({
                                    roomId: "",
                                    isRoom: false
                                }) :
                                    setparticipantBreakoutroompanel({
                                        roomId: "AddParticipantpopup",
                                        isRoom: true
                                    })
                            }} roomLength={data.participants.length}/>
                        })
                    }
                </div>
            </div>
        </>
    )
};
export default ManageRoom;