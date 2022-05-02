import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { UPDATE_COURSE_MODULE } from '../../../API/Mutations';
import { getNewModuleObject } from './courseTopics.helper';

export default function useEditModule(moduleContextData) {
  const { module: moduleData, addAndUpdateModule } = moduleContextData;

  const [currentModule, setCurrentModule] = useState(getNewModuleObject());
  const [isEditModuleReady, setIsEditModuleReady] = useState(false);

  const [updateCourseModule] = useMutation(UPDATE_COURSE_MODULE);
  const [isEditPopUpOpen, setIsEditPopUpOpen] = useState(false);

  useEffect(() => {
    setIsEditModuleReady(
      currentModule.name !== '' && currentModule.level !== '' && currentModule.description !== ''
    );
  }, [currentModule]);

  function toggleEditPopUp() {
    setIsEditPopUpOpen(!isEditPopUpOpen);
  }

  function activateEditModule(moduleId) {
    const index = moduleData.findIndex((mod) => mod.id === moduleId);

    setCurrentModule(moduleData[index]);
    setIsEditPopUpOpen(true);
  }

  function handleEditInput(e) {
    let value = e.target.value;
    if (e.target.type === 'checkbox') {
      value = e.target.checked;
    }

    setCurrentModule({
      ...currentModule,
      [e.target.name]: value
    });
  }

  function handleEditSubmit() {
    console.log(currentModule);
    updateCourseModule({
      variables: {
        ...currentModule
      }
    }).then((res) => {
      setCurrentModule({});
      addAndUpdateModule(res.data.updateCourseModule);
    });

    setIsEditPopUpOpen(false);
  }

  return {
    activateEditModule,
    isEditPopUpOpen,
    toggleEditPopUp,
    currentModule,
    isEditModuleReady,
    handleEditInput,
    handleEditSubmit
  };
}
