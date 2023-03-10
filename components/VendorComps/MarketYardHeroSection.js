import { useState } from 'react';
import LabeledDropdown from '../common/FormComponents/LabeledDropdown';
import { optionServiceArray, optionVendorArray } from './Logic/vendorComps.helper';
import styles from './vendorComps.module.scss';

const customDropdownStyleObj = {
  controlStyles: { backgroundColor: 'transparent', border: '2px solid var(--white)' },
  placeholderStyles: { color: 'var(--white)' },
  optionStyles: {
    background: 'transparent',
    color: 'var(--white)',
    border: '2px solid var(--white)',
    marginBottom: '3px',
    '&:hover': {
      background: 'var(--background_body)'
    }
  },
  menuStyles: { background: 'var(--primary)' },
  dropdownIndicatorStyles: {
    color: 'var(--white)',
    '&:hover': {
      svg: { fill: 'var(--background_body)' }
    }
  }
};

export default function MarketYardHeroSection() {
  const [vendorType, setVendorType] = useState(null);
  const [vendorService, setVendorService] = useState(null);

  return (
    <>
      <div className={`${styles.marketYardFrameContainer}`}>
        <img src="/images/marketyardFrame.png" className={`${styles.frameImage}`} />
        <div className={`${styles.frameText}`}>
          <div className={`${styles.vendorDropDownContainer}`}>
            <LabeledDropdown
              dropdownOptions={{
                inputName: 'Vendor Type',
                placeholder: 'Vendor Type',
                value: vendorType,
                options: optionVendorArray
              }}
              changeHandler={(val) => setVendorType(val)}
              styleClass={`${styles.vendorDropDown}`}
              customDropdownStyles={customDropdownStyleObj}
            />

            <LabeledDropdown
              dropdownOptions={{
                inputName: 'Service',
                placeholder: 'Service',
                value: vendorService,
                options: optionServiceArray
              }}
              changeHandler={(val) => setVendorService(val)}
              styleClass={`${styles.vendorDropDown}`}
              customDropdownStyles={customDropdownStyleObj}
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
