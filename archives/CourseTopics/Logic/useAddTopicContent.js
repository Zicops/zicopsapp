import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import {
  ADD_TOPIC_CONTENT,
  UPLOAD_TOPIC_CONTENT_SUBTITLE,
  UPLOAD_TOPIC_CONTENT_VIDEO
} from '../../../API/Mutations';
import {
  getNewTopicContentObject,
  getNewTopicSubtitleObject,
  getNewTopicVideoObject
} from './courseTopics.helper';

export default function useAddTopicContent(moduleContextData, topic) {
  const [isTopicContentFormVisible, setIsTopicContentFormVisible] = useState(true);

  const [newTopicContent, setNewTopicContent] = useState(getNewTopicContentObject(topic?.id));
  const [newTopicContentVideo, setNewTopicContentVideo] = useState(
    getNewTopicVideoObject(topic.courseId)
  );
  const [newTopicContentSubtitle, setNewTopicContentSubtitle] = useState(
    getNewTopicSubtitleObject(topic.courseId)
  );

  const {
    topicContent,
    addUpdateTopicContent,
    topicVideo,
    setCourseTopicVideo,
    topicSubtitle,
    setCourseTopicSubtitle
  } = moduleContextData;

  // const [addCourseTopicContent] = useMutation(ADD_TOPIC_CONTENT);
  // const [uploadCourseContentVideo] = useMutation(UPLOAD_TOPIC_CONTENT_VIDEO);
  // const [uploadCourseContentSubtitle] = useMutation(UPLOAD_TOPIC_CONTENT_SUBTITLE);

  const startTimeMin = Math.floor(parseInt(topicContent[0]?.startTime) / 60);
  const startTimeSec = parseInt(topicContent[0]?.startTime) - startTimeMin * 60;
  const nextShowTimeMin = Math.floor(parseInt(topicContent[0]?.nextShowTime) / 60);
  const nextShowTimeSec = parseInt(topicContent[0]?.nextShowTime) - nextShowTimeMin * 60;

  const [bingeData, setBingeData] = useState({
    startTimeMin: startTimeMin,
    startTimeSec: startTimeSec,
    nextShowTimeMin: nextShowTimeMin,
    nextShowTimeSec: nextShowTimeSec,
    isFromEnd: topicContent[0]?.nextShowTime || false,
    selectedTopicContent: '',
    skipIntroDuration: topicContent[0]?.skipIntroDuration,
    shouldBingeDataUpdated: true
  });

  useEffect(() => {
    setNewTopicContent({
      ...newTopicContent,
      ...getNewTopicContentObject(topic.id)
    });
    setNewTopicContentVideo({
      ...newTopicContentVideo,
      ...getNewTopicVideoObject(topic.courseId, topicContent.length)
    });
    setNewTopicContentSubtitle({
      ...newTopicContentSubtitle,
      ...getNewTopicSubtitleObject(topic.courseId, topicContent.length)
    });
    // addUpdateTopicContent({
    //   ...topicContent,
    //   topicId: topic.id
    // });
    // setCourseTopicVideo({
    //   ...topicVideo,
    //   courseId: topic.courseId
    // });
    // setCourseTopicSubtitle({
    //   ...topicSubtitle,
    //   courseId: topic.courseId
    // });
  }, [topic]);

  useEffect(() => {
    console.log('Recent topicContent', topicContent);
    if (bingeData.shouldBingeDataUpdated && topicContent[0]) {
      const startTimeMin = Math.floor(parseInt(topicContent[0]?.startTime) / 60);
      const startTimeSec = parseInt(topicContent[0]?.startTime) - startTimeMin * 60;
      const nextShowTimeMin = Math.floor(parseInt(topicContent[0]?.nextShowTime) / 60);
      const nextShowTimeSec = parseInt(topicContent[0]?.nextShowTime) - nextShowTimeMin * 60;

      setBingeData({
        startTimeMin: startTimeMin,
        startTimeSec: startTimeSec,
        nextShowTimeMin: nextShowTimeMin,
        nextShowTimeSec: nextShowTimeSec,
        isFromEnd: topicContent[0]?.nextShowTime || false,
        selectedTopicContent: '',
        skipIntroDuration: topicContent[0]?.skipIntroDuration
      });
    }
  }, [topicContent]);

  useEffect(() => {
    console.log('binge updated', bingeData);
    addUpdateTopicContent({
      ...topicContent[0],
      ...bingeData,
      isUpdated: true
    });
  }, [bingeData]);

  function toggleTopicContentForm(value) {
    // console.log('form show value', value, isTopicContentFormVisible);
    if (typeof value === 'boolean') return setIsTopicContentFormVisible(value);

    setIsTopicContentFormVisible(!isTopicContentFormVisible);
  }

  function handleAddTopicContentInput(e) {
    const name = e.target.name;
    if (e.target.type === 'checkbox') {
      console.log(e.target.value, e.target.checked);
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

    if (e.target.name === 'language') {
      const isLanguagePresent = topicContent.some((content) => {
        return content.language === e.target.value;
      });

      if (isLanguagePresent)
        return alert(`Topic Content already added in language ${e.target.value}`);
    }

    if (e.target.name === 'skipIntroDuration') {
      setBingeData({
        ...bingeData,
        skipIntroDuration: e.target.value
      });
    }

    setNewTopicContent({
      ...newTopicContent,
      [e.target.name]: e.target.value
    });
  }

  function addBingeToContext(minutes, seconds, name) {
    minutes = parseInt(minutes);
    seconds = parseInt(seconds);

    addUpdateTopicContent({
      ...topicContent[0],
      isUpdated: true,
      [name]: minutes * 60 + seconds
    });
  }

  function switchEndAndStartTime(isFromEndTrue) {
    console.log(isFromEndTrue);
    if (isFromEndTrue) {
      addUpdateTopicContent({
        ...topicContent[0],
        isUpdated: true,
        fromEndTime: topicContent[0].nextShowTime,
        nextShowTime: '0'
      });
    } else {
      addUpdateTopicContent({
        ...topicContent[0],
        isUpdated: true,
        fromEndTime: '0',
        nextShowTime: topicContent[0].fromEndTime
      });
    }
  }

  function saveVideoInContext(e) {
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

    setNewTopicContentVideo({
      ...newTopicContentVideo,
      file: e.target.files[0],
      contentIndex: topicContent.length
    });
  }

  function saveSubtitleInContext(e) {
    if (!e.target.files) return;

    setNewTopicContentSubtitle({
      ...newTopicContentSubtitle,
      file: e.target.files[0],
      contentIndex: topicContent.length
    });
  }

  function addNewTopicContent() {
    console.log(
      'new topic content',
      newTopicContent,
      newTopicContentVideo,
      newTopicContentSubtitle
    );

    if (!newTopicContent.language) {
      return alert('Please select language');
    }
    if (!newTopicContent.type) {
      return alert('Please select type');
    }
    if (!newTopicContentVideo.file) {
      return alert('Please add video file');
    }
    // addCourseTopicContent({
    //   variables: {
    //     ...topicContent
    //   }
    // })
    //   .then((d) => {
    //     addUpdateTopicContent(d.data.addTopicContent);
    //     setIsTopicContentFormVisible(true);
    //   })
    //   .catch((err) => {
    //     console.log('Topic Content Save Error: ', err);
    //     alert('Topic Content Save Error, Check Log');
    //   });

    // uploadCourseContentVideo({ variables: topicVideo });
    // if (topicSubtitle.file) uploadCourseContentSubtitle({ variables: topicSubtitle });
    addUpdateTopicContent({ ...newTopicContent, isUpdated: true });
    setCourseTopicVideo({ ...newTopicContentVideo });
    setCourseTopicSubtitle({ ...newTopicContentSubtitle });

    setIsTopicContentFormVisible(false);
    setNewTopicContent(getNewTopicContentObject(topic.id));
    setNewTopicContentVideo(getNewTopicVideoObject(topic.courseId));
    setNewTopicContentSubtitle(getNewTopicSubtitleObject(topic.courseId));
  }

  return {
    handleAddTopicContentInput,
    saveVideoInContext,
    saveSubtitleInContext,
    addNewTopicContent,
    isTopicContentFormVisible,
    toggleTopicContentForm,
    setBingeData,
    bingeData,
    newTopicContent,
    newTopicContentVideo,
    newTopicContentSubtitle
  };
}
