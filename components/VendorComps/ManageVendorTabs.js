import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { VendorStateAtom } from '@/state/atoms/vendor.atoms';
import { useRecoilValue } from 'recoil';
import { manageVendorTabData } from './Logic/vendorComps.helper';
import useHandleVendorMaster from './Logic/useHandleVendorMaster';
import useHandleVendor from './Logic/useHandleVendor';
import useHandleVendorServices from './Logic/useHandleVendorServices';
import TabContainer from '../common/TabContainer';
import styles from '@/components/VendorComps/vendorComps.module.scss';
import Button from '../CustomVideoPlayer/Button';

export default function ManageVendorTabs() {
  const vendorData = useRecoilValue(VendorStateAtom);

  const { handleMail } = useHandleVendor();
  const { addUpdateVendor } = useHandleVendorMaster();
  const { addUpdateSme, addUpdateCrt, addUpdateCd } = useHandleVendorServices();

  const { getSingleVendorInfo, getSmeDetails, getCrtDetails, getCdDetails } = useHandleVendor();

  const router = useRouter();
  const vendorId = router.query.vendorId || null;
  const isViewPage = router.asPath?.includes('view-vendor');

  useEffect(() => {
    if (!vendorId) return;
    getSingleVendorInfo();
    getSmeDetails();
    getCrtDetails();
    getCdDetails();
  }, [vendorId]);

  const tabData = manageVendorTabData;

  const [tab, setTab] = useState(tabData[0].name);

  return (
    <TabContainer
      tabData={tabData}
      tab={tab}
      setTab={setTab}
      footerObj={{
        showFooter: true,
        submitDisplay: vendorData.vendorId ? 'Update' : 'Add',
        handleSubmit: () => {
          addUpdateVendor();
          handleMail();
          addUpdateSme();
          addUpdateCrt();
          addUpdateCd();
        },
        status: vendorData?.status?.toUpperCase(),
        disableSubmit: isViewPage,
        handleCancel: () => router.push('/admin/vendor/manage-vendor')
      }}
      customStyles={['Courses', 'Orders'].includes(tab) ? { padding: '0px' } : {}}>
      <div className={`${styles.previewButtonContainer}`}>
        <Button clickHandler={async () => {}} text="View Page" />
      </div>
    </TabContainer>
  );
}
