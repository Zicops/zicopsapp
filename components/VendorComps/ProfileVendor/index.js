import Loader from '@/components/common/Loader';
import { useState } from 'react';
import styles from '../vendorComps.module.scss';
import VendorIndividualProfiles from './VendorIndividualProfiles';

export default function ProfileVendor({ profileData }) {
  const [inputText, setInputText] = useState('');

  if (!profileData) return <Loader customStyles={{ height: '100%', background: 'transparent' }} />;
  let count = 0;

  return (
    <>
      {!profileData?.length ? (
        <div className={styles.fallback}>No Profile Found</div>
      ) : (
        <div className={`${styles.profileVendorContainer}`}>
          <div className={`${styles.profileSearch}`}>
            <input
              type="text"
              placeholder="Search Profile..."
              onChange={(e) => setInputText(e.target.value.toLowerCase())}
            />
          </div>
          {profileData?.map((data) => {
            if (!(data?.first_name + ' ' + data.last_name).toLowerCase().includes(inputText))
              return <div className={styles.fallback}>No Profile Match</div>;
            return <VendorIndividualProfiles data={data} />;
          })}
        </div>
      )}
    </>
  );
}
