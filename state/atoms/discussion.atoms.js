import { discussionData } from '@/components/CourseBody/CourseBodyDiscussion/discussion.helper';
import { atom } from 'recoil';

export const DiscussionAtom = atom({
  key: 'discussion',
  default: discussionData?.messages
});