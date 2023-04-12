import PopUp from '@/components/common/PopUp';
import ViewDoc from '@/components/common/ViewDoc';
import ZicopsTabs from '@/components/common/ZicopsTabs';
import { useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  CourseActiveTabAtom,
  SelectedResourceDataAtom,
  activeCourseTabNames,
} from '../atoms/learnerCourseComps.atom';
import AboutTab from './AboutTab';
import ResourcesTab from './ResourcesTab';
import TopicTab from './TopicTab';

export default function CourseBody() {
  const [selectedResourceData, setSelectedResourceData] = useRecoilState(SelectedResourceDataAtom);
  const courseActiveTab = useRecoilValue(CourseActiveTabAtom);

  const courseBodyTabs = useMemo(
    () => [
      {
        id: 1,
        title: activeCourseTabNames.topic,
        body: <TopicTab />,
      },
      {
        id: 2,
        title: activeCourseTabNames.resources,
        body: <ResourcesTab />,
      },
      {
        id: 3,
        title: activeCourseTabNames.notes,
        body: <>Notes Body Comp</>,
      },
      {
        id: 4,
        title: activeCourseTabNames.discussion,
        body: <>Discussion Body Comp</>,
      },
      {
        id: 5,
        title: activeCourseTabNames.about,
        body: <AboutTab />,
      },
    ],
    [],
  );

  return (
    <>
      <ZicopsTabs tabData={courseBodyTabs} activeTab={courseActiveTab || null} />

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
