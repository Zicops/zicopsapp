import { useMutation } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ADD_COURSE_CHAPTER } from '../../../../API/Mutations';
import { ChapterAtom, getChapterObject } from '../../../../state/atoms/module.atoms';
import { courseContext } from '../../../../state/contexts/CourseContext';

export default function useAddChapter(togglePopUp, refetchDataAndUpdateRecoil) {
  const { fullCourse } = useContext(courseContext);

  const [createCourseChapter, { loading, error }] = useMutation(ADD_COURSE_CHAPTER);

  // recoil state
  const chapterData = useRecoilValue(ChapterAtom);

  // local states
  const [isAddChapterReady, setIsAddChapterReady] = useState(false);
  const [newChapterData, setNewChapterData] = useState(
    getChapterObject({ courseId: fullCourse.id, sequence: chapterData.length + 1 })
  );

  // disable save button if data is not correct
  useEffect(() => {
    setIsAddChapterReady(!!newChapterData.name && !!newChapterData.description);
  }, [newChapterData]);

  // udpate sequence number with recoil state is updated
  useEffect(() => {
    setNewChapterData({
      ...newChapterData,
      sequence: chapterData.length + 1
    });
  }, [chapterData]);

  // set module id on add chapter button click
  function constructChapterData(courseId, moduleId, sequence) {
    setNewChapterData(getChapterObject({ courseId, moduleId, sequence }));

    togglePopUp('addChapter', true);
  }

  // update local state which will be later saved in database on submit

  function handleChapterInput(e) {
    setNewChapterData({
      ...newChapterData,
      [e.target.name]: e.target.value
    });
  }

  // save course in database
  async function addNewChapter() {
    console.log(newChapterData);
    await createCourseChapter({ variables: { ...newChapterData } });

    if (error) return alert('Chapter Create Error');

    refetchDataAndUpdateRecoil('chapter');

    setNewChapterData(
      getChapterObject({ courseId: fullCourse.id, sequence: chapterData.length + 1 })
    );
    togglePopUp('addChapter', false);
    alert('New Chapter Created');
  }

  return {
    newChapterData,
    isAddChapterReady,
    constructChapterData,
    handleChapterInput,
    addNewChapter
  };
}
