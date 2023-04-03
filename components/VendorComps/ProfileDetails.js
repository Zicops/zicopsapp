import styles from './vendorComps.module.scss';

export default function ProfileDetails({ data }) {
  const vendorDetails = [
    { label: 'Name', value: data?.first_name + ' ' + data?.last_name || 'NA' },
    { label: 'Type', value: 'Organisation' },
    { label: 'Description', value: data?.description || 'NA' }
  ];

  return (
    <div className={`${styles.vendorDetailsContainer}`}>
      <div className={`${styles.details}`}>
        <h4>Details</h4>
        <div className={`${styles.detailsData}`}>
          {vendorDetails?.map((data, index) => (
            <div key={index}>
              <span>{data?.label}</span>
              <p>{data?.value}</p>
            </div>
          ))}
        </div>
        <hr />
        <div>Social Media</div>
        <div className={`${styles.marketyardSocialMediaIcons}`}>
          <small>No Social Media Available</small>
        </div>
      </div>
    </div>
  );
}
