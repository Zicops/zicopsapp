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
          {courseAssignData?.isCourseAssigned && <div onClick={showPreviewVideo}>Preview</div>}
        </div>
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
