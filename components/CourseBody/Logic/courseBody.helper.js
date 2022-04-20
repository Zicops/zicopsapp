import CourseBodyNotes from '../../large/CourseBodyNotes';
import CourseBodyResources from '../../large/CourseBodyResources';
import CourseBodyAbout from '../CourseBodyAbout';
import CourseBodyTopics from '../CourseBodyTopics';

export const tabs = [
  {
    name: 'Topics',
    comp: <CourseBodyTopics />
  },
  {
    name: 'Resources',
    comp: <CourseBodyResources />
  },
  { name: 'Notes', comp: <CourseBodyNotes /> },
  { name: 'Discussion', comp: ' ABCD ' },
  { name: 'Mentor', comp: ' XYZ ' },
  { name: 'About', comp: <CourseBodyAbout /> }
];
