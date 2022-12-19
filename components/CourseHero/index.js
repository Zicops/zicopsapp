import { COURSE_SELF_ASSIGN_LIMIT } from '@/helper/constants.helper';
import { displayUnixDate, parseJson } from '@/helper/utils.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { UserCourseDataAtom } from '@/state/atoms/video.atom';
import { Skeleton } from '@mui/material';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { truncateToN } from '../../helper/common.helper';
import { isLoadingAtom } from '../../state/atoms/module.atoms';
import { courseContext } from '../../state/contexts/CourseContext';
import ConfirmPopUp from '../common/ConfirmPopUp';
import LabeledRadioCheckbox from '../common/FormComponents/LabeledRadioCheckbox';
import InputDatePicker from '../common/InputDatePicker';
import PopUp from '../common/PopUp';
import { IsDataPresentAtom } from '../common/PopUp/Logic/popUp.helper';
import UserButton from '../common/UserButton';
import CourseHeader from './CourseHeader';
import style from './courseHero.module.scss';
import Info from './Info';
import useHandleCourseHero from './Logic/useHandleCourseHero';

export default function CourseHero({ isPreview = false }) {
  const {
    courseAssignData,
    setCourseAssignData,
    isAssignPopUpOpen,
    setIsAssignPopUpOpen,
    activateVideoPlayer,
    assignCourseToUser,
    showPreviewVideo,
    unassignCourseFromUser
  } = useHandleCourseHero(isPreview);

  const [isCourseUnassign, setIsCourseUnassign] = useState(false);
  const userCourseData = useRecoilValue(UserCourseDataAtom);
  const isLoading = useRecoilValue(isLoadingAtom);
  const [isPopUpDataPresent, setIsPopUpDataPresent] = useRecoilState(IsDataPresentAtom);
  const [isUnAssignPopUpOpen, setIsUnAssignPopUpOpen] = useState(false);
  const userOrgData = useRecoilValue(UsersOrganizationAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const router = useRouter();
  const { fullCourse } = useContext(courseContext);
  const {
    name: courseTitle,
    benefits,
    summary,
    image,
    expertise_level: expertiseLevel,
    prequisites,
    goodFor,
    mustFor,
    category,
    sub_category: subCategory,
    duration,
    owner: provisionedBy,
    publisher: publishedBy
  } = fullCourse;

  useEffect(() => {
    if (!router?.query?.isAssign) return;
    if (!fullCourse?.id) return;
    if (router?.query?.courseId !== fullCourse?.id) return;
    if (courseAssignData?.isCourseAssigned) return;
    return setIsAssignPopUpOpen(true);
  }, [fullCourse]);

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
  return (
    <div
      className={`${style.course_header}`}
      style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' }}>
      <div className={`${style.gradient}`}>
        <span onClick={() => router?.back()} className={`${style.back_btn}`}>
          {/* <Link href={isPreview ? `/admin/courses/${fullCourse.id}` : ''}> */}
          {/* <a className={`${style.back_btn}`}> */}
          <img src="/images/bigarrowleft.png" alt="" />
          {/* </a> */}
          {/* </Link> */}
        </span>

        <div className={`${style.course_header_text}`}>
          <CourseHeader
            courseTitle={courseTitle}
            provisionedBy={provisionedBy}
            publishedBy={publishedBy}
            category={category}
            subCategory={subCategory}
            duration={duration?.toString()}
            isLoading={isLoading}
            isPreview={isPreview}
            isCourseAssigned={courseAssignData?.isCourseAssigned}
            isCourseUnassign={isCourseUnassign}
            handleUnAssign={() => setIsUnAssignPopUpOpen(true)}
            handleAssign={() => {
              if(userOrgData?.self_course_count >= COURSE_SELF_ASSIGN_LIMIT){
                return setToastMsg({ type: 'info', message: 'You have reached your self course assign limit!' });
              }
              setIsAssignPopUpOpen(true)}}
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
            <Info name="Expertise Level" data={expertiseLevel?.split(',').join(' | ')} />
          </div>

          <div className={`${style.course_big_button}`}>
            {courseAssignData?.isCourseAssigned ? (
              <button
                onClick={activateVideoPlayer}
                disabled={userCourseData?.allModules?.length === 0}>
                {userCourseData?.userCourseMapping?.course_status === 'started'
                  ? 'Continue'
                  : 'Start'}{' '}
                the course
              </button>
            ) : (
              <button onClick={showPreviewVideo}>Preview the course</button>
            )}
          </div>
          <div className={`${style.suggested_completion}`}>
            <p>
              {isLoading ? (
                <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={20} width={400} />
              ) : (
                `** Suggested duration for completion of this course is ${suggestedDuration} day${
                  suggestedDuration > 1 ? 's' : ''
                }`
              )}
              <br />
              {userCourseData?.userCourseMapping?.end_date &&
                `The course completion date is ${displayUnixDate(
                  userCourseData?.userCourseMapping?.end_date
                )}`}
            </p>
          </div>

          <div className={`${style.more_info}`}>
            <Info name="Prerequisites" data={prequisites?.join(', ')} />
            <Info name="Good for" data={goodFor?.join(', ')} />
            <Info name="Must for" data={mustFor?.join(', ')} />
          </div>
        </div>

        {courseAssignData?.isCourseAssigned && (
          <div className={`${style.actionIcons}`}>
            {/* <div>
            <img src="/images/plus.png" />
            Share
          </div> */}
            {/* <div>
            <img src="/images/plus.png" />
            Feedback
          </div> */}
            {/* <div>
            <img src="/images/plus.png" />
            Enquire
          </div> */}
            <div onClick={showPreviewVideo}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.11 3 19 3ZM19 19H5V7H19V19ZM12 10.5C13.84 10.5 15.48 11.46 16.34 13C15.48 14.54 13.84 15.5 12 15.5C10.16 15.5 8.52 14.54 7.66 13C8.52 11.46 10.16 10.5 12 10.5ZM12 9C9.27 9 6.94 10.66 6 13C6.94 15.34 9.27 17 12 17C14.73 17 17.06 15.34 18 13C17.06 10.66 14.73 9 12 9ZM12 14.5C11.17 14.5 10.5 13.83 10.5 13C10.5 12.17 11.17 11.5 12 11.5C12.83 11.5 13.5 12.17 13.5 13C13.5 13.83 12.83 14.5 12 14.5Z"
                  fill="#C4C4C4"
                />
              </svg>
              Preview
            </div>
          </div>
        )}
      </div>

      {/* <PopUp
        popUpState={[isAssignPopUpOpen, setIsAssignPopUpOpen]}
        size="small"
        title="Assign Course To Yourself"
        positionLeft="50%"
        submitBtn={{ handleClick: assignCourseToUser }}>
        <div className={`${style.assignCoursePopUp}`}>
          <section>
            <label htmlFor="endDate">Course End Date:</label>
            <InputDatePicker
              selectedDate={courseAssignData?.endDate}
              changeHandler={(date) => {
                setIsPopUpDataPresent(true);
                setCourseAssignData({ ...courseAssignData, endDate: date });
              }}
            />
          </section>

          <LabeledRadioCheckbox
            type="checkbox"
            label="Is Mandatory"
            name="isMandatory"
            isChecked={courseAssignData?.isMandatory}
            changeHandler={(e) =>
              setCourseAssignData({ ...courseAssignData, isMandatory: e.target.checked })
            }
          />
        </div>
      </PopUp> */}
      <PopUp
        // title="Course Mapping Configuration"
        // submitBtn={{ handleClick: handleSubmit }}
        popUpState={[isAssignPopUpOpen, setIsAssignPopUpOpen]}
        // size="smaller"
        customStyles={{ width: '400px' }}
        isFooterVisible={false}
        positionLeft="50%">
        <div className={`${style.assignCoursePopUp}`}>
          <p className={`${style.assignCoursePopUpTitle}`}>Course Mapping Configuration</p>
          <LabeledRadioCheckbox
            type="checkbox"
            label="Course Mandatory"
            name="isMandatory"
            isChecked={courseAssignData?.isMandatory}
            changeHandler={(e) =>
              setCourseAssignData({ ...courseAssignData, isMandatory: e.target.checked })
            }
          />
          <section>
            <p htmlFor="endDate">Expected Completion date:</p>
            <InputDatePicker
              minDate={new Date()}
              selectedDate={courseAssignData?.endDate}
              changeHandler={(date) => {
                setIsPopUpDataPresent(true);
                setCourseAssignData({ ...courseAssignData, endDate: date });
              }}
              styleClass={style.dataPickerStyle}
            />
          </section>
          <div className={`${style.assignCourseButtonContainer}`}>
            <UserButton
              text={'Cancel'}
              isPrimary={false}
              type={'button'}
              clickHandler={() => {
                setIsAssignPopUpOpen(false);
                setCourseAssignData({ ...courseAssignData, endDate: new Date() });
              }}
            />
            <UserButton
              text={'Save'}
              type={'button'}
              clickHandler={() => {
                assignCourseToUser();
              }}
            />
          </div>
        </div>
      </PopUp>
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
            handleClickRight: () => setIsUnAssignPopUpOpen(false)
          }}
        />
      )}
    </div>
  );
}
