import { ADD_COURSE_CHAPTER, UPDATE_COURSE_CHAPTER } from '@/api/Mutations';
import { mutateData } from '@/helper/api.helper';
import { sanitizeFormData } from '@/helper/common.helper';
import { isWordSame } from '@/helper/utils.helper';
import { AllCourseModulesDataAtom, CourseMetaDataAtom } from '@/state/atoms/courses.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useEffect, useState } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { getChapterDataObject } from './adminCourseComps.helper';

export default function useHandleChapter(modData = null, chapData = null, closePopUp = () => {}) {
  const setToastMessage = useRecoilCallback(({ set }) => (message = '', type = 'danger') => {
    set(ToastMsgAtom, { type, message });
  });
  const courseMetaData = useRecoilValue(CourseMetaDataAtom);
  const [allModules, setAllModules] = useRecoilState(AllCourseModulesDataAtom);

  const [chapterData, setChapterData] = useState(
    getChapterDataObject({
      courseId: courseMetaData?.id,
      moduleId: modData?.id,
      sequence: modData?.chapters?.length + 1
    })
  );

  useEffect(() => {
    if (!chapData?.id) return;

    setChapterData(getChapterDataObject(chapData));
  }, [chapData]);

  async function addUpdateChapter(e) {
    const isNameSame = !!modData?.chapters?.find(
      (chap) => chap?.id !== chapterData?.id && isWordSame(chap?.name, chapterData?.name)
    );
    if (isNameSame) return setToastMessage('Chapter with same name already exists in this module');

    e.target.disabled = true;

    const sendData = sanitizeFormData(chapterData);
    // add new module
    if (!chapterData?.id) {
      mutateData(ADD_COURSE_CHAPTER, sendData)
        .then((res) => {
          if (!res?.addCourseChapter) return setToastMessage('Chapter Create Error');

          const _allModules = structuredClone(allModules);
          const index = _allModules?.findIndex((m) => m?.id === modData?.id);
          if (index < 0) return;

          _allModules?.[index]?.chapters?.push(res?.addCourseChapter);
          setAllModules(_allModules);
        })
        .catch(() => setToastMessage('Chapter Create Error'))
        .finally(() => closePopUp());
      return;
    }

    // update module
    mutateData(UPDATE_COURSE_CHAPTER, sendData)
      .then((res) => {
        if (!res?.updateCourseChapter) return setToastMessage('Chapter Update Error');

        const _allModules = structuredClone(allModules);
        const index = _allModules?.findIndex((m) => m?.id === modData?.id);
        if (index < 0) return;

        const updatedChap = res?.updateCourseChapter;
        _allModules[index].chapters = _allModules?.[index]?.chapters?.map((chap) =>
          chap?.id === updatedChap?.id ? updatedChap : chap
        );
        setAllModules(_allModules);
      })
      .catch(() => setToastMessage('Chapter Update Error'))
      .finally(() => closePopUp());
  }

  return { chapterData, setChapterData, addUpdateChapter };
}
