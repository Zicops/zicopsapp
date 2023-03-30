import { useEffect, useState } from 'react';
import useHandleVendor from './Logic/useHandleVendor';
import { useRouter } from 'next/router';
import Loader from '../common/Loader';
import styles from './AddVendor/addvendor.module.scss';
import styless from './vendorComps.module.scss';
import moment from 'moment';

export default function ProfileExperience({ pfId = null }) {
  const { getProfileExperience } = useHandleVendor();
  const [experienceData, setExperienceData] = useState(null);

  const router = useRouter();
  const profileId = router.query.profileId || pfId || null;

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
        {experienceData.map((data, i) => {
          return (
            <div className={styless.individualExperienceContainer} key={i}>
              <div className={styless.companyLogo}>
                <img src="/images/company-logo.png" />
              </div>
              <div className={styless.details}>
                <h4>{data.Title}</h4>
                <p>{data.CompanyName}</p>
                <p className={styless.dates}>
                  {moment.unix(data.StartDate).format('MMM, YYYY')} -{' '}
                  {data.EndDate === 0 ? 'Present' : moment.unix(data.EndDate).format('MMM, YYYY')}{' '}
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
