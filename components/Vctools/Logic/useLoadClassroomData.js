import { GET_TOPIC_CLASSROOM, viltQueryClient } from '@/api/ViltQueries';
import { loadAndCacheDataAsync } from '@/helper/api.helper';
import { TopicClassroomFamilyAtom } from '@/state/atoms/courses.atom';
import { useEffect } from 'react';
import { useRecoilCallback } from 'recoil';

export default function useLoadClassroomData(topicId = null) {
  const setClassroomTopicData = useRecoilCallback(
    ({ set }) =>
      (topicId, classroomTopicData) => {
        set(TopicClassroomFamilyAtom(topicId), classroomTopicData);
      },
    []
  );

  useEffect(() => {
    if (!topicId) return;

    loadClassRoomData()
      .then((classroomData) => {
        if (!classroomData?.id) return;

        setClassroomTopicData(topicId, classroomData);
      })
      .catch((err) => console.log(err, 'at topicClassRoom'));
  }, [topicId]);

  async function loadClassRoomData() {
    const res = await loadAndCacheDataAsync(
      GET_TOPIC_CLASSROOM,
      { topicId: topicId },
      {},
      viltQueryClient
    );
    const _topicClassroom = res?.getTopicClassroom;

    return {
      id: _topicClassroom?.id,
      topicId: _topicClassroom?.topic_id,
      trainingStartTime: _topicClassroom?.training_start_time,
      trainingEndTime: _topicClassroom?.training_end_time,
      isScreenShareEnabled: _topicClassroom?.is_screen_share_enabled,
      isChatEnabled: _topicClassroom?.is_chat_enabled,
      isMicrophoneEnabled: _topicClassroom?.is_microphone_enabled,
      isQaEnabled: _topicClassroom?.is_qa_enabled,
      isCameraEnabled: _topicClassroom?.is_camera_enabled,
      isOverrideConfig: _topicClassroom?.is_override_config,
      language: _topicClassroom?.language?.split(', '),
      status: _topicClassroom?.status,
      moderators: _topicClassroom?.moderators,
      trainers: _topicClassroom?.trainers,
      breaktime: _topicClassroom?.breaktime,
      duration: _topicClassroom?.duration
    };
  }
}
