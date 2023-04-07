import { JITSI_SELF_HOSTED_DOMAIN } from '@/helper/constants.helper';
import { TopicClassroomAtomFamily } from '@/state/atoms/courses.atom';
import { ActiveClassroomTopicIdAtom, TopicAtom } from '@/state/atoms/module.atoms';
import { UserStateAtom } from '@/state/atoms/users.atom';
import ZicopsVcTool from 'lib/ZicopsVcTool';
import { useRecoilValue } from 'recoil';

export default function ClassroomMeetingPage() {
  const activeClassroomTopicId = useRecoilValue(ActiveClassroomTopicIdAtom);
  const topicClassroomData = useRecoilValue(TopicClassroomAtomFamily(activeClassroomTopicId));
  const topicData = useRecoilValue(TopicAtom);
  const currentTopicData = topicData?.find((topic) => topic?.id === activeClassroomTopicId);
  const userData = useRecoilValue(UserStateAtom);

  return (
    <>
      <ZicopsVcTool
        meetConfig={{
          domain: JITSI_SELF_HOSTED_DOMAIN,
          uniqueRoomName: currentTopicData?.name,
          moderators: topicClassroomData?.moderators,
          trainers: topicClassroomData?.trainers
        }}
        userData={{
          ...userData,
          name: `${userData?.first_name} ${userData?.last_name}`,
          profileImage:
            userData?.photo_url || `/images/Avatars/${userData?.gender?.toLowerCase()}Profile.png`
        }}
      />
    </>
  );
}
