import ZicopsAccordian from '@/common/ZicopsAccordian';
import AddServices from './common/AddServices';
import styles from '../vendorComps.module.scss';
import { useRecoilState } from 'recoil';
import { SmeServicesAtom, CtServicesAtom, CdServicesAtom } from '@/state/atoms/vendor.atoms';

export default function AddVendorServices() {
  const [smeData, setSMEData] = useRecoilState(SmeServicesAtom);
  const [ctData, setCTData] = useRecoilState(CtServicesAtom);
  const [cdData, setCDData] = useRecoilState(CdServicesAtom);

  return (
    <div className={`${styles.addServiceContainer}`}>
      <ZicopsAccordian title={'Subject Matter Expertise'}>
        <AddServices data={smeData} />
      </ZicopsAccordian>
      <ZicopsAccordian title={'Classroom Training'}>
        <AddServices data={ctData} />
      </ZicopsAccordian>
      <ZicopsAccordian title={'Content Development'}>
        <AddServices data={cdData} />
      </ZicopsAccordian>
    </div>
  );
}
