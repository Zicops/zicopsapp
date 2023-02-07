import styles from './vendorComps.module.scss';

const socialMediaData = [
  { label: 'LinkedIn', value: 'http://www.abc.com' },
  { label: 'Twitter', value: 'http://www.abc.com' },
  { label: 'Facebook', value: 'http://www.abc.com' },
  { label: 'Instagram', value: 'http://www.abc.com' }
];
export default function VendorDetails() {
  return (
    <div className={`${styles.vendorDetailsContainer}`}>
      <div className={`${styles.details}`}>
        <h4>Details</h4>
        <div className={`${styles.detailsData}`}>
          <div>
            <span>Name</span>
            <p>ABC Learning Pvt Ltd.</p>
          </div>
          <div>
            <span>Address</span>
            <p>House no. , Colony, City, State, Country</p>
          </div>
          <div>
            <span>Website</span>
            <p>hhtp://www.abc.com </p>
          </div>
          <div>
            <span>Type</span>
            <p>Organisation</p>
          </div>
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
