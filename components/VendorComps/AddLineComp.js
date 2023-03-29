import React from 'react';
import styles from '@/components/VendorComps/vendorComps.module.scss';
import AddLineItem from './AddLineItem';
const AddLineComp = () => {
  return (
    <div>
      <p className={`${styles.addLineText}`}>Add Line Item</p>
      <div className={`${styles.hr}`}></div>
      <AddLineItem />
      <div className={`${styles.hr}`}></div>
    </div>
  );
};

export default AddLineComp;
