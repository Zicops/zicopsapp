import { courseErrorAtom, getCourseErrorData } from '@/state/atoms/module.atoms';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { ToastMsgAtom } from '../../../state/atoms/toast.atom';
import { CourseTabAtom, tabData } from './tabs.helper';

export default function useHandleTabs(courseContextData) {
  const {
    fullCourse,
    updateCourseMaster,
    courseVideo,
    setCourseVideo,
    courseImage,
    setCourseImage,
    courseTileImage,
    setCourseTileImage
  } = courseContextData;

  // recoil state
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [tab, setTab] = useRecoilState(CourseTabAtom);
  const [courseError, setCourseError] = useRecoilState(courseErrorAtom);

  const [fileData, setFileData] = useState({});
  const [isPreviewPopUpOpen, setIsPreviewPopUpOpen] = useState(false);
  const [previewFileData, setPreviewFileData] = useState(null);

  // useEffect(() => {
  //   if (courseError?.activeTab === tab) return;
  //   setCourseError(getCourseErrorData({ activeTab: tab }));
  // }, []);

  useEffect(() => {
    setCouseIdForFileContext();

    setFileData({
      myfile: courseImage.file?.name || getFileNameFromUrl(fullCourse.image, 'img'),
      uploadCourseImage:
        courseTileImage.file?.name || getFileNameFromUrl(fullCourse.tileImage, 'til'),
      uploadCourseVideo:
        courseVideo.file?.name || getFileNameFromUrl(fullCourse.previewVideo, 'vid')
    });
  }, [fullCourse]);

  // useEffect(() => {
  //   if (!courseError?.activeTab) return setCourseError(getCourseErrorData({ activeTab: tab }));
  //   const _courseError = structuredClone(courseError);
  //   let _tab = _courseError?.activeTab;

  //   if (tab?.toLowerCase()?.trim()?.includes('master')) {
  //     const isFormFilled =
  //       !!fullCourse?.name &&
  //       !!fullCourse?.category?.length &&
  //       !!fullCourse?.sub_category?.length &&
  //       !!fullCourse?.owner?.length &&
  //       !!+fullCourse?.language?.length;
  //     _courseError.master = isFormFilled;
  //     if (isFormFilled) _tab = tab;
  //   }

  //   _courseError.activeTab = _tab;
  //   setCourseError(_courseError);
  //   setTab(_tab);
  // }, [tab]);

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

    return fileUrl;
  }

  function togglePreviewPopUp(fileName, filePath, isVideo) {
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
      return;
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
        upload: -1,
        file: null,
        courseId: fullCourse.id
      });
    } else if (name === 'uploadCourseImage') {
      contextName = 'tileImage';
      setCourseTileImage({
        ...courseTileImage,
        upload: -1,
        file: null,
        courseId: fullCourse.id
      });
    } else if (name === 'uploadCourseVideo') {
      contextName = 'previewVideo';
      setCourseVideo({
        upload: -1,
        file: null,
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

  function handleChange(e) {
    if (e.target.type === 'checkbox') {
      if (e.target.name.includes('is_')) {
        // toggle button
        updateCourseMaster({
          ...fullCourse,
          [e.target.name]: e.target.checked
        });
        return;
      }

      // expertise level beginner, competent and proficient
      return handleExpertise(e);
    }

    // image and video file
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
    if (!fullCourse.id) {
      setTab(tabData[0].name);
      setToastMsg({ type: 'danger', message: 'Add Course Master First' });
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

    e.target.value = '';
    setFileData({
      ...fileData,
      [e.target.name]: fileDisplayValue
    });
  }

  return {
    fullCourse,
    fileData,
    handleChange,
    updateCourseMaster,
    togglePreviewPopUp,
    previewFileData,
    removeSavedFile
  };
}
