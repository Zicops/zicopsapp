import CourseBoxCard from '@/components/common/CourseBoxCard';
import CourseLIstCard from '@/components/common/CourseLIstCard';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import styles from '../learnerUserProfile.module.scss';

export default function CardContainer({
  customStyles = {},
  isAdmin = false,
  isRemove = false,
  type,
  hideTopBar = false,
  footerType,
  courseData,
  statusData,
  buttonText = '',
  handleSubmit = () => {},
  isLoading = false
}) {
  const cardContainerRef = useRef(null);

  const [isBoxView, setIsBoxView] = useState(true);
  const [isShowAll, setIsShowAll] = useState(hideTopBar);
  const [cardSizeData, setCardSizeData] = useState({
    cardWidth: 300,
    cardCount: 4
  });

  const isUnix = !isNaN(+courseData?.created_at);
  // console.log(courseData,'safa')

  useEffect(() => {
    if (!cardContainerRef.current) return;

    const sidePadding = 50;
    const gap = 20;
    // const screenWidth = window.screen.width; //////
    const screenWidth = cardContainerRef.current?.offsetWidth;
    window.c = cardContainerRef.current;
    console.log(screenWidth);
    let cardCount = cardSizeData.cardCount;

    if (screenWidth > 1600) cardCount = 6;
    if (screenWidth > 1500) cardCount = 5;
    if (screenWidth > 1400) cardCount = 5;

    const cardWidth = (screenWidth - (cardCount - 1) - gap * (cardCount - 1)) / cardCount;

    setCardSizeData({ cardCount, cardWidth });
  }, []);

  return (
    <div className={`${styles.cardContainer}`}>
      {!hideTopBar && (
        <>
          <div className={`${styles.courseTabHeader}`}>
            <p className={`${styles.text}`} style={customStyles}>{type}</p>

            <div className={`${styles.imageContainer}`}>
              <img
                src={`/images/svg/view_agenda${isBoxView ? '_gray' : ''}.svg`}
                onClick={() => setIsBoxView(false)}
              />
              <img
                src={`/images/svg/grid_view${isBoxView ? '_primary' : ''}.svg`}
                onClick={() => setIsBoxView(true)}
              />

              <button
                className={isShowAll ? `${styles.seeAllBtn}` : `${styles.seeLessBtn} `}
                onClick={() => setIsShowAll(!isShowAll)}>
                See {isShowAll ? 'Less' : 'All'}
                <img src={`/images/arrow2.png`} />
              </button>
            </div>
          </div>
          <hr />
        </>
      )}

      {isLoading ? (
        <strong className={`${styles.fallbackMsg}`}>Loading...</strong>
      ) : (
        !courseData?.length && <strong className={`${styles.fallbackMsg}`}>No Courses Found</strong>
      )}

      {isBoxView ? (
        <div className={`${styles.boxCardContainer}`} ref={cardContainerRef}>
          {courseData
            ?.slice(0, isShowAll ? courseData?.length : cardSizeData.cardCount)
            ?.map((course) => {
              return (
                <CourseBoxCard
                  isAdmin={isAdmin}
                  courseData={{...course, duration: (course?.duration / (60))?.toFixed(2)}}
                  footerType={footerType}
                  cardWidth={cardSizeData.cardWidth}>
                  {footerType === 'added' && (
                    <div className={`${styles.leftAlign}`}>

                     <p>Duration: {(course?.duration / (60))?.toFixed(2) || 240} mins</p>

                      <p>Added on {course?.addedOn || '22-06-2022'}</p>
                    </div>
                  )}
                  {footerType === 'adminFooter' && (
                    <div className={`${styles.adminCardFooter}`}>
                      {/* <p>
                        {course?.description
                          ? truncateToN(course?.description, 150)
                          : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit nam iure sintquia ea voluptates, a assumenda impedit illum eligendi.'}
                      </p> */}
                      <button onClick={() => handleSubmit(course, isRemove)}>{buttonText}</button>
                    </div>
                  )}
                </CourseBoxCard>
              );
            })}
        </div>
      ) : (
        <div className={`${styles.listCardContainer}`}>
          {courseData
            ?.slice(0, isShowAll ? courseData?.length : cardSizeData.cardCount)
            ?.map((course) => (
              <CourseLIstCard
                courseData={{...course, duration: (course?.duration / (60*60))?.toFixed(2)}}
                statusData={statusData}
                footerType={footerType} isAdmin={isAdmin}></CourseLIstCard>
            ))}
        </div>
      )}
    </div>
  );
}
