import { atom } from "recoil";
export const vctoolAlluserinfo = atom({   //for storing all the room data
    key: "vctollInfo",
    default: []
});
export const breakoutList = atom({      //stores the list of breakoutRooms
    key: "breakoutlist",
    default: []
})

export const totalRoomno = atom({      //use to create any number of breakout rooms if default is one then total breakout rooms are 1
    key: "totalRooms",
    default: 1
})

export const particiantPopup = atom({
    key: "participantpopup",               //use to show and hide participant list popup
    default: {
        roomId: "",
        isRoom: false
    }
})

export const allPartcipantinfo = atom({    //  use to display present room number and total rooms  numbers
    key: "allPartcipantinfo",
    default: {
        totalRoomno: 0,
        presentRoom: 0
    }
})
export const breakoutRoomselectedparticipant = atom({
    key: "breakoutRoomselectedparticipant",
    default:[]
})
export const breakoutRoomId=atom({
    key:"breakoutRoomId",
    default:''
})
// export const alluserdata = atom({
//     key: "alldata",
//     default: {
//         joinedUserInfo: [],
//         breakoutRoomList: [],
//         totalRoomNo: 1,
//         setParticipantPopup: {
//             roomId: "",
//             isRoom: false
//         },
//         participantNumber: {
//             totalRoomno: 0,
//             presentRoom: 0
//         },
//         breakoutRoomSelectedParticipant:[]
//     }
// })