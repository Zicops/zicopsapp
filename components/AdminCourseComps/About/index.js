import InputDatePicker from '@/common/InputDatePicker';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import RTE from '@/components/common/FormComponents/RTE';
import { COURSE_TYPES } from '@/constants/course.constants';
import { CourseCurrentStateAtom, CourseMetaDataAtom } from '@/state/atoms/courses.atom';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styles from '../adminCourseComps.module.scss';
import useHandleCourseData from '../Logic/useHandleCourseData';
import NextBtn from '../NextBtn';
import AddTrainerPopUp from './AddTrainerPopUp';
import BulletPointInput from './BulletPointInput';

export default function About() {
  const { error, isDisabled } = useRecoilValue(CourseCurrentStateAtom);
  const courseMetaData = useRecoilValue(CourseMetaDataAtom);
  const { handleChange } = useHandleCourseData();

  const [title, settitle] = useState('');
  const [typeMOderator, settypeModerator] = useState('internal');

  function showDropdown(title) {
    if (title === '') return <></>;
    const obj = dropDown?.find((data) => data?.title === title);
    return obj?.component;
  }
  const [showPopUp, setShowPoup] = useState(false);
  // function showPopup(title) {
  //   if (title === '') return <></>;
  //   const obj = Popup.find((objTitle) => objTitle.title === title);
  //   return obj?.component;
  // }
  // const listModerator = ["internal", "Externar"]

  const Popup = [
    {
      title: 'addTrainer',
      component: <AddTrainerPopUp />
    }
  ];
  const Trainers = [
    {
      name: 'sandeep',
      isSelected: false
    },
    {
      name: 'XYZ',
      isSelected: false
    },
    {
      name: 'ABC',
      isSelected: false
    }
  ];
  const Moderators = [
    {
      name: 'sandeep1',
      isSelected: false
    },
    {
      name: 'XYZ1',
      isSelected: false
    },
    {
      name: 'ABC1',
      isSelected: false
    }
  ];
  const dropDown = [
    {
      title: 'dropdown',
      component: (
        <div className={`${styles.droper}`}>
          <button
            onClick={() => {
              settypeModerator('internal');
              title === 'dropdown' ? settitle('') : settitle('dropdown');
            }}>
            internal
          </button>
          <button
            onClick={() => {
              settypeModerator('Externar');
              title === 'dropdown' ? settitle('') : settitle('dropdown');
            }}>
            External
          </button>
        </div>
      )
    }
  ];

  const isClassroomCourse = courseMetaData?.type === COURSE_TYPES.classroom;

  return (
    <>
      <div className={`${styles.aboutHead}`}>Course overview</div>
      {!!isClassroomCourse && (
        <>
          <div
            className={`${styles.aboutInputTrainerModerator} ${styles.twoColumnDisplay} ${styles.marginBetweenInputs}`}>
            <div className={`${styles.aboutTrainer}`}>
              <lable>Trainer :</lable>
              <LabeledDropdown
                dropdownOptions={{
                  inputName: 'Trainers',
                  placeholder: 'Select or add trainer',
                  isSearchEnable: true,
                  menuPlacement: 'bottom',
                  isMulti: true,
                  options: Trainers?.map((trainee, index) => ({
                    label: trainee.name,
                    value: trainee.name
                  })),
                  // options: Trainers?.map((trainee) => ({ label: trainee, value: trainee })),
                  value: !!courseMetaData?.Trainers?.length
                    ? courseMetaData?.Trainers?.map((trainee) => ({
                        label: trainee,
                        value: trainee
                      }))
                    : null,
                  isDisabled: isDisabled
                }}
                isFullWidth={true}
                changeHandler={(e) =>
                  handleChange({ Trainers: e?.map((item, index) => item?.value) })
                }
              />
              <div className={`${styles.aboutCheckbox}`}>
                <LabeledRadioCheckbox
                  type="checkbox"
                  label={''}
                  value={''}
                  isChecked={''}
                  isDisabled={isDisabled}
                  // changeHandler={}
                />
                <label>To be Decided</label>
              </div>
            </div>
            <div className={`${styles.aboutModerator}`}>
              <div className={`${styles.aboutTrainerType}`}>
                <lable>Moderator :</lable>
                <div className={`${styles.moderatorDropdown}`}>
                  <div>{typeMOderator}</div>
                  <button
                    className={`${styles.changeModeratorbtn}`}
                    onClick={() => {
                      title === 'dropdown' ? settitle('') : settitle('dropdown');
                    }}>
                    <img src="/images/svg/adminCourse/unfold-more.svg" />
                  </button>
                  <>{showDropdown(title)}</>
                </div>
              </div>
              <LabeledDropdown
                dropdownOptions={{
                  inputName: 'percentage',
                  placeholder: 'Select or add moderator',
                  isSearchEnable: true,
                  menuPlacement: 'bottom',
                  isMulti: true,
                  options: Moderators?.map((mod, index) => ({ label: mod.name, value: mod.name })),
                  // options: Moderators?.map((trainee) => ({ label: trainee, value: trainee })),
                  value: !!courseMetaData?.Moderators?.length
                    ? courseMetaData?.Moderators?.map((mod) => ({ label: mod, value: mod }))
                    : null,
                  isDisabled: isDisabled
                }}
                isFullWidth={true}
                changeHandler={(e) =>
                  handleChange({ Moderators: e?.map((item, index) => item?.value) })
                }
              />
              <div className={`${styles.aboutCheckbox}`}>
                <LabeledRadioCheckbox
                  type="checkbox"
                  label={''}
                  value={''}
                  isChecked={''}
                  isDisabled={isDisabled}
                  // changeHandler={}
                />
                <label>To be Decided</label>
              </div>
            </div>
          </div>

          <div
            className={`${styles.aboutDatePicker} ${styles.twoColumnDisplay} ${styles.marginBetweenInputs}`}>
            <div>
              <label>Course Start date :</label>
              <InputDatePicker
                //   selectedDate={examTabData?.exam_start}
                minDate={new Date()}
                //   changeHandler={(date) => {
                //     const startDate = updateDate(date, examTabData?.exam_start);

                //     const isNewDateAfterEnd = startDate > examTabData?.exam_end;

                //     setExamTabData({
                //       ...examTabData,
                //       exam_start: startDate,
                //       exam_end: isNewDateAfterEnd ? getTimeWithDuration(startDate) : examTabData?.exam_end
                //     });
                //   }}
                //   isDisabled={isPreview}
                isDisabled={isDisabled}
                styleClass={`${styles.datePicker}`}
              />
              <div className={`${styles.aboutCheckbox}`}>
                <LabeledRadioCheckbox
                  type="checkbox"
                  label={''}
                  value={''}
                  isChecked={''}
                  isDisabled={isDisabled}
                  // changeHandler={}
                />
                <label>To be Decided</label>
              </div>
            </div>
            <div>
              <label>Course end date :</label>
              <InputDatePicker
                //   selectedDate={examTabData?.exam_start}
                minDate={new Date()}
                //   changeHandler={(date) => {
                //     const startDate = updateDate(date, examTabData?.exam_start);

                //     const isNewDateAfterEnd = startDate > examTabData?.exam_end;

                //     setExamTabData({
                //       ...examTabData,
                //       exam_start: startDate,
                //       exam_end: isNewDateAfterEnd ? getTimeWithDuration(startDate) : examTabData?.exam_end
                //     });
                //   }}
                //   isDisabled={isPreview}
                isDisabled={isDisabled}
                styleClass={`${styles.datePicker}`}
              />
              <div className={`${styles.aboutCheckbox}`}>
                <LabeledRadioCheckbox
                  type="checkbox"
                  label={''}
                  value={''}
                  isChecked={''}
                  isDisabled={isDisabled}
                  // changeHandler={}
                />
                <label>To be Decided</label>
              </div>
            </div>
          </div>

          <div
            className={`${styles.totalDurationLable} ${styles.twoColumnDisplay} ${styles.marginBetweenInputs}`}>
            <div>
              <label className={`${styles.durationLabel}`}>Total Duration :</label>
              <LabeledInput
                inputOptions={{
                  inputName: 'name',
                  // label: 'Total Duration:',
                  placeholder: 'Auto pupulated',
                  value: '',
                  isDisabled: isDisabled
                }}
                styleClass={`${styles.inputName1}`}
                // changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
              />
            </div>
            <div>
              <label className={`${styles.durationLabel}`}>Learning Duration :</label>
              <LabeledInput
                inputOptions={{
                  inputName: 'name',
                  // label:'Learning Duration:',
                  placeholder: 'Auto populated',
                  value: '',
                  isDisabled: isDisabled
                }}
                styleClass={`${styles.inputName1}`}
                // changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
              />
              <div className={`${styles.durationDiscription}`}>
                {' '}
                *Completed by the system ones the topic is added
              </div>
            </div>
          </div>
        </>
      )}

      {/* description */}
      <LabeledTextarea
        isError={!courseMetaData?.description?.length && error?.includes('description')}
        inputOptions={{
          label: 'Course Description :',
          placeholder: 'Enter course discription',
          rows: 5,
          maxLength: 160,
          value: courseMetaData?.description,
          isDisabled: isDisabled
        }}
        styleClass={`${styles.makeLabelInputColumnWise}`}
        changeHandler={(e) => handleChange({ description: e?.target?.value })}
      />

      {/* outcomes */}
      <div className={`${styles.makeLabelInputColumnWise} ${styles.marginBetweenInputs}`}>
        <label>Course Outcomes :</label>

        <BulletPointInput
          placeholder="Enter course outcomes"
          name="outcomes"
          isError={!courseMetaData?.outcomes?.length && error?.includes('outcomes')}
          isDisabled={isDisabled}
        />
      </div>

      {/* course highlights */}
      <div className={`${styles.makeLabelInputColumnWise} ${styles.marginBetweenInputs}`}>
        <label>Course Highlights :</label>

        <BulletPointInput
          placeholder="Enter course Highlights"
          name="benefits"
          isError={!courseMetaData?.benefits?.length && error?.includes('benefits')}
          isDisabled={isDisabled}
        />
      </div>

      {/* prequisites and relatedSkills*/}
      <div className={` ${styles.twoColumnDisplay} ${styles.marginBetweenInputs}`}>
        <div>
          <label>Pre-requisites:</label>

          <BulletPointInput
            placeholder="Enter course Highlights"
            name="prequisites"
            isError={!courseMetaData?.prequisites?.length && error?.includes('prequisites')}
            isDisabled={isDisabled}
          />
        </div>
        <div>
          <label>Related skills:</label>

          <BulletPointInput
            placeholder="Enter course Highlights"
            name="relatedSkills"
            isError={!courseMetaData?.relatedSkills?.length && error?.includes('relatedSkills')}
            isDisabled={isDisabled}
          />
        </div>
      </div>

      {/* good for and must for */}
      <div className={`${styles.twoColumnDisplay} ${styles.marginBetweenInputs}`}>
        <div>
          <label>Good for:</label>

          <BulletPointInput
            placeholder="Add good for and press enter"
            name="goodFor"
            isError={!courseMetaData?.goodFor?.length && error?.includes('goodFor')}
            isDisabled={isDisabled}
          />
        </div>

        <div>
          <label>Must for:</label>

          <BulletPointInput
            placeholder="Add must for and press enter"
            name="mustFor"
            isError={!courseMetaData?.mustFor?.length && error?.includes('mustFor')}
            isDisabled={isDisabled}
          />
        </div>
      </div>

      {!!isClassroomCourse && (
        <div className={`${styles.aboutCurriculum}`}>
          <div>
            <label>Curriculum:</label>
            <RTE
              changeHandler={(e) => {
                // if (examId && examTabData?.id !== examId) return;
                // if (!examId && examTabData?.id) return;
                // setExamTabData({ ...examTabData, instructions: e });
                handleChange({ Curriculum: e?.target?.value });
              }}
              isReadOnly={isDisabled}
              placeholder="Enter instructions in less than 300 characters."
              value={courseMetaData?.Curriculum}
            />
          </div>
        </div>
      )}
      {showPopUp && <AddTrainerPopUp showPopUp={showPopUp} setShowPopUp={setShowPoup}/>}

      <button
        onClick={() => {
          setShowPoup(true);
        }}>
        ShowPopUp
      </button>
      <NextBtn />
    </>
  );
}
