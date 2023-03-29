import { GET_COURSE_TOPICS_CONTENT } from '@/api/Queries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { CourseMetaDataAtom, TopicContentListAtom } from '@/state/atoms/courses.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useEffect, useState } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { getTopicContentDataObj } from './adminCourseComps.helper';

export default function useHandleTopicContent(topData = null) {
  const setToastMessage = useRecoilCallback(({ set }) => (message = '', type = 'danger') => {
    set(ToastMsgAtom, { type, message });
  });
  const courseMetaData = useRecoilValue(CourseMetaDataAtom);
  const [topicContentList, setTopicContentList] = useRecoilState(TopicContentListAtom);

  const [isFormVisible, setIsFormVisible] = useState(null);
  const [topicContentFormData, setTopicContentFormData] = useState(
    getTopicContentDataObj({ courseId: courseMetaData?.id, topicId: topData?.id })
  );

  // reset state
  useEffect(() => {
    setTopicContentList(null);
  }, []);

  useEffect(() => {
    if (!topData?.id) return;
    if (topicContentList != null) return;

    // load topic content, subtitle and binge data
    loadQueryDataAsync(GET_COURSE_TOPICS_CONTENT, { topic_id: topData?.id })
      .then((res) => {
        const _topicContent = res?.getTopicContent?.map((content) =>
          getTopicContentDataObj({ ...content, isDefault: content?.is_default })
        );

        setTopicContentList(_topicContent || []);
        if (_topicContent?.length) setIsFormVisible(false);
      })
      .catch(() => {
        setToastMessage('Topic Content Load Error');
        setTopicContentList([]);
      });
  }, [topData, topicContentList]);

  useEffect(() => {
    if (topicContentList?.length) return;

    setIsFormVisible(true);
    setTopicContentFormData(
      getTopicContentDataObj({
        courseId: courseMetaData?.id,
        topicId: topData?.id,
        isDefault: true
      })
    );
  }, [topicContentList?.length]);

  function toggleForm() {
    // reset form data
    if (!isFormVisible) {
      setTopicContentFormData(
        getTopicContentDataObj({
          courseId: courseMetaData?.id,
          topicId: topData?.id,
          type: topicContentList?.[0]?.type,
          isDefault: !topicContentList?.filter((tc) => tc?.isDefault)?.length
        })
      );
    }

    setIsFormVisible(!isFormVisible);
  }

  function handleChange(toBeUpdatedKeyValue = {}) {
    setTopicContentFormData((prev) => ({ ...prev, ...(toBeUpdatedKeyValue || {}) }));
  }

  // video input
  function handleMp4FileInput(e) {
    if (!e.target.files?.length)
      return setTopicContentFormData((prev) => ({ ...prev, file: null, duration: 0 }));

    const video = document.createElement('video');
    let duration = 0;
    video.src = URL.createObjectURL(e.target.files[0]);
    video.preload = 'metadata';
    video.onloadedmetadata = function () {
      window.URL.revokeObjectURL(video.src);
      duration = video.duration;

      const variableBufferTime = 2;
      const prevUploadDuration = topicContentList?.filter(
        (tc) => tc?.topicId === topicContentFormData?.topicId
      );
      if (
        prevUploadDuration > 0 &&
        (prevUploadDuration + variableBufferTime <= duration ||
          prevUploadDuration - variableBufferTime >= duration)
      ) {
        e.target.value = null;
        setToastMessage('Video Length Should be same for all videos!!');
        return setTopicContentFormData((prev) => ({ ...prev, file: null, duration: 0 }));
      }

      setTopicContentFormData((prev) => ({
        ...prev,
        file: e.target.files[0],
        duration: parseInt(duration)
      }));
    };
  }

  function handleSubmit() {
    const _list = structuredClone(topicContentList);

    // set every other topic content is default to false if current topic contnent is default true
    if (topicContentFormData?.isDefault) _list?.forEach((item) => (item.isDefault = false));

    _list.push(topicContentFormData);
    setTopicContentList(_list);

    setIsFormVisible(false);
    setTopicContentFormData(
      getTopicContentDataObj({ courseId: courseMetaData?.id, topicId: topData?.id })
    );
  }

  return {
    topicContentFormData,
    setTopicContentFormData,
    isFormVisible,
    toggleForm,
    handleChange,
    handleMp4FileInput,
    handleSubmit
  };
}
