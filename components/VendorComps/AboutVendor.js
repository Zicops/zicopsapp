import styles from './vendorComps.module.scss';
import ZicopsAccordian from '@/common/ZicopsAccordian';
import VendorServices from './VendorServices';
import VendorDetails from './VendorDetails';
import {
  subjectMatterExpertise,
  classroomTraining,
  contentDevelopment
} from './Logic/vendorComps.helper';
import { useRecoilValue } from 'recoil';
import {
  SmeServicesAtom,
  CtServicesAtom,
  CdServicesAtom,
  VendorStateAtom
} from '@/state/atoms/vendor.atoms';
import { useEffect } from 'react';
import useHandleVendor from './Logic/useHandleVendor';
import Loader from '../common/Loader';
import { useRouter } from 'next/router';

export default function AboutVendor({ data }) {
  const { getSmeDetails, getCrtDetails, getCdDetails } = useHandleVendor();

  useEffect(() => {
    getSmeDetails();
    getCrtDetails();
    getCdDetails();
  }, []);
  const vendorData = useRecoilValue(VendorStateAtom);
  const smeData = useRecoilValue(SmeServicesAtom);
  const ctData = useRecoilValue(CtServicesAtom);
  const cdData = useRecoilValue(CdServicesAtom);
  const router = useRouter();
  const vendorId = router.query.vendorId || null;

  const accordianMarketyardDetails = [
    {
      title: 'Subject Matter Expertise',
      description: smeData.serviceDescription,
      serviceData: smeData,
      type: 'sme'
    },
    {
      title: 'Classroom Training',
      description: ctData.serviceDescription,
      serviceData: ctData,
      type: 'crt'
    },
    {
      title: 'Content Development',
      description: cdData.serviceDescription,
      serviceData: cdData,
      type: 'cd'
    }
  ];
  if (vendorId && vendorData?.vendorId !== vendorId)
    return <Loader customStyles={{ height: '100%', background: 'transparent' }} />;
  return (
    <div className={`${styles.aboutVendorMainContainer}`}>
      <div className={`${styles.vendorDescription}`}>
        <p>{data?.description}</p>
      </div>
      <div className={`${styles.vendorServices}`}>
        {accordianMarketyardDetails.map((value, index) => {
          return (
            <ZicopsAccordian title={value.title} description={value.description}>
              <VendorServices data={value.serviceData} type={value?.type} />
            </ZicopsAccordian>
          );
        })}
      </div>
      <VendorDetails data={data} />
    </div>
  );
}
