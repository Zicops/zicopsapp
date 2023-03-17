import About from '../About';
import Commercials from '../Commercials';
import Configuration from '../Configuration';
import CourseMaster from '../CourseMaster';
import Details from '../details';
import Topics from '../Topics';

export const courseTabs = {
  courseMaster: { name: 'Course Master', component: <CourseMaster /> },
  details: { name: 'Details', component:<Details/>},
  about: { name: 'About', component: <About /> },
  topics: { name: 'Topics', component: <Topics /> },
  commercials: { name: 'Commercials', component: <Commercials /> },
  configuration: { name: 'Configuration', component: <Configuration /> }
};

export function getTopicDataObj(data) {
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
