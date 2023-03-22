import { useEffect, useState } from 'react';
import VendorPopUp from '../common/VendorPopUp';
import useHandleVendor from '../Logic/useHandleVendor';
import SampleFilePreview from './SampleFilePreview';
import styles from '../vendorComps.module.scss';
import {
  ContentFormatIcon,
  ExpertiseIcon,
  LanguagesIcon
} from '@/components/common/ZicopsIcons/index.js';

export default function VendorServices({ data, type = 'sme' }) {
  const [sampleFiles, setSampleFiles] = useState([]);
  const [samplePopup, setSamplePopup] = useState(null);
  const [sampleDetails, setSampleDetails] = useState(false);
  const { getSampleFiles } = useHandleVendor();

  useEffect(() => {
    if (!type) return;

    getSampleFiles(type).then((fileData) => {
      setSampleFiles(
        fileData?.map((file, i) => ({
          id: i,
          title: file?.name,
          fileUrl: file?.file_url,
          fileType: file?.fileType,
          status: file?.status,
          rate: file?.price
        }))
      ) || [];
    });
  }, []);

  function getFileType(fileType = null) {
    if (fileType === 'PDF') return '/image/pdf-icon1.png';
    if (fileType === 'PPT') return '/image/ppt-icon1.png';

    return '/image/default-document.png';
  }

  return (
    <div className={`${styles.vendorTypeContainer}`}>
      <div className={`${styles.expertise}`}>
        <div className={`${styles.expertiseHeader}`}>
          <ExpertiseIcon />
          <span>Expertise</span>
        </div>
        <div className={`${styles.expertisePill}`}>
          {data?.expertises?.map((value, key) => {
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
          {data?.formats?.map((value, key) => {
            return <p>{value}</p>;
          })}
        </div>
      </div>
      <div className={`${styles.sample}`}>
        <div className={`${styles.sampleHeader}`}>
          <span>Sample</span>
        </div>
        <div className={`${styles.sampleFiles}`}>
          {sampleFiles?.map((data, index) => {
            // return <img src={data.previewImage} onClick={() => setSamplePopup(+data.id)} />;
            return (
              <div className={styles.sampleFile} onClick={() => setSamplePopup(+data.id)}>
                <div className={styles.sampleFileImage}>
                  <img src={getFileType(data?.fileType)} />
                </div>
                <div className={styles.sampleFileDetails}>
                  <div>{`${data?.title}.${data?.fileType?.toLowerCase()}`}</div>
                  <div className={styles.sampleFileRate}>{data.rate}</div>
                </div>
              </div>
            );
          })}
          <small>{!sampleFiles?.length && 'No Sample Files Available'}</small>
        </div>
      </div>
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
        <SampleFilePreview
          isDetailsOpen={sampleDetails}
          sampleFile={sampleFiles?.[samplePopup]}
          handleNextClick={() => {
            let updatedIndex = +samplePopup + 1;
            if (updatedIndex === sampleFiles.length) updatedIndex = 0;
            setSamplePopup(+updatedIndex);
          }}
          handlePrevClick={() => {
            let updatedIndex = +samplePopup - 1;
            if (updatedIndex < 0) updatedIndex = sampleFiles.length - 1;
            setSamplePopup(+updatedIndex);
          }}
        />
      </VendorPopUp>
    </div>
  );
}
