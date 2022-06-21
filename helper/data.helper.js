import { queryClient } from '../API/Queries';
import { tabData } from '../components/Tabs/Logic/tabs.helper';

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
    return { type: 'info', message: 'Please fill all the Course Master Details' };
  }

  const { id, created_at, updated_at, ...sendData } = fullCourse;

  const res = await createCourse({ variables: { ...sendData, status: 'SAVED' } }).catch((err) => {
    console.log('Course Add Error: ', err);
    return { type: 'danger', message: 'Course Create Error' };
  });

  if (!res || !res?.data?.addCourse?.id)
    return { type: 'danger', message: 'Course Id not recieved in response' };

  console.log('course created', res);
  updateCourseMaster(res.data.addCourse);

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
  if (!array.length) return [];

  const localArr = [...array];
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

export async function isNameDuplicate(QUERY, name, objPath) {
  const LONG_PAGE_SIZE = 999999999999;
  const queryVariables = { publish_time: Date.now(), pageSize: LONG_PAGE_SIZE, pageCursor: '' };
  const results = await queryClient.query({ query: QUERY, variables: queryVariables });

  const arrayOfNames = getNestedValueByString(results?.data, objPath) || [];

  const isNameExist = arrayOfNames.some((obj) => {
    const _name = obj.Name || obj.name;
    return _name?.toLowerCase() === name?.toLowerCase();
  });

  return isNameExist;
}
