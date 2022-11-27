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
import { useLazyQuery } from '@apollo/client';
import {
  GET_LSP_DETAILS,
  GET_ORGANIZATIONS_DETAILS,
  GET_ORG_UNITS_DETAILS,
  GET_USER_LSP_ROLES
} from '@/api/UserQueries';
import { userClient } from '@/api/UserMutations';
import { parseJson } from '@/helper/utils.helper';

const AccountSetupOrg = ({ setCurrentComponent }) => {
  const [role, setRole] = useState();

  const userBasicData = useRecoilValue(UserStateAtom);
  const [userOrgLsp, setUserOrgLsp] = useRecoilState(UsersOrganizationAtom);
  const { isOrganizationSetupReady } = useHandleAddUserDetails();

  const [getOrganizationDetails] = useLazyQuery(GET_ORGANIZATIONS_DETAILS, { client: userClient });
  const [getLearningSpaceDetails] = useLazyQuery(GET_LSP_DETAILS, { client: userClient });
  const [getUserRoleDetails] = useLazyQuery(GET_USER_LSP_ROLES, { client: userClient });

  // load org details
  const loadOrgDetails = async (orgIds = []) => {
    if (!orgIds?.length) return;
    const res = await getOrganizationDetails({
      variables: { org_ids: orgIds }
    }).catch((err) => {
      console.log(err);
      // isError = !!err;
      // return setToastMsg({ type: 'danger', message: 'Login Error' });
    });
    const name = res?.data?.getOrganizations[0]?.name;
    let orgName = name ? name : '';
    setUserOrgLsp((prev) => ({ ...prev, organization_name: orgName }));
  };

  //load lsp details
  const loadLspDetails = async (lspIds = []) => {
    if (!lspIds?.length) return;
    const res = await getLearningSpaceDetails({
      variables: { lsp_ids: lspIds }
    }).catch((err) => {
      console.log(err);
      // isError = !!err;
      // return setToastMsg({ type: 'danger', message: 'Login Error' });
    });
    //  console.log(res?.data?.getLearningSpaceDetails[0],'orgUnitdetgails');
    const name = res?.data?.getLearningSpaceDetails[0]?.name;
    let lspName = name ? name : '';
    setUserOrgLsp((prev) => ({ ...prev, learningSpace_name: lspName }));
  };

  //load users lsp role details
  const loadUserLspRole = async (userLspIds = [],userId = "") => {
    if (!userLspIds?.length) return;
    const res = await getUserRoleDetails({
      variables: { user_id: userId, user_lsp_ids: userLspIds }
    }).catch((err) => console.log(err));
    console.log(res,'role')
    setUserOrgLsp((prev) => ({ ...prev, user_lsp_role: res?.data?.getUserLspRoles[0]?.role }));
  };

  //initialize user_id after login
  useEffect(() => {
    setUserOrgLsp({ ...userOrgLsp, user_id: userBasicData?.id });
    // console.log(isOrganizationSetupReady);
    return;
  }, [userBasicData]);

  useEffect(() => {
    const orgId = sessionStorage?.getItem('org_id');
    const lspId = sessionStorage?.getItem('lsp_id');
    const userLspId = sessionStorage?.getItem('user_lsp_id');
    if (!orgId) return;
    //  console.log(orgId)
    const {id} = parseJson(sessionStorage?.getItem('loggedUser'));
    loadOrgDetails([orgId]);
    loadLspDetails([lspId]);
    loadUserLspRole([userLspId],id);
  }, []);
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
            label: 'Learning Space:',
            placeholder: 'Auto-populated',
            value: `${userOrgLsp?.learningSpace_name}`,
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
            value: `${userOrgLsp?.user_lsp_role}`,
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
