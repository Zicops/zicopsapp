import { useRouter } from 'next/router';
import ToolTip from '../common/ToolTip';
import { LEARNER_CLASSROOM } from '../common/ToolTip/tooltip.helper';
import styles from './classRoomBanner.module.scss';

const ClassRoomBanner = ({ data }) => {
  const passData = JSON.stringify(data);
  const router = useRouter();
  return (
    <div className={`${styles.classroomBanner}`}>
      <div className={`${styles.imgContainer}`}>
        <img src={`${data.bgImage}`} alt="" />
      </div>
      <div className={`${styles.classroomText}`}>
        <div className={`${styles.classroomLogo}`}>
          <img src={`${data.logo}`} alt="" />
        </div>
        <div className={`${styles.classroomTitle}`}>{data.title}</div>
        <div className={`${styles.classroomBy}`}>
          By <span>{data.by}</span>
        </div>
        <div className={`${styles.classroomByDesisgnation}`}>{data.designation}</div>
        <div className={`${styles.classroomPrice}`}>
          <div className={`${styles.classroomIcon}`}>
            <img src="/images/svg/sell.svg" alt="" />
          </div>
          Rs. {data.price}/Seat
        </div>
        <div className={`${styles.classroomBannerButtons}`}>
          <ToolTip title={LEARNER_CLASSROOM.bookNow}>
            <button className={`${styles.bookNowButton}`}>Book Now</button>
          </ToolTip>
          <ToolTip title={LEARNER_CLASSROOM.seeMore}>
            <button onClick={() => router.push(`${data?.link}?data=${passData}`, `${data?.link}`)}>
              See More
            </button>
          </ToolTip>
        </div>
        <div className={`${styles.classroomSchedule}`}>
          <div className={`${styles.classroomScheduleDate}`}>
            <div className={`${styles.classroomIcon}`}>
              <img src="/images/svg/event.svg" alt="" />
            </div>
            {data.date}
          </div>
          <div className={`${styles.classroomScheduleTime}`}>
            <div className={`${styles.classroomIcon}`}>
              <img src="/images/svg/schedule.svg" alt="" />
            </div>
            {data.time}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassRoomBanner;
