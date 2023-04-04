import VcMaintool from '@/components/Vctools';
import { TopicClassroomAtomFamily } from '@/state/atoms/courses.atom';
import { ActiveClassroomTopicIdAtom } from '@/state/atoms/module.atoms';
import { useRecoilValue } from 'recoil';

export default function classroom() {
  const activeClassroomTopicId = useRecoilValue(ActiveClassroomTopicIdAtom);
  const topicClassroomData = useRecoilValue(TopicClassroomAtomFamily(activeClassroomTopicId));

  return (
    <>
      <VcMaintool vcData={topicClassroomData} isStartedDefault={true} />
    </>
  );
}
