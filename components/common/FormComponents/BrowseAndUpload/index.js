import { IMAGE_FILE_TYPES } from '@/helper/constants.helper';
import { isWordIncluded } from '@/helper/utils.helper';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ToastMsgAtom } from '../../../../state/atoms/toast.atom';
import { IsDataPresentAtom } from '../../PopUp/Logic/popUp.helper';
import ToolTip from '../../ToolTip';
import styles from '../formComponents.module.scss';
import DisplayImage from './DisplayImage';
import FilePreview from './FilePreview';
import { FeatureFlagsAtom } from '@/state/atoms/global.atom';
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
  hidePreviewBtns = false,
  hideRemoveBtn = false,
  isDisabled = false,
  shouldShowPreview = true,
  styleClass = '',
  title = null,
  styleClassBtn = '',
  filePreview = null,
  progressPercent = 0
}) {
  const inputRef = useRef();
  const [showPreview, setShowPreview] = useState(false);
  const [popUpData, setPopUpData] = useState(false);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [isPopUpDataPresent, setIsPopUpDataPresent] = useRecoilState(IsDataPresentAtom);

  const { isDev } = useRecoilValue(FeatureFlagsAtom);

  useEffect(() => {
    if (!showPreview && popUpData) setIsPopUpDataPresent(popUpData);
  }, [showPreview]);

  return (
    <>
      <div className={`${styles.uploadBtnWrapper} ${styleClass}`}>
        <button
          className={`w-100 ${styles.btn} ${isActive ? styles.isActive : ''} ${
            isError ? 'error' : ''
          } ${styleClassBtn}`}>
          {/* <img src={filePreview || '/images/upload.png'} alt="" /> */}
          <DisplayImage filePath={filePreview || '/images/upload.png'} />
          {title || 'Browse & upload'}
        </button>

        {!!progressPercent && (
          <div className={styles.progressBar}>
            <div className={`${styles.progressBarFill} w-${Math.floor(progressPercent)}`}></div>
          </div>
        )}

        <input
          type="file"
          ref={inputRef}
          name={inputName}
          accept={acceptedTypes}
          disabled={isDisabled}
          onChange={(e) => {
            const fileTypes = acceptedTypes
              ?.split(', ')
              ?.map((t) => t?.trim()?.replace(/(\r\n|\n|\r)/gm, ''));
            const fileName = e.target.value || '';
            if (
              !(
                (fileName && fileTypes?.some((t) => isWordIncluded(fileName, t))) ||
                isWordIncluded(acceptedTypes, e?.target?.files?.[0]?.type)
              )
            ) {
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
            {!!shouldShowPreview && (
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
            )}

            {!hideRemoveBtn && (
              <ToolTip title={removeTooltipTitle}>
                <button
                  className={`${styles.remove}`}
                  onClick={() => {
                    handleRemove();
                    inputRef.current.value = '';
                  }}>
                  Remove
                </button>
              </ToolTip>
            )}
          </div>
        )}
      </div>

      {showPreview &&
        (!isDev ? (
          <PreviewImageVideo
            fileName={previewData.fileName}
            filePath={previewData.filePath}
            isVideo={previewData.isVideo}
            setShowPreview={setShowPreview}
            showPreview={showPreview}
          />
        ) : (
          <FilePreview
            fileName={previewData.fileName}
            filePath={previewData.filePath}
            setShowPreview={setShowPreview}
            showPreview={showPreview}
          />
        ))}
    </>
  );
}
