import CoursePageTabs from '@/components/CourseBody/CoursePageTabs';
import AllNotifications from '@/components/Notifications/AllNotifications';
import useHandleNotifications from '@/components/Notifications/Logic/useHandleNotifications';
import { USER_LSP_ROLE } from '@/helper/constants.helper';
import { FcmTokenAtom } from '@/state/atoms/notification.atom';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styles from './notification.module.scss';

const NotificationCenter = () => {
  // const [notification, setNotifications] = useRecoilState(NotificationAtom);
  const fcmToken = useRecoilValue(FcmTokenAtom);
  const loadMoreBtnRef = useRef();

  const { notifications, pageIndex, loadAllNotifications } = useHandleNotifications(loadMoreBtnRef);

  const style = {
    borderBottom: 'none',
    marginTop: '15px',
    marginBottom: '13px',
    width: '905px',
    border: '1px solid #737373',
    borderRadius: '8px',
    color: 'white',
    display: 'flex',
    justifyContent: 'start'
  };

  const tabsHeader = [
    {
      name: 'All',
      comp: <AllNotifications data={notifications} style={style} />,
      roleAccess: [USER_LSP_ROLE.admin, USER_LSP_ROLE.vendor]
    },
    {
      name: 'Unread',
      comp: (
        <AllNotifications data={notifications.filter((items) => !items?.isRead)} style={style} />
      ),
      roleAccess: [USER_LSP_ROLE.admin, USER_LSP_ROLE.vendor]
    },
    {
      name: 'Read',
      comp: (
        <AllNotifications data={notifications.filter((items) => items?.isRead)} style={style} />
      ),
      roleAccess: [USER_LSP_ROLE.admin, USER_LSP_ROLE.vendor]
    }
  ];

  const [activeCourseTab, setActiveCourseTab] = useState(tabsHeader[0].name);

  useEffect(() => {
    tabsHeader.forEach((item) => {
      if (activeCourseTab === item.name) {
        setActiveCourseTab(item.name);
      }
    });
  }, []);

  function showActiveTab(activeTab) {
    const index = tabsHeader.findIndex((tab) => tab.name === activeTab);
    if (index < 0) return tabs[0].comp;
    return tabsHeader[index].comp;
  }

  return (
    <div className={`${styles.notificationPage}`}>
      <div className={`${styles.notificationHeader}`}>
        <p>Notification Center</p>
      </div>
      <CoursePageTabs
        // customStyles={{ width: '905px', justifyContent: 'flex-start', margin: 'auto' }}
        tabData={tabsHeader}
        activeCourseTab={activeCourseTab}
        setActiveTab={setActiveCourseTab}
      />
      <div className={`${styles.notificationTabBody}`}>
        {showActiveTab(activeCourseTab)}

        {pageIndex != null && (
          <button
            className={`${styles.loadMore}`}
            ref={loadMoreBtnRef}
            onClick={() => loadAllNotifications(fcmToken)}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;
