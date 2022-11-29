import { GET_LATEST_COURSES } from '@/api/Queries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { DEFAULT_VALUES } from '@/helper/constants.helper';
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
import { CourseTabAtom, IsCourseSavedAtom, isCourseUploadingAtom, tabData } from './tabs.helper';

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
  const [isCourseSaved, setIsCourseSaved] = useRecoilState(IsCourseSavedAtom);

  const router = useRouter();

  useEffect(() => {
    if (tab === tabData[0].name) return;

    // saveCourseData();
  }, [tab]);

  useEffect(() => {
    if (router.asPath === '/admin/courses') setTab(tabData[0].name);
  }, []);

  useEffect(() => {
    setIsLoading(null);
  }, []);

  function isValidData() {
    let isValid = false;
    const _courseError = structuredClone(courseError);

    if (tab?.toLowerCase()?.trim()?.includes('master')) {
      isValid =
        !!fullCourse?.name &&
        !!fullCourse?.category?.length &&
        !!fullCourse?.sub_category?.length &&
        !!fullCourse?.owner?.length &&
        !!fullCourse?.publisher?.length &&
        !!+fullCourse?.language?.length;

      _courseError.master = !isValid;
    }

    if (tab?.toLowerCase()?.trim()?.includes('details')) {
      isValid =
        !!fullCourse?.sub_categories?.length &&
        !!fullCourse?.expertise_level?.length &&
        !!(courseVideo?.file || fullCourse.previewVideo) &&
        !!(courseTileImage?.file || fullCourse.tileImage) &&
        !!(courseImage?.file || fullCourse.image) &&
        !!fullCourse?.summary?.length;

      _courseError.details = !isValid;
    }

    if (tab?.toLowerCase()?.trim()?.includes('about')) {
      isValid =
        !!fullCourse?.outcomes?.length &&
        !!fullCourse?.benefits?.length &&
        !!fullCourse?.description?.length &&
        !!fullCourse?.prequisites?.length &&
        !!+fullCourse?.goodFor?.length &&
        !!+fullCourse?.mustFor?.length &&
        !!+fullCourse?.related_skills?.length;

      _courseError.about = !isValid;
    }

    setCourseError(_courseError);
    return isValid;
  }

  async function saveCourseData(isNextButton, tabIndex, showToastMsg = true) {
    setIsLoading(!fullCourse.id ? 'SAVING...' : 'UPDATING...');
    // check for duplicate course name
    const queryVariables = {
      publish_time: Date.now(),
      pageSize: 999999,
      pageCursor: '',
      filters: { SearchText: fullCourse?.name?.trim() }
    };
    const courseRes = await loadQueryDataAsync(GET_LATEST_COURSES, queryVariables);
    const allCourses = courseRes?.latestCourses?.courses || null;

    if (
      allCourses &&
      allCourses
        ?.filter((c) => c?.name?.trim()?.toLowerCase() === fullCourse?.name?.trim()?.toLowerCase())
        ?.filter((c) => c?.id !== fullCourse?.id)?.length > 0
    ) {
      setIsLoading(null);
      return setToastMsg({ type: 'danger', message: 'Course with smae name already Exist' });
    }

    if (!fullCourse.id) {
      if (!isValidData()) return setIsLoading(null);
      const resObj = await createCourseAndUpdateContext(courseContextData, createCourse);
      setToastMsg({ type: resObj.type, message: resObj.message });
      setIsLoading(addCourseLoading ? 'SAVING...' : null);
      setIsCourseSaved(true);

      if (isNextButton && resObj.type === 'success') {
        setTab(tabData[tabIndex || 0].name);
        router.push(router.asPath + `/${resObj?.courseId}`);
      }
      return;
    }

    if (isNextButton && !isValidData()) return setIsLoading(null);
    if (!isNextButton && !fullCourse?.name) {
      setToastMsg({ type: 'danger', message: 'Course Name should not be empty' });
      setIsLoading(null);
      return;
    }
    // alert('course update started');

    await uploadFile(courseImage, uploadImage, 'image', 'uploadCourseImage');
    await uploadFile(courseTileImage, uploadTileImage, 'tileImage', 'uploadCourseTileImage');
    await uploadFile(courseVideo, uploadPreview, 'previewVideo', 'uploadCoursePreviewVideo');

    const { duration, name, ...sendData } = fullCourse;
    console.log('var', sendData);
    const courseUpdateResponse = await updateCourse({
      variables: { ...sendData, name: fullCourse?.name?.trim() }
    });

    const _course = structuredClone(courseUpdateResponse.data.updateCourse);
    if (_course?.image?.includes(DEFAULT_VALUES.image)) _course.image = '';
    if (_course?.tileImage?.includes(DEFAULT_VALUES.tileImage)) _course.tileImage = '';
    if (_course?.previewVideo?.includes(DEFAULT_VALUES.previewVideo)) _course.previewVideo = '';
    updateCourseMaster(_course);

    setIsLoading(
      udpateCourseLoading && uploadImageLoading && uploadTileLoading && uploadPreviewLoading
        ? 'UPDATING...'
        : null
    );

    if (showToastMsg) setToastMsg({ type: 'success', message: 'Course Updated' });
    console.log('course updated', fullCourse, courseUpdateResponse.data.updateCourse);

    setIsCourseSaved(true);
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
