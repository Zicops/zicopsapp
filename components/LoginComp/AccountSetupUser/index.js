import UploadAndPreview from '@/components/common/FormComponents/UploadAndPreview';
import { changeHandler } from '@/helper/common.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import LabeledDropdown from '../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../common/FormComponents/LabeledInput';
import useHandleAddUserDetails from '../Logic/useHandleAddUser';
import { languages } from '../ProfilePreferences/Logic/profilePreferencesHelper';
import styles from './setupUser.module.scss';

const AccountSetupUser = ({ setCurrentComponent }) => {
  const [selectedLanguage, setSelectedLanguage] = useState();

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const [userData, setUserData] = useRecoilState(UserStateAtom);
  const [userOrgData, setUserOrgData] = useRecoilState(UsersOrganizationAtom);

  const { isAccountSetupReady } = useHandleAddUserDetails();

  useEffect(() => {
    if (!userData) return;
    const refreshUserData = JSON.parse(sessionStorage.getItem('loggedUser'));
    setUserData(refreshUserData);
    setUserOrgData({ ...userOrgData, language: selectedLanguage, is_base_language: true });
    return;
  }, [selectedLanguage]);

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
            changeHandler(e, userData, setUserData);
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
            changeHandler(e, userData, setUserData);
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
            changeHandler(e, userData, setUserData);
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
            changeHandler(e, userData, setUserData);
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
            disabled={!isAccountSetupReady}
            variant={'contained'}
            className={`${styles.input_margin_transform}`}
            onClick={() => {
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
