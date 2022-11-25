import Image from 'next/image';
import React from 'react'
import styles from './learningSpaces.module.scss';
const AddLsp = () => {
  return (
      <div className={`${styles.addLspContainer}`}>
          <div className={`${styles.addLspIcon}`}>
        <img src="/images/svg/pluse-icon.svg" alt="" width={37} height={37} />
          </div>
          <div className={`${styles.addLspText}`}>
              <p>Add a new Learning space</p>
          </div> 
    </div>
  )
}

export default AddLsp