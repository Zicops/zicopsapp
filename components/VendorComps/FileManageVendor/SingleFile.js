import React from 'react';
import styles from '../vendorComps.module.scss';
const SingleFile = ({ data }) => {
  return (
    <div className={`${styles.singleFileContainer}`}>
      <div className={`${styles.singleProfileMain}`}>
        <div className={`${styles.singleProfileImage}`}>
          <img src="/images/svg/file_image.svg" alt="" />
        </div>
        <div className={`${styles.singleFileDetails}`}>
          <p className={`${styles.fileName}`}>{data?.name}</p>
          <div className={`${styles.hr}`}></div>
          <div className={`${styles.filePrice}`}>
            <div className={`${styles.rate}`}>{data?.price}</div>
            <div className={`${styles.deleteIcon}`} onClick={() => {}}>
              <img src="/images/svg/delete.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleFile;
