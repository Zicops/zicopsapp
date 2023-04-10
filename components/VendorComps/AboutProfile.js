import styles from './vendorComps.module.scss';
import ZicopsAccordian from '@/common/ZicopsAccordian';
import ProfileServices from './ProfileServices';
import ProfileDetails from './ProfileDetails';
import Loader from '../common/Loader';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useHandleVendor from './Logic/useHandleVendor';
import { useRecoilValue, useRecoilState } from 'recoil';
import { VendorProfileAtom, allProfileAtom } from '@/state/atoms/vendor.atoms';

export default function AboutProfile() {
  const router = useRouter();
  const profileId = router.query.profileId || null;
  // const profileData = useRecoilValue(VendorProfileAtom);

  const vendorProfiles = useRecoilValue(allProfileAtom);
  const viewProfileData = vendorProfiles?.filter((data) => data?.pf_id === profileId);
  const data = viewProfileData?.[0];

  const accordianMarketyardDetails = [
    {
      title: 'Subject Matter Expertise',
      expertiseData: data?.sme_expertise,
      type: 'sme'
    },
    {
      title: 'Classroom Training',
      expertiseData: data?.classroom_expertise,
      type: 'crt'
    },
    {
      title: 'Content Development',
      expertiseData: data?.content_development,
      type: 'cd'
    }
  ];
  if (!profileId) return <Loader customStyles={{ height: '100%', background: 'transparent' }} />;
  return (
    <div className={`${styles.aboutVendorMainContainer}`}>
      <div className={`${styles.vendorServices}`}>
        {accordianMarketyardDetails?.map((value, index) => {
          if (!value.expertiseData) return;
          return (
            <ZicopsAccordian
              title={value.title}
              description={value.description}
              defaultState={true}>
              <ProfileServices
                data={value.expertiseData}
                langData={data?.language}
                type={value?.type}
              />
            </ZicopsAccordian>
          );
        })}
      </div>
      <ProfileDetails data={data} />
    </div>
  );
}
