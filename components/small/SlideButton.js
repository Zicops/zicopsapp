import React, { useState } from 'react';
import styles from '../../styles/CourseMaster.module.css'

const SlideButton = () => {

    const [checked, setChecked] = useState(false);
    
    return(
        <div className={styles.active_button}>
            <label htmlFor="display_button" className={styles.td_label}></label>
            <label className={styles.switch}>
                <input className={styles.switch_input} type="checkbox" />
                <span className={styles.switch_label} data-on="On" data-off="Off"></span>
                <span className={styles.switch_handle}></span>
            </label>
        </div>
    )
}

export default SlideButton