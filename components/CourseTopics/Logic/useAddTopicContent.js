import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import {
  ADD_TOPIC_CONTENT,
  UPLOAD_TOPIC_CONTENT_SUBTITLE,
  UPLOAD_TOPIC_CONTENT_VIDEO
} from '../../../API/Mutations';

export default function useAddTopicContent(moduleContextData, topic) {
  const [isTopicContentFormVisible, setIsTopicContentFormVisible] = useState(false);

  const {
    topicContent,
    addUpdateTopicContent,
    topicVideo,
    setCourseTopicVideo,
    topicSubtitle,
    setCourseTopicSubtitle
  } = moduleContextData;

  const startTimeMin = Math.floor(parseInt(topicContent.startTime) / 60);
  const startTimeSec = parseInt(topicContent.startTime) - startTimeMin * 60;
  const nextShowTimeMin = Math.floor(parseInt(topicContent.nextShowTime) / 60);
  const nextShowTimeSec = parseInt(topicContent.nextShowTime) - nextShowTimeMin * 60;

  const [bingeData, setBingeData] = useState({
    startTimeMin: startTimeMin,
    startTimeSec: startTimeSec,
    nextShowTimeMin: nextShowTimeMin,
    nextShowTimeSec: nextShowTimeSec,
    isFromEnd: topicContent.nextShowTime || false
  });

  useEffect(() => {
    addUpdateTopicContent({
      ...topicContent,
      topicId: topic.id
    });
    setCourseTopicVideo({
      ...topicVideo,
      topicId: topic.id,
      courseId: topic.courseId
    });
    setCourseTopicSubtitle({
      ...topicSubtitle,
      topicId: topic.id,
      courseId: topic.courseId
    });
    console.log(topic, 'topw');
  }, [topic]);

  function toggleTopicContentForm() {
    setIsTopicContentFormVisible(!isTopicContentFormVisible);
  }

  function handleAddTopicContentInput(e) {
    const name = e.target.name;
    if (e.target.type === 'checkbox') {
      switchEndAndStartTime(e.target.checked);
      return setBingeData({
        ...bingeData,
        [name]: e.target.checked
      });
    }

    if (name.includes('Min') || name.includes('Sec')) {
      // temporary state is saved in bingeData and then in context
      // all checks for passing correct minutes and seconds to the context
      if (name.includes('startTimeMin'))
        addBingeToContext(e.target.value, bingeData.startTimeSec, 'startTime');
      if (name.includes('nextShowTimeMin'))
        addBingeToContext(
          e.target.value,
          bingeData.nextShowTimeSec,
          bingeData.isFromEnd ? 'fromEndTime' : 'nextShowTime'
        );

      if (name.includes('startTimeSec'))
        addBingeToContext(bingeData.startTimeMin, e.target.value, 'startTime');
      if (name.includes('nextShowTimeSec'))
        addBingeToContext(
          bingeData.nextShowTimeMin,
          e.target.value,
          bingeData.isFromEnd ? 'fromEndTime' : 'nextShowTime'
        );

      return setBingeData({
        ...bingeData,
        [name]: e.target.value
      });
    }

    addUpdateTopicContent({
      ...topicContent,
      [e.target.name]: e.target.value
    });

    console.log(topicContent);
  }

  function addBingeToContext(minutes, seconds, name) {
    minutes = parseInt(minutes);
    seconds = parseInt(seconds);
    console.log(minutes, seconds, minutes * 60 + seconds);
    addUpdateTopicContent({
      ...topicContent,
      [name]: minutes * 60 + seconds
    });
  }

  function switchEndAndStartTime(isFromEndTrue) {
    if (isFromEndTrue) {
      addUpdateTopicContent({
        ...topicContent,
        fromEndTime: topicContent.nextShowTime,
        nextShowTime: 0
      });
    } else {
      addUpdateTopicContent({
        ...topicContent,
        fromEndTime: 0,
        nextShowTime: topicContent.fromEndTime
      });
    }
  }

  function saveVideoInContext(e) {
    if (!e.target.files) {
      return addUpdateTopicContent({
        ...topicContent,
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

      addUpdateTopicContent({
        ...topicContent,
        duration: parseInt(duration)
      });
    };

    setCourseTopicVideo({
      ...topicVideo,
      file: e.target.files[0]
    });
  }

  function saveSubtitleInContext(e) {
    console.log(e.target.files);
    if (!e.target.files) return;
    console.log(e.target.files);

    setCourseTopicSubtitle({
      ...topicSubtitle,
      file: e.target.files[0]
    });
  }

  function addNewTopicContent() {
    console.log(topicContent);

    setIsTopicContentFormVisible(true);
  }

  return {
    handleAddTopicContentInput,
    saveVideoInContext,
    saveSubtitleInContext,
    addNewTopicContent,
    isTopicContentFormVisible,
    toggleTopicContentForm,
    bingeData
  };
}
