import { COURSE_TOPIC_STATUS, COURSE_TOPIC_TYPES } from '@/helper/constants.helper';

export function getTopicCardImages(type) {
  if (type === COURSE_TOPIC_TYPES.lab) return '/images/PDF-icon.png';
  if (type === COURSE_TOPIC_TYPES.assessment) return '/images/Rectangle 55 (1).png';
  if (type === COURSE_TOPIC_TYPES.content) return '/images/Rectangle 55.png';
  if (type === COURSE_TOPIC_TYPES.classroom) return '/images/Rectangle 55 (2).png';

  return '/images/Rectangle 55 (3).png';
}

export function getCourseCompletePercent(allTopicProgress = []) {
  const topicsCompleted = allTopicProgress?.reduce((total, topicProgress) => {
    if (topicProgress?.status === COURSE_TOPIC_STATUS.completed) total += 1;

    return total;
  }, 0);

  const courseCompletePercent = (topicsCompleted * 100) / allTopicProgress?.length;

  return courseCompletePercent;
}
