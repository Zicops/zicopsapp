import OrgRegisterForm from '@/components/OrganizationRegister/OrgRegisterForm';
import React from 'react';
import Button from '../Button';
import Tabs from '../Tabs';
import { TAB_DATA } from '../Tabs/tabs.helper';
// import OrgButton from '../OrgButton';
import styles from './orgFormLayout.module.scss';

const OrgFormLayout = ({ headerTitle, headerImg, children }) => {
  return (
    <div className={`${styles.layout}`}>
      <div className={`${styles.header}`}>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none">
            <path
              d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z"
              fill="#ffffff"
            />
          </svg>
        </button>
        <img src="./images/svg/zicops_logo.svg" alt="zicops logo" />
        {/* <img src={headerImg} alt="zicops logo" /> */}
      </div>
      <div className={`${styles.info_layout}`}>
        <div className={`${styles.header_title}`}>
          <img src="./images/svg/add_home.svg" alt="" />
          <p style={{ marginBottom: '20px' }}>Create Learning Space</p>
          {/* <p>{headerTitle}</p> */}
          <div>
            <Tabs tabData={TAB_DATA} />
            {/* {children} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgFormLayout;
