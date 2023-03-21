import About from '../About';
import Commercials from '../Commercials';
import Configuration from '../Configuration';
import CourseDetails from '../CourseDetails';
import CourseMaster from '../CourseMaster';
import Topics from '../Topics';

export const courseTabs = {
  courseMaster: { name: 'Course Master', component: <CourseMaster /> },
  details: { name: 'Details', component: <CourseDetails /> },
  about: { name: 'About', component: <About /> },
  topics: { name: 'Topics', component: <Topics /> },
  commercials: { name: 'Commercials', component: <Commercials /> },
  configuration: { name: 'Configuration', component: <Configuration /> }
};

export function getModuleDataObject(data = {}) {
  return {
    id: data?.id || null,
    courseId: data?.courseId || null,
    sequence: data?.sequence || 1,
    name: data?.name || '',
    description: data?.description || '',
    level: data?.level || '',
    isChapter: data?.isChapter || false,

    duration: data?.duration || 0,

    owner: data?.owner || '',
    setGlobal: data?.setGlobal || false
  };
}

export function getChapterDataObject(data = {}) {
  return {
    id: data?.id || null,
    courseId: data?.courseId || null,
    moduleId: data?.moduleId || null,
    sequence: data?.sequence || 1,
    name: data?.name || '',
    description: data?.description || ''
  };
}

export function getTopicDataObj(data = {}) {
  return {
    courseId: data?.courseId || null,
    moduleId: data?.moduleId || null,
    chapterId: data?.chapterId || null,
    id: data?.id || null,

    sequence: data?.sequence || 1,
    name: data?.name || '',
    description: data?.description || '',
    type: data?.type || ''
  };
}
