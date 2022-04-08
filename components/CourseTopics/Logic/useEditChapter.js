import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { UPDATE_COURSE_CHAPTER } from '../../../API/Mutations';
import { getNewChapterObject } from './courseTopics.helper';

export default function useEditChapter(moduleContextData) {
  const { chapter, addAndUpdateChapter } = moduleContextData;

  const [currentChapter, setCurrentChapter] = useState(getNewChapterObject());
  const [isEditChapterReady, setIsEditChapterReady] = useState(false);

  const [updateCourseChapter] = useMutation(UPDATE_COURSE_CHAPTER);
  const [isEditChapterPopUpOpen, setIsEditChapterPopUpOpen] = useState(false);

  useEffect(() => {
    setIsEditChapterReady(
      currentChapter.name !== '' && currentChapter.level !== '' && currentChapter.description !== ''
    );
  }, [currentChapter]);

  function toggleEditChapterPopUp() {
    setIsEditChapterPopUpOpen(!isEditChapterPopUpOpen);
  }

  function activateEditChapter(chapterId) {
    const index = chapter.findIndex((c) => c.id === chapterId);

    setCurrentChapter(chapter[index]);
    setIsEditChapterPopUpOpen(true);
  }

  function handleEditChapterInput(e) {
    setCurrentChapter({
      ...currentChapter,
      [e.target.name]: e.target.value
    });
  }

  function handleEditChapterSubmit() {
    console.log(currentChapter);
    updateCourseChapter({
      variables: {
        ...currentChapter
      }
    }).then((res) => {
      setCurrentChapter(getNewChapterObject());
      addAndUpdateChapter(res.data.updateCourseChapter);
    });

    setIsEditChapterPopUpOpen(false);
  }

  return {
    activateEditChapter,
    isEditChapterPopUpOpen,
    toggleEditChapterPopUp,
    currentChapter,
    isEditChapterReady,
    handleEditChapterInput,
    handleEditChapterSubmit
  };
}
