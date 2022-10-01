import styles from '../../learnerUserProfile.module.scss';
import DetailsTabBottom from '../DetailsTabBottom';
import DetailsTabTop from '../DetailsTabTop';

export default function DetailsTab() {
  return (
    <div className={`${styles.courseTabContainer} ${styles.detailsTab}`}>
      {/* <div>Image</div>
      <div>De</div> */}
      <DetailsTabTop />
      {/* <div>Manager</div>
      <div className={`${styles.lastContainer}`}>
        <h1>Memebers</h1>
        <div className={`${styles.listContainer}`}>
          <section>Me1</section>
          <section>Me1</section>
          <section>Me1</section>
          <section>Me1</section>
          <section>Me1</section>
          <section>Me1</section>
          <section>Me1</section>
          <section>Me1</section>
          <section>Me1</section>
          <section>Me1</section>
          <section>Me1</section>
          <section>Me1</section>
          <section>Me1</section>
          <section>Me1</section>
          <section>Me1</section>
          <section>Me1</section>
          <section>Me1</section>
          <section>Me1</section>
          <section>Me1</section>
          <section>Me1</section>
          <section>Me1</section>
        </div>
      </div> */}
      <DetailsTabBottom />
    </div>
  );
}
