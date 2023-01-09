import React from "react";
import styles from './loading.module.scss';

export default function LoadingSpinner() {
  return (
    <div className={styles.spinner_container}>
      <div className={styles.loading_spinner}>
      </div>
    </div>
  );
}