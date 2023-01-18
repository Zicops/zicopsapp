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
    Time: data?.time || '20:15',
    Content: data?.content || '', 
    Module: data?.module || '',
    Chapter: data?.chapter || '',
    Topic: data?.topic || '',
    Likes: data?.likes || [],
    Dislike: data?.dislike || [],
    IsPinned: data?.isPinned || false,
    ReplyCount: data?.replyCount || 0
  };
}

