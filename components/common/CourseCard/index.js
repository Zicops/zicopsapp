import { truncateToN } from '@/helper/common.helper';
import { COURSE_TYPES, USER_LSP_ROLE } from '@/helper/constants.helper';
import { getCourseDisplayTime } from '@/helper/utils.helper';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
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
  const userOrgData = useRecoilValue(UsersOrganizationAtom);
  const router = useRouter();

  if (!courseData?.name) return null;
  const isVendor = userOrgData.user_lsp_role?.toLowerCase()?.includes(USER_LSP_ROLE.vendor);

  function handleMouseEnter(e, start = 0, end = 0) {
    const firstLastCardOffset = 13;
    const pageOffset = 100;
    const mouseOffset = window.innerHeight / 2;

    console.info('Info', e.clientY, mouseOffset )
    if (
      e.clientY > mouseOffset &&
      document.body.scrollHeight - window.pageYOffset < window.innerHeight + pageOffset
    ) {
      e.currentTarget?.firstChild?.style.marginTop = '-55%';
    } else {
      e.currentTarget?.firstChild?.style.marginTop = '-25%';
    }

    if (e.currentTarget?.parentNode?.dataset?.index === start.toString()) {
      e.currentTarget?.parentNode?.style.marginLeft = `${firstLastCardOffset}px`;
      e.currentTarget?.parentNode?.style.marginRight = `${-firstLastCardOffset}px`;
    }

    if (e.currentTarget?.parentNode?.dataset?.index === end.toString()) {
      e.currentTarget?.parentNode?.style.marginLeft = `${-firstLastCardOffset}px`;
      e.currentTarget?.parentNode?.style.marginRight = `${firstLastCardOffset}px`;
    }

    e.currentTarget?.parentNode?.style.transitionDelay = '0.6s';
    e.currentTarget?.parentNode?.style.transitionTime = '0.2s';
  }

  function handleMouseLeave(e) {
    e.currentTarget?.firstChild?.style.marginTop = '0';
    e.currentTarget?.parentNode?.style.margin = '0';
    e.currentTarget?.parentNode?.style.transitionDelay = '0s';
  }
  const gotoCourse = () => {
    if (isVendor) return router.push(`/preview?courseId=${courseData.id}`);

    if (!courseData?.examId) {
      router.push(courseData?.id ? `/course/${courseData.id}` : '/courses');
    } else {
      router?.push(
        `/course/${courseData?.courseId}?activateExam=${courseData?.examId}`,
        `/course/${courseData?.courseId}`
      );
    }
  };

  const gotoAssignCourses = () => {
    router.push(
      courseData?.id ? `/course/${courseData.id}?isAssign=true` : '/courses',
      `/course/${courseData.id}`
    );
  };

  function gotoCoursePage(e, queryParams = '') {
    e.stopPropagation();

    if (!courseData?.id) return router.push('/courses');

    let coursePath = `/course/${courseData.id}`;
    if (!!queryParams) coursePath += `?${queryParams}`;
    router.push(coursePath, `/course/${courseData.id}`);
  }

  let courseNameClass = 'coursename';
  if (courseData?.name?.length > 43) {
    // console.log(courseData?.name?.length);
    courseNameClass = 'coursenamesmall';
  }
  const progress = courseData?.completedPercentage != null ? courseData?.completedPercentage : 0;

  return (
    <>
      <div
        style={{ maxWidth: '350px', height: '100%', width: '100%' }}
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
        <div className={`${styles.smallCardWrapper} ${styles[courseData.type]}`}>
          <div className={`${styles.smallCard}`}>
            <div className={`${styles.banner}`}>
              {courseData.type?.split('-').join(' ') || 'Self Paced'}
            </div>
            <img src={courseData?.tileImage || image || '/images/dnd1.jpg'} alt="" />
          </div>
          <div className={`${styles.smallCardContent}`}>
            <div className={`${styles.firstRow}`}>
              <div className={`${styles.buttons}`}>
                {showAssignSymbol ? (
                  <>
                    <img
                      className={`${styles.addBtn}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        gotoAssignCourses();
                      }}
                      src="/images/svg/add-line.svg"
                    />
                  </>
                ) : (
                  <>
                    <img
                      className={`${styles.playBtn}`}
                      src="/images/Frame 22.svg"
                      alt=""
                      onClick={(e) => gotoCoursePage(e, 'startCourse=true')}
                    />
                    <img
                      className={`${styles.removeBtn}`}
                      src="/images/Frame 23.svg"
                      alt=""
                      onClick={(e) => gotoCoursePage(e, 'isUnAssign=true')}
                    />
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
