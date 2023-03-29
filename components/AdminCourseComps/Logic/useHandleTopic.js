import { ADD_COURSE_TOPIC, UPDATE_COURSE_TOPIC } from '@/api/Mutations';
import { COURSE_TYPES, TOPIC_TYPES } from '@/constants/course.constants';
import { mutateData } from '@/helper/api.helper';
import { sanitizeFormData } from '@/helper/common.helper';
import { isWordSame } from '@/helper/utils.helper';
import {
  AllCourseModulesDataAtom,
  CourseMetaDataAtom,
  TopicContentListAtom
} from '@/state/atoms/courses.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useEffect, useState } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { getTopicDataObj } from './adminCourseComps.helper';

export default function useHandleTopic(
  modData = null,
  chapData = null,
  topData = null,
  closePopUp = () => {}
) {
  const setToastMessage = useRecoilCallback(({ set }) => (message = '', type = 'danger') => {
    set(ToastMsgAtom, { type, message });
  });
  const courseMetaData = useRecoilValue(CourseMetaDataAtom);
  const [allModules, setAllModules] = useRecoilState(AllCourseModulesDataAtom);
  const [topicContentList, setTopicContentList] = useRecoilState(TopicContentListAtom);

  const [isEditTopicFormVisible, setIsEditTopicFormVisible] = useState(null);
  const [topicData, setTopicData] = useState(
    getTopicDataObj({
      courseId: courseMetaData?.id,
      moduleId: modData?.id,
      chapterId: chapData?.id,
      sequence: modData?.topics?.length + 1
    })
  );

  useEffect(() => {
    if (!topData?.id) return;

    setTopicData(getTopicDataObj(topData));
  }, [topData]);

  // set type to assessment if test series course
  if (
    courseMetaData?.type === COURSE_TYPES.testSeries &&
    topicData?.type !== TOPIC_TYPES.assessment
  ) {
    setTopicData(getTopicDataObj({ ...topicData, type: TOPIC_TYPES.assessment }));
  }

  function toggleEditTopicForm() {
    // reset to original data if cancel
    if (isEditTopicFormVisible) setTopicData(getTopicDataObj(topData));

    setIsEditTopicFormVisible(!isEditTopicFormVisible);
  }

  async function addUpdateTopic(e) {
    const isNameSame = !!modData?.topics?.find(
      (top) => top?.id !== topicData?.id && isWordSame(top?.name, topicData?.name)
    );
    if (isNameSame) return setToastMessage('Topic with same name already exists in this module');

    e.target.disabled = true;

    const sendData = sanitizeFormData(topicData);
    // add new topic
    if (!topicData?.id) {
      mutateData(ADD_COURSE_TOPIC, sendData)
        .then((res) => {
          if (!res?.addCourseTopic) return setToastMessage('Topic Create Error');

          const _allModules = structuredClone(allModules);
          const index = _allModules?.findIndex((m) => m?.id === modData?.id);
          if (index < 0) return;

          _allModules?.[index]?.topics?.push(res?.addCourseTopic);
          setAllModules(_allModules);
          setTopicData({ ...topicData, id: res?.addCourseTopic?.id });
        })
        .catch(() => setToastMessage('Topic Create Error'));
      return;
    }

    // update topic
    mutateData(UPDATE_COURSE_TOPIC, sendData)
      .then((res) => {
        if (!res?.updateCourseTopic) return setToastMessage('Topic Update Error');

        const _allModules = structuredClone(allModules);
        const index = _allModules?.findIndex((m) => m?.id === modData?.id);
        if (index < 0) return;

        const updatedChap = res?.updateCourseTopic;
        _allModules[index].topics = _allModules?.[index]?.topics?.map((chap) =>
          chap?.id === updatedChap?.id ? updatedChap : chap
        );
        setAllModules(_allModules);
      })
      .catch(() => setToastMessage('Topic Update Error'))
      .finally(() => setIsEditTopicFormVisible(!isEditTopicFormVisible));
  }

  async function handleSubmit() {
    console.info(topicContentList);
  }

  return {
    topicData,
    setTopicData,
    addUpdateTopic,
    isEditTopicFormVisible,
    toggleEditTopicForm,
    handleSubmit
  };
}
