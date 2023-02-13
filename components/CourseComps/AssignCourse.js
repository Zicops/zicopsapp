// components\CourseComps\AssignCourse.js

import { useRecoilState } from 'recoil';
import LabeledRadioCheckbox from '../common/FormComponents/LabeledRadioCheckbox';
import InputDatePicker from '../common/InputDatePicker';
import PopUp from '../common/PopUp';
import { IsDataPresentAtom } from '../common/PopUp/Logic/popUp.helper';
import UserButton from '../common/UserButton';
import styles from './courseComps.module.scss';
import { getCourseAssignDataObj, getMinCourseAssignDate } from './Logic/courseComps.helper';
import useHandleCourseAssign from './Logic/useHandleCourseAssign';

export default function AssignCourse({
  isAssignPopUpOpen,
  setIsAssignPopUpOpen,
  suggestedCompletionDays = 1,
  assignBy = 'self',
  courseId = null,
  courseType = null,
  popUpProps = {},
  onCourseAssign = () => {},
  courseName = null,
  userDetails = {},
  lspId = null
}) {
  const [isPopUpDataPresent, setIsPopUpDataPresent] = useRecoilState(IsDataPresentAtom);

  const dataForCourseAssign = {
    courseId,
    courseType,
    assignBy,
    isAssignPopUpOpen,
    setIsAssignPopUpOpen,
    onCourseAssign,
    suggestedCompletionDays: suggestedCompletionDays || null,
    courseName,
    lspId,
    ...userDetails
  };

  const { courseAssignData, setCourseAssignData, assignCourseToUser, isSaveDisabled } =
    useHandleCourseAssign(dataForCourseAssign);

  return (
    <>
      <PopUp
        {...popUpProps}
        onClose={() => {
          if (popUpProps?.onClose) popUpProps?.onClose();

          setCourseAssignData(
            getCourseAssignDataObj({
              courseId,
              courseType,
              endDate: getMinCourseAssignDate(suggestedCompletionDays)
            })
          );
        }}
        popUpState={[isAssignPopUpOpen, setIsAssignPopUpOpen]}
        customStyles={{ width: '400px' }}
        isFooterVisible={false}
        closeBtn={{ disabled: isSaveDisabled }}
        positionLeft="50%">
        <div className={`${styles.assignCoursePopUp}`}>
          <p className={`${styles.assignCoursePopUpTitle}`}>Assign Course</p>

          <LabeledRadioCheckbox
            type="checkbox"
            label="Course Mandatory"
            name="isMandatory"
            isChecked={courseAssignData?.isMandatory}
            changeHandler={(e) => {
              setIsPopUpDataPresent(true);
              setCourseAssignData({ ...courseAssignData, isMandatory: e.target.checked });
            }}
          />
          <section>
            <p htmlFor="endDate">Expected Completion Date:</p>
            <InputDatePicker
              minDate={getMinCourseAssignDate()}
              selectedDate={courseAssignData?.endDate}
              changeHandler={(date) => {
                setIsPopUpDataPresent(true);
                setCourseAssignData({ ...courseAssignData, endDate: date });
              }}
              styleClass={styles.dataPickerStyle}
            />
          </section>

          <div className={`${styles.assignCourseButtonContainer}`}>
            <UserButton
              text={'Cancel'}
              isPrimary={false}
              type={'button'}
              isDisabled={isSaveDisabled}
              clickHandler={() => setIsAssignPopUpOpen(false)}
            />
            <UserButton
              text={'Save'}
              type={'button'}
              isDisabled={isSaveDisabled || !courseAssignData?.endDate}
              clickHandler={() => assignCourseToUser()}
            />
          </div>
        </div>
      </PopUp>
    </>
  );
}
