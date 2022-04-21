import { useRecoilState } from 'recoil';
import { ResourcesAtom } from '../../../state/atoms/module.atoms';
import CourseBodyNotes from '../../large/CourseBodyNotes';
import CourseBodyAbout from '../CourseBodyAbout';
import CourseBodyResources from '../CourseBodyResources';
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

export function getResourceCount(topicId) {
  const [resources, updateResources] = useRecoilState(ResourcesAtom);

  const filteredResources = resources.filter((r, i) => {
    return r.topicId === topicId;
  });

  return filteredResources.length;
}
