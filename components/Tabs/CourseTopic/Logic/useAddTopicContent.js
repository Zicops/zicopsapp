import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { filterTopicContent } from '../../../../helper/data.helper';
import {
  getTopicContentObject,
  getTopicSubtitleObject,
  getTopicVideoObject,
  TopicContentAtom,
  TopicSubtitleAtom,
  TopicVideoAtom,
  uploadStatusAtom
} from '../../../../state/atoms/module.atoms';
import useAddBinge from './useAddBinge';

export default function useAddTopicContent(topic) {
  // recoil state
  const [topicContent, addTopicContent] = useRecoilState(TopicContentAtom);
  const [topicVideo, addTopicVideo] = useRecoilState(TopicVideoAtom);
  const [topicSubtitle, addTopicSubtitle] = useRecoilState(TopicSubtitleAtom);
  const [uploadStatus, updateUploadStatus] = useRecoilState(uploadStatusAtom);
  
  // binge data input handler hook
  const { handleBingeInput } = useAddBinge();

  // local state
  const [newTopicContent, setNewTopicContent] = useState(
    getTopicContentObject({ topicId: topic.id })
  );
  const [newTopicVideo, setNewTopicVideo] = useState(
    getTopicVideoObject({ courseId: topic.courseId })
  );
  const [newTopicSubtitle, setNewTopicSubtitle] = useState(
    getTopicSubtitleObject({ courseId: topic.courseId })
  );
  const [isTopicContentFormVisible, setIsTopicContentFormVisible] = useState(false);
  const [isAddTopicContentReady, setIsAddTopicContentReady] = useState(false);

   useEffect(() => {
     updateUploadStatus(null);
   }, []);
  // disable add button if data is incomplete
  // TODO: add styles for add button in AddTopicContentForm add button at bottom
  useEffect(() => {
    setIsAddTopicContentReady(
      !!newTopicContent.language && !!newTopicContent.type && !!newTopicVideo.file
    );
  }, [newTopicContent, newTopicVideo]);

  // add topic id
  useEffect(() => {
    const isDefault = filterTopicContent(topicContent, topic?.id).length === 0;
    setNewTopicContent(getTopicContentObject({ topicId: topic.id, is_default: isDefault }));
    setNewTopicVideo(getTopicVideoObject({ courseId: topic.courseId }));
    setNewTopicSubtitle(getTopicSubtitleObject({ courseId: topic.courseId }));
  }, [topic]);

  function toggleTopicContentForm(value) {
    if (typeof value === 'boolean') return setIsTopicContentFormVisible(value);

    setIsTopicContentFormVisible(!isTopicContentFormVisible);
  }

  // input handler
  function handleTopicContentInput(e) {
    if (e.target.type === 'checkbox') {
      setNewTopicContent({
        ...newTopicContent,
        [e.target.name]: e.target.checked
      });
      return;
    }

    // language needs to be unique
    if (e.target.name === 'language') {
       const isLanguagePresent = topicContent.some(
         (content) => content.language === e.target.value
       );

      if (isLanguagePresent)
        return alert(`Topic Content already added in language ${e.target.value}`);
    }

    setNewTopicContent({
      ...newTopicContent,
      [e.target.name]: e.target.value
    });
  }

  // video input
  function handleTopicVideoInput(e) {
    if (!e.target.files) {
      return setNewTopicContent({
        ...newTopicContent,
        duration: 0
      });
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
        console.log(
          prevUploadDuration + variable_buffer_time,
          prevUploadDuration - variable_buffer_time,
          duration
        );
        // 6 < 4 < 2
        if (
          prevUploadDuration + variable_buffer_time <= duration ||
          prevUploadDuration - variable_buffer_time >= duration
        ) {
          alert('Video Length Should be same for all videos!!');
          return;
        }
      }

      setNewTopicContent({
        ...newTopicContent,
        duration: parseInt(duration)
      });
      setNewTopicVideo({
        ...newTopicVideo,
        file: e.target.files[0]
      });
    };
  }

  // subtitle input
  function handleTopicSubtitleInput(e) {
    if (!e.target.files) return;

    setNewTopicSubtitle({
      ...newTopicSubtitle,
      file: e.target.files[0]
    });
  }

  // save in recoil state
  function addNewTopicContent() {
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
    addTopicSubtitle([...topicSubtitle, newTopicSubtitle]);

    setIsTopicContentFormVisible(false);

    // reset local state
    setNewTopicContent(getTopicContentObject({ topicId: topic.id }));
    setNewTopicVideo(getTopicVideoObject({ courseId: topic.id }));
    setNewTopicSubtitle(getTopicVideoObject({ courseId: topic.id }));
  }

  const inputHandlers = {
    handleTopicContentInput,
    handleTopicSubtitleInput,
    handleTopicVideoInput,
    handleBingeInput
  };
  const localStates = {
    newTopicContent,
    newTopicVideo,
    newTopicSubtitle
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
