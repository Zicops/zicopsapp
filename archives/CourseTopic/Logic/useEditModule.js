import { useMutation } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { UPDATE_COURSE_MODULE } from '../../../API/Mutations';
import { getModuleObject, ModuleAtom } from '../../../state/atoms/module.atoms';
import { courseContext } from '../../../state/contexts/CourseContext';

export default function useEditModule(togglePopUp, refetchDataAndUpdateRecoil) {
  const { fullCourse } = useContext(courseContext);
  const [updateCourseModule, { loading, error }] = useMutation(UPDATE_COURSE_MODULE);

  const moduleData = useRecoilValue(ModuleAtom);

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

  // update local state which will be saved in db and context on submit
  function handleEditModuleInput(e) {
    let value = e.target.value;
    if (e.target.type === 'checkbox') {
      value = e.target.checked;
    }

    setEditModule({
      ...editModule,
      [e.target.name]: value
    });
  }

  // save to db and update context with refetch
  async function handleEditModuleSubmit() {
    console.log(editModule);
    // save in db
    await updateCourseModule({ variables: { ...editModule } });

    if (error) return alert('Module Update Error');

    refetchDataAndUpdateRecoil('module');

    // reset local data and close module
    setEditModule(getModuleObject({ courseId: fullCourse.id }));
    togglePopUp('editModule', false);
  }

  return {
    editModule,
    activateEditModule,
    isEditModuleReady,
    handleEditModuleInput,
    handleEditModuleSubmit
  };
}
