import { useMutation } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { UPDATE_COURSE_CHAPTER } from '../../../../API/Mutations';
import { ChapterAtom, getChapterObject } from '../../../../state/atoms/module.atoms';
import { courseContext } from '../../../../state/contexts/CourseContext';

export default function useEditChapter(togglePopUp, refetchDataAndUpdateRecoil) {
  const { fullCourse } = useContext(courseContext);

  const [updateCourseChapter, { loading, error }] = useMutation(UPDATE_COURSE_CHAPTER);

  // recoil state
  const chapterData = useRecoilValue(ChapterAtom);

  // local state
  const [editChapter, setEditChapter] = useState(getChapterObject({ courseId: fullCourse.id }));
  const [isEditChapterReady, setIsEditChapterReady] = useState(false);

  // disable submit button if data is incomplete
  useEffect(() => {
    setIsEditChapterReady(!!editChapter.name && !!editChapter.description);
  }, [editChapter]);

  // set local state to edit chapter data for form
  function activateEditChapter(chapterId) {
    const index = chapterData.findIndex((chap) => chap.id === chapterId);

    if (index < 0) return;

    setEditChapter(chapterData[index]);
    togglePopUp('editChapter', true);
  }

  // update local state which will be saved in db and context on submit
  function handleEditChapterInput(e) {
    setEditChapter({
      ...editChapter,
      [e.target.name]: e.target.value
    });
  }

  // save to db and update context with refetch
  async function handleEditChapterSubmit() {
    console.log(editChapter);
    // save in db
    await updateCourseChapter({ variables: { ...editChapter } });

    if (error) return alert('Chapter Update Error');

    refetchDataAndUpdateRecoil('chapter');

    // reset local data and close module
    setEditChapter(getChapterObject({ courseId: fullCourse.id }));
    togglePopUp('editChapter', false);
  }

  return {
    editChapter,
    activateEditChapter,
    isEditChapterReady,
    handleEditChapterInput,
    handleEditChapterSubmit
  };
}
