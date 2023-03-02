import PopUp from '@/components/common/PopUp';
import ViewDoc from '@/components/common/ViewDoc';
import ZicopsTabs from '@/components/common/ZicopsTabs';
import { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { SelectedResourceDataAtom } from '../atoms/learnerCourseComps.atom';
import AboutTab from './AboutTab';
import ResourcesTab from './ResourcesTab';
import TopicTab from './TopicTab';

export default function CourseBody() {
  const [selectedResourceData, setSelectedResourceData] = useRecoilState(SelectedResourceDataAtom);

  const courseBodyTabs = useMemo(
    () => [
      {
        id: 1,
        title: 'Topics',
        body: <TopicTab />,
      },
      {
        id: 2,
        title: 'Resources',
        body: <ResourcesTab />,
      },
      {
        id: 3,
        title: 'Notes',
        body: <>Notes Body Comp</>,
      },
      {
        id: 4,
        title: 'Discussion',
        body: <>Discussion Body Comp</>,
      },
      {
        id: 5,
        title: 'About',
        body: <AboutTab />,
      },
    ],
    [],
  );

  return (
    <>
      <ZicopsTabs tabData={courseBodyTabs} />

      {/* resource view popup */}
      {!!selectedResourceData?.url && (
        <PopUp
          title={selectedResourceData?.name}
          popUpState={[selectedResourceData?.url, setSelectedResourceData]}
          size="large"
          positionLeft="50%"
          isFooterVisible={false}>
          <ViewDoc url={selectedResourceData?.url} />
        </PopUp>
      )}
    </>
  );
}
