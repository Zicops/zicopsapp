import React from 'react'
import ExpertiseAvailability from './ExpertiseAvailability'
import styles from './analytics.module.scss'
import CategoryAvailability from './CategoryAvailability'

export default function CategoryAndExpertiseAvailability() {
  return (
    <div className={`${styles.categoryAndExpertiseAvailability}`}>
      <CategoryAvailability/>
      <ExpertiseAvailability/>
    </div>
  )
}
