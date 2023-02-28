import styles from './vendorComps.module.scss';

const socialMediaData = [
  { label: 'LinkedIn', value: 'http://www.abc.com' },
  { label: 'Twitter', value: 'http://www.abc.com' },
  { label: 'Facebook', value: 'http://www.abc.com' },
  { label: 'Instagram', value: 'http://www.abc.com' }
];

const vendorDetails = [
  { label: 'Name', value: 'ABC Learning Pvt Ltd.' },
  { label: 'Address', value: 'House no. , Colony, City, State, Country' },
  { label: 'Website', value: 'http://www.abc.com' },
  { label: 'Type', value: 'Organisation' }
];
export default function VendorDetails() {
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
