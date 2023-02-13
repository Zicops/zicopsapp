import InfoCountCard from '@/components/DashboardComponents/InfoCountCard';
import styles from './adminAnalyticsDashboard.module.scss';
import useHandleFirstFourCard from './Logic/useHandleFirstFourCard';

export default function FirstFourCards() {
  const cardData = useHandleFirstFourCard();

  return (
    <div className={`${styles.firstFourCards}`}>
      {cardData.map((data) => {
        return <InfoCountCard key={data.id} {...data} />;
      })}
    </div>
  );
}
