import { useMutation } from '@apollo/client';
import {
  ADD_COURSE,
  UPDATE_COURSE,
  UPLOAD_COURSE_IMAGE,
  UPLOAD_COURSE_PREVIEW,
  UPLOAD_COURSE_TILE_IMAGE
} from '../../../API/Mutations';
import { createCourseAndUpdateContext } from '../../../helper/data.helper';

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

  const [createCourse] = useMutation(ADD_COURSE);
  const [uploadImage] = useMutation(UPLOAD_COURSE_IMAGE);
  const [uploadTileImage] = useMutation(UPLOAD_COURSE_TILE_IMAGE);
  const [uploadPreview] = useMutation(UPLOAD_COURSE_PREVIEW);
  const [updateCourse] = useMutation(UPDATE_COURSE);

  async function saveCourseData() {
    console.log(courseContextData);

    if (!fullCourse.id) {
      alert('course created');
      console.log('course created');
      return createCourseAndUpdateContext(courseContextData, createCourse);
    }

    await uploadFile(courseImage, uploadImage, 'image', 'uploadCourseImage');
    await uploadFile(courseTileImage, uploadTileImage, 'tileImage', 'uploadCourseTileImage');
    await uploadFile(courseVideo, uploadPreview, 'previewVideo', 'uploadCoursePreviewVideo');

    const courseUpdateResponse = await updateCourse({
      variables: fullCourse
    });

    alert('course updated');
    console.log('course updated');
    updateCourseMaster(courseUpdateResponse.data.updateCourse);
  }

  async function uploadFile(fileData, fileUploadMutation, fileNameInContext, fileDataName) {
    if (!fileData.file || !fileData.upload) return;

    const fileUploadRespone = await fileUploadMutation({
      variables: fileData
    });

    if (!fileUploadRespone.data[fileDataName].success) {
      console.log('File Upload Failed: ', fileNameInContext);
      console.log(fileData);
      return;
    }

    await updateCourseMaster({
      ...fullCourse,
      [fileNameInContext]: fileUploadRespone.data[fileDataName].url
    });

    if (fileDataName === 'uploadCoursePreviewVideo') {
      await setCourseVideo({
        ...courseVideo,
        upload: 0
      });
    } else if (fileDataName === 'uploadCourseImage') {
      await setCourseImage({
        ...courseImage,
        upload: 0
      });
    } else if (fileDataName === 'uploadCourseTileImage') {
      await setCourseTileImage({
        ...courseTileImage,
        upload: 0
      });
    }
  }

  return { fullCourse, saveCourseData };
}
