import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import { useState, useEffect } from 'react';
import styles from './vendorComps.module.scss';
import AddLineItemComp from './common/AddLineItemComp';
import {
  ServicesAtom,
  getServicesObject,
  VendorServicesListAtom
} from '@/state/atoms/vendor.atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { VENDOR_SERVICES_TYPE } from '@/helper/constants.helper';
const AddLineItem = () => {
  const [isExpertise, setIsExpertise] = useState(true);
  const [addLine, setAddLine] = useState({ sme: 0, crt: 0, cd: 0, speakers: 0 });
  const [servicesData, setServicesData] = useRecoilState(ServicesAtom);
  const selectedServicesForOrder = useRecoilValue(VendorServicesListAtom);

  useEffect(() => {
    setAddLine({
      sme: servicesData?.sme?.length,
      crt: servicesData?.crt?.length,
      cd: servicesData?.cd?.length,
      speakers: servicesData?.speakers?.length
    });
  }, []);

  const addAnotherItemHandler = (service) => {
    const _serviceData = structuredClone(servicesData);
    _serviceData?.[service]?.push(getServicesObject());
    setServicesData(_serviceData);

    const _addLine = structuredClone(addLine);
    _addLine[service] += 1;
    setAddLine(_addLine);
  };
  return (
    <div>
      {Object.keys(selectedServicesForOrder)?.map((service) => {
        if (!selectedServicesForOrder?.[service]) return null;
        return (
          <>
            <div className={`${styles.checkBoxLabel}`}>
              <LabeledRadioCheckbox
                label={VENDOR_SERVICES_TYPE?.[service]?.label}
                type="checkbox"
                isChecked={isExpertise}
              />
            </div>

            {[...Array(addLine?.[service])].map((v, i) => (
              <span key={i}>
                <AddLineItemComp index={i} service={service} />
              </span>
            ))}

            <div className={`${styles.addAnotherItem}`}>
              <p onClick={() => addAnotherItemHandler(service)}>+</p>
              <span>Add another line item</span>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default AddLineItem;
