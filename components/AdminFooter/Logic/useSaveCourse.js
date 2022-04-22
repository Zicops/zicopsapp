import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import {
  ADD_COURSE,
  UPDATE_COURSE,
  UPLOAD_COURSE_IMAGE,
  UPLOAD_COURSE_PREVIEW,
  UPLOAD_COURSE_TILE_IMAGE
} from '../../../API/Mutations';
import { createCourseAndUpdateContext } from '../../../helper/data.helper';
import { useRouter } from 'next/router';
import CourseMaster from '../../Tabs/CourseMaster';
import { tabData } from '../../Tabs/Logic/tabs.helper';

export default function useSaveCourse(courseContextData) {
  const {
    fullCourse,
    updateCourseMaster,
    tab,
    courseVideo,
    setCourseVideo,
    courseImage,
    setCourseImage,
    courseTileImage,
    setCourseTileImage
  } = courseContextData;

  const [isCourseSaved, setIsCourseSaved] = useState(false);
  const [createCourse] = useMutation(ADD_COURSE);
  const [uploadImage] = useMutation(UPLOAD_COURSE_IMAGE);
  const [uploadTileImage] = useMutation(UPLOAD_COURSE_TILE_IMAGE);
  const [uploadPreview] = useMutation(UPLOAD_COURSE_PREVIEW);
  const [updateCourse] = useMutation(UPDATE_COURSE);
  const router = useRouter();
  function returnToMycourses() {
    router.push('/admin/zicops-courses');
  }

  useEffect(() => {
    setIsCourseSaved(!!fullCourse?.id);
  }, [fullCourse]);

  useEffect(() => {
    if (tab === tabData[0].name) return;

    // saveCourseData();
  }, [tab]);

  async function saveCourseData() {
    setIsCourseSaved('SAVING...');

    if (!fullCourse.id) {
      return createCourseAndUpdateContext(courseContextData, createCourse);
    }
    // alert('course update started');

    await uploadFile(courseImage, uploadImage, 'image', 'uploadCourseImage');
    await uploadFile(courseTileImage, uploadTileImage, 'tileImage', 'uploadCourseTileImage');
    await uploadFile(courseVideo, uploadPreview, 'previewVideo', 'uploadCoursePreviewVideo');

    console.log('var', fullCourse, fullCourse.outcomes);
    const courseUpdateResponse = await updateCourse({
      variables: fullCourse
    });

    alert('course updated');
    console.log(
      'course updated',
      fullCourse,
      courseUpdateResponse.data.updateCourse.outcomes
    );
    updateCourseMaster(courseUpdateResponse.data.updateCourse);

    setIsCourseSaved(true);
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

  return { fullCourse, saveCourseData, returnToMycourses, isCourseSaved };
}
