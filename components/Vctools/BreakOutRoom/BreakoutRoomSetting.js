import { totalRoomno } from "@/state/atoms/vctool.atoms";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styles from "../vctoolMain.module.scss"
const BreakoutRoomSetting = ({cancelRoom,listTheroom}) => {
    const totalRoom=useRecoilValue(totalRoomno)
    const [totalRooms, setTotalRooms] = useRecoilState(totalRoomno)
    const reduce = () => {
        if (totalRooms > 1) {
            setTotalRooms(totalRooms - 1)
        }
    }
    const add = () => {
        setTotalRooms(totalRooms+1)
    }
    // /setTotalRooms
    return (
        <>
            <div className={`${styles.breakoutRoomDetails}`}>
                <div className={`${styles.breakoutRoomDetailsHead}`}>CREATE ROOMS</div>

                <div className={`${styles.breakoutRoominputbox}`}>
                    <label className={`${styles.breakoutLable}`}>Number of rooms :</label>
                    <div className={`${styles.breakoutRoomnumbers}`}>
                        <button onClick={reduce}><img src='/images/svg/vctool/remove.svg' /></button>
                        <div>{totalRooms}</div>
                        <button onClick={add}><img src='/images/svg/vctool/add.svg' /></button>
                    </div>
                </div>

                <div className={`${styles.breakoutRoominputbox}`}>
                    <label className={`${styles.breakoutLable}`}>Time limit:</label>
                    <input type="text" placeholder="Select time limit" />

                    <p className={`${styles.roomNoticeText}`}>*this room will close once the training session ends</p>
                </div>

                <div className={`${styles.breakoutRoominputbox}`}>
                    <label className={`${styles.breakoutLable}`}>Participants :</label>

                    <div className={`${styles.participantBreakoutroomsetting}`}>
                        <input type="radio" name="radio" />
                        <p> Assign manually</p>
                    </div>

                    <div className={`${styles.participantBreakoutroomsetting}`}>
                        <input type="radio" name="radio" />
                        <p> Let participants choose room</p>
                    </div>
                </div>
            </div>
            <div className={`${styles.breakoutRoomsaveinfobtn}`}>
                <button className={`${styles.breakoutcancelinfo}`} onClick={()=>
                {
                    cancelRoom()
                }}>cancel</button>
                <button className={`${styles.breakoutsaveinfo}`}onClick={()=>
                {
                    listTheroom()
                }}>save</button>
            </div>
        </>
    )
};
export default BreakoutRoomSetting;