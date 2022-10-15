import { CUSTOM_ERROR_MESSAGE } from '@/helper/constants.helper';
import { useMutation } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { UPDATE_COURSE_CHAPTER } from '../../../../API/Mutations';
import { ChapterAtom, getChapterObject } from '../../../../state/atoms/module.atoms';
import { ToastMsgAtom } from '../../../../state/atoms/toast.atom';
import { courseContext } from '../../../../state/contexts/CourseContext';
import { IsDataPresentAtom } from '../../../common/PopUp/Logic/popUp.helper';

export default function useEditChapter(refetchDataAndUpdateRecoil) {
  const { fullCourse } = useContext(courseContext);

  const [updateCourseChapter, { loading, error }] = useMutation(UPDATE_COURSE_CHAPTER);

  // recoil state
  const chapterData = useRecoilValue(ChapterAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [isPopUpDataPresent, setIsPopUpDataPresent] = useRecoilState(IsDataPresentAtom);

  // local state
  const [editChapter, setEditChapter] = useState(getChapterObject({ courseId: fullCourse.id }));
  const [isEditChapterReady, setIsEditChapterReady] = useState(false);

  // disable submit button if data is incomplete
  useEffect(() => {
    setIsEditChapterReady(!!editChapter?.name?.trim() && !!editChapter?.description);
    setIsPopUpDataPresent(!!editChapter?.name?.trim() || !!editChapter?.description);
  }, [editChapter]);

  // set local state to edit chapter data for form
  function activateEditChapter(chapterId) {
    const index = chapterData.findIndex((chap) => chap.id === chapterId);

    if (index < 0) return;

    setEditChapter(chapterData[index]);
  }

  // save to db and update context with refetch
  async function handleEditChapterSubmit() {
    setIsEditChapterReady(false);
    if (
      !!chapterData
        ?.filter((chap) => chap?.moduleId === editChapter?.moduleId)
        ?.filter(
          (chap) => chap?.name?.trim()?.toLowerCase() === editChapter?.name?.trim()?.toLowerCase()
        )
        ?.filter((chap) => chap?.id !== editChapter?.id)?.length > 0
    )
      return setToastMsg({
        type: 'danger',
        message: 'Chapter with same name already exists in this module'
      });

    let isError = false;
    if (editChapter?.isUpdated) {
      // save in db
      await updateCourseChapter({
        variables: {
          ...editChapter,
          name: editChapter?.name?.trim(),
          description: editChapter?.description?.trim()
        }
      }).catch((err) => {
        if (err?.message?.includes(CUSTOM_ERROR_MESSAGE?.nothingToUpdate)) return;

        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Chapter Update Error' });
      });

      if (error) return setToastMsg({ type: 'success', message: 'Chapter Update Error' });

      refetchDataAndUpdateRecoil('chapter');
    }
    setIsPopUpDataPresent(false);
    // reset local data and close module
    setEditChapter(null);
    if (!isError) setToastMsg({ type: 'success', message: 'Chapter Updated' });
  }

  return {
    editChapter,
    setEditChapter,
    activateEditChapter,
    isEditChapterReady,
    handleEditChapterSubmit
  };
}
