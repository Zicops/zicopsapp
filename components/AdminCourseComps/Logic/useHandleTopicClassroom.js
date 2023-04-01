import {
  CREATE_TOPIC_CLASSROOM,
  UPDATE_TOPIC_CLASSROOM,
  viltMutationClient
} from '@/api/ViltMutations';
import { GET_TOPIC_CLASSROOM, viltQueryClient } from '@/api/ViltQueries';
import { TOPIC_CLASS_ROOM_STATUS } from '@/constants/course.constants';
import { loadQueryDataAsync, mutateData } from '@/helper/api.helper';
import { sanitizeFormData } from '@/helper/common.helper';
import { getDateObjFromUnix, getUnixFromDate } from '@/helper/utils.helper';
import {
  ClassroomMasterAtom,
  getTopicClassroomObject,
  TopicClassroomAtom
} from '@/state/atoms/courses.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useEffect, useState } from 'react';
import { useRecoilCallback, useRecoilState } from 'recoil';

export default function useHandleTopicClassroom(topData = null) {
  const [topicClassroom, setTopicClassroom] = useRecoilState(TopicClassroomAtom);
  const [classroomMaster, setClassroomMaster] = useRecoilState(ClassroomMasterAtom);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(null);
  const [accordionOpenState, setAccordionOpenState] = useState(null);
  const setToastMessage = useRecoilCallback(({ set }) => (message = '', type = 'danger') => {
    set(ToastMsgAtom, { type, message });
  });

  // reset state after some time
  useEffect(() => {
    if (accordionOpenState == null) return;

    setTimeout(() => setAccordionOpenState(null), 100);
  }, [accordionOpenState]);

  // reset data
  useEffect(() => {
    setTopicClassroom(getTopicClassroomObject());
  }, []);

  // load topic classroom data
  useEffect(() => {
    if (!topData?.id) return;
    if (topData?.id === topicClassroom?.topicId) return;

    loadQueryDataAsync(GET_TOPIC_CLASSROOM, { topicId: topData?.id }, {}, viltQueryClient).then(
      (res) => {
        const _topicClassroom = res?.getTopicClassroom;

        const moderatorsList = structuredClone(classroomMaster?.moderators || []);
        const trainersList = structuredClone(classroomMaster?.trainers || []);

        const trainers = trainersList?.filter((u) =>
          _topicClassroom?.trainers?.find((userId) => u?.user_id === userId)
        );
        const moderators = moderatorsList?.filter((u) =>
          _topicClassroom?.moderators?.find((userId) => u?.user_id === userId)
        );

        setTopicClassroom(
          getTopicClassroomObject({
            ..._topicClassroom,
            trainers,
            moderators,
            topicId: _topicClassroom?.topic_id,
            trainingStartTime: getDateObjFromUnix(_topicClassroom?.training_start_time),
            trainingEndTime: getDateObjFromUnix(_topicClassroom?.training_end_time),
            isScreenShareEnabled: _topicClassroom?.is_screen_share_enabled,
            isChatEnabled: _topicClassroom?.is_chat_enabled,
            isMicrophoneEnabled: _topicClassroom?.is_microphone_enabled,
            isQaEnabled: _topicClassroom?.is_qa_enabled,
            isCameraEnabled: _topicClassroom?.is_camera_enabled,
            isOverrideConfig: _topicClassroom?.is_override_config,
            language: _topicClassroom?.language?.length ? [_topicClassroom?.language]:[],
            createdAt: _topicClassroom?.created_at,
            createdBy: _topicClassroom?.created_by,
            updatedAt: _topicClassroom?.updated_at,
            updatedBy: _topicClassroom?.updated_by
          })
        );
      }
    );
  }, [topicClassroom?.topicId]);

  function handleTopicClassroomChange(toBeUpdatedKeyValue = {}) {
    const duration = toBeUpdatedKeyValue?.duration || topicClassroom?.duration || 0;
    const startTime = toBeUpdatedKeyValue?.trainingStartTime || topicClassroom?.trainingStartTime;

    const _updatedValue = { ...(toBeUpdatedKeyValue || {}) };

    if (startTime) {
      const endTime = new Date(startTime);
      endTime.setSeconds(duration);

      _updatedValue.trainingEndTime = endTime;
    }

    setTopicClassroom((prev) => ({ ...prev, ..._updatedValue }));
  }

  async function addUpdateTopicClassroom() {
    if (!topData?.id) return;

    const _topicClassroomData = sanitizeFormData({
      topic_id: topData?.id || null,
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

    if (!!topicClassroom?.id) {
      _topicClassroomData.id = topicClassroom?.id;
      const resUpdate = await mutateData(
        UPDATE_TOPIC_CLASSROOM,
        { input: _topicClassroomData },
        {},
        viltMutationClient
      ).catch(() => setToastMessage('Topic classroom Update Error!'));

      setToastMessage('Topic classroom update successfully','success');

      return resUpdate?.updateTopicClassroom || null;
    }

    const res = await mutateData(
      CREATE_TOPIC_CLASSROOM,
      { input: _topicClassroomData },
      {},
      viltMutationClient
    ).catch(() => setToastMessage('Topic classroom Create Error!'));

    setTopicClassroom((prev) => ({ ...prev, id: res?.createTopicClassroom?.id }));
    setToastMessage('Topic classroom added successfully','success');

    return res?.createTopicClassroom || null;
  }

  return {
    isSubmitDisabled,
    accordionOpenState,
    setAccordionOpenState,
    handleTopicClassroomChange,
    addUpdateTopicClassroom
  };
}
