import { useMutation } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { UPDATE_COURSE_MODULE } from '../../../../API/Mutations';
import { getModuleObject, ModuleAtom } from '../../../../state/atoms/module.atoms';
import { ToastMsgAtom } from '../../../../state/atoms/toast.atom';
import { courseContext } from '../../../../state/contexts/CourseContext';

export default function useEditModule(togglePopUp, refetchDataAndUpdateRecoil) {
  const { fullCourse } = useContext(courseContext);
  const [updateCourseModule, { loading, error }] = useMutation(UPDATE_COURSE_MODULE);

  // recoil state
  const moduleData = useRecoilValue(ModuleAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const [editModule, setEditModule] = useState(getModuleObject({ courseId: fullCourse.id }));
  const [isEditModuleReady, setIsEditModuleReady] = useState(false);

  // disable submit button if data is incomplete
  useEffect(() => {
    setIsEditModuleReady(!!editModule.name && !!editModule.level && !!editModule.description);
  }, [editModule]);

  // set local state to edit module data for form
  function activateEditModule(moduleId) {
    const index = moduleData.findIndex((mod) => mod.id === moduleId);

    if (index < 0) return;

    setEditModule(moduleData[index]);
    togglePopUp('editModule', true);
  }

  // save to db and update context with refetch
  async function handleEditModuleSubmit() {
    let isError = false;
    // save in db
    await updateCourseModule({ variables: { ...editModule } }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Module Update Error' });
    });

    if (error) return setToastMsg({ type: 'danger', message: 'Module Update Error' });

    refetchDataAndUpdateRecoil('module');

    // reset local data and close module
    setEditModule(getModuleObject({ courseId: fullCourse.id }));
    if (!isError) setToastMsg({ type: 'success', message: 'Module Updated' });

    togglePopUp('editModule', false);
  }

  return {
    editModule,
    setEditModule,
    activateEditModule,
    isEditModuleReady,
    handleEditModuleSubmit
  };
}
