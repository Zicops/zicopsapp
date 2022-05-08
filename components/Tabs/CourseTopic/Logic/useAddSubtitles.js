import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  getResourcesObject,
  getTopicSubtitleObject,
  TopicSubtitleAtom
} from '../../../../state/atoms/module.atoms';

export default function useAddSubtitles(courseId = '', topicId = '') {
  // recoil state
  const [topicSubtitle, addTopicSubtitle] = useRecoilState(TopicSubtitleAtom);

  // local state
  const [isSubtitlesFormVisible, setIsSubtitlesFormVisible] = useState(false);
  const [isSubtitlesReady, setIsSubtitlesReady] = useState(false);
  const [newSubtitles, setNewSubtitles] = useState(getTopicSubtitleObject({ courseId, topicId }));

  // update resouce courseid and topicid
  useEffect(() => {
    setNewSubtitles({
      ...newSubtitles,
      topicId: topicId,
      courseId: courseId
    });
  }, [topicId, courseId]);

  useEffect(() => {
    console.log(newSubtitles.language && newSubtitles.file);
    setIsSubtitlesReady(newSubtitles.language && newSubtitles.file);
  }, [newSubtitles]);

  function toggleSubtitlesForm() {
    setIsSubtitlesFormVisible(!isSubtitlesFormVisible);
  }

  // input handler
  function handleSubtitleInput(e) {
    if (e.value) {
      // language needs to be unique
      const isLanguagePresent = topicSubtitle.some((sub) => sub.language === e.value);

      if (isLanguagePresent) return alert(`Subtitle already added in language ${e.value}`);

      setNewSubtitles({
        ...newSubtitles,
        language: e.value
      });
      return;
    }

    if (e.target.type == 'file') {
      if (!e.target.files) return;
      if (!e.target.files[0]) return;

      setNewSubtitles({
        ...newSubtitles,
        file: e.target.files[0],
        name: e.target.files[0].name
      });
      return;
    }
  }

  // save in recoil state
  function addNewSubtitles() {
    addTopicSubtitle([...topicSubtitle, newSubtitles]);
    setNewSubtitles(getTopicSubtitleObject({ courseId, topicId }));
    setIsSubtitlesFormVisible(false);
  }

  return {
    newSubtitles,
    handleSubtitleInput,
    addNewSubtitles,
    isSubtitlesFormVisible,
    toggleSubtitlesForm,
    isSubtitlesReady
  };
}
