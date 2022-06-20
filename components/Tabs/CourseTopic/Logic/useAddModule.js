import { useMutation } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ADD_COURSE_MODULE } from '../../../../API/Mutations';
import { getModuleObject, ModuleAtom } from '../../../../state/atoms/module.atoms';
import { PopUpStatesAtomFamily } from '../../../../state/atoms/popUp.atom';
import { ToastMsgAtom } from '../../../../state/atoms/toast.atom';
import { courseContext } from '../../../../state/contexts/CourseContext';
import { IsDataPresentAtom } from '../../../common/PopUp/Logic/popUp.helper';

export default function useAddModule(refetchDataAndUpdateRecoil) {
  const { fullCourse } = useContext(courseContext);
  const [createCourseModule, { loading, error }] = useMutation(ADD_COURSE_MODULE);

  // recoil state
  const moduleData = useRecoilValue(ModuleAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [isPopUpDataPresent, setIsPopUpDataPresent] = useRecoilState(IsDataPresentAtom);
  const [addModulePopUp, setAddModulePopUp] = useRecoilState(PopUpStatesAtomFamily('addModule'));

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
    setIsPopUpDataPresent(
      !!newModuleData.name || !!newModuleData.level || !!newModuleData.description
    );
  }, [newModuleData]);

  // reset state
  useEffect(() => {
    if (isPopUpDataPresent) return;

    setNewModuleData(getModuleObject({ courseId: fullCourse.id, sequence: moduleData.length + 1 }));
  }, [isPopUpDataPresent]);

  // udpate sequence number with recoil state is updated
  useEffect(() => {
    setNewModuleData({
      ...newModuleData,
      sequence: moduleData.length + 1
    });
  }, [moduleData]);

  // save course in database
  async function addNewModule() {
    // save in db
    let isError = false;
    await createCourseModule({ variables: { ...newModuleData } }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Module Create Error' });
    });

    if (error) return setToastMsg({ type: 'danger', message: 'Module Create Error' });

    refetchDataAndUpdateRecoil('module');

    setNewModuleData(getModuleObject({ courseId: fullCourse.id, sequence: moduleData.length + 1 }));
    setAddModulePopUp(false);
    if (!isError) setToastMsg({ type: 'success', message: 'New Module Created' });
  }

  return {
    newModuleData,
    setNewModuleData,
    isAddModuleReady,
    addNewModule
  };
}
