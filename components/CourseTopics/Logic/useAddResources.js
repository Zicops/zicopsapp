import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { UPLOAD_TOPIC_RESOURCE } from '../../../API/Mutations';
import { GET_TOPIC_RESOURCES } from '../../../API/Queries';
import { getNewResourceObject, useLoadAndSetDataInContext } from './courseTopics.helper';

export default function useAddResources(moduleContextData, courseId = '', topicId = '') {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { resources, addResourcesToTopic } = moduleContextData;

  const [newResource, setNewResource] = useState(getNewResourceObject(courseId, topicId));

  // load resources
  useLoadAndSetDataInContext(GET_TOPIC_RESOURCES, { topic_id: topicId }, (data) => {
    console.log('sfevew', data.getTopicResources[0]);
    if (!data) return;
    if (!data.getTopicResources) return;
    if (!data.getTopicResources[0]) return;

    data.getTopicResources.forEach((res) => {
      addResourcesToTopic(res);
    });
  });
  useEffect(() => {
    console.log(newResource);
  }, [newResource]);

  function toggleFormVisibility() {
    setIsFormVisible(!isFormVisible);
  }

  function handleResourceInput(e) {
    if (e.target.type == 'file') {
      if (!e.target.files) return;
      if (!e.target.files[0]) return;

      console.log(e.target.files);
      if (!newResource.type) {
        e.target.value = '';
        return alert('Please select the Resource Type first');
      }
      let acceptedType = 'sheet';
      if (newResource.type === 'DOC') acceptedType = 'document';
      if (newResource.type === 'PDF') acceptedType = 'pdf';

      if (!e.target.files[0].type.includes(acceptedType)) {
        e.target.value = '';
        return alert('Wrong Type of File Uploaded.');
      }

      setNewResource({
        ...newResource,
        file: e.target.files[0],
        name: e.target.files[0].name
      });

      return;
    }

    setNewResource({
      ...newResource,
      [e.target.name]: e.target.value
    });
  }

  function addNewResource() {
    addResourcesToTopic(newResource);
    setNewResource(getNewResourceObject(topicId));
    setIsFormVisible(false);
  }

  return {
    newResource,
    handleResourceInput,
    addNewResource,
    isFormVisible,
    toggleFormVisibility
  };
}
