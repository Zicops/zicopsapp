import { ADD_USER_ORGANIZATION_MAP, userClient } from '@/api/UserMutations';
import Button from '@/components/common/Button';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import PopUp from '@/components/common/PopUp';
import UserButton from '@/components/common/UserButton';
import { getUserOrgMapObject, useUpdateUserOrgData } from '@/helper/hooks.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from '../userProfile.module.scss';

const ProfileOrganizationDetail = ({ currentUserData, setCurrentUserData }) => {
  const [isEditData, setIsEditData] = useState(null);
  const [isAddData , setIsAddData] = useState(false);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [toastMsg , setToastMsg] = useRecoilState(ToastMsgAtom);
  const { newUserOrgData, setNewUserOrgData, updateUserOrg , addUserOrg } = useUpdateUserOrgData();
  const router = useRouter();

  async function handleUserOrg(data = null){
  if(!data) return ;

  const sendOrgData = {
    user_id: currentUserData?.id,
    employee_id: data?.employee_id,

    user_lsp_id: currentUserData?.userLspId,
    organization_id: 'Zicops',
    organization_role: data?.organization_role,

    is_active: true
  };

  
  const res = await addUserOrg(sendOrgData) ;
  
  // console.log(sendOrgData,'orgData',res)
  if(!res) return ;
  setToastMsg({type:'success',message:'Added urser Org successfully'});
  setCurrentUserData({ ...currentUserData, ...res });

  }

  useEffect(() => {
    if (isEditData) return;

    setNewUserOrgData(getUserOrgMapObject(currentUserData));
    if(!currentUserData?.is_verified && !currentUserData?.user_organization_id){
      // setIsAddPopupOpen(true);
      setIsAddData(true);
    }

    // setNewUserOrgData(getUserOrgMapObject(currentUserData));
  }, [currentUserData, isEditData]);

  const userOrganizationData = [
    { id: 1, title: 'Organization', key: 'organization', value: 'Zicops' },
    { id: 2, title: 'Organization Unit', key: 'organization_unit', value: 'Zicops, India' },
    {
      id: 3,
      title: 'Learning Space Role',
      key: 'learning_space_role',
      value: currentUserData?.role || 'Learner'
    },
    {
      id: 4,
      title: 'Role In Organization',
      key: 'organization_role',
      value: currentUserData?.organization_role,
      isEdit: true
    },
    {
      id: 5,
      title: 'Employee Id',
      key: 'employee_id',
      value: currentUserData?.employee_id,
      isEdit: true
    }
  ];

  return (
    <>
      <div className={`${styles.profileDetailsContainer}`}>
        <div className={`${styles.profilePicContainer}`}>
          <img
            src={currentUserData?.photo_url || '/images/profile_picture.png'}
            alt="not found"
            width={200}
          />
        </div>
        <div className={`${styles.profileDetails}`}>
          {userOrganizationData?.map((item, i) => {
            return (
              <div key={item?.id} className={`${styles.profileDetailsField}`}>
                <div className={`${styles.label}`}>{item?.title}</div>
                <div className={`${styles.colon}`}> : </div>

                <div className={`${styles.value}`}>
                  {isEditData === item?.id ? (
                    <LabeledInput
                      styleClass={`${styles.inputField}`}
                      inputOptions={{
                        inputName: item?.key,
                        placeholder: `Enter ${item.title}`,
                        value: newUserOrgData[item?.key],
                        maxLength: 60
                      }}
                      changeHandler={(e) =>
                        setNewUserOrgData({ ...newUserOrgData, [item?.key]: e.target.value })
                      }
                    />
                  ) : (
                    <>{item?.value}</>
                  )}
                </div>

                {item?.isEdit && (
                  <div className={`${styles.submitBtnContainer}`}>
                    {isEditData === item.id ? (
                      <>
                        <div className={`${styles.userInfoButtonContainer}`}>
                          <Button
                            text={'Update'}
                            isDisabled={!newUserOrgData[item?.key]}
                            clickHandler={async () => {
                              const _userData = await updateUserOrg();
                              setCurrentUserData({ ...currentUserData, ..._userData });

                              setIsEditData(false);
                            }}
                            styleClass={styles.updateBtn}
                          />
                          {/* <Button text={'Cancel'} clickHandler={toggleEditable} /> */}
                        </div>

                        <div
                          className={`${styles.editFillIcon}`}
                          onClick={() => setIsEditData(null)}>
                          <img src="/images/svg/cross.svg" />
                        </div>
                      </>
                    ) : (
                      <div
                        className={`${styles.editFillIcon}`}
                        onClick={() =>{ isAddData ? setIsAddPopupOpen(true) : setIsEditData(item?.id)}}>
                        <img src={isAddData ? "/images/svg/add-line-blue.svg":"/images/svg/edit.svg"} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          <PopUp
          title="Add user organization information"
          // submitBtn={{ handleClick: handleSubmit }}
          popUpState={[isAddPopupOpen, setIsAddPopupOpen]}
          // size="smaller"
          // customStyles={{ width: '500px' }}
          isFooterVisible={false}
          positionLeft="50%">
          <div className={`${styles.addOrgPopUp}`}>
          <LabeledInput
                      styleClass={`${styles.inputField}`}
                      inputOptions={{
                        inputName: 'organization_role',
                        placeholder: 'Enter users Role In Organization',
                        value: newUserOrgData['organization_role'],
                        maxLength: 60,
                        label: 'Role in organization:'
                      }}
                      changeHandler={(e) =>
                        setNewUserOrgData({ ...newUserOrgData, organization_role: e.target.value })
                      }
                    />
                    <LabeledInput
                      styleClass={`${styles.inputField}`}
                      inputOptions={{
                        inputName: 'employee_id',
                        placeholder: 'Enter users Employee id',
                        value: newUserOrgData['employee_id'],
                        maxLength: 60,
                        label: 'Employee Id:'
                      }}
                      changeHandler={(e) =>
                        setNewUserOrgData({ ...newUserOrgData, employee_id: e.target.value })
                      }
                    />
            <div className={`${styles.addOrgButtonContainer}`}>
              <UserButton
                text={'Cancel'}
                isPrimary={false}
                type={'button'}
                clickHandler={() => {
                  // console.log(newUserOrgData,'userOrdData',currentUserData);
                  // handleUserOrg(newUserOrgData)
                  setIsAddPopupOpen(false);
                  setNewUserOrgData({ ...newUserOrgData, employee_id: "" ,organization_role:""  })
                }}
              />
              <UserButton
                text={'Add'}
                type={'button'}
                // isDisabled={loading}
                clickHandler={async() => {
                  console.log(newUserOrgData,'userOrdData',currentUserData);
                 await handleUserOrg(newUserOrgData);
                 setIsAddData(false);
                 setIsAddPopupOpen(false);
                  
                }}
              />
            </div>
          </div>
        </PopUp>
        </div>
      </div>
    </>
  );
};

export default ProfileOrganizationDetail;
