import { GET_TOPIC_RESOURCES } from '@/api/Queries';
import { TOPIC_RESOURCE_TYPES } from '@/constants/course.constants';
import { loadQueryDataAsync } from '@/helper/api.helper';
import {
  CourseMetaDataAtom,
  getTopicResourcesObject,
  TopicResourcesAtom
} from '@/state/atoms/courses.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useEffect, useState } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';

export default function useHandleTopicResources(topData = null) {
  const setToastMessage = useRecoilCallback(({ set }) => (message = '', type = 'danger') => {
    set(ToastMsgAtom, { type, message });
  });
  const courseMetaData = useRecoilValue(CourseMetaDataAtom);
  const [topicResources, setTopicResources] = useRecoilState(TopicResourcesAtom);

  const [isFormVisible, setIsFormVisible] = useState(null);
  const [resourceFormData, setResourceFormData] = useState(
    getTopicResourcesObject({ courseId: courseMetaData?.id, topicId: topData?.id })
  );

  // reset state
  useEffect(() => {
    setTopicResources(null);
  }, []);

  useEffect(() => {
    if (!topData?.id) return;
    if (topicResources != null) return;

    // load resources
    loadQueryDataAsync(GET_TOPIC_RESOURCES, { topic_id: topData?.id })
      .then((res) =>
        setTopicResources(
          res?.getTopicResources?.map((resource) => getTopicResourcesObject(resource)) || []
        )
      )
      .catch(() => {
        setToastMessage('Topic Resources Load Error');
        setTopicResources([]);
      });
  }, [topData, topicResources]);

  function toggleForm() {
    // reset form data
    if (!isFormVisible) {
      setResourceFormData(
        getTopicResourcesObject({ courseId: courseMetaData?.id, topicId: topData?.id })
      );
    }

    setIsFormVisible(!isFormVisible);
  }

  function handleResourceInput(e) {
    if (e.value) {
      return setResourceFormData({
        ...resourceFormData,
        type: e.value,
        file: e.value === 'LINK' ? null : resourceFormData.file
      });
    }

    if (e.target.type == 'file') {
      if (!e.target.files) return;
      if (!e.target.files[0]) return;

      if (!resourceFormData.type) {
        e.target.value = '';
        return setToastMessage(`Please select the Resource Type first`);
      }

      let acceptedTypeRegex = /sheet|csv/;
      if (resourceFormData.type === TOPIC_RESOURCE_TYPES.doc) acceptedTypeRegex = /document/;
      if (resourceFormData.type === TOPIC_RESOURCE_TYPES.pdf) acceptedTypeRegex = /pdf/;

      if (!acceptedTypeRegex.test(e.target.files[0].type)) {
        e.target.value = '';
        return setToastMsg({ type: 'danger', message: `Wrong Type of File Uploaded.` });
      }

      setResourceFormData({
        ...resourceFormData,
        file: e.target.files[0],
        name: resourceFormData?.name?.length ? resourceFormData?.name : e.target.files[0].name
      });

      return;
    }

    setResourceFormData({
      ...resourceFormData,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit() {
    const _list = structuredClone(topicResources);

    _list.push({ ...resourceFormData, isNew: true });
    setTopicResources(_list);

    setIsFormVisible(false);
    setResourceFormData(
      getTopicResourcesObject({ courseId: courseMetaData?.id, topicId: topData?.id })
    );
  }

  return {
    resourceFormData,
    setResourceFormData,
    isFormVisible,
    toggleForm,
    handleResourceInput,
    handleSubmit
  };
}
