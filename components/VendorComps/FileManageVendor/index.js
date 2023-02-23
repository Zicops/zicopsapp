import IconButton from '@/components/common/IconButton';
import { VENDOR_MASTER_STATUS } from '@/helper/constants.helper';
import { allSampleFilesAtom, getSampleObject, SampleAtom } from '@/state/atoms/vendor.atoms';
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
  const [allSampleData, setAllSampleData] = useRecoilState(allSampleFilesAtom);
  const [sampleData, setSampleData] = useRecoilState(SampleAtom);
  const { getSampleFiles, addSampleFile } = useHandleVendor();
  const router = useRouter();
  const vendorId = router.query.vendorId || '0';
  const addNewSampleFileHendler = async () => {
    // setAllSampleData([
    //   ...allSampleData,
    //   {
    //     vendorId: vendorId,
    //     name: sampleData?.sampleName || '',
    //     description: sampleData?.description || '',
    //     pricing: sampleData?.rate + sampleData?.currency + '/' + sampleData?.unit || '',
    //     file: sampleData?.sampleFile || null,
    //     fileType: sampleData?.fileType || '',
    //     status: VENDOR_MASTER_STATUS.active
    //   }
    // ]);
    await addSampleFile();
    getSampleFiles();
    setIsOpenAddFile(false);
    setSampleData(getSampleObject());
  };
  return (
    <div className={`${styles.vendorFileContainer}`}>
      <div className={`${styles.vendorFileMain}`}>
        {!!allSampleData?.length && allSampleData?.map((data) => <SingleFile data={data} />)}

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
