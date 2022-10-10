import { IMAGE_FILE_TYPES } from '@/helper/constants.helper';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { ToastMsgAtom } from '../../../../state/atoms/toast.atom';
import ToolTip from '../../ToolTip';
import { IsDataPresentAtom } from '../../PopUp/Logic/popUp.helper';
import styles from '../formComponents.module.scss';
import PreviewImageVideo from './PreviewImageVideo';

export default function BrowseAndUpload({
  handleFileUpload,
  inputName,
  previewData,
  handleRemove,
  isActive,
  previewTooltipTitle,
  removeTooltipTitle,
  isError,
  acceptedTypes = IMAGE_FILE_TYPES,
  hidePreviewBtns = false
}) {
  const [showPreview, setShowPreview] = useState(false);
  const [popUpData, setPopUpData] = useState(false);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [isPopUpDataPresent, setIsPopUpDataPresent] = useRecoilState(IsDataPresentAtom);

  useEffect(() => {
    if (!showPreview && popUpData) setIsPopUpDataPresent(popUpData);
  }, [showPreview]);

  return (
    <>
      <div className={`${styles.uploadBtnWrapper}`}>
        <button
          className={`w-100 ${styles.btn} ${isActive ? styles.isActive : ''} ${
            isError ? 'error' : ''
          }`}>
          <img src="/images/upload.png" alt="" />
          Browse & upload
        </button>

        <input
          type="file"
          name={inputName}
          accept={acceptedTypes}
          onChange={(e) => {
            let fileTypes = acceptedTypes
              ?.split(', ')
              ?.map((t) => t?.trim()?.replace(/(\r\n|\n|\r)/gm, ''));

            if (e.target.value && !fileTypes?.some((t) => e.target.value?.includes(t))) {
              return setToastMsg({
                type: 'danger',
                message: `Accepted file types are ${acceptedTypes}`
              });
            }
            handleFileUpload(e);
          }}
        />

        {!hidePreviewBtns && (
          <div className={`${styles.btnContainer}`}>
            <ToolTip title={previewTooltipTitle}>
            <button
              className={`${styles.preview}`}
              onClick={() => {
                if (previewData?.fileName || previewData?.filePath) {
                  setPopUpData(isPopUpDataPresent);
                  setIsPopUpDataPresent(false);
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
            </ToolTip>
            <ToolTip title={removeTooltipTitle}>
            <button className={`${styles.remove}`} onClick={handleRemove}>
              Remove
            </button>
            </ToolTip>
          </div>
        )}
      </div>

      {showPreview && (
        <PreviewImageVideo
          fileName={previewData.fileName}
          filePath={previewData.filePath}
          isVideo={previewData.isVideo}
          setShowPreview={setShowPreview}
          showPreview={showPreview}
        />
      )}
    </>
  );
}
