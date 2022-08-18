import notificationData from '@/components/Notifications/data';
import React, { useEffect, useState } from 'react';
import CoursePageTabs from '@/components/CourseBody/CoursePageTabs';
import AllNotifications from '@/components/Notifications/AllNotifications';

const NotificationCenter = () => {
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
      comp: <AllNotifications data={notificationData} style={style} />
    },
    {
      name: 'Unread',
      comp: (
        <AllNotifications
          data={notificationData.filter((items) => items.status === 'unread')}
          style={style}
        />
      )
    },
    {
      name: 'Read',
      comp: (
        <AllNotifications
          data={notificationData.filter((items) => items.status === 'read')}
          style={style}
        />
      )
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
    <div
      style={{
        marginTop: '10vh',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#1a1d21'
      }}>
      <div
        style={{
          fontSize: '28px',
          fontWeight: '700',
          color: 'white',
          margin: '2vh 11vw 3vh 0'
        }}>
        <p>Notification Center</p>
      </div>
      <CoursePageTabs
        tabData={tabsHeader}
        activeCourseTab={activeCourseTab}
        setActiveTab={setActiveCourseTab}
      />
      {showActiveTab(activeCourseTab)}
    </div>
  );
};

export default NotificationCenter;
