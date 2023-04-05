import { GET_TOPIC_CLASSROOM, viltQueryClient } from '@/api/ViltQueries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import {
  TopicClassroomAtomFamily,
  getClassroomMasterDataObj,
  getTopicClassroomObject
} from '@/state/atoms/courses.atom';
import { useEffect, useState } from 'react';
import { useRecoilCallback } from 'recoil';

export default function useLoadClassroomData(topicId = null) {
  const setTopicClassroom = useRecoilCallback(
    ({ set }) =>
      (topicClassroomData = {}, topicId = null) =>
        set(TopicClassroomAtomFamily(topicId), getTopicClassroomObject(topicClassroomData))
  );
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    if (!topicId) return;
    setIsLoading(true);

    loadClassRoomData()
      .then((classroomData) => {
        if (!classroomData?.id) return;

        setTopicClassroom(classroomData, topicId);
      })
      .catch((err) => console.log(err, 'at topicClassRoom'))
      .finally(() => setIsLoading(false));
  }, [topicId]);

  async function loadClassRoomData() {
    const res = await loadQueryDataAsync(
      GET_TOPIC_CLASSROOM,
      { topicId: topicId },
      {},
      viltQueryClient
    );
    const _topicClassroom = res?.getTopicClassroom;

    return {
      ..._topicClassroom,
      topicId: _topicClassroom?.topic_id,
      language: _topicClassroom?.language?.split(', '),
      trainingStartTime: _topicClassroom?.training_start_time,
      trainingEndTime: _topicClassroom?.training_end_time,
      isScreenShareEnabled: _topicClassroom?.is_screen_share_enabled,
      isChatEnabled: _topicClassroom?.is_chat_enabled,
      isMicrophoneEnabled: _topicClassroom?.is_microphone_enabled,
      isQaEnabled: _topicClassroom?.is_qa_enabled,
      isCameraEnabled: _topicClassroom?.is_camera_enabled,
      isOverrideConfig: _topicClassroom?.is_override_config,
      language: _topicClassroom?.language?.split(', '),
      createdAt: _topicClassroom?.created_at,
      createdBy: _topicClassroom?.created_by,
      updatedAt: _topicClassroom?.updated_at,
      updatedBy: _topicClassroom?.updated_by
    };
  }

  return { isLoading };
}
