import { courseErrorAtom } from '@/state/atoms/module.atoms';
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

  // mutation
  const [createCourse, { loading: addCourseLoading }] = useMutation(ADD_COURSE);
  const [uploadImage, { loading: uploadImageLoading }] = useMutation(UPLOAD_COURSE_IMAGE);
  const [uploadTileImage, { loading: uploadTileLoading }] = useMutation(UPLOAD_COURSE_TILE_IMAGE);
  const [uploadPreview, { loading: uploadPreviewLoading }] = useMutation(UPLOAD_COURSE_PREVIEW);
  const [updateCourse, { loading: udpateCourseLoading }] = useMutation(UPDATE_COURSE);

  // recoil state
  const [courseError, setCourseError] = useRecoilState(courseErrorAtom);
  const [isLoading, setIsLoading] = useRecoilState(isCourseUploadingAtom);
  const [tab, setTab] = useRecoilState(CourseTabAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const router = useRouter();

  useEffect(() => {
    if (tab === tabData[0].name) return;

    // saveCourseData();
  }, [tab]);

  function isValidData() {
    let isValid = false;
    const _courseError = structuredClone(courseError);

    if (tab?.toLowerCase()?.trim()?.includes('master')) {
      isValid =
        !!fullCourse?.name &&
        !!fullCourse?.category?.length &&
        !!fullCourse?.sub_category?.length &&
        !!fullCourse?.owner?.length &&
        !!+fullCourse?.language?.length;

      _courseError.master = !isValid;
    }

    if (tab?.toLowerCase()?.trim()?.includes('details')) {
      isValid =
        !!fullCourse?.sub_categories?.length &&
        !!fullCourse?.expertise_level?.length &&
        !!fullCourse?.previewVideo?.length &&
        !!fullCourse?.tileImage?.length &&
        !!+fullCourse?.image?.length &&
        !!+fullCourse?.summary?.length;

      _courseError.details = !isValid;
    }

    if (tab?.toLowerCase()?.trim()?.includes('about')) {
      isValid =
        !!fullCourse?.outcomes?.length &&
        !!fullCourse?.benefits?.length &&
        !!fullCourse?.description?.length &&
        !!fullCourse?.prequisites?.length &&
        !!+fullCourse?.goodFor?.length &&
        !!+fullCourse?.mustFor?.length;
      !!+fullCourse?.related_skills?.length;

      _courseError.about = !isValid;
    }

    setCourseError(_courseError);
    return isValid;
  }

  async function saveCourseData(isNextButton, tabIndex, showToastMsg = true) {
    setIsLoading(!fullCourse.id ? 'SAVING...' : 'UPDATING...');

    if (!fullCourse.id) {
      const resObj = await createCourseAndUpdateContext(courseContextData, createCourse);
      setToastMsg({ type: resObj.type, message: resObj.message });
      setIsLoading(addCourseLoading ? 'SAVING...' : null);

      if (isNextButton && resObj.type === 'success') {
        setTab(tabData[tabIndex || 0].name);
        router.push(router.asPath + `/${resObj?.courseId}`);
      }
      return;
    }

    if (isNextButton && !isValidData()) return setIsLoading(null);
    // alert('course update started');

    await uploadFile(courseImage, uploadImage, 'image', 'uploadCourseImage');
    await uploadFile(courseTileImage, uploadTileImage, 'tileImage', 'uploadCourseTileImage');
    await uploadFile(courseVideo, uploadPreview, 'previewVideo', 'uploadCoursePreviewVideo');

    console.log('var', fullCourse);
    const courseUpdateResponse = await updateCourse({ variables: fullCourse });

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
