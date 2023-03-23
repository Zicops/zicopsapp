import { ADD_COURSE_TOPIC, UPDATE_COURSE_TOPIC } from '@/api/Mutations';
import { GET_COURSE_TOPICS_CONTENT } from '@/api/Queries';
import { loadQueryDataAsync, mutateData } from '@/helper/api.helper';
import { sanitizeFormData } from '@/helper/common.helper';
import { isWordSame } from '@/helper/utils.helper';
import { AllCourseModulesDataAtom, CourseMetaDataAtom } from '@/state/atoms/courses.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useEffect, useState } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { getTopicContentDataObj } from './adminCourseComps.helper';

export default function useHandleTopicContent(topData = null, closePopUp = () => {}) {
  const setToastMessage = useRecoilCallback(({ set }) => (message = '', type = 'danger') => {
    set(ToastMsgAtom, { type, message });
  });
  const courseMetaData = useRecoilValue(CourseMetaDataAtom);
  const [allModules, setAllModules] = useRecoilState(AllCourseModulesDataAtom);

  const [isEditTopicFormVisible, setIsEditTopicFormVisible] = useState(null);
  const [topicContentList, setTopicContentList] = useState(null);
  const [topicContentFormData, setTopicContentFormData] = useState(
    getTopicContentDataObj({ courseId: courseMetaData?.id, topicId: topData?.id })
  );

  useEffect(() => {
    if (!topData?.id) return;
    if (topicContentList?.length) return;

    loadQueryDataAsync(GET_COURSE_TOPICS_CONTENT, { topic_id: topData?.id })
      .then((res) => {
        const _topicContent = res?.getTopicContent?.map((content) =>
          getTopicContentDataObj({ ...content, isDefault: content?.is_default })
        );

        setTopicContentList(_topicContent || []);
      })
      .catch(() => {
        setToastMessage('Topic Content Load Error');
        setTopicContentList([]);
      });
  }, [topData]);

  // useEffect(() => {
  //   if (!topData?.id) return;

  //   setTopicContentFormData(getTopicDataObj(topData));
  // }, [topData]);

  async function addUpdateTopicContent(e) {
    e.target.disabled = true;

    const sendData = sanitizeFormData(topicContentFormData);
    // add new module
    if (!topicContentFormData?.id) {
      mutateData(ADD_COURSE_TOPIC, sendData)
        .then((res) => {
          if (!res?.addCourseTopic) return setToastMessage('Topic Create Error');

          // const _allModules = structuredClone(allModules);
          // const index = _allModules?.findIndex((m) => m?.id === modData?.id);
          // if (index < 0) return;

          // _allModules?.[index]?.topics?.push(res?.addCourseTopic);
          // setAllModules(_allModules);
        })
        .catch(() => setToastMessage('Topic Create Error'))
        .finally(() => closePopUp());
      return;
    }

    // update module
    mutateData(UPDATE_COURSE_TOPIC, sendData)
      .then((res) => {
        if (!res?.updateCourseTopic) return setToastMessage('Topic Update Error');

        // const _allModules = structuredClone(allModules);
        // const index = _allModules?.findIndex((m) => m?.id === modData?.id);
        // if (index < 0) return;

        // const updatedChap = res?.updateCourseTopic;
        // _allModules[index].topics = _allModules?.[index]?.topics?.map((chap) =>
        //   chap?.id === updatedChap?.id ? updatedChap : chap
        // );
        // setAllModules(_allModules);
      })
      .catch(() => setToastMessage('Topic Update Error'))
      .finally(() => setIsEditTopicFormVisible(!isEditTopicFormVisible));
  }

  return {
    topicContentList,
    topicContentFormData,
    setTopicContentFormData,
    addUpdateTopicContent,
    isEditTopicFormVisible
  };
}
