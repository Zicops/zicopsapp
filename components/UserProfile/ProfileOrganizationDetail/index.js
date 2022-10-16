import Button from '@/components/common/Button';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import { getUserOrgMapObject, useUpdateUserOrgData } from '@/helper/hooks.helper';
import { useEffect, useState } from 'react';
import styles from '../userProfile.module.scss';

const ProfileOrganizationDetail = ({ currentUserData, setCurrentUserData }) => {
  const [isEditData, setIsEditData] = useState(null);
  const { newUserOrgData, setNewUserOrgData, updateUserOrg } = useUpdateUserOrgData();

  useEffect(() => {
    if (isEditData) return;

    setNewUserOrgData(getUserOrgMapObject(currentUserData));
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
                        onClick={() => setIsEditData(item?.id)}>
                        <img src="/images/svg/edit.svg" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProfileOrganizationDetail;
