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
  const [isPreviewPopUpOpen, setIsPreviewPopUpOpen] = useState(false);
  const [previewFileData, setPreviewFileData] = useState(null);

  useEffect(() => {
    if (courseData?.getCourse && !isDataLoaded) {
      updateCourseMaster(courseData.getCourse);

      setIsDataLoaded(true);
    }
  }, [courseData]);

  useEffect(() => {
    setCouseIdForFileContext();

    setFileData({
      myfile: getFileNameFromUrl(fullCourse.image, 'img'),
      uploadCourseImage: getFileNameFromUrl(fullCourse.tileImage, 'til'),
      uploadCourseVideo: getFileNameFromUrl(fullCourse.previewVideo, 'vid')
    });
  }, [fullCourse]);

  function getFileNameFromUrl(fileUrl, type) {
    if (!fileUrl) {
      if (type === 'img') return courseImage?.file?.name;
      if (type === 'vid') return courseVideo?.file?.name;
      if (type === 'til') return courseTileImage?.file?.name;
    }

    return decodeURI(fileUrl.split('?')[0].split('/').pop());
  }

  async function convertFileToUrl(file) {
    if (!file) return '';

    // const reader = new FileReaderSync();
    // let fileUrl = reader.readAsDataURL(file);

    let fileUrl = await new Promise((resolve) => {
      let fileReader = new FileReader();
      fileReader.onload = (e) => resolve(fileReader.result);
      fileReader.readAsDataURL(file);
    });

    console.log(fileUrl);
    return fileUrl;
  }

  console.log(fullCourse);
  console.log(courseVideo);
  function togglePreviewPopUp(fileName, filePath, isVideo) {
    console.log('filepath', filePath);

    setIsPreviewPopUpOpen(!isPreviewPopUpOpen);

    if (typeof filePath === 'object') {
      convertFileToUrl(filePath).then((f) => {
        return setPreviewFileData(
          !isPreviewPopUpOpen
            ? {
                fileName,
                filePath: f,
                isVideo
              }
            : null
        );
      });
    }

    setPreviewFileData(
      !isPreviewPopUpOpen
        ? {
            fileName,
            filePath,
            isVideo
          }
        : null
    );
  }

  function removeSavedFile(name) {
    let contextName = 'image';
    if (name === 'myfile') {
      setCourseImage({
        ...courseImage,
        upload: 0,
        courseId: fullCourse.id
      });
    } else if (name === 'uploadCourseImage') {
      contextName = 'tileImage';
      setCourseTileImage({
        ...courseTileImage,
        upload: 0,
        courseId: fullCourse.id
      });
    } else if (name === 'uploadCourseVideo') {
      contextName = 'previewVideo';
      setCourseVideo({
        upload: 0,
        courseId: fullCourse.id
      });
    }

    updateCourseMaster({
      ...fullCourse,
      [contextName]: ''
    });
    setFileData({
      ...fileData,
      [name]: ''
    });
  }

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
    console.log(e.target.type);
    if (e.target.type === 'checkbox') {
      return handleExpertise(e);
    }
    if (e.target.type === 'file') {
      return handleFileInput(e);
    }
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

    updateCourseMaster({
      ...fullCourse,
      [e.target.name]: expertiseLevel
    });
  }

  function handleFileInput(e) {
    console.log(e.target.files);
    if (!fullCourse.id) {
      setTab(tabData[0].name);
      alert('Add Course Master First');
      return;
    }

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
    updateCourseMaster,
    togglePreviewPopUp,
    previewFileData,
    removeSavedFile
  };
}
