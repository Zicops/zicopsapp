import UserAboutTab from '../UserAboutTab';

export const tabs = [
  {
    name: 'About',
    comp: <UserAboutTab />
  },
  {
    name: 'Cohort',
    comp: '<CourseBodyResources />'
  },
  {
    name: 'Courses',
    comp: '<CourseBodyNotes />'
  },
  { name: 'Learning Dashboard', comp: ' ABCD ' },
  { name: 'Calender', comp: ' XYZ ' }
];
