import IconButton from '@/components/common/IconButton';
import { AllSampleFilesAtom } from '@/state/atoms/vendor.atoms';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import AddSample from '../AddSample';
import VendorPopUp from '../common/VendorPopUp';
import styles from '../vendorComps.module.scss';
import SingleFile from './SingleFile';
const FileManageVendor = () => {
  const [isOpenAddFile, setIsOpenAddFile] = useState(false);
  const [allSampleData, setAllSampleData] = useRecoilState(AllSampleFilesAtom);
  return (
    <div className={`${styles.vendorFileContainer}`}>
      <div className={`${styles.vendorFileMain}`}>
        {allSampleData?.length && allSampleData?.map((data) => <SingleFile data={data} />)}

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
          handleClick: () => {
            setIsOpenAddFile(false);
          }
        }}
        isFooterVisible={true}>
        <AddSample />
      </VendorPopUp>
    </div>
  );
};

export default FileManageVendor;
