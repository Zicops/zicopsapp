import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { getResourcesObject, ResourcesAtom } from '../../../../state/atoms/module.atoms';
import { ToastMsgAtom } from '../../../../state/atoms/toast.atom';

export default function useAddResources(courseId = '', topicId = '') {
  // recoil state
  const [resources, addResources] = useRecoilState(ResourcesAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  // local state
  const [isResourcesFormVisible, setIsResourcesFormVisible] = useState(false);
  const [isResourceReady, setIsResourcesReady] = useState(false);
  const [newResource, setNewResource] = useState(getResourcesObject({ courseId, topicId }));

  // update resouce courseid and topicid
  useEffect(() => {
    setNewResource({ ...newResource, topicId: topicId, courseId: courseId });
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
    if (e.value) {
      return setNewResource({
        ...newResource,
        type: e.value,
        file: e.value === 'LINK' ? null : newResource.file
      });
    }

    if (e.target.type == 'file') {
      if (!e.target.files) return;
      if (!e.target.files[0]) return;

      if (!newResource.type) {
        e.target.value = '';
        return setToastMsg({ type: 'danger', message: `Please select the Resource Type first` });
      }

      let acceptedTypeRegex = /sheet|csv/;
      if (newResource.type === 'DOC') acceptedTypeRegex = /document/;
      if (newResource.type === 'PDF') acceptedTypeRegex = /pdf/;

      if (!acceptedTypeRegex.test(e.target.files[0].type)) {
        e.target.value = '';
        return setToastMsg({ type: 'danger', message: `Wrong Type of File Uploaded.` });
      }

      setNewResource({
        ...newResource,
        file: e.target.files[0],
        name: newResource?.name?.length ? newResource?.name : e.target.files[0].name
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
    addResources([...resources, { ...newResource, isNew: true }]);
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
