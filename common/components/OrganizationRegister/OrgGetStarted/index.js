import { orgData } from '@/components/HomePage/Logic/homePage.helper';
import Button from 'common/components/Button';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import OrgFormLayout from '../OrgFormLayout';
import styles from './orgGetStarted.module.scss';
import CreatableSelect from 'react-select/creatable';
import { customSelectStyles } from '@/components/common/FormComponents/Logic/formComponents.helper';
import { useRecoilState } from 'recoil';
import { OrganizationDetailsAtom } from '@/state/atoms/organizations.atom';

const OrgGetStarted = () => {
  const [emailValue, setEmailValue] = useState();
  const orgDataOptions = [...orgData].map((d) => ({
    label: (
      <>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          {/* <img src='' alt='' /> */}
          {d.org}
          <img src="/images/svg/arrow_forward.svg" alt="" style={{ width: '20px' }} />
        </div>
      </>
    ),
    value: d.org,
    ...d
  }));
  const [options, setOptions] = useState(orgDataOptions || []);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const router = useRouter();
  const [orgTempDetails , setOrgTempDetails] = useRecoilState(OrganizationDetailsAtom);

  const defaultStyles = customSelectStyles();
  const customStyles = {
    ...defaultStyles,
    container: () => ({
      ...defaultStyles.container()
      // margin: '0px auto'
    }),
    control: () => ({
      ...defaultStyles.control(),
      display: 'flex',
      border: 'none',
      height: '100%',
      paddingLeft: '25px',
      background: 'transparent',
      fontSize: '15px'
    }),
    menuList: () => ({
      ...defaultStyles.menuList()
      // maxHeight: '100px',
      // overflow: 'auto'
    }),
    option: () => ({
      ...defaultStyles.option(),
      backgroundColor: '#1a1d21',
      color: 'var(--dark_three)',
      cursor: 'pointer',
      display: 'block',
      fontSsize: '15px',
      padding: '8px 12px'
    })
  };

  return (
    <OrgFormLayout isHeaderVisible={false}>
      <div className={`${styles.page_layout}`}>
        <div>
          <img src="/images/svg/flag.svg" alt="" />
          <p className={`${styles.page_head}`}>Lets get started</p>
        </div>
        <p className={`${styles.page_title}`}>
          An organization is mapped to multiple learning spaces. Find your organization to see if
          your organization is already registered with us.
        </p>
        <p className={`${styles.form_title}`}>If your organization doesn’t exist, create one!</p>
        <div className={`${styles.formContainerWrapper}`}>
          <form className={`${styles.formContainer}`}>
            <span>
              <img
                src="/images/svg/search-icon.svg"
                alt="not found"
                style={{ width: '30px', marginLeft: '10px' }}
              />
            </span>

            <div className={`${styles.searchBar}`}>
              <CreatableSelect
                options={options}
                maxMenuHeight={2}
                placeholder={'Search your Organization'}
                className={`w-100 ${styles.search}`}
                styles={customStyles}
                isSearchable={true}
                isClearable={true}
                classNamePrefix="search"
                menuIsOpen={isMenuVisible}
                // onChange={(e) => {
                //   alert(`Go to ${e.label}`);
                // }}
                onInputChange={(e) => {
                  setIsMenuVisible(e.length);
                }}
                onCreateOption={(newOption) => {
                  // console.log(newOption,'newoptions');

                  setOrgTempDetails((prev) => ({...prev , orgName:newOption}));
                  router.push('/create-learning-space/org-register-form');

                  // alert('Org creation flow');
                }}
              />
            </div>

            {/* <button>GO</button> */}
          </form>
        </div>
        <div className={`${styles.btnContainer}`}>
          <Button
            size="medium"
            theme="dark"
            isBold="bold"
            clickHandler={() => {
              router.push('/create-learning-space/org-register-form');
            }}>
            Register Organization
          </Button>
          <Button
            size="small"
            isBold="bold"
            isDisabled={true}
            clickHandler={() => {
              router.push('/create-learning-space/org-unit-form');
            }}>
            Proceed
          </Button>
        </div>
      </div>
    </OrgFormLayout>
  );
};

export default OrgGetStarted;
