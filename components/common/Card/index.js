import { useRouter } from 'next/router';
import styles from './card.module.scss';

export default function Card({ data, styleClass }) {
  const router = useRouter();

  return (
    <>
      <div
        className={`${styles.zicopsCard} ${styleClass}`}
        onClick={() => router.push(`/course/${data?.id}`)}>
        <div className={`${styles.cardOverlay}`}>
          <div className={`${styles.banner}`}>Self Paced</div>
          <div className={`${styles.coursename}`}> {data.name} </div>
          <div className={`${styles.courseowner}`}> {data.owner} </div>
        </div>
        <img src={data.tileImage || '/images/dnd1.jpg'} alt="" />
      </div>
    </>
  );
}
