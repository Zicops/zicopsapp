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
const FileManageVendor = ({ pType }) => {
  const [isOpenAddFile, setIsOpenAddFile] = useState(false);
  const [sampleData, setSampleData] = useRecoilState(SampleAtom);
  const [smeData, setSMEData] = useRecoilState(SmeServicesAtom);
  const [ctData, setCTData] = useRecoilState(CtServicesAtom);
  const [cdData, setCDData] = useRecoilState(CdServicesAtom);
  const { getSMESampleFiles, getCRTSampleFiles, getCDSampleFiles, addSampleFile } =
    useHandleVendor();
  const router = useRouter();
  const vendorId = router.query.vendorId || '0';

  let getSampleFiles;
  if (pType === 'sme') {
    getSampleFiles = getSMESampleFiles;
  } else if (pType === 'crt') {
    getSampleFiles = getCRTSampleFiles;
  } else {
    getSampleFiles = getCDSampleFiles;
  }

  let fileData = [];
  if (pType === 'sme') {
    fileData = smeData?.sampleFiles;
  } else if (pType === 'crt') {
    fileData = ctData?.sampleFiles;
  } else {
    fileData = cdData?.sampleFiles;
  }
  const addNewSampleFileHendler = async () => {
    await addSampleFile(pType);
    getSampleFiles();
    setIsOpenAddFile(false);
    setSampleData(getSampleObject());
  };
  return (
    <div className={`${styles.vendorFileContainer}`}>
      <div className={`${styles.vendorFileMain}`}>
        {!!fileData?.length && fileData?.map((data) => <SingleFile data={data} pType={pType} />)}

        <div className={`${styles.addAnotherProfile}`}>
          <IconButton
            text="Add another file"
            styleClass={`${styles.button}`}
            imgUrl="/images/svg/add_circle.svg"
            handleClick={setIsOpenAddFile(true)}
            isDisabled={fileData?.length >= 5}
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
        <AddSample pType={pType} />
      </VendorPopUp>
    </div>
  );
};

export default FileManageVendor;
