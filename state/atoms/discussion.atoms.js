import { discussionData , replyData } from '@/components/CourseBody/CourseBodyDiscussion/discussion.helper';
import { atom } from 'recoil';

export const MessageAtom = atom({
  key: 'message',
  default: discussionData?.messages
});
export const ReplyAtom = atom({
  key: 'reply',
  default: replyData
});

export const DiscussionMessageAtom = atom({
  key: 'singleMessage',
  default: getMesaageObj()
});

export function getMesaageObj(data = {}) {
  return {
    id: data?.id || '',
    isAnonymous: data?.isAnonymous || false,
    isAnnouncement: data?.isAnnouncement || false,
    replyId: data?.reply || "",
    user: {
      id: data?.user || '',
      first_name: data?.first_name || '',
      photo_url: data?.photo_url || 'https://www.w3schools.com/howto/img_avatar2.png'
    },
    time: data?.time || 1671197332,
    content: { text: data?.text || '', image: data?.image || [] },
    currentTopic: {
      module: data?.module || '',
      chapter: data?.chapter || '',
      topic: data?.topic || '',
      time: data?.time || '20:15'
    },
    like: data?.like || [],
    unlike: data?.unlike || [],
    isPinned: data?.isPinned || false,
    reply: data?.reply || 0
  };
}

export const DiscussionReplyAtom = atom({
  key: 'singleObject',
  default: {}
});
