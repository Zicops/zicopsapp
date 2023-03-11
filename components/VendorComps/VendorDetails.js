import styles from './vendorComps.module.scss';

export default function VendorDetails({ data }) {
  const socialMediaData = [
    { label: 'LinkedIn', value: data.linkedinURL || 'NA' },
    { label: 'Twitter', value: data.twitterURL || 'NA' },
    { label: 'Facebook', value: data.facebookURL || 'NA' },
    { label: 'Instagram', value: data.instagramURL || 'NA' }
  ];

  const vendorDetails = [
    { label: 'Name', value: data.name || 'NA' },
    { label: 'Address', value: data.address || 'NA' },
    { label: 'Website', value: data.website || 'NA' },
    { label: 'Type', value: data.type || 'NA' }
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
