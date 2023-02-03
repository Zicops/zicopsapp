import VendorDropdown from './common/VendorDropdown';
import { useState } from 'react';
import styles from './vendorComps.module.scss';

const optionVendorArray = ['Organisation', 'Individual/Freelancer'].map((val) => ({
  label: val,
  value: val
}));

const optionServiceArray = [
  'Subject Matter Expertise',
  'Classroom Training',
  'Content Development'
].map((val) => ({
  label: val,
  value: val
}));

export default function MarketYardHeroSection() {
  const [vendorType, setVendorType] = useState(null);
  const [vendorService, setVendorService] = useState(null);

  return (
    <>
      <div className={`${styles.marketYardFrameContainer}`}>
        <img src="/images/marketyardFrame.png" className={`${styles.frameImage}`} />

        <div className={`${styles.frameText}`}>
          <div className={`${styles.vendorDropDownContainer}`}>
            <VendorDropdown
              dropdownOptions={{
                inputName: 'Vendor Type',
                placeholder: 'Vendor Type',
                value: vendorType,
                options: optionVendorArray
              }}
              changeHandler={(val) => setVendorType(val)}
              styleClass={`${styles.vendorDropDown}`}
            />
            <VendorDropdown
              dropdownOptions={{
                inputName: 'Service',
                placeholder: 'Service',
                value: vendorService,
                options: optionServiceArray
              }}
              changeHandler={(val) => setVendorService(val)}
              styleClass={`${styles.vendorDropDown}`}
            />

            <input type="text" placeholder="Search" className={`${styles.vendorSearch}`} />
          </div>

          <div className={`${styles.vendorTextContainer}`}>
            <p className={`${styles.header}`}>Multi-Brand Learning Store</p>
            <p className={`${styles.body}`}>
              Find SME, Content Developer, Trainer and Speakers to build your own learning content
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
