import Skeleton from '@mui/material/Skeleton';
import styles from './dashboardComponents.module.scss';

export default function Pill({ displayText = null }) {
  if (!displayText)
    return (
      <Skeleton className={`${styles.pillSkeleton}`} variant="rounded" height={30} width={150} />
    );

  return <p className={`${styles.pill}`}>{displayText} </p>;
}
