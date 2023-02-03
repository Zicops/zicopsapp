import styles from '../vendorComps.module.scss';
import { DownArrowIcon } from '@/components/common/ZicopsIcons';
import { useRouter } from 'next/router';
export default function VendorIndividualProfiles({ data }) {
  const router = useRouter();
  const onShowProfileHandler = () => {
    router.push(`/admin/vendor/market-yard/${data?.vendorId}/${data?.id}`);
  };
  return (
    <div className={`${styles.vendorIndividualProfilesContainer}`}>
      <div className={`${styles.leftSide}`}>
        <div className={`${styles.profileImage}`}>
          <img src={data?.image} />
        </div>
        <div className={`${styles.profileDetails}`}>
          <p className={`${styles.profileName}`}>{data?.name}</p>

          <p className={`${styles.profileServices}`}>
            {data?.expertise?.map((expert, index) => (
              <span>
                {expert}
                {index + 1 !== data?.expertise?.length ? ' | ' : ''}
              </span>
            ))}
          </p>
          <p className={`${styles.profileExperience}`}>{data?.experience} years of experience</p>
        </div>
      </div>
      <div className={`${styles.leftSide}`}>
        <div className={`${styles.servicesPillContainer}`}>
          <div className={`${styles.servicesPill}`}>
            {data?.services?.map((expert) => (
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