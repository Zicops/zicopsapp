import { useEffect, useState } from 'react';

export default function DisplayImage({ filePath = null }) {
  const [fileSrc, setFileSrc] = useState('');

  useEffect(() => {
    if (typeof filePath === 'string') setFileSrc('');
  }, [filePath, fileSrc]);

  useEffect(() => {
    if (typeof filePath !== 'object') return setFileSrc('');

    convertFileToUrl(filePath)
      .then((src) => {
        if (typeof filePath === 'string') return setFileSrc('');

        setFileSrc(src);
      })
      .catch((err) => console.log('Error in PreviewImageVideo:', err));
  }, [filePath]);

  if (typeof filePath === 'object' && !fileSrc) return null;

  return (
    <>
      <img src={fileSrc || filePath} alt="" />
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
