import Loader from '@/components/common/Loader';
import { useEffect, useState } from 'react';
import styles from '../vendorComps.module.scss';
import VendorIndividualProfiles from './VendorIndividualProfiles';

export default function ProfileVendor({ profileData }) {
  const [inputText, setInputText] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filtered = profileData?.filter((item) => {
      return (item?.first_name + ' ' + item.last_name).toLowerCase().includes(inputText);
    });
    setFilteredData(filtered);
  }, [inputText, profileData]);

  if (!profileData) return <Loader customStyles={{ height: '100%', background: 'transparent' }} />;

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
          {filteredData?.length === 0 ? (
            <div className={styles.fallback}>No Profile Match</div>
          ) : (
            filteredData?.map((data) => <VendorIndividualProfiles data={data} />)
          )}
        </div>
      )}
    </>
  );
}
