import {
  CourseMetaDataAtom,
  getTopicSubtitlesObject,
  TopicSubtitlesAtom
} from '@/state/atoms/courses.atom';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function useHandleTopicSubtitles(topData = null) {
  const courseMetaData = useRecoilValue(CourseMetaDataAtom);
  const [topicSubtitle, setTopicSubtitle] = useRecoilState(TopicSubtitlesAtom);

  const [isFormVisible, setIsFormVisible] = useState(null);
  const [subtitleFormData, setSubtitleFormData] = useState(
    getTopicSubtitlesObject({ courseId: courseMetaData?.id, topicId: topData?.id })
  );

  function toggleForm() {
    // reset form data
    if (!isFormVisible) {
      setSubtitleFormData(
        getTopicSubtitlesObject({ courseId: courseMetaData?.id, topicId: topData?.id })
      );
    }

    setIsFormVisible(!isFormVisible);
  }

  function handleSubtitleInput(e) {
    if (e.value) return setSubtitleFormData({ ...subtitleFormData, language: e.value });

    if (e.target.type == 'file') {
      if (!e.target.files) return;
      if (!e.target.files[0]) return;

      const nameArr = e.target.files[0].name.split('.');
      if (!nameArr[nameArr.length - 1].includes('vtt'))
        return setToastMsg({ type: 'danger', message: 'Only VTT file is accepted' });

      setSubtitleFormData({
        ...subtitleFormData,
        file: e.target.files[0],
        name: e.target.files[0].name
      });
      return;
    }
  }

  function handleSubmit() {
    const _list = structuredClone(topicSubtitle);

    _list.push({ ...subtitleFormData, isNew: true });
    setTopicSubtitle(_list);

    setIsFormVisible(false);
    setSubtitleFormData(
      getTopicSubtitlesObject({ courseId: courseMetaData?.id, topicId: topData?.id })
    );
  }

  return {
    subtitleFormData,
    setSubtitleFormData,
    isFormVisible,
    toggleForm,
    handleSubtitleInput,
    handleSubmit
  };
}
