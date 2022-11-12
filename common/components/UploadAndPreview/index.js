import { Box, Dialog, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import ImageCropper from './ImageCropper';
import styles from './uploadAndPreview.module.scss';
import { useEffect, useRef, useState } from 'react';
// import ToolTip from '../../ToolTip';

const UploadAndPreview = ({
  inputOptions,
  isPreview,
  isRemove = false,
  handleChange = function () {},
  styleClass = {},
  handleUpdateImage = () => {},
  initialImage = null,
  tooltipTitle,
  imageUrl = null,
  uploadedFile = null,
  closePopUp = () => {},
  isDisabled = false
}) => {
  const [image, setImage] = useState(uploadedFile);
  const [preview, setPreview] = useState('');
  const [pop, setPop] = useState(false);

  const { inputName, label, description = '320 x 320 pixels (Recommended)' } = inputOptions;

  const CLOUD_UPLOAD_SVG = (
    <svg width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 29C1.99877 26.7909 2.56084 24.618 3.6331 22.6866C4.70537 20.7552 6.2524 19.1291 8.128 17.962C8.62303 14.1022 10.5076 10.555 13.429 7.98432C16.3505 5.41362 20.1086 3.99559 24 3.99559C27.8914 3.99559 31.6495 5.41362 34.571 7.98432C37.4924 10.555 39.377 14.1022 39.872 17.962C42.1985 19.4094 44.0081 21.5548 45.0426 24.092C46.0771 26.6291 46.2835 29.4283 45.6323 32.0897C44.9811 34.7511 43.5057 37.1388 41.4167 38.9117C39.3277 40.6847 36.7319 41.7522 34 41.962L14 42C7.288 41.452 2 35.844 2 29ZM33.696 37.974C35.5877 37.8286 37.385 37.089 38.8312 35.8611C40.2775 34.6331 41.2986 32.9795 41.7489 31.1365C42.1992 29.2935 42.0555 27.3553 41.3384 25.5988C40.6213 23.8423 39.3675 22.3573 37.756 21.356L36.142 20.35L35.902 18.466C35.5282 15.5734 34.1138 12.9159 31.9232 10.9902C29.7326 9.06448 26.9157 8.00238 23.999 8.00238C21.0823 8.00238 18.2654 9.06448 16.0748 10.9902C13.8843 12.9159 12.4699 15.5734 12.096 18.466L11.856 20.35L10.246 21.356C8.63459 22.3572 7.38077 23.842 6.66359 25.5983C5.94642 27.3546 5.80258 29.2927 6.25262 31.1356C6.70265 32.9786 7.72355 34.6322 9.1695 35.8603C10.6155 37.0884 12.4125 37.8282 14.304 37.974L14.65 38H33.35L33.696 37.974ZM26 26V34H22V26H16L24 16L32 26H26Z"
        fill="white"
      />
    </svg>
  );

  useEffect(async () => {
    if (!initialImage) return;

    const response = await fetch(`/api/overrideCors?filePath=${encodeURIComponent(initialImage)}`);
    // here image is url/location of image
    const blob = await response.blob();
    const file = new File([blob], 'image.jpg', { type: blob.type });

    console.log(file);
    setImage(file);
    setPop(true);
  }, []);

  useEffect(async () => {
    if (!imageUrl) return;

    const response = await fetch(`/api/overrideCors?filePath=${encodeURIComponent(imageUrl)}`);
    // here image is url/location of image
    const blob = await response.blob();
    const file = new File([blob], 'image.jpg', { type: blob.type });

    setImage(file);
  }, [imageUrl]);

  const handleRemove = () => {
    if (!image) return;
    setImage(null);
    handleChange(null);
    return;
  };

  function handleImage(e) {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setTimeout(() => {
        e.target.value = null;
      }, 250);
    } else setImage(null);
  }

  const CustomButton = styled(Button)(({ theme }) => ({
    borderRadius: '15px',
    padding: '10px 15px'
  }));

  const handleClick = () => {
    setPop(true);
  };

  const handleClose = () => {
    setPop(false);
    closePopUp();
  };

  const imgRef = useRef(null);

  useEffect(() => {
    setPreview('');
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else setPreview('');
  }, [image]);

  useEffect(() => {
    const file = image;
    if (preview.length > 0) {
      const imageFile = dataURLtoFile(preview, `${file?.name}`);
      const { name, size, type } = imageFile;
      if (name === file.name && size === file.size && type === file.size)
        return handleChange((prevValue) => ({...prevValue , [`${inputName}`]:imageFile}));
      else return handleChange((prevValue) => ({...prevValue , [`${inputName}`]:imageFile}));;
    } else return;
  }, [preview]);

  const dataURLtoFile = (dataUrl, filename) => {
    let arr = dataUrl?.split(','),
      mime = arr[0]?.match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr?.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <div className={`${styles.uploadAndPreviewContainer} ${styleClass}`}>
      {label && (
        <label htmlFor={inputName} aria-label={inputName}>
          {label}
        </label>
      )}
      <div className={`${styles.inputContainer}`}>
        <input
          name={inputName}
          accept="image/*"
          onChange={(e) => handleImage(e)}
          ref={imgRef}
          style={{ display: 'none' }}
          type="file"
          disabled={isDisabled}
        />
        {!initialImage && (
          <>
            <button className={`${styles.btn}`} onClick={() => imgRef?.current?.click()}>
              <span>Upload Photo</span>
              <span>{CLOUD_UPLOAD_SVG}</span>
            </button>
            <div className={`${styles.btnLower}`}>
              {description && <span className={`${styles.description}`}>{description}</span>}
              <button className={`${styles.btn2}`} onClick={handleClick} disabled={!image}>
                Preview
              </button>
            </div>
            {isRemove && (
              <button
                className={`${styles.btn2}`}
                onClick={handleRemove}
                disabled={!image || isDisabled}>
                Remove
              </button>
            )}
          </>
        )}
        <Dialog
          open={pop}
          onClose={handleClose}
          sx={{
            '& .MuiPaper-root': {
              backgroundColor: 'var(--black)'
            }
          }}>
          <Box
            py={3}
            px={3}
            zIndex={1}
            width={'450px'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}>
            <Box
              width={'100%'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              flexDirection={'column'}>
              <Box
                width={'100%'}
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                px={2}>
                <Box fontSize={'27px'} fontWeight={600} color={'#FFF'}>
                  Preview
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-end'
                  }}>
                  {initialImage && (
                    <span
                      style={{
                        width: '20px',
                        marginRight: '10px',
                        height: '30px'
                      }}
                      className={`${styles.btn}`}
                      onClick={() => imgRef?.current?.click()}>
                      <img height={'20px'} width={'20px'} src="/images/plus.png" />
                    </span>
                  )}
                  <ImageCropper initialImage={image} setCroppedImage={setPreview} aspectRatio={1} />
                  <IconButton onClick={handleClose}>
                    <CloseIcon sx={{ color: '#FFF' }} />
                  </IconButton>
                </Box>
              </Box>
              <Box mb={5} />
              <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                width={'320px'}
                height={'320px'}
                border={'4px dashed #6bcfcf'}
                borderRadius={'50%'}
                overflow={'hidden'}
                m={'auto'}>
                <img
                  src={preview}
                  alt={'logo'}
                  width={'320px'}
                  height={'320px'}
                  style={{ objectFit: 'cover' }}
                />
              </Box>

              <Box mb={4} />
              {initialImage && (
                <CustomButton
                  onClick={() => {
                    const file = image;
                    const imageFile = dataURLtoFile(preview, `${file?.name}`);
                    handleUpdateImage(imageFile);
                  }}
                  variant={'contained'}
                  fullWidth>
                  Update Profile Image
                </CustomButton>
              )}
            </Box>
          </Box>
        </Dialog>
      </div>
    </div>
  );
};

export default UploadAndPreview;
