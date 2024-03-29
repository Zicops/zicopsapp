import { TOPIC_CONTENT_TYPES } from '@/constants/course.constants';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { filterTopicContent } from '../../../../helper/data.helper';
import {
  getTopicContentObject,
  getTopicVideoObject,
  TopicContentAtom,
  TopicVideoAtom,
  uploadStatusAtom
} from '../../../../state/atoms/module.atoms';
import { ToastMsgAtom } from '../../../../state/atoms/toast.atom';

export default function useAddTopicContent(topic) {
  // recoil state
  const [topicContent, addTopicContent] = useRecoilState(TopicContentAtom);
  const [topicVideo, addTopicVideo] = useRecoilState(TopicVideoAtom);
  const [uploadStatus, updateUploadStatus] = useRecoilState(uploadStatusAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  // local state
  const [newTopicContent, setNewTopicContent] = useState(
    getTopicContentObject({ topicId: topic?.id, moduleId: topic?.moduleId })
  );
  const [newTopicVideo, setNewTopicVideo] = useState(
    getTopicVideoObject({ courseId: topic?.courseId })
  );
  const [isTopicContentFormVisible, setIsTopicContentFormVisible] = useState(false);
  const [isAddTopicContentReady, setIsAddTopicContentReady] = useState(false);

  useEffect(() => {
    updateUploadStatus(null);
  }, []);

  // disable add button if data is incomplete
  useEffect(() => {
    const isContentPresent = ['SCORM']?.includes(newTopicContent?.type)
      ? !!newTopicVideo.file || !!newTopicVideo?.contentUrl
      : !!newTopicVideo?.file;

    setIsAddTopicContentReady(
      !!newTopicContent.language &&
        !!newTopicContent.type &&
        !!isContentPresent &&
        !!+newTopicContent?.duration
    );
  }, [newTopicContent, newTopicVideo]);

  useEffect(() => {
    if (!isTopicContentFormVisible) return;
    if (topicContent?.[0]?.type !== TOPIC_CONTENT_TYPES.document) return;

    setNewTopicContent(
      getTopicContentObject({
        ...newTopicContent,
        duration: topicContent?.[0]?.duration,
        type: TOPIC_CONTENT_TYPES.document
      })
    );
  }, [isTopicContentFormVisible]);
  // add topic id
  useEffect(() => {
    const isDefault = filterTopicContent(topicContent, topic?.id).length === 0;
    setNewTopicContent(
      getTopicContentObject({
        topicId: topic?.id,
        is_default: isDefault,
        moduleId: topic?.moduleId
      })
    );
    setNewTopicVideo(getTopicVideoObject({ courseId: topic?.courseId }));
  }, [topic]);

  function toggleTopicContentForm(value) {
    if (typeof value === 'boolean') return setIsTopicContentFormVisible(value);

    setIsTopicContentFormVisible(!isTopicContentFormVisible);
  }

  // input handler
  function handleTopicContentInput(e, inputName = null) {
    // language needs to be unique
    if (inputName) {
      if (inputName === 'language') {
        const isLanguagePresent = topicContent.some((content) => content.language === e.value);

        if (isLanguagePresent)
          return setToastMsg({
            type: 'danger',
            message: `Topic Content already added in language ${e.value}`
          });
      }

      if (inputName === 'type') {
        setNewTopicVideo({ ...newTopicVideo, file: null });
        setNewTopicContent({ ...newTopicContent, [inputName]: e.value, duration: 0 });
        return;
      }

      if (inputName === 'language') setNewTopicVideo({ ...newTopicVideo, language: e.value });
      return setNewTopicContent({ ...newTopicContent, [inputName]: e.value });
    }

    if (e.target.type === 'checkbox') {
      setNewTopicContent({ ...newTopicContent, [e.target.name]: e.target.checked });
      return;
    }

    setNewTopicContent({ ...newTopicContent, [e.target.name]: e.target.value });
  }

  // video input
  function handleTopicVideoInput(e) {
    if (!e.target.files?.length) {
      setNewTopicVideo({ ...newTopicVideo, file: null });
      setNewTopicContent({ ...newTopicContent, duration: 0 });
      return;
    }

    const video = document.createElement('video');
    let duration = 0;
    video.src = URL.createObjectURL(e.target.files[0]);
    video.preload = 'metadata';
    video.onloadedmetadata = function () {
      window.URL.revokeObjectURL(video.src);
      duration = video.duration;

      const variable_buffer_time = 2;
      const filteredTopicContent = filterTopicContent(topicContent, topic?.id);
      if (filteredTopicContent.length) {
        const prevUploadDuration = filteredTopicContent[0].duration;
        // console.log(
        //   prevUploadDuration + variable_buffer_time,
        //   prevUploadDuration - variable_buffer_time,
        //   duration
        // );
        // 6 < 4 < 2
        if (
          prevUploadDuration + variable_buffer_time <= duration ||
          prevUploadDuration - variable_buffer_time >= duration
        ) {
          e.target.value = null;
          setToastMsg({ type: 'danger', message: 'Video Length Should be same for all videos!!' });
          return setNewTopicVideo({ ...newTopicVideo, file: null });
        }
      }

      setNewTopicContent({ ...newTopicContent, duration: parseInt(duration) });
      setNewTopicVideo({ ...newTopicVideo, file: e.target.files[0] });
    };
  }

  // save in recoil state
  function addNewTopicContent() {
    if (newTopicVideo?.contentUrl) {
      try {
        new URL(newTopicVideo?.contentUrl);
      } catch (err) {
        return setToastMsg({ type: 'danger', message: 'Url is not valid' });
      }
    }

    const isDefault = newTopicContent.is_default;
    let topicContentArr = [];
    // set is_default to false of every topic content if current is true
    if (isDefault) {
      topicContent.forEach((content) => {
        const updatedContent = {
          ...content,
          is_default: false
        };
        topicContentArr.push(updatedContent);
      });

      topicContentArr.push(newTopicContent);
    } else {
      topicContentArr = [...topicContent, newTopicContent];
    }

    // save in recoil state
    addTopicContent(topicContentArr);
    addTopicVideo([...topicVideo, newTopicVideo]);

    setIsTopicContentFormVisible(false);

    // reset local state
    setNewTopicContent(getTopicContentObject({ topicId: topic?.id, moduleId: topic?.moduleId }));
    setNewTopicVideo(getTopicVideoObject({ courseId: topic?.id }));
  }

  const inputHandlers = {
    handleTopicContentInput,
    handleTopicVideoInput
  };
  const localStates = {
    newTopicContent,
    newTopicVideo,
    setNewTopicContent,
    setNewTopicVideo
  };

  return {
    localStates,
    isTopicContentFormVisible,
    setNewTopicContent,
    toggleTopicContentForm,
    inputHandlers,
    addNewTopicContent,
    isAddTopicContentReady
  };
}
