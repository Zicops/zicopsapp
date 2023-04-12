import { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  ActiveCourseDataAtom,
  CourseTopicContentAtomFamily,
  CourseTopicsAtomFamily,
  UserTopicProgressDataAtom,
} from '../atoms/learnerCourseComps.atom';

export default function useHandleTopicProgress() {
  const containerRef = useRef();
  const [activeCourseData, setActiveCourseData] = useRecoilState(ActiveCourseDataAtom);
  const topicData = useRecoilValue(CourseTopicsAtomFamily(activeCourseData?.topicId));
  const topicContent = useRecoilValue(CourseTopicContentAtomFamily(activeCourseData?.topicId));
  const topicProgressData = useRecoilValue(UserTopicProgressDataAtom);

  const currentTopicContentId = activeCourseData?.topicContentId || topicContent?.[0]?.id;
  const selectedTopicContent =
    topicContent?.find((tc) => tc?.id === activeCourseData?.topicContentId) || {};

  // set other data if only topic id is set
  useEffect(() => {
    if (!activeCourseData?.topicId) return;
    if (!topicData) return;

    const _activeData = structuredClone(activeCourseData);
    const { moduleId, chapterId, topicContentId, language, subTitle } = _activeData;
    const { contentUrl, language: selectedLang, subTitleUrl } = selectedTopicContent;
    const { chapterId: selectedChapId, moduleId: selectedModId } = topicData;

    if (!topicContentId) return;

    if (!!currentTopicContentId && topicContentId !== currentTopicContentId)
      _activeData.topicContentId = currentTopicContentId;
    if (!!selectedChapId && chapterId !== selectedChapId) _activeData.chapterId = selectedChapId;
    if (!!selectedModId && moduleId !== selectedModId) _activeData.moduleId = selectedModId;
    if (!!selectedLang && language !== selectedLang) _activeData.language = selectedLang;
    if (!!subTitleUrl?.[0]?.url && subTitle?.url !== subTitleUrl?.[0]?.url)
      _activeData.subTitle = subTitleUrl;

    setActiveCourseData(_activeData);
  }, [activeCourseData?.topicId, currentTopicContentId, selectedTopicContent]);

  const currentTopicProgress = topicProgressData?.find(
    (progress) => progress?.topicId === activeCourseData?.topicId,
  );
  const videoStartTime =
    (selectedTopicContent?.duration * currentTopicProgress?.videoProgress) / 100;

  return { containerRef, selectedTopicContent, currentTopicProgress, videoStartTime };
}
