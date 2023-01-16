import Sidebar from '@/components/common/Sidebar';
import { vendorSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import ZicopsCarousel from '@/components/ZicopsCarousel';
import { myVendors } from '@/components/VendorComps/Logic/vendorComps.helper.js';
import TabContainer from '@/common/TabContainer';
import { useState } from 'react';

export default function VendorInfo() {
  const tabData = [
    {
      name: 'Course Master',
      component: <div></div>
    },
    {
      name: 'Details',
      component: <div></div>
    }
  ];

  const [tab, setTab] = useState(tabData[0].name);

  return (
    <>
      <Sidebar sidebarItemsArr={vendorSideBarData} />
      <div style={{ height: '30vh', marginTop: '70px' }}>Frame in Progress</div>

      <TabContainer
        tabData={tabData}
        tab={tab}
        setTab={setTab}
        // footerObj={{
        //   isActive:
        //     fullCourse?.name &&
        //     fullCourse?.category &&
        //     fullCourse?.sub_category &&
        //     fullCourse?.owner &&
        //     fullCourse?.language?.length,
        //   status: isCourseUploading ? (
        //     isCourseUploading
        //   ) : (
        //     <>
        //       {courseStatus || STATUS.display[0]}{' '}
        //       <span style={{ fontSize: '12px', fontWeight: '400' }}>
        //         {isCourseUploading ? '' : displayTime}
        //       </span>
        //     </>
        //   ),
        //   submitDisplay: getSubmitBtnText(),
        //   disableSubmit:
        //     !!isCourseUploading ||
        //     [COURSE_STATUS.publish, COURSE_STATUS.reject].includes(courseStatus),
        //   handleSubmit: () =>
        //     saveCourseData(false, null, true, courseStatus === COURSE_STATUS.freeze),
        //   cancelDisplay: 'Cancel',
        //   handleCancel: () => router.push('/admin/course/my-courses')
        // }}
      />
    </>
  );
}
