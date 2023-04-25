import {
  ADD_TO_FIRESTORE_CHAT,
  ADD_UPDATE_CLASSROOM_FLAGS,
  ADD_VCTOOL_POLL,
  UPDATE_VCTOOL_POLL,
  UPDATE_VCTOOL_POLL_RESPONSE,
  notificationClient,
} from '@/api/NotificationClient';
import { GET_TOPIC_CLASSROOM, viltQueryClient } from '@/api/ViltQueries';
import { loadQueryDataAsync, mutateData } from '@/helper/api.helper';
import { sanitizeFormData } from '@/helper/common.helper';
import {
  TopicClassroomAtomFamily,
  getClassroomMasterDataObj,
  getTopicClassroomObject,
} from '@/state/atoms/courses.atom';
import { FcmTokenAtom } from '@/state/atoms/notification.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import {
  ClassRoomFlagsInput,
  vcChatBarAtom,
  vcChatObj,
  vcModeratorControlls,
} from '@/state/atoms/vctool.atoms';
import { useEffect, useState } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';

export default function useLoadClassroomData(topicId = null) {
  const setToastMessage = useRecoilCallback(({ set }) => (message = '', type = 'danger') => {
    set(ToastMsgAtom, { type, message });
  });
  const setTopicClassroom = useRecoilCallback(
    ({ set }) =>
      (topicClassroomData = {}, topicId = null) =>
        set(TopicClassroomAtomFamily(topicId), getTopicClassroomObject(topicClassroomData)),
  );

  const [isLoading, setIsLoading] = useState(null);
  const [messageData, setMessageData] = useState({});

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
      viltQueryClient,
    );
    const _topicClassroom = res?.getTopicClassroom;

    return {
      ..._topicClassroom,
      topicId: _topicClassroom?.topic_id,
      language: _topicClassroom?.language,
      trainingStartTime: _topicClassroom?.training_start_time,
      trainingEndTime: _topicClassroom?.training_end_time,
      isScreenShareEnabled: _topicClassroom?.is_screen_share_enabled,
      isChatEnabled: _topicClassroom?.is_chat_enabled,
      isMicrophoneEnabled: _topicClassroom?.is_microphone_enabled,
      isQaEnabled: _topicClassroom?.is_qa_enabled,
      isCameraEnabled: _topicClassroom?.is_camera_enabled,
      isOverrideConfig: _topicClassroom?.is_override_config,
      createdAt: _topicClassroom?.created_at,
      createdBy: _topicClassroom?.created_by,
      updatedAt: _topicClassroom?.updated_at,
      updatedBy: _topicClassroom?.updated_by,
    };
  }

  async function addUpdateClassRoomFlags(data) {
    const sendData = sanitizeFormData(data);
    mutateData(
      ADD_UPDATE_CLASSROOM_FLAGS,
      sendData,
      { context: { headers: { 'fcm-token': 'notactualtoken' } } },
      notificationClient,
    )
      .then((res) => {
        if (!res?.addClassroomFlags) return setToastMessage('Error changing host controls');
        return;
      })
      .catch(() => setToastMessage('Error changing host controls'));
  }

  async function sendChatMessage(messageData) {
    const sendData = sanitizeFormData(messageData);
    mutateData(
      ADD_TO_FIRESTORE_CHAT,
      sendData,
      { context: { headers: { 'fcm-token': 'notactualtoken' } } },
      notificationClient,
    )
      .then((res) => {
        if (!res?.addMessagesMeet) return setToastMessage('Chat send failed');
        return;
      })
      .catch(() => setToastMessage('Chat send failed'));
  }

  async function addUpdatePolls(pollData) {
    const sendData = sanitizeFormData(pollData);
    const GQL = sendData.pollId ? UPDATE_VCTOOL_POLL : ADD_VCTOOL_POLL;

    mutateData(
      GQL,
      sendData,
      { context: { headers: { 'fcm-token': 'notactualtoken' } } },
      notificationClient,
    )
      .then((res) => {
        if (!sendData.pollId && !res?.addPoll)
          return setToastMessage('Poll could not be created, please try again.');
        if (sendData.pollId && !res?.updatePoll)
          return setToastMessage('Poll could not be updated, please try again.');
        return;
      })
      .catch(() => setToastMessage('Some error occured, please try again.'));
  }

  async function updatePollsResponse(responseData) {
    const sendData = sanitizeFormData(responseData);
    mutateData(
      UPDATE_VCTOOL_POLL_RESPONSE,
      sendData,
      { context: { headers: { 'fcm-token': 'notactualtoken' } } },
      notificationClient,
    )
      .then((res) => {
        if (!res?.updatePollOptions)
          return setToastMessage('Poll response could not be submitted.');
        return setToastMessage('Poll response submitted successfully.', 'success');
      })
      .catch(() => setToastMessage('Poll response could not be submitted.'));
  }

  return {
    isLoading,
    addUpdateClassRoomFlags,
    sendChatMessage,
    addUpdatePolls,
    updatePollsResponse,
  };
}
