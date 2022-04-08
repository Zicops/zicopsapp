import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import {
  ADD_TOPIC_CONTENT,
  UPDATE_COURSE_TOPIC,
  UPLOAD_TOPIC_CONTENT_SUBTITLE,
  UPLOAD_TOPIC_CONTENT_VIDEO,
  UPLOAD_TOPIC_RESOURCE
} from '../../../API/Mutations';
import { GET_COURSE_TOPICS_CONTENT } from '../../../API/Queries';
import { getNewTopicObject, useLoadAndSetDataInContext } from './courseTopics.helper';

export default function useEditTopic(moduleContextData) {
  const {
    topic,
    addAndUpdateTopic,
    topicContent,
    addUpdateTopicContent,
    topicVideo,
    setCourseTopicVideo,
    topicSubtitle,
    setCourseTopicSubtitle,
    resources
  } = moduleContextData;

  const [currentTopic, setCurrentTopic] = useState(getNewTopicObject());
  const [isEditTopicReady, setIsEditTopicReady] = useState(false);

  const [updateCourseTopic] = useMutation(UPDATE_COURSE_TOPIC);
  const [uploadTopicResource] = useMutation(UPLOAD_TOPIC_RESOURCE);
  const [addCourseTopicContent] = useMutation(ADD_TOPIC_CONTENT);
  const [uploadCourseContentVideo] = useMutation(UPLOAD_TOPIC_CONTENT_VIDEO);
  const [uploadCourseContentSubtitle] = useMutation(UPLOAD_TOPIC_CONTENT_SUBTITLE);

  const [isEditTopicPopUpOpen, setIsEditTopicPopUpOpen] = useState(false);

  useEffect(() => {
    setIsEditTopicReady(
      currentTopic.name !== '' && currentTopic.level !== '' && currentTopic.description !== ''
    );
  }, [currentTopic]);

  // load topicContent
  // TODO: call this on activateEditTopic has been called and after currentTopic has id
  useLoadAndSetDataInContext(GET_COURSE_TOPICS_CONTENT, { topic_id: currentTopic.id }, (data) => {
    if (!data) return;
    if (!data.getTopicContent) return;
    if (!data.getTopicContent.length) return;

    addUpdateTopicContent(data.getTopicContent[0]);
    setCourseTopicVideo(data.getTopicContent[0]);
    setCourseTopicSubtitle(data.getTopicContent[0]);
  });

  function toggleEditTopicPopUp() {
    setIsEditTopicPopUpOpen(!isEditTopicPopUpOpen);
  }

  function activateEditTopic(topicId) {
    const index = topic.findIndex((t) => t.id === topicId);

    setCurrentTopic(topic[index]);
    setIsEditTopicPopUpOpen(true);
  }

  function handleEditTopicInput(e) {
    setCurrentTopic({
      ...currentTopic,
      [e.target.name]: e.target.value
    });
  }

  function handleEditTopicSubmit() {
    updateCourseTopic({
      variables: {
        ...currentTopic
      }
    }).then((res) => {
      setCurrentTopic(getNewTopicObject());
      addAndUpdateTopic(res.data.updateCourseTopic);
    });

    setIsEditTopicPopUpOpen(false);
  }

  // merge with saveAllData
  function saveTopicContent() {
    console.log(topicContent);
    addCourseTopicContent({
      variables: {
        ...topicContent
      }
    }).then((d) => {
      addUpdateTopicContent(d.data.addTopicContent);
    });

    uploadCourseContentVideo({ variables: topicVideo });
    uploadCourseContentSubtitle({ variables: topicSubtitle });
    setIsContentSaved(true);
  }

  function saveAllData() {
    console.log(resources);
    console.log(topicContent);
    // return;

    addCourseTopicContent({
      variables: {
        ...topicContent
      }
    })
      .then((d) => {
        addUpdateTopicContent(d.data.addTopicContent);
      })
      .catch((err) => {
        console.log('Topic Content Save Error: ', err);
        alert('Topic Content Save Error, Check Log');
      });

    uploadCourseContentVideo({ variables: topicVideo });
    uploadCourseContentSubtitle({ variables: topicSubtitle });

    resources.forEach((res) => {
      console.log(res);
      const { url, ...sendResources } = res;

      console.log(sendResources);
      uploadTopicResource({
        variables: sendResources
      })
        .then((data) => {
          console.log(data);

          if (data.data.uploadTopicResource.success) {
            console.log('All Resources uploaded');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });

    alert('Topic Content Saved');
  }

  return {
    activateEditTopic,
    isEditTopicPopUpOpen,
    toggleEditTopicPopUp,
    currentTopic,
    isEditTopicReady,
    handleEditTopicInput,
    handleEditTopicSubmit,
    saveAllData
  };
}
