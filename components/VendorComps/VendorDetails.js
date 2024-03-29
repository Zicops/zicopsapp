import styles from './vendorComps.module.scss';
import { useRecoilValue } from 'recoil';
import { VendorProfileAtom } from '@/state/atoms/vendor.atoms';

export default function VendorDetails({ data }) {
  // const socialMediaDa = [
  //   { label: 'LinkedIn', value: data.linkedinURL || 'NA' },
  //   { label: 'Twitter', value: data.twitterURL || 'NA' },
  //   { label: 'Facebook', value: data.facebookURL || 'NA' },
  //   { label: 'Instagram', value: data.instagramURL || 'NA' }
  // ];

  const individualVendorState = useRecoilValue(VendorProfileAtom);
  const vendorDetails = [
    { label: 'Name', value: data?.name || 'NA' },
    { label: 'Address', value: data?.address || 'NA' },
    { label: 'Website', value: data?.website || 'NA' },
    { label: 'Type', value: data?.type || 'NA' },
  ];

  const individualVendorDetails = [
    { label: 'Years of Experience', value: individualVendorState?.experienceYear || 'NA' },
    { label: 'Speaker', value: individualVendorState?.isSpeaker ? 'Yes' : 'No' },
  ];

  const socialMediaData = [
    {
      title: 'Facebook',
      inputName: 'facebookURL',
      value: data?.facebookURL,
      imageUrl: '/images/svg/Facebook.svg',
    },
    {
      title: 'Instagram',
      inputName: 'instagramURL',
      value: data?.instagramURL,
      imageUrl: '/images/svg/Instagram.svg',
    },
    {
      title: 'Twitter',
      inputName: 'twitterURL',
      value: data?.twitterURL,
      imageUrl: '/images/svg/Twitter.svg',
    },
    {
      title: 'LinkedIn',
      inputName: 'linkedinURL',
      value: data?.linkedinURL,
      imageUrl: '/images/svg/Linkedin.svg',
    },
  ];
  return (
    <div className={`${styles.vendorDetailsContainer}`}>
      <div className={`${styles.details}`}>
        <h4>Details</h4>
        <div className={`${styles.detailsData}`}>
          {vendorDetails?.map((data, index) => (
            <div key={index}>
              <span>{data?.label}</span>
              <p style={{ textTransform: 'capitalize' }}>{data?.value}</p>
            </div>
          ))}
          {data?.type === 'individual' &&
            individualVendorDetails?.map((data, index) => (
              <div key={index}>
                <span>{data?.label}</span>
                <p style={{ textTransform: 'capitalize' }}>{data?.value}</p>
              </div>
            ))}
        </div>
        {/* <hr /> */}
        <div className={`${styles.hr}`}></div>
        <div>Social Media</div>
        <div className={`${styles.marketyardSocialMediaIcons}`}>
          {socialMediaData?.map((media, i) => (
            <>
              {!!media?.value && (
                <a href={media?.value} target="blank">
                  <img src={`${media?.imageUrl}`} />
                </a>
              )}
            </>
          ))}
          <small>{socialMediaData.every((data) => !data?.value) && 'NA'}</small>
        </div>
      </div>
    </div>
  );
}
