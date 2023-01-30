import ZicopsAccordian from '@/common/ZicopsAccordian';
import AddServices from './common/AddServices';
import styles from '../vendorComps.module.scss';
import { useRecoilState } from 'recoil';
import { SmeServicesAtom, CtServicesAtom, CdServicesAtom } from '@/state/atoms/vendor.atoms';
import { useEffect } from 'react';
import VendorPopUp from '../VendorPopUp';
import { useState } from 'react';

export default function AddVendorServices() {
  const [smeData, setSMEData] = useRecoilState(SmeServicesAtom);
  const [ctData, setCTData] = useRecoilState(CtServicesAtom);
  const [cdData, setCDData] = useRecoilState(CdServicesAtom);

  const servicesHelper = [
    {
      data: smeData,
      setData: setSMEData,
      title: 'Subject Matter Expertise',
      inputName: 'isApplicableSME'
    },
    {
      data: ctData,
      setData: setCTData,
      title: 'Classroom Training',
      inputName: 'isApplicableCT'
    },
    {
      data: cdData,
      setData: setCDData,
      title: 'Content Development',
      inputName: 'isApplicableCD'
    }
  ];

  useEffect(() => {
    console.log(smeData, ctData, cdData);
  }, [smeData, ctData, cdData]);

  return (
    <div className={`${styles.addServiceContainer}`}>
      {servicesHelper.map((value, index) => {
        return (
          <ZicopsAccordian title={value.title}>
            <AddServices data={value.data} setData={value.setData} inputName={value.inputName} />
          </ZicopsAccordian>
        );
      })}
    </div>
  );
}
