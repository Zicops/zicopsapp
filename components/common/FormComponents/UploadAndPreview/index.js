import { Box, Dialog, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import ImageCropper from '../../ImageCropper';
import styles from '../formComponents.module.scss';
import { useEffect, useRef, useState } from 'react';
import ToolTip from '../../ToolTip';

const UploadAndPreview = ({
  inputName,
  label,
  description = '320 x 320 pixels (Recommended)',
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
        return handleChange(imageFile);
      else return handleChange(imageFile);
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
        <label htmlFor={inputName} aria-label={inputName} className="w-25">
          {label}
        </label>
      )}
      <div className={`${styles.inputContainer} ${label ? 'w-75' : 'w-100'}`}>
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
                Upload Photo
              </button>
            {description && <span className={`${styles.description}`}>{description}</span>}
            <button className={`${styles.btn2}`} onClick={handleClick} disabled={!image}>
              Preview
            </button>
            {isRemove && (
              <button className={`${styles.btn2}`} onClick={handleRemove} disabled={!image || isDisabled}>
                Remove
              </button>)}
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
