import styles from './vendorComps.module.scss';

export default function ProfileDetails({ data }) {
  const vendorDetails = [
    { label: 'Name', value: data?.first_name + ' ' + data?.last_name || 'NA' },
    { label: 'Type', value: 'Organisation' }
  ];

  //   const socialMediaData = [
  //     {
  //       title: 'Facebook',
  //       inputName: 'facebookURL',
  //       value: data?.facebookURL,
  //       imageUrl: data?.facebookURL ? '/images/svg/Facebook.svg' : ''
  //     },
  //     {
  //       title: 'Instagram',
  //       inputName: 'instagramURL',
  //       value: data?.instagramURL,
  //       imageUrl: data?.instagramURL ? '/images/svg/Instagram.svg' : ''
  //     },
  //     {
  //       title: 'Twitter',
  //       inputName: 'twitterURL',
  //       value: data?.twitterURL,
  //       imageUrl: '/images/svg/Twitter.svg'
  //     },
  //     {
  //       title: 'LinkedIn',
  //       inputName: 'linkedinURL',
  //       value: data?.linkedinURL,
  //       imageUrl: data?.linkedinURL ? '/images/svg/Linkedin.svg' : ''
  //     }
  //   ];

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
