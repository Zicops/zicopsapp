import styles from './dashboardComponents.module.scss';

export default function Pill({ displayText = '' }) {
  return <p className={`${styles.pill}`}>{displayText} </p>;
}
