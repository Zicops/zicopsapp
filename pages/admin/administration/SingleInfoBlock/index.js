import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import styles from '../administration.module.scss';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { updateOrgDetails } from '../helper/orgdata.helper';
import { LearningSpaceAtom, OrganizationAtom, OrganizationUnitAtom } from '../atoms/orgs.atom';
import { useRecoilState } from 'recoil';
import { changeHandler } from '@/helper/common.helper';
import { useState , useEffect } from 'react';
export default function SingleInfoBlock({ userData, showImg = true, isOrg = false, isEditable = false }) {
  const [orgDataMain, setOrgDataMain] = useRecoilState(OrganizationAtom);
  const [lspDataMain, setLspDataMain] = useRecoilState(LearningSpaceAtom);
  const [orgUnitDataMain, setOrgUnitDataMain] = useRecoilState(OrganizationUnitAtom);
  const [value, setValue] = useState(userData?.info)

  const changeHandler = (e) => {
    setValue(e.target.value)
    setOrgDataMain({ ...orgDataMain, [e.target.name]: e.target.value })
    setLspDataMain({...lspDataMain, [e.target.name]: e.target.value})
    setOrgUnitDataMain({...orgUnitDataMain, [e.target.name]: e.target.value})
  }

  // changeHandler(e,value,setValue)
//   function checkOrg(e, isOrg, userData) {
//     if (isOrg) {
//       return !!e
//         ? changeHandler(e, userMetaData, setUserMetaData)
//         : userMetaData[`${userData.inputName}`];
//     }
//     return !!e
//       ? changeHandler(e, userDataMain, setUserDataMain)
//       : userDataMain[`${userData.inputName}`];
//  }

  // useEffect(async () => {
  //   const { id } = getUserData();
  //   if (!userMetaData?.organization_id) {
  //     const resOrg = await loadUserOrg({ variables: { user_id: id } }).catch((err) =>
  //       console.log(err)
  //     );

  //     const orgData = resOrg?.data?.getUserOrganizations[0];

      // const data = JSON.parse(sessionStorage.getItem('userAccountSetupData'));
      // console.log(data);
  //     setUserMetaData((prevValue) => ({
  //       ...prevValue,
  //       sub_category: baseSubcategory[0]?.sub_category,
  //       ...orgData
  //     }));
  //     return;
  //   }
  // }, []);
  useEffect(() => {
  //  updateOrgDetails()
    console.log(value?.info)
  }, [])
  
  return (
    <div className={`${styles.singleWraper}`}>
      {showImg && (
        <div className={`${styles.singleImage}`}>
          <img src={userData?.image} />
        </div>
      )}
      <div className={`${styles.textWraper}`}>
        <div className={`${styles.smallText}`}>{userData?.label}:</div>
        {isEditable ? (
          userData?.label === 'Contact' ? (
            <div className={`${styles.contactInputContainer}`}>
              {/* <label>Contact Number:</label> */}
              <PhoneInputBox
                value={userData?.phone}
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
                inputName: `${userData?.inputName}`,
                placeholder: `Enter ${userData?.label}`,
                value: value,
                maxLength: 60,
                isDisabled: false
              }}
               changeHandler={changeHandler}
            />
          )
        ) : (
          <div className={`${styles.largeText}`}>{userData?.info}</div>
        )}
      </div>
    </div>
  );
}
