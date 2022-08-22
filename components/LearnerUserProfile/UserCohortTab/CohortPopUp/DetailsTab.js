import styles from '../../learnerUserProfile.module.scss';
import DetailsTabBottom from '../DetailsTabBottom';
import DetailsTabTop from '../DetailsTabTop';

export default function DetailsTab() {
  return (
    <div className={`${styles.courseTabContainer}`} style={{ height: '100%' }}>
      <DetailsTabTop />
      <DetailsTabBottom />
    </div>
  );
}
