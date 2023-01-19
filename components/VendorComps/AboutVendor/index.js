import styles from '../vendorComps.module.scss';
import ZicopsAccordian from '@/common/ZicopsAccordian';
import VendorServices from '../VendorServices';
import VendorDetails from '../VendorDetails';
import {
  subjectMatterExpertise,
  classroomTraining,
  contentDevelopment
} from '../Logic/vendorComps.helper';

export default function AboutVendor({ data }) {
  const smeData = subjectMatterExpertise.find(({ vendorId }) => vendorId === data.id);
  const ctData = classroomTraining.find(({ vendorId }) => vendorId === data.id);
  const cdData = contentDevelopment.find(({ vendorId }) => vendorId === data.id);

  return (
    <div className={`${styles.aboutVendorMainContainer}`}>
      <div className={`${styles.vendorDescription}`}>
        <p>{data.desc}</p>
      </div>
      <div className={`${styles.vendorServices}`}>
        <ZicopsAccordian
          title={'Subject Matter Expertise'}
          description={
            'With a talented pool of individuals, we provide subject matter expertise in various topics. The expertise can be used for further content development or consultancy into the same.'
          }>
          <VendorServices data={smeData} />
        </ZicopsAccordian>
        <ZicopsAccordian
          title={'Classroom Training'}
          description={
            'We have a history of conducting highly immersive and interactive trainings for corporate upskilling their teams.'
          }>
          <VendorServices data={ctData} />
        </ZicopsAccordian>
        <ZicopsAccordian
          title={'Content Development'}
          description={
            'We develop immersive animated content keeping our content engaging for learners. Quick delivery and cost-effectively transform your static content into a dynamic anf engaging course.'
          }>
          <VendorServices data={cdData} />
        </ZicopsAccordian>
      </div>
      <VendorDetails />
    </div>
  );
}
