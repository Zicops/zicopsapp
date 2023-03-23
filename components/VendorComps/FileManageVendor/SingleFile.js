import useHandleVendor from '../Logic/useHandleVendor';
import styles from '../vendorComps.module.scss';
const SingleFile = ({ data, pType }) => {
  const {
    deleteSample,
    getSMESampleFiles,
    getCRTSampleFiles,
    getCDSampleFiles
  } = useHandleVendor();
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
    getSampleFiles();
  };
  return (
    <div className={`${styles.singleFileContainer}`}>
      <div className={`${styles.singleProfileMain}`}>
        <div className={`${styles.singleProfileImage}`}>
          {data?.fileType === 'PPT' ? (
            <img src="/images/PPT-icon.png" alt="" />
          ) : (
            <img src="/images/svg/file_image.svg" alt="" />
          )}
        </div>
        <div className={`${styles.singleFileDetails}`}>
          <p className={`${styles.fileName}`}>{data?.name}</p>
          <div className={`${styles.hr}`}></div>
          <div className={`${styles.filePrice}`}>
            <div className={`${styles.rate}`}>
              {data?.rate} {data?.currency} {data?.unit}
            </div>
            <div className={`${styles.deleteIcon}`} onClick={() => HandleDeleteFile()}>
              <img src="/images/svg/delete.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleFile;
