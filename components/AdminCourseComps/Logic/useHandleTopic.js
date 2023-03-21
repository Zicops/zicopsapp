import { useEffect, useState } from 'react';
import { getTopicDataObj } from './adminCourseComps.helper';

export default function useHandleTopic(topic) {
  const [topicData, setTopicData] = useState(getTopicDataObj());
  const [editTopic, setEditTopic] = useState(getTopicDataObj());

  if (topic?.id && topic?.id !== topicData?.id) setTopicData(getTopicDataObj(topic));

  return { topicData, editTopic, setEditTopic };
}
