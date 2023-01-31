import React from 'react';
import styles from '../vendorComps.module.scss';
const SingleProfile = ({ data }) => {
  return (
    <div className={`${styles.singleProfileContainer}`}>
      <div className={`${styles.singleProfileMain}`}>
        <div className={`${styles.singleProfileImage}`}>
          <img src={data?.image} alt="" />
        </div>
        <div className={`${styles.singleProfileDetails}`}>
          <div>
            <p className={`${styles.profileName}`}>{data?.name}</p>
            <p className={`${styles.profileExpriences}`}>{data?.experience} years of experience</p>
          </div>
          <div className={`${styles.profileExpertEdit}`}>
            <div className={`${styles.profileExpert}`}>
              {data?.expertise.map((expert, index) => (
                <p>
                  {expert} {index + 1 !== data?.expertise?.length ? ', ' : ''}{' '}
                </p>
              ))}
            </div>
            <div>
              <img src="/images/svg/border_color.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProfile;
