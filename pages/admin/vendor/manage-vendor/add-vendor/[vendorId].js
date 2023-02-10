import Button from '@/common/Button';
import TabContainer from '@/common/TabContainer';
import AdminHeader from '@/components/common/AdminHeader';
import MainBody from '@/components/common/MainBody';
import MainBodyBox from '@/components/common/MainBodyBox';
import Sidebar from '@/components/common/Sidebar';
import { vendorSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import AddVendorCourses from '@/components/VendorComps/AddVendor/AddVendorCourses';
import AddVendorServices from '@/components/VendorComps/AddVendor/AddVendorServices';
import VendorMaster from '@/components/VendorComps/AddVendor/VendorMaster';
import useHandleVendor from '@/components/VendorComps/Logic/useHandleVendor';
import ProfileManageVendor from '@/components/VendorComps/ProfileMangeVendor';
import styles from '@/components/VendorComps/vendorComps.module.scss';
import VendorOrders from '@/components/VendorComps/VendorOrders';
import { VendorStateAtom } from '@/state/atoms/vendor.atoms';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export default function EditVendor() {
  const vendorData = useRecoilValue(VendorStateAtom);

  const { addUpdateVendor, getSingleVendorInfo } = useHandleVendor();
  const router = useRouter();
  const vendorId = router.query.vendorId || '0'; //Change the 0 to null

  useEffect(() => {
    getSingleVendorInfo();
  }, []);

  const tabData = [
    {
      name: 'Master',
      component: <VendorMaster />
    },
    {
      name: 'Services',
      component: <AddVendorServices />
    },
    {
      name: 'Profiles',
      component: <ProfileManageVendor />
    },
    {
      name: 'Courses',
      component: <AddVendorCourses />
    },
    {
      name: 'Orders',
      component: <VendorOrders />
    }
  ];

  const [tab, setTab] = useState(tabData[0].name);

  return (
    <>
      <Sidebar sidebarItemsArr={vendorSideBarData} />
      <MainBody>
        <AdminHeader
          title={
            <>
              {vendorData?.name || 'Edit Vendor'}{' '}
              <p className={`${styles.subHeader}`}>{vendorData.type}</p>
            </>
          }
        />

        <MainBodyBox>
          <TabContainer
            tabData={tabData}
            tab={tab}
            setTab={setTab}
            footerObj={{
              showFooter: true,
              handleSubmit: async () => {
                await addUpdateVendor();
              },
              status: 'DRAFT'
            }}
            customStyles={['Courses', 'Orders'].includes(tab) ? { padding: '0px' } : {}}>
            <div className={`${styles.previewButtonContainer}`}>
              <Button
                clickHandler={async () => {
                  // await saveCourseData(false, 0, false);
                  // router.push(`/preview?courseId=${fullCourse.id}`);
                }}
                text="View Page"
              />
            </div>
          </TabContainer>
        </MainBodyBox>
      </MainBody>
    </>
  );
}
