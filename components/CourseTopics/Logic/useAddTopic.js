import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { ADD_COURSE_CHAPTER, ADD_COURSE_TOPIC } from '../../../API/Mutations';
import { getNewChapterObject, getNewTopicObject } from './courseTopics.helper';

export default function useAddTopic(moduleContextData) {
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

  function addNewTopic() {
    console.log(newTopic);
    createCourseTopic({
      variables: {
        ...newTopic
      }
    }).then((d) => {
      addAndUpdateTopic(d.data.addCourseTopic);
      setNewTopic(getNewTopicObject());
      setIsAddTopicPopUpOpen(false);
    });
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
