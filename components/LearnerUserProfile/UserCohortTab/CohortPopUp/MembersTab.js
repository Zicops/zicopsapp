// components\LearnerUserProfile\UserCohortTab\CohortPopUp\MembersTab.js

import IconBtn from '@/components/common/IconBtn';
import { useState } from 'react';
import CohortListCard from '@/components/common/CohortListCard';
import styles from '../../learnerUserProfile.module.scss';
import { memberTabData } from '../../Logic/userBody.helper';

export default function MembersTab() {
  return (
    <div className={`${styles.userTabContainer}`} style={{ height: '500px' }}>
      <div className={`${styles.listCardContainer}`}>
        {memberTabData?.map((member) => {
          const btnData = {
            imgSrc: null,
            display: 'Member',
            color: null,
            isDisabled: false
          };

          if (member.isManager) {
            btnData.imgSrc = '/images/svg/manage_accounts.svg';
            btnData.display = 'Cohort Manager';
            btnData.color = 'var(--primary)';
          }
          if (member.isMember) {
            btnData.imgSrc = '/images/svg/manage_accounts_white.svg';

            btnData.display = 'Cohort Member';
            btnData.color = 'var(--white)';
          }

          return (
            <CohortListCard
              data={member}
              isRoundImage = {true}
              key={member.id}
              // handleClick={() => {
              //   setSelectedCohort(cohort);
              // }}
            >
              <div className={`${styles.btnContainer}`}>
                <p>
                  <img src="/images/svg/calendar-month.svg" alt="" />
                  Joined On: {member?.joinedOn}
                </p>

                <IconBtn color={btnData.color} isDisabled={btnData.isDisabled}>
                  <img src={btnData.imgSrc} alt=""/>
                  {btnData.display}
                </IconBtn>
              </div>
            </CohortListCard>
          );
        })}
      </div>

      {/* <CohortPopUp cohortData={selectedCohort} closePopUp={() => setSelectedCohort(null)} /> */}
    </div>
  );
}
