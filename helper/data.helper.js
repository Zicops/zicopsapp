import { tabData } from '../components/Tabs/Logic/tabs.helper';

export function createCourseAndUpdateContext(courseContextData, createCourse) {
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
    return alert('Please fill all the Course Master Details');
  }

  const { id, created_at, updated_at, ...sendData } = fullCourse;

  createCourse({
    variables: {
      ...sendData,
      status: 'SAVED'
    }
  })
    .then((res) => {
      if (!res || !res?.data?.addCourse?.id) return;
      alert('course created');
      console.log('course created', res);

      updateCourseMaster(res.data.addCourse);

      const courseId = res.data.addCourse.id;
      setCourseVideo({
        ...courseVideo,
        courseId: courseId
      });
      setCourseImage({
        ...courseImage,
        courseId: courseId
      });
      setCourseTileImage({
        ...courseTileImage,
        courseId: courseId
      });

      // go to next tab
      setTimeout(() => {
        setTab(tabData[1].name);
      }, 50);
    })
    .catch((err) => {
      console.log('Course Add Error: ', err);
    });
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

export function filterTopicContent(topicContent, topicId = '') {
  const filteredTopicContent = topicContent.filter((content) => content.topicId === topicId);
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
