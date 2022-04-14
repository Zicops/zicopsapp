import { GET_COURSE_CHAPTERS, GET_COURSE_MODULES, GET_COURSE_TOPICS } from '../../../API/Queries';
import { useLoadAndSetDataInContext } from './courseTopics.helper';
import useAddModule from './useAddModule';
import useEditModule from './useEditModule';

export default function useHandleCourseTopics(courseContextData, moduleContextData) {
  const { fullCourse } = courseContextData;
  const {
    module: moduleData,
    addAndUpdateModule,
    chapter: chapterData,
    addAndUpdateChapter,
    topic: topicData,
    addAndUpdateTopic
  } = moduleContextData;

  const addModuleData = useAddModule(courseContextData, moduleContextData);
  const editModuleData = useEditModule(moduleContextData);

  // load module
  useLoadAndSetDataInContext(
    GET_COURSE_MODULES,
    {
      course_id: fullCourse.id
    },
    (data) => {
      if (moduleData.length) return;

      data.getCourseModules.forEach((d) => {
        addAndUpdateModule(d);
      });
    }
  );

  // load chapters
  useLoadAndSetDataInContext(
    GET_COURSE_CHAPTERS,
    {
      course_id: fullCourse.id
    },
    (data) => {
      if (chapterData.length) return;

      data.getCourseChapters.forEach((d) => {
        addAndUpdateChapter(d);
      });
    }
  );

  // load topics
  useLoadAndSetDataInContext(
    GET_COURSE_TOPICS,
    {
      course_id: fullCourse.id
    },
    (data) => {
      if (topicData.length) return;

      data.getTopics.forEach((d) => {
        addAndUpdateTopic(d);
      });
    }
  );

  const data = {
    fullCourse,
    moduleData,
    chapterData,
    topicData
  };
  return {
    data,
    addModuleData,
    editModuleData
  };
}
