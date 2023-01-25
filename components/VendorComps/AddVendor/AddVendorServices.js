import ZicopsAccordian from '@/common/ZicopsAccordian';
import AddServices from './common/AddServices';
import styles from '../vendorComps.module.scss';

export default function AddVendorServices() {
  return (
    <div className={`${styles.addServiceContainer}`}>
      <ZicopsAccordian title={'Subject Matter Expertise'}>
        <AddServices />
      </ZicopsAccordian>
      <ZicopsAccordian title={'Classroom Training'}>
        <AddServices />
      </ZicopsAccordian>
      <ZicopsAccordian title={'Content Development'}>
        <AddServices />
      </ZicopsAccordian>
    </div>
  );
}
