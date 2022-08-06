import { Box, Button } from '@mui/material';
import LabeledInput from '../../common/FormComponents/LabeledInput';
import styles from './setupOrg.module.scss';
import LabeledDropdown from '../../common/FormComponents/LabeledDropdown';
import { roleList } from '../ProfilePreferences/Logic/profilePreferencesHelper';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';
import { changeHandler } from '@/helper/common.helper';
import useHandleAddUserDetails from '../Logic/useHandleAddUser';

const AccountSetupOrg = ({ setCurrentComponent }) => {
  const [role, setRole] = useState();

  const userBasicData = useRecoilValue(UserStateAtom);
  const [userOrgLsp, setUserOrgLsp] = useRecoilState(UsersOrganizationAtom);
  const {
    isOrganizationSetupReady,
    updateAboutUser,
    addUserLearningSpaceDetails,
    addUserOrganizationDetails
  } = useHandleAddUserDetails();

  //initialize user_id after login
  useEffect(() => {
    setUserOrgLsp({ ...userOrgLsp, user_id: userBasicData?.id });
    console.log(isOrganizationSetupReady);
    return;
  }, [userBasicData]);
  return (
    <>
      <div className={`${styles.container}`}>
        <LabeledInput
          inputOptions={{
            inputName: 'org-name',
            label: 'Organization:',
            placeholder: 'Auto-populated',
            value: `${userOrgLsp?.organization_name}`,
            maxLength: 60,
            isDisabled: true
          }}
          // changeHandler={() => {}}
        />
        <Box mt={3} />
        <LabeledInput
          inputOptions={{
            inputName: 'organization_unit',
            label: 'Organization Unit:',
            placeholder: 'Auto-populated',
            value: `${userOrgLsp?.organization_unit}`,
            maxLength: 60,
            isDisabled: true
          }}
          // changeHandler={() => {}}
        />
        <Box mt={3} />
        <LabeledInput
          inputOptions={{
            inputName: 'role',
            label: 'Learning Space Role:',
            placeholder: 'Auto Populated',
            value: `${userOrgLsp?.user_role}`,
            maxLength: 60,
            isDisabled: true
          }}
          // changeHandler={() => {}}
        />
        <Box mt={3} />
        <LabeledInput
          inputOptions={{
            inputName: 'organization_role',
            label: 'Organization Role:',
            placeholder: 'Please enter role of organization',
            value: `${userOrgLsp.organization_role}`,
            maxLength: 60
          }}
          changeHandler={(e) => {
            changeHandler(e, userOrgLsp, setUserOrgLsp);
          }}
        />
        <Box mt={3} />

        <LabeledInput
          inputOptions={{
            inputName: 'employee_id',
            label: 'Employee ID:',
            placeholder: 'Please enter your employee ID',
            value: `${userOrgLsp.employee_id}`,
            maxLength: 60
          }}
          changeHandler={(e) => {
            changeHandler(e, userOrgLsp, setUserOrgLsp);
          }}
        />
        <Box mt={3} />
      </div>
      <div className={`${styles.navigator}`}>
        <span />
        <div className={`${styles.navigatorBtns}`}>
          <Button
            variant={'outlined'}
            className={`${styles.transform_text}`}
            onClick={() => {
              setCurrentComponent(0);
            }}>
            Back
          </Button>
          <Button
            disabled={!isOrganizationSetupReady}
            variant={'contained'}
            className={`${styles.input_margin_transform}`}
            onClick={async () => {
              // addUserLearningSpaceDetails();

              // await addUserOrganizationDetails();

              setCurrentComponent(2);
            }}>
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default AccountSetupOrg;
