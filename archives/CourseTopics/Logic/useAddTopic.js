import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { ADD_COURSE_CHAPTER, ADD_COURSE_TOPIC } from '../../../API/Mutations';
import { getNewChapterObject, getNewTopicObject } from './courseTopics.helper';

export default function useAddTopic(
  moduleContextData,
  toggleEditTopicPopUp,
  toggleTopicContentForm
) {
  const { topic, addAndUpdateTopic } = moduleContextData;

  const [isAddTopicReady, setIsAddTopicReady] = useState(false);
  const [isAddTopicPopUpOpen, setIsAddTopicPopUpOpen] = useState(false);
  const [createCourseTopic] = useMutation(ADD_COURSE_TOPIC);

  const [newTopic, setNewTopic] = useState(getNewTopicObject());

  useEffect(() => {
    setIsAddTopicReady(newTopic.name !== '' && newTopic.type !== '' && newTopic.description !== '');
  }, [newTopic]);

  function createNewTopicInstance(courseId, moduleId, squenceNumber, chapterId = '') {
    setNewTopic(getNewTopicObject(courseId, moduleId, squenceNumber, chapterId));

    setIsAddTopicPopUpOpen(true);
  }

  function toggleAddTopicPopUp() {
    setIsAddTopicPopUpOpen(!isAddTopicPopUpOpen);
  }

  function handleTopicInput(e) {
    setNewTopic({
      ...newTopic,
      [e.target.name]: e.target.value
    });
  }

  const [isTopicSavedInContext, setIsTopicSavedInContext] = useState({
    topicId: '',
    count: 0
  });

  useEffect(() => {
    if (isTopicSavedInContext.topicId) {
      const index = topic.findIndex((t) => t.id === isTopicSavedInContext.topicId);

      if (index > 0) {
        setIsTopicSavedInContext({
          ...isTopicSavedInContext,
          count: ++isTopicSavedInContext.count,
          topicId: ''
        });
        toggleEditTopicPopUp(isTopicSavedInContext.topicId);
        toggleTopicContentForm();
        return;
      }

      setIsTopicSavedInContext({
        ...isTopicSavedInContext,
        count: ++isTopicSavedInContext.count
      });
    }
  }, [topic]);

  async function addNewTopic() {
    console.log('newTopic', newTopic);
    const res = await createCourseTopic({
      variables: {
        ...newTopic
      }
    });

    setIsTopicSavedInContext({
      ...isTopicSavedInContext,
      topicId: res.data.addCourseTopic.id,
      count: ++isTopicSavedInContext.count
    });

    await addAndUpdateTopic(res.data.addCourseTopic);
    setNewTopic(getNewTopicObject());
    setIsAddTopicPopUpOpen(false);
  }

  return {
    newTopic,
    isAddTopicPopUpOpen,
    isAddTopicReady,
    createNewTopicInstance,
    toggleAddTopicPopUp,
    handleTopicInput,
    addNewTopic
  };
}
