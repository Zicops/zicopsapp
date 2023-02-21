import ZicopsTabs from '@/components/common/ZicopsTabs';
import TopicTab from './TopicTab';

export default function CourseBody() {
  const courseBodyTabs = [
    {
      id: 1,
      title: 'Topics',
      body: <TopicTab />,
    },
    {
      id: 2,
      title: 'Resources',
      body: <>Resources Body Comp</>,
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
      body: <>About Body Comp</>,
    },
  ];

  return (
    <>
      <ZicopsTabs tabData={courseBodyTabs} />
    </>
  );
}
