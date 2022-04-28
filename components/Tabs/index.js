import { useContext } from 'react';
import { courseContext } from '../../state/contexts/CourseContext';
import ModuleContextProvider from '../../state/contexts/ModuleContext';
import Tab from '../common/Tab';
import useHandleTabs from './Logic/useHandleTabs';
import { contentPanel } from './tabs.module.scss';

export default function CourseTabs() {
  const courseContextData = useContext(courseContext);
  const { tab, tabData } = useHandleTabs(courseContextData);

  return (
    <>
      <ModuleContextProvider>
        <Tab tabData={tabData} switchTab={tab} />
      </ModuleContextProvider>
    </>
  );
}
