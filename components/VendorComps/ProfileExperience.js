import { useEffect, useState } from 'react';
import useHandleVendor from './Logic/useHandleVendor';
import { useRouter } from 'next/router';
import Loader from '../common/Loader';
import styles from './AddVendor/addvendor.module.scss';
import styless from './vendorComps.module.scss';

export default function ProfileExperience() {
  const { getProfileExperience } = useHandleVendor();
  const [experienceData, setExperienceData] = useState(null);

  const router = useRouter();
  const profileId = router.query.profileId || null;

  useEffect(() => {
    getProfileExperience(profileId)
      .then((res) => setExperienceData(res || []))
      .catch((err) => {
        console.log(err);
        setExperienceData([]);
      });
  }, []);

  if (experienceData == null)
    return <Loader customStyles={{ minHeight: '100px', background: 'transparent' }} />;

  if (!experienceData.length) return <div className={styles.fallback}>No Experience Added</div>;

  return (
    <div className={styless.experienceContainer}>
      <div>Experience</div>
      <hr />
      <div className={styless.individualExperience}>
        {experienceData.map((data) => {
          return (
            <div className={styless.individualExperienceContainer}>
              <div className={styless.companyLogo}>
                <img src="/images/company-logo.png" />
              </div>
              <div className={styless.details}>
                <h4>{data.Title}</h4>
                <p>{data.CompanyName}</p>
                <p className={styless.dates}>
                  {data.StartDate} - {data.EndDate == 0 ? 'Present' : data.EndDate}{' '}
                  {data.EmployementType}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
