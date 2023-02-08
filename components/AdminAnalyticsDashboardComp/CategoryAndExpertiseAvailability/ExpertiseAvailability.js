import { data } from '@/components/DashboardComponents/Logic/dashboardData.helper';
import VennDiagram from '@/components/DashboardComponents/VennDiagram';
import styles from '../adminAnalyticsDashboard.module.scss';
import useHandleExpertises from '../Logic/useHandleExpertises';

export default function ExpertiseAvailability() {
  const {} = useHandleExpertises();

  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.wrapperHeading}`}>Expertise availability</div>
      <div className={`${styles.wrapperSubHeading}`}>All categories</div>

      <VennDiagram data={data} />
    </div>
  );
}
