import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { ADD_COURSE_MODULE } from '../../../API/Mutations';
import { tabData } from '../../Tabs/Logic/tabs.helper';
import { getNewModuleObject } from './courseTopics.helper';

export default function useAddModule(courseContextData, moduleContextData) {
  const { fullCourse, setTab } = courseContextData;
  const { module, addAndUpdateModule } = moduleContextData;
  const [createCourseModule] = useMutation(ADD_COURSE_MODULE);

  const [isAddModulePopUpOpen, setIsAddModulePopUpOpen] = useState(false);

  const [isAddModuleReady, setIsAddModuleReady] = useState(false);
  const [newModule, setNewModule] = useState(getNewModuleObject(fullCourse.id));

  useEffect(() => {
    setIsAddModuleReady(
      newModule.name !== '' && newModule.level !== '' && newModule.description !== ''
    );
  }, [newModule]);

  useEffect(() => {
    setNewModule({
      ...newModule,
      sequence: module.length + 1
    });
  }, [module]);

  function toggleAddModulePopUp() {
    if (!fullCourse.id) {
      setTab(tabData[0].name);
      alert('Add course first');
    }

    setIsAddModulePopUpOpen((isOpen) => !isOpen);
  }

  function handleModuleInput(e) {
    let value = e.target.value;
    if (e.target.type === 'checkbox') {
      value = e.target.checked;
    }
    setNewModule({
      ...newModule,
      [e.target.name]: value
    });
  }

  function addNewModule() {
    createCourseModule({
      variables: {
        ...newModule
      }
    }).then((res) => {
      // TODO: check if previous data is clearing
      setNewModule(getNewModuleObject(fullCourse.id));
      addAndUpdateModule(res.data.addCourseModule);
    });

    setIsAddModulePopUpOpen(false);
  }

  return {
    newModule,
    addNewModule,
    toggleAddModulePopUp,
    isAddModulePopUpOpen,
    isAddModuleReady,
    handleModuleInput
  };
}
