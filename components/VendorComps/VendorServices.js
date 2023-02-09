import styles from './vendorComps.module.scss';
import { ExpertiseIcon } from '/components/common/ZicopsIcons/index.js';
import { LanguagesIcon } from '/components/common/ZicopsIcons/index.js';
import { ContentFormatIcon } from '/components/common/ZicopsIcons/index.js';
import { useState } from 'react';
import { sampleFiles } from './Logic/vendorComps.helper';
import VendorPopUp from './common/VendorPopUp';

export default function VendorServices({ data }) {
  const [samplePopup, setSamplePopup] = useState(false);

  const handleClick = () => setSamplePopup(true);

  return (
    <div className={`${styles.vendorTypeContainer}`}>
      <div className={`${styles.expertise}`}>
        <div className={`${styles.expertiseHeader}`}>
          <ExpertiseIcon />
          <span>Expertise</span>
        </div>
        <div className={`${styles.expertisePill}`}>
          {data.expertise.map((value, key) => {
            return <p>{value}</p>;
          })}
        </div>
      </div>
      <div className={`${styles.languages}`}>
        <div className={`${styles.languagesHeader}`}>
          <LanguagesIcon />
          <span>Languages</span>
        </div>
        <div className={`${styles.languagesPill}`}>
          {data?.languages?.map((value, key) => {
            return <p>{value}</p>;
          })}
        </div>
      </div>
      <div className={`${styles.contentFormat}`}>
        <div className={`${styles.contentFormatHeader}`}>
          <ContentFormatIcon />
          <span>Content Format</span>
        </div>
        <div className={`${styles.contentFormatPill}`}>
          {data?.contentFormat?.map((value, key) => {
            return <p>{value}</p>;
          })}
        </div>
      </div>
      <div className={`${styles.sample}`}>
        <div className={`${styles.sampleHeader}`}>
          <span>Sample</span>
        </div>
        <div className={`${styles.sampleFiles}`}>
          {sampleFiles.map((data, index) => {
            return <img src={data.previewImage} onClick={handleClick} />;
          })}
        </div>
      </div>

      <VendorPopUp
        open={samplePopup}
        popUpState={[samplePopup, setSamplePopup]}
        size="large"
        title={sampleFiles[0].title}
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{ name: 'Add' }}>
        <div className={`${styles.samplePopupContainer}`}>
          <div className={`${styles.sampleFilePreview}`}>
            <img src="/images/Cohort-Mapped.jpg" />
          </div>
          <div className={`${styles.sampleFileDetails}`}>
            <h3>Details</h3>
            <label>File Name</label>
            <p>Python_management 1.0</p>
            <label>File Description</label>
            <p>{sampleFiles[0].description}</p>
            <label>File Size</label>
            <p>{sampleFiles[0].size}</p>
            <p> {sampleFiles[0].rate}</p>
          </div>
        </div>
      </VendorPopUp>
    </div>
  );
}
