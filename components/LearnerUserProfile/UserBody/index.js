import { useEffect, useState } from 'react';
import CoursePageTabs from '../../../components/CourseBody/CoursePageTabs';
import { tabs } from '../Logic/userBody.helper.js';
import styles from '../learnerUserProfile.module.scss';
import { useRouter } from 'next/router';

const UserBody = () => {
  const [activeCourseTab, setActiveCourseTab] = useState(tabs[0].name);

  const router = useRouter();

  useEffect(() => {
    const tabName = router.query?.tabName;
    if (!tabName) return;
    tabs.forEach((item) => {
      if (tabName === item.name) {
        setActiveCourseTab(item.name);
      }
    });
  }, [router.query]);

  function showActiveTab(activeTab) {
    const index = tabs.findIndex((tab) => tab.name === activeTab);
    if (index < 0) return tabs[0].comp;
    return tabs[index].comp;
  }
  return (
    <div className={`${styles.userBody}`}>
      <CoursePageTabs
        tabData={tabs}
        activeCourseTab={activeCourseTab}
        setActiveTab={setActiveCourseTab}
      />
      {showActiveTab(activeCourseTab)}
    </div>
  );
};

export default UserBody;
