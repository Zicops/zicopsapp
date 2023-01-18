import { useRouter } from 'next/router';
import ToolTip from '../common/ToolTip';
import { LEARNER_CLASSROOM } from '../common/ToolTip/tooltip.helper';
import styles from './selfPageBanner.module.scss';

const SelfPageBanner = ({ data }) => {
  const passData = JSON.stringify(data);
  const router = useRouter();
  return (
    <div className={`${styles.classroomBanner}`}>
      <div className={`${styles.imgContainer}`}>
        <img src={`${data.bgImage}`} alt="" />
      </div>
      <div className={`${styles.classroomText}`}>
        <div className={`${styles.level}`}>
          <span>{data.org} presents</span>
        </div>
        <div className={`${styles.classroomTitle}`}>{data.title}</div>
        <div className={`${styles.classroomByDesisgnation}`}>
          <div className={`${styles.level}`}>
            Level: <span>{data.level}</span>
          </div>
          <div className={`${styles.level}`}>
            Duration: <span>{data.duration}</span>
          </div>
        </div>
        <div className={`${styles.bannerCat}`}>
          <ul>
            <li>{data.cat[0]}</li>
            <li>{data.cat[1]}</li>
            <li>{data.cat[2]}</li>
          </ul>
        </div>
        <div className={`${styles.classroomBannerButtons}`}>
          <ToolTip title={LEARNER_CLASSROOM.bookNow}>
            <button className={`${styles.bookNowButton}`}>Add to my Learning Folder</button>
          </ToolTip>
          <ToolTip title={LEARNER_CLASSROOM.seeMore}>
            <button onClick={() => router.push(`${data?.link}?data=${passData}`, `${data?.link}`)}>
              See Course
            </button>
          </ToolTip>
        </div>
      </div>
    </div>
  );
};

export default SelfPageBanner;
