import ConfirmPopUp from '@/components/common/ConfirmPopUp';
import { useState } from 'react';
import useHandleVendor from '../Logic/useHandleVendor';
import styles from '../vendorComps.module.scss';

const SingleFile = ({ data, pType }) => {
  const { deleteSample, getSMESampleFiles, getCRTSampleFiles, getCDSampleFiles } =
    useHandleVendor();
  const [confirmDelete, setConfirmDelete] = useState(null);
  let getSampleFiles;
  if (pType === 'sme') {
    getSampleFiles = getSMESampleFiles;
  } else if (pType === 'crt') {
    getSampleFiles = getCRTSampleFiles;
  } else {
    getSampleFiles = getCDSampleFiles;
  }
  const HandleDeleteFile = async () => {
    await deleteSample(data?.sf_id, pType);
    setConfirmDelete(null);
    getSampleFiles();
  };

  function getFileType(actualFileType = null) {
    if (actualFileType?.toLowerCase()?.includes('pdf')) return '/images/pdf-icon1.png';
    if (actualFileType?.toLowerCase()?.includes('powerpoint')) return '/images/ppt-icon1.png';
    if (actualFileType?.toLowerCase()?.includes('presentation')) return '/images/pptx-icon1.png';
    if (actualFileType?.toLowerCase()?.includes('stream')) return '/images/srt-icon1.png';
    if (actualFileType?.toLowerCase()?.includes('document')) return '/images/doc-icon1.png';
    if (actualFileType?.toLowerCase()?.includes('msword')) '/images/docx-icon1.png';
    if (actualFileType?.toLowerCase()?.includes('audio')) return '/images/mp3-icon1.png';
    if (actualFileType?.toLowerCase()?.includes('mp4')) return '/images/mp4-icon1.png';
    if (actualFileType?.toLowerCase()?.includes('png')) return '/images/png-icon1.png';
    if (actualFileType?.toLowerCase()?.includes('jpeg')) return '/images/jpeg-icon1.png';
    if (actualFileType?.toLowerCase()?.includes('jpg')) return '/images/jpg-icon1.png';
    if (actualFileType?.toLowerCase()?.includes('gif')) return '/images/gif-icon1.png';
    if (actualFileType?.toLowerCase()?.includes('text')) return '/images/txt-icon1.png';
    if (actualFileType?.toLowerCase()?.includes('sheet')) return '/images/xls-icon1.png';

    return '/images/default-document.png';
  }

  return (
    <>
      <div className={`${styles.singleFileContainer}`}>
        <div className={`${styles.singleProfileMain}`}>
          <div className={`${styles.singleProfileImage}`}>
            <img src={getFileType(data?.actualFileType)} />
          </div>
          <div className={`${styles.singleFileDetails}`}>
            <p className={`${styles.fileName}`}>{data?.name}</p>
            <div className={`${styles.hr}`}></div>
            <div className={`${styles.filePrice}`}>
              <div className={`${styles.rate}`}>
                {data?.rate} {data?.currency} {data?.unit}
              </div>
              <div className={`${styles.deleteIcon}`} onClick={() => setConfirmDelete(true)}>
                <img src="/images/svg/delete.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {!!confirmDelete && (
        <ConfirmPopUp
          title={`Are you sure to delete this sample file?`}
          btnObj={{
            handleClickLeft: (e) => {
              e.currentTarget.disabled = true;
              HandleDeleteFile();
            },
            handleClickRight: () => setConfirmDelete(null)
          }}
        />
      )}
    </>
  );
};

export default SingleFile;
