import Image from 'next/image';
import PopUp from '../../../common/PopUp';

export default function PreviewImage({ fileName, filePath, isVideo, popUpData }) {
  const { closeBtn, submitBtn } = popUpData;

  return (
    <>
      <PopUp title={`Image Preview (${fileName})`} closeBtn={closeBtn} submitBtn={submitBtn}>
        {isVideo ? (
          <div style={{ position: 'relative', width: '100%' }}>
            <video controls src={filePath} style={{ width: '100%' }}></video>
          </div>
        ) : (
          <div style={{ position: 'relative', width: '100%', paddingBottom: '20%' }}>
            {filePath && <Image src={filePath} layout="fill" objectFit="contain" alt="" />}
          </div>
        )}
      </PopUp>
    </>
  );
}
