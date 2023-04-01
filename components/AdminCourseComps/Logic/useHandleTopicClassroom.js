import { CREATE_TOPIC_CLASSROOM, UPDATE_TOPIC_CLASSROOM, viltMutationClient } from '@/api/ViltMutations';
import { TOPIC_CLASS_ROOM_STATUS } from '@/constants/course.constants';
import { mutateData } from '@/helper/api.helper';
import { sanitizeFormData } from '@/helper/common.helper';
import { getUnixFromDate } from '@/helper/utils.helper';
import { ClassroomMasterAtom, TopicClassroomAtom } from '@/state/atoms/courses.atom';
import { useRecoilState } from 'recoil';

export default function useHandleTopicClassroom() {
  const [topicClassroom, setTopicClassroom] = useRecoilState(TopicClassroomAtom);
  const [classroomMaster, setClassroomMaster] = useRecoilState(ClassroomMasterAtom);

  async function addUpdateTopicClassroom(topicId = null) {
    if (!topicId) return;
    const _topicClassroomData = sanitizeFormData({
      topic_id: topicId || null,
      trainers: classroomMaster?.trainers?.map((data) => data?.user_id || data) || [],
      moderators: classroomMaster?.moderators?.map((data) => data?.user_id || data) || [],
      training_start_time: getUnixFromDate(topicClassroom?.trainingStartTime),
      training_end_time: getUnixFromDate(topicClassroom?.trainingEndTime),
      duration: topicClassroom?.duration,
      breaktime: topicClassroom?.breaktime || '10',
      language: topicClassroom?.language?.join(', '),
      is_screen_share_enabled: topicClassroom?.isScreenShareEnabled,
      is_chat_enabled: topicClassroom?.isChatEnabled,
      is_microphone_enabled: topicClassroom?.isMicrophoneEnabled,
      is_qa_enabled: topicClassroom?.isQaEnabled,
      is_camera_enabled: topicClassroom?.isCameraEnabled,
      is_override_config: topicClassroom?.isOverrideConfig,
      status: TOPIC_CLASS_ROOM_STATUS?.active
    });

    console.log(_topicClassroomData, 'sendData');

    if (!!topicClassroom?.id) {
      _topicClassroomData.id = topicClassroom?.id;
      const resUpdate = await mutateData(
        UPDATE_TOPIC_CLASSROOM,
        { input: _topicClassroomData },
        {},
        viltMutationClient
      ).catch(() => setToastMessage('Topic classroom Update Error!'));

      return resUpdate?.updateTopicClassroom || null;
    }

    const res = await mutateData(
      CREATE_TOPIC_CLASSROOM,
      { input: _topicClassroomData },
      {},
      viltMutationClient
    ).catch(() => setToastMessage('Topic classroom Create Error!'));

    setTopicClassroom((prev) => ({ ...prev, id: res?.createTopicClassroom?.id }));

    return res?.createTopicClassroom || null;
  }
  function handleTopicClassroomChange(toBeUpdatedKeyValue = {}) {
    // setCourseCurrentState((prev) => ({ ...prev, isSaved: false }));
    setTopicClassroom((prev) => ({ ...prev, ...(toBeUpdatedKeyValue || {}) }));
  }
  return { handleTopicClassroomChange, addUpdateTopicClassroom };
}
