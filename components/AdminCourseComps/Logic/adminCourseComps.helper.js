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
