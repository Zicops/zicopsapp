import { atom } from 'recoil';
export const publishBreakoutRoom = atom({
  key: 'publishBreakoutRoom',
  default: {
    isRoomPublished: false,
    publishedRoomArr: [],
  },
});
export const participantJoinData = atom({
  key: 'participantJoinData',
  default: {
    modList: [],
    LearnerList: [],
  },
});
export const joinMeeting = atom({
  key: 'joinMeeting',
  default: false, //check whether meeting is started or not
});

export const ClassRoomFlagsInput = atom({
  key: 'ClassRoomFlagsInput',
  default: {
    id: '',
    is_classroom_started: false,
    is_participants_present: false,
    is_ad_displayed: false,
    is_break: null,
    is_moderator_joined: false,
    is_trainer_joined: false,
    ad_video_url: '',
    is_microphone_enabled: false,
    is_video_sharing_enabled: false,
    is_screen_sharing_enabled: false,
    is_chat_enabled: false,
    is_qa_enabled: false,
    quiz: [],
  },
});

export const vcModeratorControlls = atom({
  key: 'vcModeratorControlls',
  default: {
    onMic: false, //set mic and video on and off
    onVideo: false,
  },
});
export const vcResource = atom({
  key: 'vcResource',
  default: [
    {
      type: '',
      name: '',
      uploadedFile: '',
    },
  ],
});
export const vcMeetingIconAtom = atom({
  key: 'vcMeetingIconAtom',
  default: {
    isModerator: false, // default it is false
    isJoinedAsModerator: false, // default it is false
    isStartAdd: false, // default it is false
  },
});
export const vctoolAlluserinfo = atom({
  //for storing all the room data
  key: 'vctollInfo',
  default: [],
});
export const breakoutList = atom({
  //stores the list of breakoutRooms
  key: 'breakoutlist',
  default: [],
});

export const totalRoomno = atom({
  //use to create any number of breakout rooms if default is one then total breakout rooms are 1
  key: 'totalRooms',
  default: 1,
});

export const particiantPopup = atom({
  key: 'participantpopup', //use to show and hide participant list popup
  default: {
    roomId: '',
    isRoom: false,
  },
});

export const allPartcipantinfo = atom({
  //  use to display present room number and total rooms  numbers
  key: 'allPartcipantinfo',
  default: {
    totalRoomno: 0,
    presentRoom: 0,
  },
});
export const breakoutRoomselectedparticipant = atom({
  key: 'breakoutRoomselectedparticipant',
  default: [],
});
export const breakoutRoomId = atom({
  key: 'breakoutRoomId',
  default: '',
});

export const pollArray = atom({
  key: 'pollArray',
  default: [
    {
      id: '',
      meetingId: '',
      courseId: '',
      topicId: '',
      pollName: '',
      pollQuestion: '',
      pollOptions: [],
      status: '',
    },
  ],
});
export const vcActivePoll = atom({
  key: 'vcActivePoll',
  default: [],
});
export const vcEndedPoll = atom({
  key: 'vcEndedPoll',
  default: [],
});
export const participantPoll = atom({
  key: 'participantPoll',
  default: {
    savedPoll: [],
    endedPoll: [],
  },
});

export const quizArray = atom({
  key: 'quizArray',
  default: [
    {
      quizName: '',
      quizQuestion: '',
      difficultyLevel: 1,
      hint: '',
      options: {
        option1: '',
        option2: '',
        option3: '',
        option4: '',
      },
      answer: '',
    },
  ],
});
export const particiapntQuiz = atom({
  key: 'particiapntQuiz',
  default: {
    attemtedQuiz: [],
    unAttemptedQuiz: [],
  },
});
export const activequizArr = atom({
  key: 'activequizArr',
  default: [],
});
export const VcChatMessageAtom = atom({
  key: 'VcChatMessageAtom',
  default: getMesaageObj(),
});
export const VcChatReplyAtom = atom({
  key: 'VcChatReplyAtom',
  default: getMesaageObj(),
});

export const vcChatBarAtom = atom({
  key: 'DiscussionAtom',
  default: [],
});

export const vcChatObj = atom({
  key: 'vcChatObj',
  default: {
    body: '',
    meeting_id: '',
    user_id: '',
    time: null,
  },
});

export function getMesaageObj(data = {}) {
  return {
    CourseId: data?.id || '',
    IsAnonymous: data?.isAnonymous || false,
    IsAnnouncement: data?.isAnnouncement || false,
    ReplyId: data?.reply || '',
    Time: data?.time || '20:15',
    Content: data?.content || '',
    Module: data?.module || '',
    Chapter: data?.chapter || '',
    Topic: data?.topic || '',
    Likes: data?.likes || [],
    Dislike: data?.dislike || [],
    IsPinned: data?.isPinned || false,
    UserId: data?.userId || '',
    ReplyCount: data?.replyCount || 0,
  };
}

export const VcQAMessageAtom = atom({
  key: 'VcQAMessageAtom',
  default: getMesaageObj(),
});
export const VcQAReplyAtom = atom({
  key: 'VcQAReplyAtom',
  default: getMesaageObj(),
});
export const AQChatAtom = atom({
  key: 'AQChatAtom',
  default: [],
});

export const CurrentParticipantDataAtom = atom({
  key: 'CurrentParticipantData',
  default: getCurrentParticipantDataObj(),
});

export function getCurrentParticipantDataObj(data = {}) {
  return {
    avatarURL: data?.avatarURL || null,
    displayName: data?.displayName || '',
    email: data?.email || '',
    formattedDisplayName: data?.formattedDisplayName || '',
    participantId: data?.participantId || '',
    isModerator: data?.isModerator || false,
    isTrainer: data?.isTrainer || false,
  };
}

export const vctoolMetaData = atom({
  key: 'vctoolMetaData',
  default: getVctoolMetaData(),
});

export function getVctoolMetaData(data) {
  return {
    // all roominfo
    allRoomInfo: data?.allRoomInfo || [],

    // breakoutRoom List
    breakoutRoomLIst: data?.breakoutRoomLIst || [],

    //totalRoom counter
    totalRoomNo: data?.totalRoomno || 1,

    //  show and hide participant list popup to join breakout room
    particiantPopup: data?.particiantPopup || {
      roomId: '',
      isRoom: false,
    },
  };
}

export const meetingPageAtom = atom({
  key: 'meetingPageAtom',
  default: false,
});

export const vcToolNavbarState = atom({
  key: 'vcToolNavbarState',
  default: null,
});
