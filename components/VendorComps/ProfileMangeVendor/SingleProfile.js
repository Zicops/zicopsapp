import React, { useState } from 'react';
import AddVendorProfile from '../AddVendorProfile';
import { manageVendorProfiles } from '../Logic/vendorComps.helper';
import styles from '../vendorComps.module.scss';
import VendorPopUp from '../VendorPopUp';
const SingleProfile = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const editProfileData = manageVendorProfiles?.filter((e) => e?.id === data?.id);
  const editProfilehandler = () => {
    setIsOpen(true);
  };

  const completeProfileHandler = () => {};

  return (
    <div className={`${styles.singleProfileContainer}`}>
      <div className={`${styles.singleProfileMain}`}>
        <div className={`${styles.singleProfileImage}`}>
          <img src={data?.image} alt="" />
        </div>
        <div className={`${styles.singleProfileDetails}`}>
          <div>
            <p className={`${styles.profileName}`}>
              {data?.firstName} {data?.lastName}
            </p>
            <p className={`${styles.profileExpriences}`}>{data?.experience} years of experience</p>
          </div>
          <div className={`${styles.profileExpertEdit}`}>
            <div className={`${styles.profileExpert}`}>
              {data?.expertise?.map((expert, index) => (
                <p>
                  {expert} {index + 1 !== data?.expertise?.length ? ' , ' : ''}
                </p>
              ))}
            </div>
            <div className={`${styles.editIcon}`} onClick={editProfilehandler}>
              <img src="/images/svg/border_color.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <VendorPopUp
        open={isOpen}
        title="Add profile"
        popUpState={[isOpen, setIsOpen]}
        size="large"
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{ name: 'Done', handleClick: completeProfileHandler }}
        isFooterVisible={true}>
        <AddVendorProfile data={editProfileData[0]} />
      </VendorPopUp>
    </div>
  );
};

export default SingleProfile;
