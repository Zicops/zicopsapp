import { useState } from 'react';
import { cohortTabData } from './userBody.helper';

export default function useHandleCohortTab() {
  const [cohortTab, setCohortTab] = useState(cohortTabData[0].name);

  function showActiveTab(tab) {
    const index = cohortTabData.findIndex((t) => {
      return t.name === tab;
    });

    if (index >= 0) return cohortTabData[index].component;
    return cohortTabData[0].component;
  }

  return { cohortTab, showActiveTab };
}
