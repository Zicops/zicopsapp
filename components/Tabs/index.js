import { useContext, useEffect } from 'react';
import { courseContext } from '../../state/contexts/CourseContext';
import ModuleContextProvider from '../../state/contexts/ModuleContext';
import Tab from '../common/Tab';
import useHandleTabs from './Logic/useHandleTabs';
import { contentPanel } from './tabs.module.scss';

export default function CourseTabs() {
  const courseContextData = useContext(courseContext);
  const { tabData } = useHandleTabs(courseContextData);

  const { tab, setTab } = courseContextData;
  useEffect(() => {
    setTab(tabData[0].name);
  }, []);

  return (
    <>
      <ModuleContextProvider>
        <Tab tabData={tabData} tab={tab} setTab={setTab} />
      </ModuleContextProvider>
    </>
  );
}
