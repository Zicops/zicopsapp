import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
  GET_CATS_N_SUB_CATS,
  GET_LATEST_COURSES,
  GET_SUB_CATS_BY_CAT,
  queryClient
} from '../API/Queries';
import { tabData } from '../components/Tabs/Logic/tabs.helper';
import { ToastMsgAtom } from '../state/atoms/toast.atom';
import { loadAndCacheDataAsync } from './api.helper';
import { COURSE_STATUS, DEFAULT_VALUES } from './constants.helper';
import { getUnixTimeAt } from './utils.helper';

export async function createCourseAndUpdateContext(courseContextData, createCourse, showToaster) {
  const {
    fullCourse,
    setTab,
    updateCourseMaster,
    courseVideo,
    setCourseVideo,
    courseImage,
    setCourseImage,
    courseTileImage,
    setCourseTileImage
  } = courseContextData;

  if (!fullCourse.name || !fullCourse.category || !fullCourse.sub_category || !fullCourse.owner) {
    setTab(tabData[0].name);
    return { type: 'warning', message: 'Please fill all the Course Master Details' };
  }

  const { id, created_at, updated_at, duration, name, ...sendData } = fullCourse;

  const res = await createCourse({
    variables: { ...sendData, name: fullCourse?.name?.trim(), status: 'SAVED' }
  }).catch((err) => {
    console.log('Course Add Error: ', err);
    return { type: 'danger', message: 'Course Create Error' };
  });

  if (!res || !res?.data?.addCourse?.id)
    return { type: 'danger', message: 'Course Id not recieved in response' };

  console.log('course created', res);

  const _course = structuredClone(res.data.addCourse);
  if (_course?.image?.includes(DEFAULT_VALUES.image)) _course.image = '';
  if (_course?.tileImage?.includes(DEFAULT_VALUES.tileImage)) _course.tileImage = '';
  if (_course?.previewVideo?.includes(DEFAULT_VALUES.previewVideo)) _course.previewVideo = '';
  updateCourseMaster(_course);

  const courseId = res.data.addCourse.id;
  setCourseVideo({ ...courseVideo, courseId: courseId });
  setCourseImage({ ...courseImage, courseId: courseId });
  setCourseTileImage({ ...courseTileImage, courseId: courseId });

  // go to next tab
  setTimeout(() => {
    setTab(tabData[1].name);
  }, 50);

  return { type: 'success', message: 'Course Created', courseId: courseId };
}

export function filterAndSortChapter(chapters, moduleId) {
  const filteredAndSortedChapter = chapters
    .filter((chapter) => chapter.moduleId === moduleId)
    .sort((c1, c2) => {
      return c1.sequence - c2.sequence;
    });

  return filteredAndSortedChapter;
}

export function filterAndSortTopics(topics, moduleId, chapterId = '') {
  const filteredAndSortedTopics = topics
    .filter((topic) => topic.moduleId === moduleId && topic.chapterId === chapterId)
    .sort((t1, t2) => {
      return t1.sequence - t2.sequence;
    });

  return filteredAndSortedTopics;
}

export function filterAndSortTopicsBasedOnModuleId(topics, moduleId) {
  const filteredAndSortedTopics = topics
    .filter((topic) => topic.moduleId === moduleId)
    .sort((t1, t2) => {
      return t1.sequence - t2.sequence;
    });

  return filteredAndSortedTopics;
}

// filter based on topic id and sort based on is_default true
export function filterTopicContent(topicContent, topicId = '') {
  const filteredTopicContent = topicContent
    .filter((content) => content.topicId === topicId)
    .sort((c1, c2) => c2.is_default - c1.is_default);

  return filteredTopicContent;
}

export function filterResources(resources, topicId) {
  const filteredResources = resources.filter((res) => res.topicId === topicId);

  return filteredResources;
}

export function filterModule(moduleData, moduleId) {
  const filteredModules = moduleData.filter((mod) => mod.id === moduleId);

  return filteredModules[0];
}

export function sortTopicContentByIsDefault(topicContent) {
  return topicContent.sort((content) => content.is_default);
}

export function sortArrByKeyInOrder(array, key = 'sequence', isAsc = true) {
  if (!array?.length) return [];

  const localArr = structuredClone(array || []);
  let ascVal = -1,
    desVal = 1;
  if (isAsc) {
    ascVal = 1;
    desVal = -1;
  }
  return localArr?.sort((a, b) => (a[key] > b[key] ? ascVal : desVal));
}

