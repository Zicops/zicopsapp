import { GET_COURSE_TOPICS_CONTENT } from '@/api/Queries';
import { loadAndCacheDataAsync } from '@/helper/api.helper';
import { COURSE_TOPIC_TYPES } from '@/helper/constants.helper';
import { sortArrByKeyInOrder } from '@/utils/array.utils';
import { useEffect, useState } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { CourseTopicContentAtomFamily } from '../atoms/learnerCourseComps.atom';

export default function useLoadTopicData(topicId = null, type = COURSE_TOPIC_TYPES.content) {
  const topicContent = useRecoilValue(CourseTopicContentAtomFamily(topicId));
  const addTopicContentToRecoil = useRecoilCallback(({ set }) => (topicContentData, id) => {
    set(CourseTopicContentAtomFamily(id), topicContentData);
  });
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    if (!topicId || topicContent?.length) return;
    if (type !== COURSE_TOPIC_TYPES.content) return;

    loadTopicContent(topicId);
  }, [topicId, topicContent?.length]);

  async function loadTopicContent(topicId = null) {
    if (!topicId) return;
    setIsLoading(true);

    const topicContentRes = loadAndCacheDataAsync(GET_COURSE_TOPICS_CONTENT, { topic_id: topicId });
    const topicContent = sortArrByKeyInOrder(
      (await topicContentRes)?.getTopicContent,
      'is_default',
      false,
    );

    addTopicContentToRecoil(topicContent, topicId);
    setIsLoading(false);
  }

  return { isLoading };
}
