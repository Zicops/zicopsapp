import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { ADD_COURSE_CHAPTER } from '../../../API/Mutations';
import { getNewChapterObject } from './courseTopics.helper';

export default function useAddChapter(moduleContextData) {
  const { addAndUpdateChapter } = moduleContextData;

  const [isAddChapterReady, setIsAddChapterReady] = useState(false);
  const [isAddChapterPopUpOpen, setIsAddChapterPopUpOpen] = useState(false);
  const [createCourseChapter] = useMutation(ADD_COURSE_CHAPTER);

  const [newChapter, setNewChapter] = useState(getNewChapterObject());

  useEffect(() => {
    setIsAddChapterReady(newChapter.name !== '' && newChapter.description !== '');
  }, [newChapter]);

  function toggleChapterPopUp() {
    setIsAddChapterPopUpOpen(!isAddChapterPopUpOpen);
  }

  function createNewChapterInstance(courseId, moduleId, squenceNumber) {
    setNewChapter(getNewChapterObject(courseId, moduleId, squenceNumber));

    toggleChapterPopUp();
  }

  function handleChapterInput(e) {
    setNewChapter({
      ...newChapter,
      [e.target.name]: e.target.value
    });
  }

  function addNewChapter() {
    console.log(newChapter);
    createCourseChapter({
      variables: {
        ...newChapter
      }
    }).then((d) => {
      addAndUpdateChapter(d.data.addCourseChapter);
      setNewChapter(getNewChapterObject());
      setIsAddChapterPopUpOpen(false);
    });
  }
  return {
    newChapter,
    isAddChapterPopUpOpen,
    isAddChapterReady,
    createNewChapterInstance,
    toggleChapterPopUp,
    handleChapterInput,
    addNewChapter
  };
}
