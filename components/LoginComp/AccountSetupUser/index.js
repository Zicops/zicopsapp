import { Box, Button, Dialog, IconButton } from '@mui/material';
import LabeledInput from '../../common/FormComponents/LabeledInput';
import styles from './setupUser.module.scss';
import { useEffect, useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import LabeledDropdown from '../../common/FormComponents/LabeledDropdown';
import { languages } from '../ProfilePreferences/Logic/profilePreferencesHelper';
import ImageCropper from '../../common/ImageCropper';
import { useRecoilState } from 'recoil';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';

const AccountSetupUser = ({ setCurrentComponent }) => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [image, setImage] = useState();
  const [preview, setPreview] = useState('');
  const [pop, setPop] = useState(false);

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const [userData, setUserData] = useRecoilState(UserStateAtom);

  useEffect(() => {
    if (!userData) return;
    const refreshUserData = JSON.parse(sessionStorage.getItem('loggedUser'));
    return setUserData(refreshUserData);
  }, []);

  const handleClick = () => {
    setPop(true);
  };
  const handleClose = () => {
    setPop(false);
  };

  const myRef = useRef(null);

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

  const dataURLtoFile = (dataUrl, filename) => {
    let arr = dataUrl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <>
      <div className={`${styles.container}`}>
        <LabeledInput
          inputOptions={{
            inputName: 'first-name',
            label: 'Firstname:',
            placeholder: 'Enter Firstname (Max up to 60 characters)',
            value: userData?.first_name,
            maxLength: 60
          }}
          changeHandler={(e) => {
            setUserData({ ...userData, first_name: e.target.value });
          }}
        />
        <Box mt={3} />
        <LabeledInput
          inputOptions={{
            inputName: 'last-name',
            label: 'Lastname:',
            placeholder: 'Enter Lastname (Max up to 60 characters)',
            value: userData?.last_name,
            maxLength: 60
          }}
          changeHandler={(e) => {
            setUserData({ ...userData, last_name: e.target.value });
          }}
        />
        <Box mt={3} />
        <LabeledDropdown
          dropdownOptions={{
            label: 'Base Language:',
            placeholder: 'Select Language',
            options: languages,
            value: { value: selectedLanguage, label: selectedLanguage }
          }}
          changeHandler={(e) => setSelectedLanguage(e.value)}
        />
        <Box mt={3} />
        <LabeledInput
          inputOptions={{
            inputName: 'email',
            label: 'Email:',
            placeholder: 'Enter Email (ab@zicops.com)',
            value: userData?.email,
            maxLength: 60,
            isDisabled: true
          }}
          changeHandler={(e) => {
            setUserData({ ...userData, email: e.target.value });
          }}
        />
        <Box mt={3} />
        <LabeledInput
          inputOptions={{
            inputName: 'number',
            label: 'Contact Number:',
            placeholder: 'Enter Phone',
            value: userData?.phone,
            maxLength: 60
          }}
          changeHandler={(e) => {
            setUserData({ ...userData, phone: e.target.value });
          }}
        />
        <Box mt={3} />
        <div className={`${styles.labeledInputWrapper}`}>
          <label className="w-100">Profile Picture:</label>
          <div className={`${styles.upload}`}>
            <input
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) setImage(file);
                else setImage(null);
              }}
              id={'materialUpload'}
              style={{ display: 'none' }}
              type="file"
            />
            <Button
              variant={'contained'}
              className={`${styles.transform_text}`}
              onClick={() => {
                document.getElementById('materialUpload').click();
              }}>
              Upload Photo
            </Button>
            <div>320 x 320 pixels (Recommended)</div>
            <Button
              onClick={handleClick}
              disabled={preview === ''}
              className={`${styles.input_margin_transform_white}`}>
              Preview
            </Button>
            <Dialog open={pop} onClose={handleClose}>
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
                    <Box>
                      <ImageCropper
                        initialImage={image}
                        setCroppedImage={setPreview}
                        aspectRatio={1}
                      />
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
                </Box>
              </Box>
            </Dialog>
          </div>
        </div>
        <Box mt={2} />
      </div>
      <div className={`${styles.navigator}`}>
        <span />
        <div className={`${styles.navigatorBtns}`}>
          <Button variant={'outlined'} className={`${styles.transform_text}`}>
            Back
          </Button>
          <Button
            variant={'contained'}
            className={`${styles.input_margin_transform}`}
            onClick={() => {
              for (const prop in userData) {
                if (!userData[prop])
                  return setToastMsg({ type: 'danger', message: 'Fill all fields!' });
              }
              setCurrentComponent(1);
            }}>
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default AccountSetupUser;
