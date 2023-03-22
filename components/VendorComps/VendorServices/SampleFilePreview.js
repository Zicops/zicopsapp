import ViewDoc from '@/components/common/ViewDoc';
import { downloadFileFromURI } from '@/helper/utils.helper';
import styles from '../vendorComps.module.scss';

export default function SampleFilePreview({
  isDetailsOpen = false,
  sampleFile = {},
  handleNextClick = () => {},
  handlePrevClick = () => {}
}) {
  const types = {
    download: 'download',
    image: 'image',
    video: 'video',
    audio: 'audio',
    docPreview: 'doc'
  };

  let displayType = types.download;
  if (sampleFile?.actualFileType?.toLowerCase()?.includes('image')) displayType = types.image;
  if (sampleFile?.actualFileType?.toLowerCase()?.includes('video')) displayType = types.video;
  if (sampleFile?.actualFileType?.toLowerCase()?.includes('sheet')) displayType = types.docPreview;
  if (sampleFile?.actualFileType?.toLowerCase()?.includes('presentation'))
    displayType = types.docPreview;
  if (sampleFile?.actualFileType?.toLowerCase()?.includes('pdf')) displayType = types.docPreview;
  if (sampleFile?.actualFileType?.toLowerCase()?.includes('document'))
    displayType = types.docPreview;
  if (sampleFile?.actualFileType?.toLowerCase()?.includes('audio')) displayType = types.audio;
  if (sampleFile?.actualFileType?.toLowerCase()?.includes('text')) displayType = types.docPreview;
  if (sampleFile?.actualFileType?.toLowerCase()?.includes('stream')) displayType = types.docPreview;

  return (
    <>
      <div className={`${styles.samplePopupContainer}`}>
        <div className={`${styles.sampleFilePreview}`}>
          {displayType === types.docPreview && <ViewDoc url={sampleFile?.fileUrl} />}
          {displayType === types.image && <img src={sampleFile?.fileUrl} />}
          {displayType === types.video && <video src={sampleFile?.fileUrl} controls />}
          {displayType === types.audio && <audio src={sampleFile?.fileUrl} controls />}
          {displayType === types.download && (
            <div className={`${styles.downloadBtn}`}>
              <p>Can't Preview this File</p>
              <p>{sampleFile?.title}</p>

              <button
                onClick={() => {
                  downloadFileFromURI(sampleFile?.fileUrl);
                }}>
                Download
              </button>
            </div>
          )}
        </div>

        <div className={`${styles.samplePopupFooter}`}>
          <p>{sampleFile?.rate}</p>

          <div className={`${styles.samplePopupButtons}`}>
            <button onClick={handlePrevClick}>Prev</button>
            <button onClick={handleNextClick}>Next</button>
          </div>
        </div>

        {isDetailsOpen && (
          <div className={`${styles.sampleFileDetails}`}>
            <h3>Details</h3>

            <label>File Name</label>
            <p>{sampleFile?.title || 'NA'}</p>

            <label>File Description</label>
            <p>{sampleFile?.description || 'NA'}</p>

            <label>File Size</label>
            <p>{sampleFile?.size || 'NA'}</p>

            <label>Price</label>
            <p> {sampleFile?.rate || 'NA'}</p>
          </div>
        )}
      </div>
    </>
  );
}
