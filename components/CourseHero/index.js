import { Skeleton } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { truncateToN } from '../../helper/common.helper';
import { isLoadingAtom } from '../../state/atoms/module.atoms';
import { courseContext } from '../../state/contexts/CourseContext';
import LabeledRadioCheckbox from '../common/FormComponents/LabeledRadioCheckbox';
import InputDatePicker from '../common/InputDatePicker';
import PopUp from '../common/PopUp';
import { IsDataPresentAtom } from '../common/PopUp/Logic/popUp.helper';
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
    showPreviewVideo
  } = useHandleCourseHero();

  const isLoading = useRecoilValue(isLoadingAtom);
  const [isPopUpDataPresent, setIsPopUpDataPresent] = useRecoilState(IsDataPresentAtom);

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
    owner: provisionedBy
  } = fullCourse;

  return (
    <div
      className={`${style.course_header}`}
      style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' }}>
      <div className={`${style.gradient}`}>
        <span onClick={() => (isPreview ? '' : router?.back())}>
          <Link href={isPreview ? `/admin/courses/${fullCourse.id}` : ''}>
            <a className={`${style.back_btn}`}>
              <img src="/images/bigarrowleft.png" alt="" />
            </a>
          </Link>
        </span>

        <div className={`${style.course_header_text}`}>
          <CourseHeader
            courseTitle={courseTitle}
            provisionedBy={provisionedBy}
            category={category}
            subCategory={subCategory}
            duration={duration?.toString()}
            isLoading={isLoading}
            isPreview={isPreview}
            isCourseAssigned={courseAssignData?.isCourseAssigned}
            handleAssign={() => setIsAssignPopUpOpen(true)}
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
              <button onClick={activateVideoPlayer}>
                {courseAssignData?.isCourseAssigned ? 'Start' : 'Continue'} the course
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
                `** Suggested duration for completion of this course is ${duration?.toString()}`
              )}
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

      <PopUp
        popUpState={[isAssignPopUpOpen, setIsAssignPopUpOpen]}
        size="small"
        title="Assign Course To Yourself"
        positionLeft="50%"
        submitBtn={{ handleClick: assignCourseToUser }}>
        <div className={`${style.assignCoursePopUp}`}>
          <section>
            <label htmlFor="endDate">Exam End Date:</label>
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
      </PopUp>
    </div>
  );
}
