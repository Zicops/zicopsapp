import { truncateToN } from '@/helper/common.helper';
import { getCourseDisplayTime } from '@/helper/utils.helper';
import { useRouter } from 'next/router';
import styles from './courseCard.module.scss';

export default function CourseCard({
  image,
  courseData,
  styleClass,
  carouselRefData,
  isShowProgress = false,
  notext = false,
  showAssignSymbol = true
}) {
  const router = useRouter();
  if (!courseData?.name) return null;

  function handleMouseEnter(e, start = 0, end = 0) {
    if (e.currentTarget.parentNode.dataset.index === start.toString()) {
      e.currentTarget.parentNode.style.marginLeft = '15px';
      e.currentTarget.parentNode.style.marginRight = '-15px';
    }

    if (e.currentTarget.parentNode.dataset.index === end.toString()) {
      e.currentTarget.parentNode.style.marginLeft = '-15px';
      e.currentTarget.parentNode.style.marginRight = '15px';
    }
  }

  function handleMouseLeave(e) {
    e.currentTarget.parentNode.style.margin = '';
  }
  const gotoCourse = () => {
   if (!courseData?.examId) {
      router.push(courseData?.id ? `/course/${courseData.id}` : '/courses');
    } else {
        router?.push( `/course/${courseData?.courseId}?activateExam=${courseData?.examId}`,`/course/${courseData?.courseId}`);
    }
  };

  const gotoAssignCourses = () => {
    router.push(
      courseData?.id ? `/course/${courseData.id}?isAssign=true` : '/courses',
      `/course/${courseData.id}`
    );
  };

  let courseNameClass = 'coursename';
  if (courseData?.name?.length > 43) {
    // console.log(courseData?.name?.length);
    courseNameClass = 'coursenamesmall';
  }
  const progress = courseData?.completedPercentage != null ? courseData?.completedPercentage : 0;
  return (
    <>
      <div
        style={{ maxWidth: '350px' }}
        className={`${styles.card_item} ${styleClass}`}
        onClick={!notext ? gotoCourse : () => {}}
        onMouseEnter={(e) => {
          e.currentTarget.parentNode.parentNode.parentNode.style.zIndex = '990';
          handleMouseEnter(
            e,
            carouselRefData?.state?.currentSlide,
            carouselRefData?.state?.currentSlide + carouselRefData?.state?.slidesToShow - 1
          );
        }}
        onMouseLeave={(e) => {
          e.currentTarget.parentNode.parentNode.parentNode.style.zIndex = '0';
          handleMouseLeave(e);
        }}>
        <div className={`${styles.smallCardWrapper}`}>
          <div className={`${styles.smallCard}`}>
            <div className={`${styles.banner}`}>
              {courseData.type?.split('-').join(' ') || 'Self Paced'}
            </div>
            <img src={courseData?.tileImage || image || '/images/Rectangle 1678.png'} alt="" />
          </div>
          <div className={`${styles.smallCardContent}`}>
            <div className={`${styles.firstRow}`}>
              <div className={`${styles.buttons}`}>
                {showAssignSymbol ? (
                  <>
                    <img className={`${styles.addBtn}`}
                      onClick={(e) => {
                          e.stopPropagation();
                          gotoAssignCourses();
                        }} 
                      src = "/images/svg/add-line.svg" />
                  </>
                ) : (
                  <>
                    <img className={`${styles.playBtn}`} src="/images/Frame 22.svg" alt="" />
                    <img className={`${styles.removeBtn}`} src="/images/Frame 23.svg" alt="" />
                  </>
                )}
                {/* <img className={`${styles.addBtn}`} src="/images/Frame 22.svg" alt="" />
                <img className={`${styles.removeBtn}`} src="/images/Frame 23.svg" alt="" /> */}
              </div>
              <div className={`${styles.durlang}`}>
                <div className={`${styles.lang}`}>{courseData?.language?.join(', ')}</div>
                <div className={`${styles.dur}`}>
                  Duration:{' '}
                  {courseData?.duration
                    ? getCourseDisplayTime(courseData?.duration)
                    : '1hr 40 mins'}
                </div>
              </div>
            </div>
            <div className={`${styles.secondRow}`}>
              {courseData?.name || 'Free! UX/UI Course: Basics of design & fundamentals.'}
            </div>
            <div className={`${styles.thirdRow}`}>
              <div className={`${styles.pill}`}>
                {courseData?.expertise_level?.split(',')?.join(', ') || 'Beginner'}
              </div>
            </div>
            <div className={`${styles.lastRow}`}>
              {courseData?.category || 'Design'}
              <span className={`${styles.dot}`}></span>
              {courseData?.sub_category || 'UI/UX Design'}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}