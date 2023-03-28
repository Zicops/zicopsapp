import styles from '../vendorComps.module.scss';
import { DownArrowIcon } from '@/components/common/ZicopsIcons';
import { useRouter } from 'next/router';
export default function VendorIndividualProfiles({ data }) {
  const router = useRouter();

  const onShowProfileHandler = () => {
    router.push(
      `/admin/vendor/market-yard/vendor-details/${data?.vendor_id}/profile-details/${data?.pf_id}`
    );
  };
  if (data?.is_speaker) {
    const speaker = data?.is_speaker;
  }
  let serviceArray = [];
  if (data?.is_speaker) {
    serviceArray.push('Speaker');
  }
  if (data?.sme_expertise?.length) {
    serviceArray.push('SME');
  }
  if (data?.classroom_expertise?.length) {
    serviceArray.push('CRT');
  }
  if (data?.content_development?.length) {
    serviceArray.push('CD');
  }

  return (
    <div className={`${styles.vendorIndividualProfilesContainer}`}>
      <div className={`${styles.leftSide}`}>
        <div className={`${styles.profileImage}`}>
          <img src={data?.photo_url || '/images/Avatars/Profile.png'} />
        </div>
        <div className={`${styles.profileDetails}`}>
          <p className={`${styles.profileName}`}>{data?.first_name + ' ' + data?.last_name}</p>

          <p className={`${styles.profileServices}`}>{serviceArray.join(' | ')}</p>
          <p className={`${styles.profileExperience}`}>
            {data?.experience_years} years of experience
          </p>
        </div>
      </div>
      <div className={`${styles.rightSide}`}>
        <div className={`${styles.servicesPillContainer}`}>
          <div className={`${styles.servicesPill}`}>
            {data?.sme_expertise?.map((expert) => (
              <p className={`${styles.vendorExpertise}`}>{expert}</p>
            ))}
            {data?.classroom_expertise?.map((expert) => (
              <p className={`${styles.vendorExpertise}`}>{expert}</p>
            ))}
            {data?.content_development?.map((expert) => (
              <p className={`${styles.vendorExpertise}`}>{expert}</p>
            ))}
          </div>
        </div>
        <div className={`${styles.arrowImage}`} onClick={onShowProfileHandler}>
          <DownArrowIcon turns={0.75} />
        </div>
      </div>
    </div>
  );
}
