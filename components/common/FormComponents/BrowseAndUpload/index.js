import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { ToastMsgAtom } from '../../../../state/atoms/toast.atom';
import styles from '../formComponents.module.scss';
import PreviewImageVideo from './PreviewImageVideo';

export default function BrowseAndUpload({
  handleFileUpload,
  inputName,
  previewData,
  handleRemove,
  isActive,
  acceptedTypes = '.jpeg, .png, .gif',
  hidePreviewBtns = false
}) {
  const [showPreview, setShowPreview] = useState(false);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  return (
    <>
      <div className={`${styles.uploadBtnWrapper}`}>
        <button className={`w-100 ${styles.btn} ${isActive ? styles.isActive : ''}`}>
          <img src="/images/upload.png" alt="" />
          Browse & upload
        </button>

        <input type="file" name={inputName} accept={acceptedTypes} onChange={handleFileUpload} />

        {!hidePreviewBtns && (
          <div className={`${styles.btnContainer}`}>
            <button
              className={`${styles.preview}`}
              onClick={() => {
                if (previewData?.fileName || previewData?.filePath) {
                  setShowPreview(true);
                } else {
                  setToastMsg([
                    ...toastMsg,
                    { type: 'warning', message: 'No File detected, Please Upload a File' }
                  ]);
                }
              }}>
              Preview
            </button>
            <button className={`${styles.remove}`} onClick={handleRemove}>
              Remove
            </button>
          </div>
        )}
      </div>

      {showPreview && (
        <PreviewImageVideo
          fileName={previewData.fileName}
          filePath={previewData.filePath}
          isVideo={previewData.isVideo}
          handleClose={() => setShowPreview(false)}
        />
      )}
    </>
  );
}
