import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { getResourcesObject, ResourcesAtom } from '../../../../state/atoms/module.atoms';

export default function useAddResources(courseId = '', topicId = '') {
  // recoil state
  const [resources, addResources] = useRecoilState(ResourcesAtom);

  // local state
  const [isResourcesFormVisible, setIsResourcesFormVisible] = useState(false);
  const [isResourceReady, setIsResourcesReady] = useState(false);
  const [newResource, setNewResource] = useState(getResourcesObject({ courseId, topicId }));

  // update resouce courseid and topicid
  useEffect(() => {
    setNewResource({
      ...newResource,
      topicId: topicId,
      courseId: courseId
    });
  }, [topicId, courseId]);

  useEffect(() => {
    setIsResourcesReady(
      newResource.name && newResource.type && (newResource.file || newResource.url)
    );
  }, [newResource]);

  function toggleResourceForm() {
    setIsResourcesFormVisible(!isResourcesFormVisible);
  }

  // input handler
  function handleResourceInput(e) {
    if (e.target.type == 'file') {
      if (!e.target.files) return;
      if (!e.target.files[0]) return;

      console.log(e.target.files);
      if (!newResource.type) {
        e.target.value = '';
        return alert('Please select the Resource Type first');
      }

      let acceptedTypeRegex = /sheet|csv/;
      if (newResource.type === 'DOC') acceptedTypeRegex = /document/;
      if (newResource.type === 'PDF') acceptedTypeRegex = /pdf/;

      if (!acceptedTypeRegex.test(e.target.files[0].type)) {
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

  // save in recoil state
  function addNewResource() {
    addResources([...resources, newResource]);
    setNewResource(getResourcesObject({ courseId, topicId }));
    setIsResourcesFormVisible(false);
  }

  return {
    newResource,
    handleResourceInput,
    addNewResource,
    isResourcesFormVisible,
    toggleResourceForm,
    isResourceReady
  };
}
