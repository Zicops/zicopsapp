import UploadAndPreview from '@/components/common/FormComponents/UploadAndPreview';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import LabeledDropdown from '../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../common/FormComponents/LabeledInput';
import { languages } from '../ProfilePreferences/Logic/profilePreferencesHelper';
import styles from './setupUser.module.scss';

const AccountSetupUser = ({ setCurrentComponent }) => {
  const [selectedLanguage, setSelectedLanguage] = useState();

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const [userData, setUserData] = useRecoilState(UserStateAtom);
  function handleInput(e) {
    const { name, value } = e.target;
    console.log(userData);
    setUserData((prevValue) => ({ ...prevValue, [name]: value }));
    console.log(userData);
  }

  useEffect(() => {
    if (!userData) return;
    const refreshUserData = JSON.parse(sessionStorage.getItem('loggedUser'));
    return setUserData(refreshUserData);
  }, []);

  return (
    <>
      <div className={`${styles.container}`}>
        <LabeledInput
          inputOptions={{
            inputName: 'first_name',
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
            inputName: 'last_name',
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
            inputName: 'phone',
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
        <UploadAndPreview inputName={'profile-image'} label={'Profile Picture'} isRemove={true} />
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
