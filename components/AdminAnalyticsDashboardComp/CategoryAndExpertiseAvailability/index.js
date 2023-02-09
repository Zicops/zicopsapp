import React from 'react';
import ExpertiseAvailability from './ExpertiseAvailability';
import styles from '../adminAnalyticsDashboard.module.scss';
import CategoryAvailability from './CategoryAvailability';

export default function CategoryAndExpertiseAvailability() {
  return (
    <div className={`${styles.categoryAndExpertiseAvailability}`}>
      <CategoryAvailability />
      <ExpertiseAvailability />
    </div>
  );
}
