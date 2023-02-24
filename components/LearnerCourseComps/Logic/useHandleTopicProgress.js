import { useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  ActiveCourseDataAtom,
  CourseTopicContentAtomFamily,
  UserTopicProgressDataAtom,
} from '../atoms/learnerCourseComps.atom';

export default function useHandleTopicProgress() {
  const containerRef = useRef();
  const [activeCourseData, setActiveCourseData] = useRecoilState(ActiveCourseDataAtom);
  const topicContent = useRecoilValue(CourseTopicContentAtomFamily(activeCourseData?.topicId));
  const topicProgressData = useRecoilValue(UserTopicProgressDataAtom);

  const selectedTopicContent = topicContent?.find(
    (tc) => tc?.id === activeCourseData?.topicContentId,
  );
  const currentTopicProgress = topicProgressData?.find(
    (progress) => progress?.topicId === activeCourseData?.topicId,
  );
  const videoStartTime =
    (selectedTopicContent?.duration * currentTopicProgress?.videoProgress) / 100;

  return { containerRef, selectedTopicContent, currentTopicProgress, videoStartTime };
}
