import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
  ADD_COURSE,
  UPDATE_COURSE,
  UPLOAD_COURSE_IMAGE,
  UPLOAD_COURSE_PREVIEW,
  UPLOAD_COURSE_TILE_IMAGE
} from '../../../API/Mutations';
import { createCourseAndUpdateContext } from '../../../helper/data.helper';
import { ToastMsgAtom } from '../../../state/atoms/toast.atom';
import { CourseTabAtom, isCourseUploadingAtom, tabData } from './tabs.helper';

export default function useSaveCourse(courseContextData) {
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

  const [createCourse, { loading: addCourseLoading }] = useMutation(ADD_COURSE);
  const [uploadImage, { loading: uploadImageLoading }] = useMutation(UPLOAD_COURSE_IMAGE);
  const [uploadTileImage, { loading: uploadTileLoading }] = useMutation(UPLOAD_COURSE_TILE_IMAGE);
  const [uploadPreview, { loading: uploadPreviewLoading }] = useMutation(UPLOAD_COURSE_PREVIEW);
  const [updateCourse, { loading: udpateCourseLoading }] = useMutation(UPDATE_COURSE);

  const [isLoading, setIsLoading] = useRecoilState(isCourseUploadingAtom);
  const [tab, setTab] = useRecoilState(CourseTabAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  useEffect(() => {
    console.log(tab);
    if (tab === tabData[0].name) return;

    // saveCourseData();
  }, [tab]);

  async function saveCourseData(isNextButton, tabIndex, showToastMsg = true) {
    setIsLoading(!fullCourse.id ? 'SAVING...' : 'UPDATING...');

    if (!fullCourse.id) {
      createCourseAndUpdateContext(courseContextData, createCourse);
      setIsLoading(addCourseLoading ? 'SAVING...' : null);

      if (isNextButton) setTab(tabData[tabIndex || 0].name);
      return;
    }
    // alert('course update started');

    await uploadFile(courseImage, uploadImage, 'image', 'uploadCourseImage');
    await uploadFile(courseTileImage, uploadTileImage, 'tileImage', 'uploadCourseTileImage');
    await uploadFile(courseVideo, uploadPreview, 'previewVideo', 'uploadCoursePreviewVideo');

    console.log('var', fullCourse);
    const courseUpdateResponse = await updateCourse({
      variables: fullCourse
    });

    updateCourseMaster(courseUpdateResponse.data.updateCourse);

    setIsLoading(
      udpateCourseLoading && uploadImageLoading && uploadTileLoading && uploadPreviewLoading
        ? 'UPDATING...'
        : null
    );

    if (showToastMsg) setToastMsg({ type: 'success', message: 'Course Updated' });
    console.log('course updated', fullCourse, courseUpdateResponse.data.updateCourse);

    if (isNextButton) setTab(tabData[tabIndex || 0].name);
  }

  async function uploadFile(fileData, fileUploadMutation, fileNameInContext, fileDataName) {
    console.log(fileData, !fileData.file || !fileData.upload);
    if (!fileData.file || !fileData.upload) return;

    const fileUploadRespone = await fileUploadMutation({
      variables: fileData
    });

    if (!fileUploadRespone.data[fileDataName].success) {
      console.log('File Upload Failed: ', fileNameInContext);
      return;
    }

    await updateCourseMaster({
      ...fullCourse,
      [fileNameInContext]: fileUploadRespone.data[fileDataName].url
    });

    if (fileDataName === 'uploadCoursePreviewVideo') {
      await setCourseVideo({
        ...courseVideo,
        upload: 0,
        file: null
      });
    } else if (fileDataName === 'uploadCourseImage') {
      await setCourseImage({
        ...courseImage,
        upload: 0,
        file: null
      });
    } else if (fileDataName === 'uploadCourseTileImage') {
      await setCourseTileImage({
        ...courseTileImage,
        upload: 0,
        file: null
      });
    }
  }

  return { fullCourse, saveCourseData };
}
