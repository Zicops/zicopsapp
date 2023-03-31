import { ADD_COURSE_MODULE, UPDATE_COURSE_MODULE } from '@/api/Mutations';
import { mutateData } from '@/helper/api.helper';
import { sanitizeFormData } from '@/helper/common.helper';
import { isWordSame } from '@/helper/utils.helper';
import { AllCourseModulesDataAtom, CourseMetaDataAtom } from '@/state/atoms/courses.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useEffect, useState } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { getModuleDataObject } from './adminCourseComps.helper';

export default function useHandleModule(modData = null, closePopUp = () => {}) {
  const setToastMessage = useRecoilCallback(({ set }) => (message = '', type = 'danger') => {
    set(ToastMsgAtom, { type, message });
  });
  const courseMetaData = useRecoilValue(CourseMetaDataAtom);
  const [allModules, setAllModules] = useRecoilState(AllCourseModulesDataAtom);

  const [moduleData, setModuleData] = useState(
    getModuleDataObject({ courseId: courseMetaData?.id, sequence: allModules?.length + 1 })
  );

  useEffect(() => {
    if (!modData?.id) return;

    setModuleData(getModuleDataObject(modData));
  }, [modData]);

  async function addUpdateModule(e) {
    const isNameSame = !!allModules?.find(
      (mod) => mod?.id !== moduleData?.id && isWordSame(mod?.name, moduleData?.name)
    );
    if (isNameSame) return setToastMessage('Module with same name already exists in this course');

    e.target.disabled = true;

    const sendData = sanitizeFormData(moduleData);
    // add new module
    if (!moduleData?.id) {
      mutateData(ADD_COURSE_MODULE, sendData)
        .then((res) => {
          if (!res?.addCourseModule) return setToastMessage('Module Create Error');

          setAllModules([...allModules, res?.addCourseModule]);
        })
        .catch(() => setToastMessage('Module Create Error'))
        .finally(() => closePopUp());
      return;
    }

    // update module
    mutateData(UPDATE_COURSE_MODULE, sendData)
      .then((res) => {
        if (!res?.updateCourseModule) return setToastMessage('Module Update Error');

        const updatedMod = res?.updateCourseModule;
        const _allModules = allModules?.map((mod) =>
          mod?.id === updatedMod?.id ? updatedMod : mod
        );
        setAllModules(_allModules);
      })
      .catch(() => setToastMessage('Module Update Error'))
      .finally(() => closePopUp());
  }

  return { moduleData, setModuleData, addUpdateModule };
}
