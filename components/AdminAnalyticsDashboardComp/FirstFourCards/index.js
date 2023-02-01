import Card from '@/components/DashboardComponents/Card';
import styles from '../adminAnalyticsDashboard.module.scss';

export default function FirstFourCards({cardData}) {
  return (
    <div className={`${styles.firstFourCards}`}>
      {cardData.map((data) => {
        return <Card key={data.id} {...data} />;
      })}
    </div>
  );
}
