import SwitchButton from '@/components/common/FormComponents/SwitchButton';
import Spinner from '@/components/common/Spinner';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import styles from '../adminAnalyticsDashboard.module.scss';
import useHandleExpertises from '../Logic/useHandleExpertises';
const ZicopsVennDiagram = dynamic(import('@/components/DashboardComponents/ZicopsVennDiagram'), {
  ssr: false
  // loading: () => <p>Loading ...</p>
});

export default function ExpertiseAvailability() {
  const { vennDiagramData } = useHandleExpertises();
  const [isEuler, setIsEuler] = useState(false);

  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.wrapperHeading}`}>Expertise availability</div>
      <div className={`${styles.wrapperSubHeading}`}>
        All categories
        <SwitchButton
          label={'Is Euler'}
          isChecked={isEuler}
          handleChange={() => setIsEuler(!isEuler)}
        />
      </div>

      {/* <VennDiagram data={data} /> */}
      {vennDiagramData == null ? (
        <Spinner />
      ) : (
        <ZicopsVennDiagram data={vennDiagramData || []} isEuler={isEuler} />
      )}
    </div>
  );
}
