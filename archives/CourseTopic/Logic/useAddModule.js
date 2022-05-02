import { useMutation } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ADD_COURSE_MODULE } from '../../../API/Mutations';
import { getModuleObject, ModuleAtom } from '../../../state/atoms/module.atoms';
import { courseContext } from '../../../state/contexts/CourseContext';

export default function useAddModule(togglePopUp, refetchDataAndUpdateRecoil) {
  const { fullCourse } = useContext(courseContext);
  const [createCourseModule, { loading, error }] = useMutation(ADD_COURSE_MODULE);

  // recoil state
  const moduleData = useRecoilValue(ModuleAtom);

  // local states
  const [isAddModuleReady, setIsAddModuleReady] = useState(false);
  const [newModuleData, setNewModuleData] = useState(
    getModuleObject({ courseId: fullCourse.id, sequence: moduleData.length + 1 })
  );

  // disable save button if data is not correct
  useEffect(() => {
    setIsAddModuleReady(
      !!newModuleData.name && !!newModuleData.level && !!newModuleData.description
    );
  }, [newModuleData]);

  // udpate sequence number with recoil state is updated
  useEffect(() => {
    setNewModuleData({
      ...newModuleData,
      sequence: moduleData.length + 1
    });
  }, [moduleData]);

  // update local state which will be later saved in database on submit
  function handleModuleInput(e) {
    let value = e.target.value;
    if (e.target.type === 'checkbox') {
      value = e.target.checked;
    }

    setNewModuleData({
      ...newModuleData,
      [e.target.name]: value
    });
  }

  // save course in database
  async function addNewModule() {
    // save in db
    await createCourseModule({ variables: { ...newModuleData } });

    if (error) return alert('Module Create Error');

    refetchDataAndUpdateRecoil('module');

    setNewModuleData(getModuleObject({ courseId: fullCourse.id, sequence: moduleData.length + 1 }));
    togglePopUp('addModule', false);
    alert('New Module Created');
  }

  return {
    newModuleData,
    handleModuleInput,
    isAddModuleReady,
    addNewModule
  };
}
