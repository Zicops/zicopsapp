import CourseBoxCard from '@/components/common/CourseBoxCard';
import CourseLIstCard from '@/components/common/CourseLIstCard';
import { useEffect, useRef, useState } from 'react';
import styles from '../learnerUserProfile.module.scss';

export default function CardContainer({ isAdmin = false, type, footerType, courseData }) {
  const cardContainerRef = useRef(null);

  const [isBoxView, setIsBoxView] = useState(true);
  const [isShowAll, setIsShowAll] = useState(false);
  const [cardSizeData, setCardSizeData] = useState({
    cardWidth: 300,
    cardCount: 3
  });

  useEffect(() => {
    if (!cardContainerRef.current) return;

    const sidePadding = 50;
    const gap = 20;
    // const screenWidth = window.screen.width;
    const screenWidth = cardContainerRef.current?.offsetWidth;
    window.c = cardContainerRef.current;
    console.log(screenWidth);
    let cardCount = cardSizeData.cardCount;

    if (screenWidth > 1600) cardCount = 6;
    if (screenWidth > 1500) cardCount = 5;
    if (screenWidth > 1400) cardCount = 4;

    const cardWidth = (screenWidth - (cardCount - 1) - gap * (cardCount - 1)) / cardCount;

    setCardSizeData({ cardCount, cardWidth });
  }, []);

  return (
    <div className={`${styles.cardContainer}`}>
      <div className={`${styles.courseTabHeader}`}>
        <p>{type}</p>

        <div className={`${styles.imageContainer}`}>
          <img
            src={`/images/svg/view_agenda${isBoxView ? '_gray' : ''}.svg`}
            onClick={() => setIsBoxView(false)}
          />
          <img
            src={`/images/svg/grid_view${isBoxView ? '_primary' : ''}.svg`}
            onClick={() => setIsBoxView(true)}
          />

          <button className={`${styles.seeAllBtn}`} onClick={() => setIsShowAll(!isShowAll)}>
            See {isShowAll ? 'Less' : 'All'}
            <img src={`/images/arrow2.png`} />
          </button>
        </div>
      </div>

      <hr />

      {isBoxView ? (
        <div className={`${styles.boxCardContainer}`} ref={cardContainerRef}>
          {courseData
            ?.slice(0, isShowAll ? courseData?.length : cardSizeData.cardCount)
            ?.map((course) => (
              <CourseBoxCard
                isAdmin={isAdmin}
                courseData={course}
                footerType={footerType}
                cardWidth={cardSizeData.cardWidth}>
                {footerType === 'added' && (
                  <div className={`${styles.leftAlign}`}>
                    <p>Duration: {courseData?.duration || 240} mins</p>
                    <p>Added on {courseData?.addedOn || '22-06-2022'}</p>
                  </div>
                )}
                {footerType === 'adminFooter' && (
                  <div className={`${styles.adminCardFooter}`}>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit nam iure sint
                      quia ea voluptates, a assumenda impedit illum eligendi.
                    </p>
                    <button>Unassign</button>
                  </div>
                )}
              </CourseBoxCard>
            ))}
        </div>
      ) : (
        <div className={`${styles.listCardContainer}`}>
          {courseData
            ?.slice(0, isShowAll ? courseData?.length : cardSizeData.cardCount)
            ?.map((course) => (
              <CourseLIstCard courseData={course} footerType={footerType}></CourseLIstCard>
            ))}
        </div>
      )}
    </div>
  );
}
