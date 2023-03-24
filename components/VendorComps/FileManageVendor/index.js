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
import { useRecoilState, useRecoilValue } from 'recoil';
import AddSample from '../AddSample';
import VendorPopUp from '../common/VendorPopUp';
import useHandleVendor from '../Logic/useHandleVendor';
import styles from '../vendorComps.module.scss';
import SingleFile from './SingleFile';
import { sortArrByKeyInOrder } from '@/helper/data.helper';
import { IsDataPresentAtom } from '../common/VendorPopUp/popup.helper';
const FileManageVendor = ({ pType }) => {
  const [isOpenAddFile, setIsOpenAddFile] = useState(false);
  const [sampleData, setSampleData] = useRecoilState(SampleAtom);
  const [isPopUpDataPresent, setIsPopUpDataPresent] = useRecoilState(IsDataPresentAtom);
  const smeData = useRecoilValue(SmeServicesAtom);
  const ctData = useRecoilValue(CtServicesAtom);
  const cdData = useRecoilValue(CdServicesAtom);
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

  const _sortedData = sortArrByKeyInOrder(fileData, 'updated_at', true);

  const addNewSampleFileHendler = async (e) => {
    e.target.disabled = true;
    setIsPopUpDataPresent(false);
    const isSaved = await addSampleFile(pType);
    if (!isSaved) return;

    getSampleFiles();
    setIsOpenAddFile(false);
    setSampleData(getSampleObject());
    e.target.disabled = false;
  };
  return (
    <div className={`${styles.vendorFileContainer}`}>
      <div className={`${styles.vendorFileMain}`}>
        {!!fileData?.length && _sortedData?.map((data) => <SingleFile data={data} pType={pType} />)}

        <div className={`${styles.addAnotherProfile}`}>
          <IconButton
            text="Add another file"
            styleClass={`${styles.button}`}
            imgUrl="/images/svg/add_circle.svg"
            handleClick={() => {
              setIsPopUpDataPresent(true);
              setIsOpenAddFile(true);
            }}
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