// https://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-and-arrays-by-string-path
function getNestedValueByString(obj, path) {
  return path
    .replace(/\[|\]\.?/g, '.')
    .split('.')
    .filter((s) => s)
    .reduce((acc, val) => acc && acc[val], obj);
}

export async function isNameDuplicate(QUERY, name, objPath, id = null, checkAgainstKey) {
  const LONG_PAGE_SIZE = 999999999999;
  const queryVariables = { publish_time: Date.now(), pageSize: LONG_PAGE_SIZE, pageCursor: '' };
  const results = await queryClient.query({ query: QUERY, variables: queryVariables });

  const arrayOfNames = getNestedValueByString(results?.data, objPath) || [];

  const isNameExist = arrayOfNames.some((obj) => {
    if (id && obj.id === id) return false;

    const _name = obj[checkAgainstKey] || obj.Name || obj.name;
    return _name?.toLowerCase()?.trim() === name?.toLowerCase()?.trim();
  });

  return isNameExist;
}

export async function isNameDuplicateAdvanced(
  QUERY,
  variables,
  name,
  objPath,
  client = queryClient,
  id = null,
  checkAgainstKey
) {
  const results = await client.query({ query: QUERY, variables: variables });
  const arrayOfNames = getNestedValueByString(results?.data, objPath) || [];

  const isNameExist = arrayOfNames.some((obj) => {
    if (id && obj.id === id) return false;

    const _name = obj[checkAgainstKey] || obj.Name || obj.name;
    return _name?.toLowerCase()?.trim() === name?.toLowerCase()?.trim();
  });

  return isNameExist;
}

export function loadCatSubCat(state, setState, category = null) {
  const [loadCatAndSubCat, { error: loadCatErr }] = useLazyQuery(GET_CATS_N_SUB_CATS, {
    client: queryClient
  });
  const [loadSubCat, { error: loadSubCatErr }] = useLazyQuery(GET_SUB_CATS_BY_CAT, {
    client: queryClient
  });
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  useEffect(async () => {
    const data = { allCategories: [], allSubCategories: [], allSubCatsByCat: [] };

    if (!state?.cat?.length) {
      const res = await loadCatAndSubCat().catch((err) => {
        console.log(err);
        if (err) return setToastMsg({ type: 'danger', message: 'category load error' });
      });

      data.allCategories = res?.data?.allCategories?.map((val) => ({ value: val, label: val }));
      data.allSubCategories = res?.data?.allSubCategories?.map((val) => ({
        value: val,
        label: val
      }));
    }

    if (category) {
      const {
        data: { allSubCatsByCat }
      } = await loadSubCat({ variables: { category } }).catch((err) => {
        console.log(err);
        if (err) return setToastMsg({ type: 'danger', message: 'sub category load error' });
      });

      data.allSubCatsByCat = allSubCatsByCat?.map((val) => ({ value: val, label: val }));
    }

    setState({
      ...state,
      cat: state?.cat?.length ? state?.cat : data.allCategories,
      subCat: data.allSubCatsByCat?.length ? data.allSubCatsByCat : data.allSubCategories
    });
  }, [category]);

  useEffect(() => {
    if (loadCatErr) return setToastMsg({ type: 'danger', message: 'category load error' });
    if (loadSubCatErr) return setToastMsg({ type: 'danger', message: 'sub category load  error' });
  }, [loadCatErr, loadSubCatErr]);
}

export async function getLatestCoursesByFilters(filters = {}, pageSize = 28) {
  const _lspId = sessionStorage?.getItem('lsp_id');

  // Filter options are : LspId String; Category String; SubCategory String; Language String; DurationMin Int; DurationMax Int; DurationMin Int; Type String;
  const courses = await loadAndCacheDataAsync(GET_LATEST_COURSES, {
    publish_time: getUnixTimeAt(),
    pageSize: pageSize,
    pageCursor: '',
    status: COURSE_STATUS.publish,
    filters: { LspId: _lspId, ...filters }
  });
  const _toBeSortedCourses = structuredClone(courses) || [];

  _toBeSortedCourses.latestCourses.courses = sortArrByKeyInOrder(
    [..._toBeSortedCourses?.latestCourses?.courses],
    'updated_at',
    false
  );
  return _toBeSortedCourses;
}
