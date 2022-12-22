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