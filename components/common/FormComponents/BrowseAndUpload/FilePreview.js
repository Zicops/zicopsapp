import { getUrlFromFile, truncateToN } from '@/helper/common.helper';
import { useEffect, useState } from 'react';
import Button from '../../Button';
import PopUp from '../../PopUp';
import Spinner from '../../Spinner';
import ViewDoc from '../../ViewDoc';
import styles from '../formComponents.module.scss';

const PREVIEW_FILE_TYPES = {
  download: 'download',
  image: 'image',
  video: 'video',
  audio: 'audio',
  docPreview: 'doc'
};

export default function FilePreview({
  fileName = 'File Preview',
  filePath,
  showPreview,
  setShowPreview
}) {
  const [fileSrc, setFileSrc] = useState({ type: null, url: null });

  useEffect(async () => {
    if (fileSrc?.type != null && fileSrc?.url != null) return;

    if (typeof filePath === 'string' && fileSrc?.type == null) {
      let type = getFileType(filePath);
      if (!type) type = await checkImage(fileSrc?.url).catch((err) => console.log(err));

      return setFileSrc({ type: type, url: filePath });
    }

    getUrlFromFile(filePath)
      .then((src) => setFileSrc({ type: getFileType(filePath?.type), url: src }))
      .catch((err) => setFileSrc({ type: null, url: '' }));
  }, [fileName, filePath]);

  console.info(fileSrc, fileName, filePath);

  async function checkImage(url) {
    return new Promise((resolve, reject) => {
      var request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.send();
      request.onload = function (res) {
        const str = request?.getAllResponseHeaders()?.split('\r\ncontent-type: ');
        const contentType = str?.[1]?.split('\r\n')?.[0];

        resolve(contentType);
      };

      request.onerror = () => reject(null);
    });
  }

  return (
    <>
      <PopUp
        popUpState={[showPreview, setShowPreview]}
        title={`${fileSrc?.type || ''} (${truncateToN(fileName, 50)})`}
        isFooterVisible={false}>
        <div className={`${styles.filePreview}`}>
          {/* loader */}
          {!!(fileSrc?.type == null && fileSrc?.url == null) && <Spinner />}

          {/* fallback */}
          {fileSrc?.type == null && fileSrc?.url === '' && (
            <div className={`${styles.filePreviewFallBack}`}>
              <p>Can't Preview this File</p>
              <small>{fileName}</small>
            </div>
          )}

          {fileSrc?.type === PREVIEW_FILE_TYPES.docPreview && <ViewDoc url={fileSrc?.url} />}
          {fileSrc?.type === PREVIEW_FILE_TYPES.image && <img src={fileSrc?.url} />}
          {fileSrc?.type === PREVIEW_FILE_TYPES.video && <video src={fileSrc?.url} controls />}
          {fileSrc?.type === PREVIEW_FILE_TYPES.audio && <audio src={fileSrc?.url} controls />}
        </div>

        <div style={{ float: 'right' }}>
          <Button clickHandler={() => setShowPreview(false)} text="Cancel" />
        </div>
      </PopUp>
    </>
  );
}

function getFileType(fileName = null) {
  if (!fileName) return null;

  if (
    [
      'pdf',
      'ppt',
      'doc',
      'xls',
      'csv',
      'doc',
      'txt',
      'srt',
      'vtt',
      'text/plain',
      'application/pdf'
    ]?.includes(fileName?.toLowerCase())
  )
    return PREVIEW_FILE_TYPES.docPreview;
  if (['mp3', 'audio/webm', 'audio/wav']?.includes(fileName?.toLowerCase()))
    return PREVIEW_FILE_TYPES.audio;
  if (['mp4', 'webm', 'video/webm', 'video/mpeg', 'video/mp4']?.includes(fileName?.toLowerCase()))
    return PREVIEW_FILE_TYPES.video;
  if (
    [
      'image',
      'jpg',
      'jpeg',
      'png',
      'gif',
      'image/webp',
      'image/tiff',
      'image/png',
      'image/gif',
      'image/jpeg'
    ]?.includes(fileName?.toLowerCase())
  )
    return PREVIEW_FILE_TYPES.image;

  return null;
}
