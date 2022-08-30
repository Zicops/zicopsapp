import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import { changeHandler } from '@/helper/common.helper';
import { checkOrg } from '../Logic/singleInfo.helper';
import { UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from '../learnerUserProfile.module.scss';
import { isDisabledArr } from '../Logic/singleInfo.helper';
import { useLazyQuery } from '@apollo/client';
import { GET_USER_ORGANIZATIONS, userQueryClient } from '@/api/UserQueries';
import { getUserData } from '@/helper/loggeduser.helper';
import useHandleAddUserDetails from '@/components/LoginComp/Logic/useHandleAddUser';
import PhoneInputBox from '@/components/common/FormComponents/PhoneInputBox';

const SingleInfo = ({ userData, isEditable = true, isOrg = false }) => {
  const [tempData, setTempData] = useState(userData.info);
  const [userDataMain, setUserDataMain] = useRecoilState(UserStateAtom);
  const [userMetaData, setUserMetaData] = useRecoilState(UsersOrganizationAtom);
  const [loadUserOrg] = useLazyQuery(GET_USER_ORGANIZATIONS, {
    client: userQueryClient
  });

  const { setPhCountryCode } = useHandleAddUserDetails();

  function checkOrg(e, isOrg, userData) {
    if (isOrg) {
      return !!e
        ? changeHandler(e, userMetaData, setUserMetaData)
        : userMetaData[`${userData.inputName}`];
    }
    return !!e
      ? changeHandler(e, userDataMain, setUserDataMain)
      : userDataMain[`${userData.inputName}`];
  }

  useEffect(async () => {
    const { id } = getUserData();
    if (!userMetaData?.organization_id) {
      const resOrg = await loadUserOrg({ variables: { user_id: id } }).catch((err) =>
        console.log(err)
      );

      const orgData = resOrg?.data?.getUserOrganizations[0];

      // const data = JSON.parse(sessionStorage.getItem('userAccountSetupData'));
      // console.log(data);
      setUserMetaData((prevValue) => ({
        ...prevValue,
        sub_category: baseSubcategory[0]?.sub_category,
        ...orgData
      }));
      return;
    }
  }, []);

  return (
    <div className={`${styles.singleWraper}`}>
      <div className={`${styles.singleImage}`}>
        <img src={userData.image || userDataMain?.photo_url} />
      </div>
      <div className={`${styles.textWraper}`}>
        <div className={`${styles.smallText}`}>{userData.label}:</div>
        {isEditable ? (
          userData?.label === 'Contact' ? (
            <div className={`${styles.contactInputContainer}`}>
              {/* <label>Contact Number:</label> */}
              <PhoneInputBox
                value={userDataMain?.phone}
                changeHandler={(phNo, data) => {
                  setUserDataMain((prevValue) => ({ ...prevValue, phone: phNo }));
                  setPhCountryCode(data.countryCode?.toUpperCase());
                }}
                isLabel={false}
              />
            </div>
          ) : (
            <LabeledInput
              styleClass={`${styles.inputField}`}
              inputOptions={{
                inputName: `${userData.inputName}`,
                placeholder: `Enter ${userData.label}`,
                value: checkOrg(null, isOrg, userData),
                maxLength: 60,
                isDisabled: isDisabledArr.includes(userData.label)
              }}
              changeHandler={(e) => checkOrg(e, isOrg, userData)}
            />
          )
        ) : (
          <div className={`${styles.largeText}`}>{checkOrg(null, isOrg, userData)} </div>
        )}
      </div>
    </div>
  );
};

export default SingleInfo;
