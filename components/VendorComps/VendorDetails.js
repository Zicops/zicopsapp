import styles from './vendorComps.module.scss';

export default function VendorDetails({ data }) {
  // const socialMediaDa = [
  //   { label: 'LinkedIn', value: data.linkedinURL || 'NA' },
  //   { label: 'Twitter', value: data.twitterURL || 'NA' },
  //   { label: 'Facebook', value: data.facebookURL || 'NA' },
  //   { label: 'Instagram', value: data.instagramURL || 'NA' }
  // ];

  const vendorDetails = [
    { label: 'Name', value: data?.name || 'NA' },
    { label: 'Address', value: data?.address || 'NA' },
    { label: 'Website', value: data?.website || 'NA' },
    { label: 'Type', value: data?.type || 'NA' }
  ];

  const socialMediaData = [
    {
      title: 'Facebook',
      inputName: 'facebookURL',
      value: data?.facebookURL,
      imageUrl: data?.facebookURL ? '/images/svg/Facebook.svg' : ''
    },
    {
      title: 'Instagram',
      inputName: 'instagramURL',
      value: data?.instagramURL,
      imageUrl: data?.instagramURL ? '/images/svg/Instagram.svg' : ''
    },
    {
      title: 'Twitter',
      inputName: 'twitterURL',
      value: data?.twitterURL,
      imageUrl: data?.twitterURL ? '/images/svg/Twitter.svg' : ''
    },
    {
      title: 'LinkedIn',
      inputName: 'linkedinURL',
      value: data?.linkedinURL,
      imageUrl: data?.linkedinURL ? '/images/svg/Linkedin.svg' : ''
    }
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
          {socialMediaData?.map((media, i) => (
            <img src={`${media?.imageUrl}`} />
          ))}
          <small>{!socialMediaData?.value && 'No Social Media Available'}</small>
        </div>
      </div>
    </div>
  );
}
