import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  getTopicContentObject,
  getTopicSubtitleObject,
  getTopicVideoObject,
  TopicContentAtom,
  TopicSubtitleAtom,
  TopicVideoAtom
} from '../../../state/atoms/module.atoms';
import useAddBinge from './useAddBinge';

export default function useAddTopicContent(topic) {
  // recoil state
  const [topicContent, addTopicContent] = useRecoilState(TopicContentAtom);
  const [topicVideo, addTopicVideo] = useRecoilState(TopicVideoAtom);
  const [topicSubtitle, addTopicSubtitle] = useRecoilState(TopicSubtitleAtom);

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

  // disable add button if data is incomplete
  // TODO: add styles for add button in AddTopicContentForm add button at bottom
  useEffect(() => {
    setIsAddTopicContentReady(
      !!newTopicContent.language && !!newTopicContent.type && !!newTopicVideo.file
    );
  }, [newTopicContent, newTopicVideo]);

  // add topic id
  useEffect(() => {
    setNewTopicContent(getTopicContentObject({ topicId: topic.id }));
  }, [topic]);

  function toggleTopicContentForm(value) {
    if (typeof value === 'boolean') return setIsTopicContentFormVisible(value);

    setIsTopicContentFormVisible(!isTopicContentFormVisible);
  }

  // input handler
  function handleTopicContentInput(e) {
    // language needs to be unique
    if (e.target.name === 'language') {
      const isLanguagePresent = topicContent.some((content) => {
        return content.language === e.target.value;
      });

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

      setNewTopicContent({
        ...newTopicContent,
        duration: parseInt(duration)
      });
    };

    setNewTopicVideo({
      ...newTopicVideo,
      file: e.target.files[0]
    });
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
    // save in recoil state
    addTopicContent([...topicContent, newTopicContent]);
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
    toggleTopicContentForm,
    inputHandlers,
    addNewTopicContent,
    isAddTopicContentReady
  };
}
