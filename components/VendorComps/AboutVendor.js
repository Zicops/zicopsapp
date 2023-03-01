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
import { SmeServicesAtom, CtServicesAtom, CdServicesAtom } from '@/state/atoms/vendor.atoms';
import { useEffect } from 'react';
import useHandleVendor from './Logic/useHandleVendor';

export default function AboutVendor({ data }) {
  const { getSmeDetails, getCrtDetails, getCdDetails } = useHandleVendor();

  useEffect(() => {
    getSmeDetails();
    getCrtDetails();
    getCdDetails();
  }, []);

  const smeData = useRecoilValue(SmeServicesAtom);
  const ctData = useRecoilValue(CtServicesAtom);
  const cdData = useRecoilValue(CdServicesAtom);

  const accordianMarketyardDetails = [
    {
      title: 'Subject Matter Expertise',
      description:
        'With a talented pool of individuals, we provide subject matter expertise in various topics. The expertise can be used for further content development or consultancy into the same.',
      serviceData: smeData
    },
    {
      title: 'Classroom Training',
      description:
        'We have a history of conducting highly immersive and interactive trainings for corporate upskilling their teams.',
      serviceData: cdData
    },
    {
      title: 'Content Development',
      description:
        'We develop immersive animated content keeping our content engaging for learners. Quick delivery and cost-effectively transform your static content into a dynamic anf engaging course.',
      serviceData: ctData
    }
  ];

  return (
    <div className={`${styles.aboutVendorMainContainer}`}>
      <div className={`${styles.vendorDescription}`}>
        <p>{data?.description}</p>
      </div>
      <div className={`${styles.vendorServices}`}>
        {accordianMarketyardDetails.map((value, index) => {
          return (
            <ZicopsAccordian title={value.title} description={value.description}>
              <VendorServices data={value.serviceData} />
            </ZicopsAccordian>
          );
        })}
      </div>
      <VendorDetails data={data} />
    </div>
  );
}
