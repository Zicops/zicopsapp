import IconButton from '@/components/common/IconButton';
import { VENDOR_MASTER_STATUS } from '@/helper/constants.helper';
import {
  allSampleFilesAtom,
  CdServicesAtom,
  CtServicesAtom,
  getSampleObject,
  SampleAtom,
  SmeServicesAtom
} from '@/state/atoms/vendor.atoms';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import AddSample from '../AddSample';
import VendorPopUp from '../common/VendorPopUp';
import useHandleVendor from '../Logic/useHandleVendor';
import styles from '../vendorComps.module.scss';
import SingleFile from './SingleFile';
const FileManageVendor = () => {
  const [isOpenAddFile, setIsOpenAddFile] = useState(false);
  const [sampleData, setSampleData] = useRecoilState(SampleAtom);
  const [smeData, setSMEData] = useRecoilState(SmeServicesAtom);
  const [ctData, setCTData] = useRecoilState(CtServicesAtom);
  const [cdData, setCDData] = useRecoilState(CdServicesAtom);
  const { getSMESampleFiles, getCRTSampleFiles, getCDSampleFiles, addSampleFile } =
    useHandleVendor();
  const router = useRouter();
  const vendorId = router.query.vendorId || '0';
  const addNewSampleFileHendler = async () => {
    await addSampleFile();
    getSMESampleFiles();
    setIsOpenAddFile(false);
    setSampleData(getSampleObject());
  };
  return (
    <div className={`${styles.vendorFileContainer}`}>
      <div className={`${styles.vendorFileMain}`}>
        {!!smeData?.smeSample?.length &&
          smeData?.smeSample?.map((data) => <SingleFile data={data} />)}

        <div className={`${styles.addAnotherProfile}`} onClick={() => setIsOpenAddFile(true)}>
          <IconButton
            text="Add another file"
            styleClass={`${styles.button}`}
            imgUrl="/images/svg/add_circle.svg"
          />
        </div>
      </div>
      <VendorPopUp
        open={isOpenAddFile}
        title="Add Sample"
        popUpState={[isOpenAddFile, setIsOpenAddFile]}
        size="large"
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{
          name: 'Done',
          handleClick: addNewSampleFileHendler
        }}
        isFooterVisible={true}>
        <AddSample />
      </VendorPopUp>
    </div>
  );
};

export default FileManageVendor;
