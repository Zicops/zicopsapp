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
          rate: file?.price,
          actualFileType: file?.actualFileType
        }))
      ) || [];
    });
  }, []);

  function getFileType(actualFileType = null) {
    console.info(actualFileType, 'ayush');
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
                  <img src={getFileType(data?.actualFileType)} />
                </div>
                <div className={styles.sampleFileDetails}>
                  <div>{`${data?.title}`}</div>
                  <div className={styles.sampleFileRate}>
                    {data.rate} {data.currency} {data.unit}
                  </div>
                </div>
              </div>
            );
          })}
          <small>{!sampleFiles?.length && 'No Sample Files Available'}</small>
        </div>
      </div>
      {samplePopup != null && (
        <VendorPopUp
          popUpState={[true, setSamplePopup]}
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
      )}
    </div>
  );
}
