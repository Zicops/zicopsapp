import { UPLOAD_TOPIC_RESOURCE } from '@/api/Mutations';
import { GET_TOPIC_RESOURCES } from '@/api/Queries';
import { COURSE_MAX_LENGTH_VALUES, TOPIC_RESOURCE_TYPES } from '@/constants/course.constants';
import { loadQueryDataAsync, mutateData } from '@/helper/api.helper';
import {
  CourseMetaDataAtom,
  TopicResourcesAtomFamily,
  getTopicResourcesObject,
} from '@/state/atoms/courses.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { isWordMatched } from '@/utils/string.utils';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';

export default function useHandleTopicResources(topicId = null) {
  const setToastMessage = useRecoilCallback(({ set }) => (message = '', type = 'danger') => {
    set(ToastMsgAtom, { type, message });
  });
  // const courseMetaData = useRecoilValue(CourseMetaDataAtom);
  const courseId = Router.query.courseId;

  console.info('asdf', courseId);
  const [topicResources, setTopicResources] = useRecoilState(TopicResourcesAtomFamily(topicId));

  const [isFormVisible, setIsFormVisible] = useState(null);
  const [resourceFormData, setResourceFormData] = useState(
    getTopicResourcesObject({ courseId: courseId, topicId: topicId, isUpload: true }),
  );

  // reset state
  // useEffect(() => {
  //   setTopicResources(null);
  // }, []);

  useEffect(() => {
    if (!topicId) return;
    if (topicResources != null) return;

    // load resources
    loadQueryDataAsync(GET_TOPIC_RESOURCES, { topic_id: topicId })
      .then((res) =>
        setTopicResources(
          res?.getTopicResources?.map((resource) =>
            getTopicResourcesObject({ ...resource, courseId: courseId }),
          ) || [],
        ),
      )
      .catch(() => {
        setToastMessage('Topic Resources Load Error');
        setTopicResources([]);
      });
  }, [topicId, topicResources]);

  let acceptedFilesTypes = '.csv, .xls, .xlsx';
  if (resourceFormData.type === TOPIC_RESOURCE_TYPES.doc) acceptedFilesTypes = '.doc, .docx';
  if (resourceFormData.type === TOPIC_RESOURCE_TYPES.pdf) acceptedFilesTypes = '.pdf';

  const resourceTypeOptions = Object.values(TOPIC_RESOURCE_TYPES)?.map((type) => ({
    value: type,
    label: type,
  }));

  function toggleForm() {
    // reset form data
    if (!isFormVisible) {
      setResourceFormData(
        getTopicResourcesObject({ courseId: courseId, topicId: topicId, isUpload: true }),
      );
    }

    setIsFormVisible(!isFormVisible);
  }

  function isNameDuplicate(name) {
    return !!topicResources?.find((resource) => isWordMatched(resource?.name, name));
  }

  function handleResourceInput(e) {
    if (e?.target?.name === 'name' && isNameDuplicate(e?.target?.value)) {
      return setToastMsg({ type: 'danger', message: `Wrong Type of File Uploaded.` });
    }

    if (e.value) {
      return setResourceFormData({
        ...resourceFormData,
        type: e.value,
        file: e.value === 'LINK' ? null : resourceFormData.file,
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

      const fileName = e.target.files[0].name
        ?.substring(0, COURSE_MAX_LENGTH_VALUES?.resourcesName)
        ?.trim();

      if (!acceptedTypeRegex.test(e.target.files[0].type)) {
        e.target.value = '';
        return setToastMsg({ type: 'danger', message: `Wrong Type of File Uploaded.` });
      }

      if (isNameDuplicate(fileName))
        return setToastMessage('Resources Name cannot be duplicate in same topic');

      setResourceFormData({ ...resourceFormData, file: e.target.files[0], name: fileName });
      return;
    }

    setResourceFormData({ ...resourceFormData, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    const _list = structuredClone(topicResources);

    _list.push({ ...resourceFormData, isUpload: true, isNew: true });
    setTopicResources(_list);

    setIsFormVisible(false);
    setResourceFormData(
      getTopicResourcesObject({ courseId: courseId, topicId: topicId, isUpload: true }),
    );
  }

  async function uploadTopicResources() {
    let isError = false;
    const uploadedResources = [];

    const allResources = [...(topicResources || [])];
    if (resourceFormData?.isUpload) allResources.push(resourceFormData);

    for (let index = 0; index < allResources?.length; index++) {
      const resource = allResources[index];

      // skip already uploaded resources
      if (!resource?.isUpload) continue;

      // check if all required data is present
      if (!resource.topicId) {
        isError = true;
        setToastMessage(`No Topic Id Found in resource ${resource?.name}`);
        continue;
      }
      if (!resource.courseId) {
        isError = true;
        setToastMessage(`No Course Id Found in resource ${resource?.name}`);
        continue;
      }

      const sendData = {
        name: resource.name,
        type: resource.type,
        topicId: resource.topicId,
        courseId: resource?.courseId,
      };
      if (resource.file && resource.type !== 'LINK') sendData.file = resource.file;
      if (resource.type === 'LINK') sendData.url = resource.url;

      const res = await mutateData(UPLOAD_TOPIC_RESOURCE, sendData).catch((err) => {
        console.log(err);
        isError = true;
        setToastMessage(`${sendData.name} Resource Upload Failed`);
      });
      if (!res?.uploadTopicResource?.url) {
        isError = true;
        setToastMessage(`${sendData.name} Resource Upload Failed`);
        continue;
      }

      uploadedResources?.push(
        getTopicResourcesObject({ ...sendData, url: res?.uploadTopicResource?.url }),
      );
    }

    if (uploadedResources?.length) {
      const _resources = structuredClone(topicResources);

      uploadedResources?.forEach((res) => {
        const currentResIndex = _resources?.findIndex((r) => isWordMatched(r?.name, res?.name));

        const resData = getTopicResourcesObject({ ...res, isUpload: false, file: null });

        if (currentResIndex < 0) return _resources?.push(resData);
        _resources[currentResIndex] = { ..._resources?.[currentResIndex], ...resData };
      });

      setTopicResources(_resources);
    }

    return isError;
  }

  return {
    resourceFormData,
    acceptedFilesTypes,
    resourceTypeOptions,
    setResourceFormData,
    isFormVisible,
    toggleForm,
    handleResourceInput,
    handleSubmit,
    uploadTopicResources,
  };
}
