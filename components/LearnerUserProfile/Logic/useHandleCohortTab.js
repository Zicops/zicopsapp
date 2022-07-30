import { useState } from 'react';
import { cohortTabData } from './userBody.helper';

export default function useHandleCohortTab() {
  const [cohortTab, setCohortTab] = useState(cohortTabData[0].name);

  return { cohortTab };
}
