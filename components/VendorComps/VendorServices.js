import { useState } from 'react';
import VendorPopUp from './common/VendorPopUp';
import { sampleFiles } from './Logic/vendorComps.helper';
import styles from './vendorComps.module.scss';
import {
  ContentFormatIcon,
  ExpertiseIcon,
  LanguagesIcon
} from '/components/common/ZicopsIcons/index.js';

export default function VendorServices({ data }) {
  const [samplePopup, setSamplePopup] = useState(null);
  const [sampleDetails, setSampleDetails] = useState(false);

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
            return <img src={data.previewImage} onClick={() => setSamplePopup(+data.id)} />;
          })}
        </div>
      </div>
      {console.info(samplePopup)}
      <VendorPopUp
        popUpState={[samplePopup != null, setSamplePopup]}
        size="large"
        title={sampleFiles?.[samplePopup]?.title}
        headerComps={
          <div className={`${styles.sampleDetailButton}`}>
            <img
              src="/images/svg/info.svg"
              alt=""
              onClick={() => setSampleDetails(!sampleDetails)}
            />
          </div>
        }
        isFooterVisible={false}>
        <div className={`${styles.samplePopupContainer}`}>
          <div className={`${styles.sampleFilePreview}`}>
            <img src="/images/Cohort-Mapped.jpg" />
          </div>

          <div className={`${styles.samplePopupFooter}`}>
            <p>{sampleFiles?.[samplePopup]?.rate}</p>

            <div className={`${styles.samplePopupButtons}`}>
              <button
                onClick={() => {
                  let updatedIndex = +samplePopup - 1;
                  if (updatedIndex < 0) updatedIndex = sampleFiles.length - 1;
                  setSamplePopup(+updatedIndex);
                }}>
                Prev
              </button>
              <button
                onClick={() => {
                  let updatedIndex = +samplePopup + 1;
                  if (updatedIndex === sampleFiles.length) updatedIndex = 0;
                  setSamplePopup(+updatedIndex);
                }}>
                Next
              </button>
            </div>
          </div>

          {sampleDetails && (
            <div className={`${styles.sampleFileDetails}`}>
              <h3>Details</h3>

              <label>File Name</label>
              <p>{sampleFiles?.[samplePopup]?.title}</p>

              <label>File Description</label>
              <p>{sampleFiles?.[samplePopup]?.description}</p>

              <label>File Size</label>
              <p>{sampleFiles?.[samplePopup]?.size}</p>

              <label>Price</label>
              <p> {sampleFiles?.[samplePopup]?.rate}</p>
            </div>
          )}
        </div>
      </VendorPopUp>
    </div>
  );
}
