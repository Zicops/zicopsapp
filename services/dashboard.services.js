import { ADD_USER_TOTAL_WATCH_TIME, userClient } from '@/api/UserMutations';
import { mutateData } from '@/helper/api.helper';
import moment from 'moment';

export function addUserWatchTime(
  inputDataObj = {
    courseId: null,
    topicId: null,
    userId: null,
    time: 15,
    category: '',
    subCategories: [],
  },
) {
  if (!inputDataObj?.courseId) return null;
  if (!inputDataObj?.topicId) return null;
  if (!inputDataObj?.userId) return null;
  if (!inputDataObj?.time) return null;

  mutateData(
    ADD_USER_TOTAL_WATCH_TIME,
    {
      input: {
        course_id: inputDataObj?.courseId,
        category: inputDataObj?.category || '',
        sub_categories: inputDataObj?.subCategories || [],
        topic_id: inputDataObj?.topicId,
        user_id: inputDataObj?.userId,
        time: +inputDataObj?.time || 15,
        date: moment().format('YYYY-MM-DD'),
      },
    },
    {},
    userClient,
  );
}
