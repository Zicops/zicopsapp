import { useMutation } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ADD_COURSE_CHAPTER } from '../../../../API/Mutations';
import { ChapterAtom, getChapterObject } from '../../../../state/atoms/module.atoms';
import { ToastMsgAtom } from '../../../../state/atoms/toast.atom';
import { courseContext } from '../../../../state/contexts/CourseContext';

export default function useAddChapter(togglePopUp, refetchDataAndUpdateRecoil) {
  const { fullCourse } = useContext(courseContext);

  const [createCourseChapter, { loading, error }] = useMutation(ADD_COURSE_CHAPTER);

  // recoil state
  const chapterData = useRecoilValue(ChapterAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

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

  // save course in database
  async function addNewChapter() {
    let isError = false;
    await createCourseChapter({ variables: { ...newChapterData } }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Chapter Create Error' });
    });

    if (error) return setToastMsg({ type: 'danger', message: 'Chapter Create Error' });

    refetchDataAndUpdateRecoil('chapter');

    setNewChapterData(
      getChapterObject({ courseId: fullCourse.id, sequence: chapterData.length + 1 })
    );
    if (!isError) setToastMsg({ type: 'success', message: 'New Chapter Created' });

    togglePopUp('addChapter', false);
  }

  return {
    newChapterData,
    setNewChapterData,
    isAddChapterReady,
    constructChapterData,
    addNewChapter
  };
}
