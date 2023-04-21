import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import TabHeaderCenter from './TabHeaderCenter';
import styles from './zicopsTabs.module.scss';

export default function ZicopsTabs({ tabData, getActiveTab, activeTab = null }) {
  const [activeTabData, setActiveTabData] = useState(null);

  useEffect(() => {
    setActiveTabData(!!activeTab ? activeTab : tabData[0]);
  }, [tabData, activeTab]);

  useEffect(() => {
    getActiveTab(activeTabData);
  }, [activeTabData]);

  if (!tabData?.length) return null;
  return (
    <div className={`${styles.tabsContainer}`}>
      <TabHeaderCenter
        handleClick={setActiveTabData}
        tabData={tabData}
        activeTabData={activeTabData}
      />

      <div className={`${styles.tabBody}`}>{activeTabData?.body}</div>
    </div>
  );
}

ZicopsTabs.defaultProps = {
  getActiveTab: () => {},
  tabData: [],
};

ZicopsTabs.propTypes = {
  getActiveTab: PropTypes.func,
  tabData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.element]),
      title: PropTypes.string,
      body: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.element]),
    }),
  ),
};
