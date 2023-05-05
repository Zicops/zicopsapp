import { COURSE_SELF_ASSIGN_LIMIT } from '@/helper/constants.helper';
import { parseJson } from '@/helper/utils.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { UserCourseDataAtom } from '@/state/atoms/video.atom';
import { Skeleton } from '@mui/material';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import style from '../courseHero.module.scss';
import Info from '../Info';
import useHandleCourseHero from '../Logic/useHandleCourseHero';
import { truncateToN } from '@/helper/common.helper';
import { isLoadingAtom } from '@/state/atoms/module.atoms';
import { courseContext } from '@/state/contexts/CourseContext';
import ConfirmPopUp from '@/components/common/ConfirmPopUp';
import AssignCourse from '@/components/CourseComps/AssignCourse';
import CourseHeader from '../CourseHeader';
import VendorPopUp from '@/components/VendorComps/common/VendorPopUp';
import FeeDetails from '@/components/AdminCourseComps/CoursePayment/FeeDetails';
import Button from '@/components/common/Button';
import { RegisterUserAtom } from '@/state/atoms/courses.atom';
import useHandleRegisterData from '@/components/AdminCourseComps/RegisterUserTabs/Logic/useHandleRegisterData';

export default function ClassRoomCourseHero({ isPreview = false }) {
  const {
    courseAssignData,
    isAssignPopUpOpen,
    setIsAssignPopUpOpen,
    activateVideoPlayer,
    showPreviewVideo,
    unassignCourseFromUser,
  } = useHandleCourseHero(isPreview);

  const [isCourseUnassign, setIsCourseUnassign] = useState(false);
  const userCourseData = useRecoilValue(UserCourseDataAtom);
  const isLoading = useRecoilValue(isLoadingAtom);
  const [isUnAssignPopUpOpen, setIsUnAssignPopUpOpen] = useState(false);
  const [isOpenRegister, setIsOpenRegsiter] = useState(false);
  const [isRegister, setIsRegsiter] = useState(false);
  const [isOpenBooking, setIsOpenBooking] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [isOpenFees, setIsOpenFees] = useState(false);
  const userOrgData = useRecoilValue(UsersOrganizationAtom);
  const [registerUserData, setRegisterUserData] = useRecoilState(RegisterUserAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const router = useRouter();
  const courseId = router?.query?.courseId || null;
  const isAssign = router?.query?.isAssign || null;
  const isUnAssign = router?.query?.isUnAssign || null;
  const startCourse = router?.query?.startCourse || null;

  const { fullCourse } = useContext(courseContext);
  const {
    name: courseTitle,
    benefits,
    summary,
    image,
    expertise_level: expertiseLevel,
    language,
    instructor,
    category,
    sub_category: subCategory,
    duration,
    owner: provisionedBy,
    publisher: publishedBy,
  } = fullCourse;

  const { addUpdateRegisterUser } = useHandleRegisterData();

  // useEffect(() => {
  //   if (!router?.query?.isAssign) return;
  //   if (!fullCourse?.id) return;
  //   if (router?.query?.courseId !== fullCourse?.id) return;
  //   if (courseAssignData?.isCourseAssigned) return;
  //   return setIsAssignPopUpOpen(true);
  // }, [fullCourse]);

  useEffect(() => {
    if (!router.isReady) return;
    if (courseId !== fullCourse?.id) return;

    // open course assign popup if query params passed and course already not assigned
    if (isAssign && !courseAssignData?.isCourseAssigned) {
      router.query.isAssign = false;
      setIsAssignPopUpOpen(true);
    }

    // course not assigned
    if (!courseAssignData?.isCourseAssigned) return;

    if (isUnAssign) setIsUnAssignPopUpOpen(true);
    if (startCourse && userCourseData?.allModules?.length) activateVideoPlayer();
  }, [router.isReady, fullCourse.id, userCourseData?.allModules?.length]);

  useEffect(() => {
    // console.log(userCourseData?.userCourseMapping)
    if (!userCourseData?.userCourseMapping) return;
    const addedBy = parseJson(userCourseData?.userCourseMapping?.added_by);
    // console.log(addedBy?.role?.toLowerCase())
    // if(userCourseData?.userCourseMapping?.course_status?.toLowerCase() === 'disabled') return ;
    if (addedBy?.role?.toLowerCase() !== 'self' || !courseAssignData?.isCourseAssigned)
      return setIsCourseUnassign(false);
    if (courseAssignData?.isCourseAssigned) return setIsCourseUnassign(true);
    return setIsCourseUnassign(true);
  }, [userCourseData, courseAssignData?.isCourseAssigned]);

  const suggestedDuration = fullCourse?.expected_completion || 1;

  const onRegisterHandler = async () => {
    const userData = JSON.parse(sessionStorage?.getItem('loggedUser'));
    const currentDate = new Date();
    const unixCurrentDate = currentDate.getTime() / 1000;

    const registrationData = {
      courseId: fullCourse?.id,
      userId: userData?.id,
      registration_date: unixCurrentDate,
      invoice: '',
      status: 'active',
    };
    setRegisterUserData(registrationData);
    await addUpdateRegisterUser();
    setIsRegsiter(true);
    setIsOpenRegsiter(false);
  };
  const onBookingHandler = () => {
    setIsOpenFees(true);
    setIsOpenBooking(false);
  };
  return (
    <div
      className={`${style.course_header}`}
      style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' }}>
      <div className={`${style.gradient}`}>
        <span onClick={() => router?.back()} className={`${style.back_btn}`}>
          {/* <Link href={isPreview ? `/admin/courses/${fullCourse.id}` : ''}> */}
          {/* <a className={`${style.back_btn}`}> */}
          {/* <img src="/images/bigarrowleft.png" alt="" /> */}
          {/* </a> */}
          {/* </Link> */}
        </span>

        <div className={`${style.courseType2} ${style[fullCourse?.type]}`}>
          <img src="/images/svg/videocam.svg" alt="" />
          {fullCourse?.type}
        </div>

        <div className={`${style.course_header_text2}`}>
          <CourseHeader
            courseTitle={courseTitle}
            provisionedBy={provisionedBy}
            publishedBy={publishedBy}
            category={category}
            subCategory={subCategory}
            duration={duration?.toString()}
            isLoading={isLoading}
            isPreview={!isPreview}
            isCourseAssigned={courseAssignData?.isCourseAssigned}
            isCourseUnassign={isCourseUnassign}
            handleUnAssign={() => setIsUnAssignPopUpOpen(true)}
            handleAssign={() => {
              if (userOrgData?.self_course_count >= COURSE_SELF_ASSIGN_LIMIT) {
                return setToastMsg({
                  type: 'info',
                  message: 'You have reached your self course assign limit!',
                });
              }
              setIsAssignPopUpOpen(true);
            }}
          />

          <div className={`${style.summary}`}>
            {isLoading ? (
              <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={70} width={500} />
            ) : summary ? (
              truncateToN(summary, 400)
            ) : (
              'N/A'
            )}
          </div>
          <div className={`${style.more_info}`}>
            <Info name="Course Benefits" data={benefits?.join(', ')} />
            <Info name="Instructors" data={instructor} />
            <div className={`${style.textFlex}`}>
              <Info name="Expertise Level" data={expertiseLevel?.split(',').join(' | ')} />
              <Info name="Language" data={language.join(', ')} />
            </div>
            <div className={`${style.textFlex}`}>
              <Info name="Course starts on" data="25/04/2023" />
              <Info name="Registration ends on" data="16/04/2023" />
            </div>
          </div>
          <div className={`${style.price}`}>
            <div className={`${style.image}`}>
              <img src="/images/svg/sell.svg" alt="" />
            </div>
            <p>Price: 1299/Seat</p>
          </div>
          <div className={`${style.courseButton}`}>
            <div className={`${style.course_big_button}`}>
              <button onClick={showPreviewVideo}>Preview course</button>
            </div>
            {!isBooking ? (
              <div className={`${style.registerBtn}`}>
                <button
                  onClick={(e) => {
                    if (!isRegister) {
                      setIsOpenRegsiter(true);
                    } else {
                      setIsOpenBooking(true);
                    }
                  }}>
                  {isRegister ? 'Book' : 'Register'}
                </button>
              </div>
            ) : (
              <>
                <div className={`${style.bookingBtn}`}>
                  <button
                    style={{ backgroundColor: '#F6AC3C' }}
                    onClick={(e) => setIsOpenRegsiter(true)}>
                    Register
                  </button>
                </div>
                <div className={`${style.bookingBtn}`}>
                  <button onClick={(e) => setIsOpenBooking(true)}>Book</button>
                </div>
              </>
            )}
          </div>
        </div>
        {!isRegister && (
          <div className={`${style.registrationStatus}`}>
            <img src="/images/svg/release_alert.svg" alt="" />
            Limited Registrations!
          </div>
        )}
        {/* <div className={`${style.registrationStatus}`}>
          <img src="/images/svg/warning.svg" alt="" />
          Only Few Registrations Left
        </div> */}
        {isRegister && (
          <div className={`${style.registerder}`}>
            <img src="/images/svg/new_releases.svg" alt="" />
            Registered
          </div>
        )}
        {/* <div className={`${style.registrationStatus}`}>
          <img src="/images/svg/warning.svg" alt="" />
          Only Few Seats Left
        </div> */}
        {/* <div className={`${style.registrationStatus}`}>
          <img src="/images/svg/sensors.svg" alt="" />
          Live session yet to start
        </div> */}
      </div>
      <AssignCourse
        isAssignPopUpOpen={isAssignPopUpOpen}
        setIsAssignPopUpOpen={setIsAssignPopUpOpen}
        courseId={fullCourse?.id}
        courseType={fullCourse?.type}
        lspId={fullCourse?.lspId}
        suggestedCompletionDays={fullCourse?.expected_completion}
        courseName={fullCourse?.name}
      />

      {isUnAssignPopUpOpen && (
        <ConfirmPopUp
          title={'Are you sure you want to remove this course?'}
          btnObj={{
            // leftIsDisable: loading,
            // rightIsDisable:loading,
            handleClickLeft: async () => {
              await unassignCourseFromUser();
              setIsUnAssignPopUpOpen(false);
              setIsCourseUnassign(false);
            },
            handleClickRight: () => setIsUnAssignPopUpOpen(false),
          }}
        />
      )}
      <VendorPopUp
        open={isOpenRegister}
        popUpState={[isOpenRegister, setIsOpenRegsiter]}
        customStyles={{ width: '450px', height: '230px' }}
        closeBtn={{ name: 'No' }}
        submitBtn={{ name: 'Yes', handleClick: onRegisterHandler }}
        isMarketYard
        isVilt
        isFooterVisible={true}>
        <p className={`${style.rText}`}>Registration</p>
        <div className={`${style.hr}`}></div>
        <p className={`${style.text}`}>
          Are you sure you want to register for {courseTitle} by {provisionedBy}?
        </p>
      </VendorPopUp>
      <VendorPopUp
        open={isOpenBooking}
        popUpState={[isOpenBooking, setIsOpenBooking]}
        customStyles={{ width: '450px', height: '200px' }}
        closeBtn={{ name: 'Book Later' }}
        submitBtn={{ name: 'Book Now', handleClick: onBookingHandler }}
        isMarketYard
        isVilt
        isFooterVisible={true}>
        <p className={`${style.rText}`}>Booking</p>
        <div className={`${style.hr}`}></div>
        <p className={`${style.text}`}>Are you sure you want to book your seat?</p>
      </VendorPopUp>
      <VendorPopUp
        open={isOpenFees}
        popUpState={[isOpenFees, setIsOpenFees]}
        customStyles={{ width: '800px', height: '80vh' }}
        popUpCustomStyles={{ padding: '0px 0px 15px 0px' }}
        isCloseButton={false}
        isSubmitButton={false}
        isMarketYard
        isVilt>
        <>
          <FeeDetails />
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              text="Cancel"
              customStyles={{
                borderRadius: '4px',
                border: 'none',
                backgroundColor: '#26292C',
                color: '#ACACAC',
              }}
              clickHandler={() => {
                setIsOpenFees(false);
              }}
            />
            <Button
              text="Proceed to Pay"
              customStyles={{
                borderRadius: '4px',
                backgroundColor: '#6BCFCF',
                color: '#0B0C0D',
                fontWeight: '500',
                border: 'none',
              }}
              clickHandler={() => {
                setIsOpenFees(false);
              }}
            />
          </div>
        </>
      </VendorPopUp>
    </div>
  );
}
