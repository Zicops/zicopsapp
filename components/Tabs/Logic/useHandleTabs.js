import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ADD_COURSE } from '../../../API/Mutations';
import { GET_COURSE } from '../../../API/Queries';
import { getQueryData } from '../../../helper/api.helper';
import { createCourseAndUpdateContext } from '../../../helper/data.helper';
import { tabData } from './tabs.helper';

export default function useHandleTabs(courseContextData) {
  const {
    fullCourse,
    tab,
    setTab,
    updateCourseMaster,
    courseVideo,
    setCourseVideo,
    courseImage,
    setCourseImage,
    courseTileImage,
    setCourseTileImage,
    isDataLoaded,
    setIsDataLoaded
  } = courseContextData;

  const router = useRouter();
  const { query: courseId } = router;
  const editCourseId = courseId.courseId || null;
  const { data: courseData } = getQueryData(GET_COURSE, { course_id: editCourseId });

  const [createCourse, { loading, error, data }] = useMutation(ADD_COURSE);
  const [fileData, setFileData] = useState({});

  useEffect(() => {
    if (courseData?.getCourse && !isDataLoaded) {
      updateCourseMaster(courseData.getCourse);

      setIsDataLoaded(true);
    }
  }, [courseData]);

  useEffect(() => {
    setCouseIdForFileContext();
    
    console.log(fullCourse);
  }, [fullCourse]);

  function setCouseIdForFileContext(e) {
    setCourseImage({
      ...courseImage,
      courseId: fullCourse.id || ''
    });
    setCourseTileImage({
      ...courseTileImage,
      courseId: fullCourse.id || ''
    });
    setCourseVideo({
      ...courseVideo,
      courseId: fullCourse.id || ''
    });
  }

  function showActiveTab(tab) {
    const index = tabData.findIndex((t) => {
      return t.name === tab;
    });

    if (index >= 0) return tabData[index].component;
    return tabData[0].component;
  }

  function handleChange(e) {
    if (e.target.type === 'checkbox') {
      return handleExpertise(e);
    }
    if (e.target.type === 'file') {
      return handleFileInput(e);
    }
    console.log(e.target.name, e.target.value)

    updateCourseMaster({
      ...fullCourse,
      [e.target.name]: e.target.value
    });
  }

  function handleExpertise(e) {
    const trimmedInput = e.target.value.trim();
    let expertiseLevel = '';
    const expertiseLevelArr = courseContextData.fullCourse[e.target.name]
      .split(',')
      .filter((el) => el);

    if (e.target.checked) {
      expertiseLevelArr.push(trimmedInput);
      expertiseLevel = expertiseLevelArr.join(',');
    } else if (trimmedInput.length && !expertiseLevel.includes(trimmedInput)) {
      expertiseLevel = expertiseLevelArr.filter((el) => el !== trimmedInput).join(',');
    }

    console.log(expertiseLevel);
    updateCourseMaster({
      ...fullCourse,
      [e.target.name]: expertiseLevel
    });
  }

  function handleFileInput(e) {
    if (!fullCourse.id) {
      setTab(tabData[0].name);
      alert('Add Course Master First');
      return;
    }

    console.log(e.target.files);
    let fileDisplayValue = e.target.files[0].name;
    let acceptedType = [];

    if (e.target.name === 'myfile') {
      acceptedType = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];

      if (acceptedType.includes(e.target.files[0].type)) {
        setCourseImage({
          ...courseImage,
          upload: 1,
          file: e.target.files[0]
        });
      } else {
        e.target.value = '';
        fileDisplayValue = 'Only .png, .jpg, .jpeg, .gif is allowed';
      }
    } else if (e.target.name === 'uploadCourseImage') {
      acceptedType = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];

      if (acceptedType.includes(e.target.files[0].type)) {
        setCourseTileImage({
          ...courseTileImage,
          upload: 1,
          file: e.target.files[0]
        });
      } else {
        e.target.value = '';
        fileDisplayValue = 'Only .png, .jpg, .jpeg, .gif is allowed';
      }
    } else if (e.target.name === 'uploadCourseVideo') {
      acceptedType = ['video/mp4'];

      if (acceptedType.includes(e.target.files[0].type)) {
        setCourseVideo({
          ...courseVideo,
          upload: 1,
          file: e.target.files[0]
        });
      } else {
        e.target.value = '';
        fileDisplayValue = 'Only .mp4 is allowed';
      }
    }

    setFileData({
      ...fileData,
      [e.target.name]: fileDisplayValue
    });
  }

  function saveCourseMasterTabDetails() {
    createCourseAndUpdateContext(courseContextData, createCourse);
  }

  return {
    fullCourse,
    tabData,
    showActiveTab,
    tab,
    setTab,
    fileData,
    handleChange,
    saveCourseMasterTabDetails,
    updateCourseMaster
  };
}
