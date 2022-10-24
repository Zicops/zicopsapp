import React, { useState } from 'react';
import { TAB_DATA } from './tabs.helper';
import styles from './tabs.module.scss';

const Tabs = ({ tabData }) => {
  // const tabData = TAB_DATA;
  const [activeTab, setActiveTab] = useState(tabData[0]?.id);

  function setTab(tab) {
    const selectedTabdata = tabData.filter((element) => {
      return element.id === tab;
    });
    return selectedTabdata[0]?.component(setActiveTab);
  }
  return (
    <div className={`${styles.tab}`}>
      <div className={`${styles.tabHeader}`}>
        {tabData.map((elements) => {
          return (
            <span
              // onClick={() => setActiveTab(elements.id)}
              className={`${
                elements?.id === activeTab ? styles.tab_title : styles.tab_title_inactive
              }`}>
              {elements.title}
            </span>
          );
        })}
      </div>
      <div className={`${styles.tabData}`}>
        {/* {tabData.map((elements) => {
          return <div>{elements?.id === activeTab && elements.component}</div>;
        })} */}
        {setTab(activeTab)}
      </div>
    </div>
  );
};

export default Tabs;
