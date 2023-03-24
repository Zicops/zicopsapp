import ZicopsAccordian from '@/common/ZicopsAccordian';
import { FeatureFlagsAtom } from '@/state/atoms/global.atom';
import { CdServicesAtom, CtServicesAtom, SmeServicesAtom } from '@/state/atoms/vendor.atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from '../vendorComps.module.scss';
import AddServices from './common/AddServices';

export default function AddVendorServices() {
  const [smeData, setSMEData] = useRecoilState(SmeServicesAtom);
  const [ctData, setCTData] = useRecoilState(CtServicesAtom);
  const [cdData, setCDData] = useRecoilState(CdServicesAtom);
  const { isDev } = useRecoilValue(FeatureFlagsAtom);

  const ptype = [{ SME: 'sme', CRT: 'crt', CD: 'cd' }];
  const servicesHelper = [
    {
      data: smeData,
      setData: setSMEData,
      title: 'Subject Matter Expertise',
      inputName: 'isApplicable',
      experticeName: 'Add Subject Matter Expertise',
      ptype: ptype[0]?.SME,
      isDev: true
    },
    {
      data: ctData,
      setData: setCTData,
      title: 'Classroom Training',
      inputName: 'isApplicable',
      experticeName: 'Add Classroom Training Expertise',
      ptype: ptype[0]?.CRT
    },
    {
      data: cdData,
      setData: setCDData,
      title: 'Content Development',
      inputName: 'isApplicable',
      experticeName: 'Add Content Development Expertise',
      ptype: ptype[0]?.CD,
      isDev: true
    }
  ];

  return (
    <div className={`${styles.addServiceContainer}`}>
      {servicesHelper.map((value, index) => {
        if (value?.isDev && !isDev) return;

        return (
          <ZicopsAccordian title={value.title}>
            <AddServices
              data={value.data}
              setData={value.setData}
              inputName={value.inputName}
              experticeName={value.experticeName}
              pType={value.ptype}
            />
          </ZicopsAccordian>
        );
      })}
    </div>
  );
}
