import { useMutation } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ADD_COURSE_TOPIC } from '../../../../API/Mutations';
import { getTopicObject, TopicAtom } from '../../../../state/atoms/module.atoms';
import { courseContext } from '../../../../state/contexts/CourseContext';

export default function useAddTopic(togglePopUp, refetchDataAndUpdateRecoil, activateEditTopic) {
  const { fullCourse } = useContext(courseContext);
  const [createCourseTopic, { loading, error }] = useMutation(ADD_COURSE_TOPIC);

  // recoil state
  const topicData = useRecoilValue(TopicAtom);

  // local states
  const [isAddTopicReady, setIsAddTopicReady] = useState(false);
  const [newTopicData, setNewTopicData] = useState(
    getTopicObject({ courseId: fullCourse.id, sequence: topicData.length + 1 })
  );

  // disable save button if data is not correct
  useEffect(() => {
    setIsAddTopicReady(!!newTopicData.name && !!newTopicData.type && !!newTopicData.description);
  }, [newTopicData]);

  // udpate sequence number with recoil state is updated
  useEffect(() => {
    setNewTopicData({
      ...newTopicData,
      sequence: topicData.length + 1
    });
  }, [topicData]);

  // set module id, chapter id on add topic on button click
  function constructTopicData(courseId, moduleId, sequence, chapterId = '') {
    setNewTopicData(getTopicObject({ courseId, moduleId, chapterId, sequence }));

    togglePopUp('addTopic', true);
  }

  // update local state which will be later saved in database on submit
  function handleTopicInput(e) {
    setNewTopicData({
      ...newTopicData,
      [e.target.name]: e.target.value
    });
  }

  // save in database
  async function addNewTopic() {
    const { data } = await createCourseTopic({ variables: { ...newTopicData } });

    if (error) return alert('Topic Create Error');

    refetchDataAndUpdateRecoil('topic');

    setNewTopicData(getTopicObject({ courseId: fullCourse.id, sequence: topicData.length + 1 }));
    alert('New Topic Created');

    togglePopUp('addTopic', false);
    activateEditTopic(data.addCourseTopic.id, data.addCourseTopic);
  }

  return {
    newTopicData,
    constructTopicData,
    isAddTopicReady,
    handleTopicInput,
    addNewTopic
  };
}
