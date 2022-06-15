import Image from 'next/image';
import { useState } from 'react';
import { truncateToN } from '../../../../../helper/common.helper';
import PopUp from '../../../PopUp';

export default function PreviewImageVideo({ fileName, filePath, isVideo, handleClose }) {
  const [fileSrc, setFileSrc] = useState('');

  if (typeof filePath === 'object') {
    console.log(filePath);
    convertFileToUrl(filePath)
      .then((src) => {
        setFileSrc(src);
        console.log('src: ', src);
      })
      .catch((err) => console.log('Error in PreviewImageVideo:', err));
  }

  if (typeof filePath === 'object' && !fileSrc) return null;

  return (
    <>
      <PopUp
        closeBtn={{ handleClick: handleClose }}
        title={`${isVideo ? 'Video' : 'Image'} Preview (${truncateToN(fileName, 50)})`}
        isFooterVisible={false}>
        {isVideo ? (
          <div style={{ position: 'relative', width: '100%' }}>
            <video controls src={fileSrc || filePath} style={{ width: '100%' }}></video>
          </div>
        ) : (
          <div style={{ position: 'relative', width: '100%', paddingBottom: '60%' }}>
            {(filePath || fileSrc) && (
              <Image src={fileSrc || filePath} layout="fill" objectFit="contain" alt="" />
            )}
          </div>
        )}
      </PopUp>
    </>
  );
}

async function convertFileToUrl(file) {
  if (!file) return;

  let fileUrl = await new Promise((resolve) => {
    let fileReader = new FileReader();
    fileReader.onload = (e) => resolve(fileReader.result);
    fileReader.readAsDataURL(file);
  });

  return fileUrl;
}
