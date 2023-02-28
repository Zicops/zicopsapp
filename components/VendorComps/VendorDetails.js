import styles from './vendorComps.module.scss';

export default function VendorDetails({ data }) {
  const socialMediaData = [
    { label: 'LinkedIn', value: data.linkedin_url },
    { label: 'Twitter', value: data.twitter_url },
    { label: 'Facebook', value: data.facebook_url },
    { label: 'Instagram', value: data.instagram_url }
  ];

  const vendorDetails = [
    { label: 'Name', value: data.name },
    { label: 'Address', value: data.address },
    { label: 'Website', value: data.website },
    { label: 'Type', value: data.type }
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
      </div>
      <div className={`${styles.socialMedia}`}>
        <h4>Social Media</h4>
        <div className={`${styles.detailsData}`}>
          {socialMediaData?.map((data, index) => (
            <div key={index}>
              <span>{data?.label}</span>
              <p>{data?.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
