import { CdServicesAtom, CtServicesAtom, SmeServicesAtom } from '@/state/atoms/vendor.atoms';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import ViewDoc from '../common/ViewDoc';
import VendorPopUp from './common/VendorPopUp';
import useHandleVendor from './Logic/useHandleVendor';
import styles from './vendorComps.module.scss';
import {
  ContentFormatIcon,
  ExpertiseIcon,
  LanguagesIcon
} from '/components/common/ZicopsIcons/index.js';

export default function ProfileServices({ data, type = 'sme', langData }) {
  const [samplePopup, setSamplePopup] = useState(null);

  return (
    <div className={`${styles.vendorTypeContainer}`}>
      <div className={`${styles.expertise}`}>
        <div className={`${styles.expertiseHeader}`}>
          <ExpertiseIcon />
          <span>Expertise</span>
        </div>
        <div className={`${styles.expertisePill}`}>
          {data?.map((value, index) => {
            return <p key={index}>{value}</p>;
          })}
        </div>
      </div>
      <div className={`${styles.languages}`}>
        <div className={`${styles.languagesHeader}`}>
          <LanguagesIcon />
          <span>Languages</span>
        </div>
        <div className={`${styles.languagesPill}`}>
          {langData?.map((value, key) => {
            return <p>{value}</p>;
          })}
        </div>
      </div>
    </div>
  );
}
