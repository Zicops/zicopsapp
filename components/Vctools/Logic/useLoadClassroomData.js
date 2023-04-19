import { ADD_TO_FIRESTORE, ADD_UPDATE_CLASSROOM_FLAGS, notificationClient } from '@/api/NotificationClient';
import { GET_TOPIC_CLASSROOM, viltQueryClient } from '@/api/ViltQueries';
import { loadQueryDataAsync, mutateData } from '@/helper/api.helper';
import { sanitizeFormData } from '@/helper/common.helper';
import {
  TopicClassroomAtomFamily,
  getClassroomMasterDataObj,
  getTopicClassroomObject
} from '@/state/atoms/courses.atom';
import { FcmTokenAtom } from '@/state/atoms/notification.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { ClassRoomFlagsInput, vcChatBarAtom, vcChatObj, vcModeratorControlls } from '@/state/atoms/vctool.atoms';
import { useEffect, useState } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';

export default function useLoadClassroomData(topicId = null) {
  const setToastMessage = useRecoilCallback(({ set }) => (message = '', type = 'danger') => {
    set(ToastMsgAtom, { type, message });
  });
  const setTopicClassroom = useRecoilCallback(
    ({ set }) =>
      (topicClassroomData = {}, topicId = null) =>
        set(TopicClassroomAtomFamily(topicId), getTopicClassroomObject(topicClassroomData))
  );
  const [controlls, setControlls] = useRecoilState(ClassRoomFlagsInput);
  const [messageObj, setMessageObj] = useRecoilState(vcChatObj);
  const fcmToken = useRecoilValue(FcmTokenAtom);
  const [isLoading, setIsLoading] = useState(null);
  const [messageData,setMessageData]=useState({})

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
      updatedBy: _topicClassroom?.updated_by
    };
  }

  async function addUpdateClassRoom(e) {
    // add new topic
    const sendData = sanitizeFormData(controlls);
    // console.log(sendData)
    // if (!controlls?.id) {
    //   mutateData(ADD_UPDATE_CLASSROOM_FLAGS, sendData, {}, notificationClient)
    //     .then((res) => {
    //       if (!res?.addUpdateClassroomFlags) return setToastMessage('Update ClassRoom Error');
    //       setControlls(res?.addUpdateClassroomFlags)
    //       return res?.addUpdateClassroomFlags;
    //     })
    //     .catch(() => setToastMessage('Update ClassRoom Error'));
    //   return;
    // } else {
    //   mutateData(ADD_UPDATE_CLASSROOM_FLAGS, sendData, {}, notificationClient)
    //     .then((res) => {
    //       if (!res?.addUpdateClassroomFlags) return setToastMessage('Update ClassRoom');
    //       setControlls(res?.addUpdateClassroomFlags)
    //       return res?.addUpdateClassroomFlags;
    //     })
    //     .catch(() => setToastMessage('Update ClassRoom'));
    // }
  }
  async function addUpdateMessage()
  {
    const sendData = sanitizeFormData(messageData);
    // console.log(messageObj)
        mutateData(ADD_TO_FIRESTORE, sendData, { context: { headers: { 'fcm-token': fcmToken } } }, notificationClient)
        .then((res) => {
          if (!res?.addMessagesMeet) return setToastMessage('add chat Message error');
          return
        })
        .catch(() => setToastMessage('add chat Message error'));
    // ADD_TO_FIRESTORE
  }

  return { isLoading, addUpdateClassRoom ,addUpdateMessage,setMessageData};
}
