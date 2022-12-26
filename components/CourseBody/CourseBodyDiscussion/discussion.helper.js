export const discussionData = {
  messages: [
    {
      id: 3001,
      isAnonymous: false,
      isAnnouncement: false,
       replyId: "",
      user: {
        id: 1001,
        first_name: 'Zicops HR',
        photo_url: 'https://www.w3schools.com/howto/img_avatar2.png'
      },
      time: 1671197332,
      content: { text: 'Welcome to Zicops Learning Technology', image: [] },
      currentTopic: {
        module: 'Module1',
        chapter: 'chapter1',
        topic: 'topic1',
        time: '20:15'
      },
      like: [124, 4524, 4552, 454, 2345],
      unlike: [543, 123, 555],
      isPinned: false,
      reply: 154
    },
    {
      id: 3002,
      isAnonymous: false,
      isAnnouncement: false,
      replyId: "",
      user: {
        id: 1002,
        first_name: 'Zicops Manager',
        photo_url: 'https://www.w3schools.com/howto/img_avatar2.png'
      },
      time: 1671197522,
      content: { text: 'Welcome to Zicops Learning Technology', image: [] },
      currentTopic: {
        module: 'Module2',
        chapter: 'chapter2',
        topic: 'topic1',
        time: '20:15'
      },
      like: [124, 4524, 4552, 454, 2345],
      unlike: [543, 123, 555],
      isPinned: false
    },
    {
      id: 3003,
      isAnonymous: false,
      isAnnouncement: true,
      replyId: "",
      user: {
        id: 1003,
        first_name: 'Zicops Client',
        photo_url: 'https://www.w3schools.com/howto/img_avatar2.png'
      },
      time: 1671197652,
      content: { text: 'Welcome to Zicops Learning Technology', image: [] },
      currentTopic: {
        module: 'Module3',
        chapter: 'chapter1',
        topic: 'topic2',
        time: '20:15'
      },
      like: [124, 4524, 4552, 454, 2345, 587, 558, 563, 789],
      unlike: [543, 123, 555, 4785],
      isPinned: false
    },
    {
      id: 3004,
      isAnonymous: false,
      isAnnouncement: false,
      replyId: "",
      user: {
        id: 1004,
        first_name: 'Zicops HR',
        photo_url: 'https://www.w3schools.com/howto/img_avatar2.png'
      },
      time: 16711973772,
      content: { text: 'Welcome to Zicops Learning Technology', image: [] },
      currentTopic: {
        module: 'Module1',
        chapter: 'chapter2',
        topic: 'topic3',
        time: '20:15'
      },
      like: [124, 4524, 4552, 454, 2345, 1002, 5872, 4587, 3697],
      unlike: [543, 123, 555],
      isPinned: false
    },
    {
      id: 3005,
      isAnonymous: false,
      isAnnouncement: true,
      replyId: "",
      user: {
        id: 1005,
        first_name: 'Zicops Developer',
        photo_url: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png'
      },
      time: 16711973885,
      content: { text: 'Welcome to Zicops Learning Technology', image: [] },
      currentTopic: {
        module: 'Module3',
        chapter: 'chapter1',
        topic: 'topic2',
        time: '20:15'
      },
      like: [124, 4524, 4552, 454, 2345, 963, 458],
      unlike: [543, 123, 555],
      isPinned: false
    }
  ]
};
export const replyData = [
  {
    3001: [
      {
        id: 5001,
        isAnonymous: false,
        replyId: 3001,
        user: {
          id: 1004,
          first_name: 'Zicops HR',
          photo_url: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png'
        },
        time: 1671197362,
        content: { text: 'Welcome to Zicops Learning Technology', image: [] },
        like: [124, 4524, 4552, 454, 2345, 2014, 4587],
        unlike: [543, 123, 555],
        isPinned: false
      },
      {
        id: 5002,
        isAnonymous: false,
        replyId: 3001,
        user: {
          id: 1005,
          first_name: 'Zicops HR',
          photo_url: 'https://www.w3schools.com/howto/img_avatar2.png'
        },
        time: 1671197362,
        content: { text: 'Welcome to Zicops Learning Technology', image: [] },
        like: [124, 4524, 4552, 454, 2345],
        unlike: [543, 123, 555],
        isPinned: false
      },
      {
        id: 5003,
        isAnonymous: false,
        replyId: 3001,
        user: {
          id: 1005,
          first_name: 'Zicops Developer',
          photo_url: 'https://www.w3schools.com/howto/img_avatar2.png'
        },
        time: 1671197362,
        content: { text: 'Welcome to Zicops Learning Technology', image: [] },
        like: [124, 4524, 4552, 454, 2345],
        unlike: [543, 123, 555],
        isPinned: false
      },
      {
        id: 5004,
        isAnonymous: false,
        replyId: 3001,
        user: {
          id: 1005,
          first_name: 'Zicops Manager',
          photo_url: 'https://www.w3schools.com/howto/img_avatar2.png'
        },
        time: 1671197362,
        content: { text: 'Welcome to Zicops Learning Technology', image: [] },
        like: [124, 4524, 4552, 454, 2345],
        unlike: [543, 123, 555],
        isPinned: false
      },
      {
        id: 5005,
        isAnonymous: false,
        replyId: 3001,
        user: {
          id: 1005,
          first_name: 'Zicops Developer',
          photo_url: 'https://www.w3schools.com/howto/img_avatar2.png'
        },
        time: 1671197362,
        content: { text: 'Welcome to Zicops Learning Technology', image: [] },
        like: [124, 4524, 4552, 454, 2345],
        unlike: [543, 123, 555],
        isPinned: false
      }
    ]
  }
];
