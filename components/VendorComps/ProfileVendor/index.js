import Loader from '@/components/common/Loader';
import { useEffect, useState } from 'react';
import styles from '../vendorComps.module.scss';
import VendorIndividualProfiles from './VendorIndividualProfiles';
export default function ProfileVendor({ profileData }) {
  const [inputText, setInputText] = useState('');
  const [filterProfile, setFilterProfile] = useState([]);

  const inputHandler = (e) => {
    let lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  useEffect(() => {
    let filteredData = profileData?.filter((el) => {
      if (inputText === '') {
        return el;
      } else {
        return el?.first_name.toLowerCase().includes(inputText);
      }
    });
    setFilterProfile(filteredData);
  }, [inputText]);

  if (!profileData) return <Loader customStyles={{ height: '100%', background: 'transparent' }} />;
  return (
    <>
      {!profileData?.length && <div className={styles.fallback}>No Profile Found</div>}
      <div className={`${styles.profileVendorContainer}`}>
        <div className={`${styles.profileSearch}`}>
          <input type="text" placeholder="Search Profile..." onChange={inputHandler} />
        </div>
        {filterProfile?.map((data) => (
          <VendorIndividualProfiles data={data} />
        ))}
      </div>
    </>
  );
}
