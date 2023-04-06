import { CUSTOM_ERROR_MESSAGE } from '@/helper/constants.helper';
import { useMutation } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { UPDATE_COURSE_MODULE } from '../../../../API/Mutations';
import { getModuleObject, ModuleAtom } from '../../../../state/atoms/module.atoms';
import { ToastMsgAtom } from '../../../../state/atoms/toast.atom';
import { courseContext } from '../../../../state/contexts/CourseContext';
import { IsDataPresentAtom } from '../../../common/PopUp/Logic/popUp.helper';

export default function useEditModule(refetchDataAndUpdateRecoil) {
  const { fullCourse } = useContext(courseContext);
  const [updateCourseModule, { loading, error }] = useMutation(UPDATE_COURSE_MODULE);

  // recoil state
  const moduleData = useRecoilValue(ModuleAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [isPopUpDataPresent, setIsPopUpDataPresent] = useRecoilState(IsDataPresentAtom);

  const [editModule, setEditModule] = useState(getModuleObject({ courseId: fullCourse.id }));
  const [isEditModuleReady, setIsEditModuleReady] = useState(false);

  // disable submit button if data is incomplete
  useEffect(() => {
    setIsEditModuleReady(
      !!editModule?.name?.trim() && !!editModule?.level && !!editModule?.description?.trim()
    );
    setIsPopUpDataPresent(
      !!editModule?.name?.trim() || !!editModule?.level || !!editModule?.description?.trim()
    );
  }, [editModule]);

  // set local state to edit module data for form
  function activateEditModule(moduleId) {
    const index = moduleData.findIndex((mod) => mod.id === moduleId);

    if (index < 0) return;

    setEditModule(moduleData[index]);
  }

  // save to db and update context with refetch
  async function handleEditModuleSubmit() {
    setIsEditModuleReady(false);
    if (
      !!moduleData
        ?.filter(
          (mod) => mod?.name?.trim()?.toLowerCase() === editModule?.name?.trim()?.toLowerCase()
        )
        ?.filter((mod) => mod?.id !== editModule?.id)?.length > 0
    )
      return setToastMsg({
        type: 'danger',
        message: 'Module with same name already exists in this course'
      });

    let isError = false;
    // save in db
    if (editModule?.isUpdated) {
      await updateCourseModule({
        variables: {
          ...editModule,
          name: editModule?.name?.trim(),
          description: editModule?.description?.trim()
        }
      }).catch((err) => {
        if (err?.message?.includes(CUSTOM_ERROR_MESSAGE?.nothingToUpdate)) return;

        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Module Update Error' });
      });

      if (error) return setToastMsg({ type: 'danger', message: 'Module Update Error' });

      refetchDataAndUpdateRecoil('module');
    }

    setIsPopUpDataPresent(false);
    // reset local data and close module
    setEditModule(null);
    if (!isError) setToastMsg({ type: 'success', message: 'Module Updated' });
  }

  return {
    editModule,
    setEditModule,
    activateEditModule,
    isEditModuleReady,
    handleEditModuleSubmit
  };
}
