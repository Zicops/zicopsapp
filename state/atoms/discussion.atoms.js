import { discussionData , replyData } from '@/components/CourseBody/CourseBodyDiscussion/discussion.helper';
import { atom } from 'recoil';

export const MessageAtom = atom({
  key: 'message',
  default: []
});
export const ReplyAtom = atom({
  key: 'reply',
  default: []
});

export const DiscussionMessageAtom = atom({
  key: 'singleMessage',
  default: getMesaageObj()
});
export const DiscussionReplyAtom = atom({
  key: 'singleObject',
  default: getMesaageObj()
});

export function getMesaageObj(data = {}) {
  return {
    CourseId: data?.id || '',
    IsAnonymous: data?.isAnonymous || false,
    IsAnnouncement: data?.isAnnouncement || false,
    ReplyId: data?.reply || "",
    user: {
      id: data?.user || '',
      first_name: data?.first_name || '',
      photo_url: data?.photo_url || 'https://www.w3schools.com/howto/img_avatar2.png',
      role: data?.role || 'Learner'
    },
    Time: data?.time || 1671197332,
    Content: data?.content || '', 
    currentTopic: {
      Module: data?.module || '',
      Chapter: data?.chapter || '',
      Topic: data?.topic || '',
      Time: data?.time || '20:15'
    },
    Likes: data?.likes || [],
    Dislike: data?.dislike || [],
    IsPinned: data?.isPinned || false,
    ReplyCount: data?.replyCount || 0
  };
}

