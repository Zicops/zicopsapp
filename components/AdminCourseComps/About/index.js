import InputDatePicker from '@/common/InputDatePicker';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import RTE from '@/components/common/FormComponents/RTE';
import { COURSE_TYPES } from '@/constants/course.constants';
import {
  ClassroomMasterAtom,
  CourseCurrentStateAtom,
  CourseMetaDataAtom
} from '@/state/atoms/courses.atom';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import useHandleCourseData from '../Logic/useHandleCourseData';
import NextBtn from '../NextBtn';
import styles from '../adminCourseComps.module.scss';
import BulletPointInput from './BulletPointInput';

export default function About() {
  const { error, isDisabled } = useRecoilValue(CourseCurrentStateAtom);
  const courseMetaData = useRecoilValue(CourseMetaDataAtom);
  const [classroomMaster, setClassroomMaster] = useRecoilState(ClassroomMasterAtom);
  const {
    handleCourseMetaChange,
    getTrainersAndModerators,
    handleClassroomMasterChange,
    trainerCandidates,
    moderatorCandidates
  } = useHandleCourseData();

  const [title, settitle] = useState('');
  const [typeMOderator, settypeModerator] = useState('internal');

  useEffect(() => {
    if (trainerCandidates?.length && moderatorCandidates?.length) return;

    getTrainersAndModerators().catch((err) => console.log(err));
  }, []);

  function showDropdown(title) {
    if (title === '') return <></>;
    const obj = dropDown?.find((data) => data.title === title);
    return obj.component;
  }
  // const listModerator = ["internal", "Externar"]
  // let Trainers = [
  //   {
  //     name: 'sandeep',
  //     isSelected: false
  //   },
  //   {
  //     name: 'XYZ',
  //     isSelected: false
  //   },
  //   {
  //     name: 'ABC',
  //     isSelected: false
  //   }
  // ];

  let trainers = trainerCandidates?.map(getUserListObject);
  let moderators = moderatorCandidates?.map(getUserListObject);

  function getUserListObject(user) {
    return {
      name: user?.full_name,
      isSelected: false,
      email: user?.email,
      user_id: user?.id
    };
  }
  // const Moderators = [
  //   {
  //     name: 'sandeep1',
  //     isSelected: false
  //   },
  //   {
  //     name: 'XYZ1',
  //     isSelected: false
  //   },
  //   {
  //     name: 'ABC1',
  //     isSelected: false
  //   }
  // ];
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
            Internal
          </button>
          <button
            onClick={() => {
              settypeModerator('External');
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
                  options: trainers?.map((trainee, index) => ({
                    label: trainee.name,
                    value: trainee.name,
                    ...trainee
                  })),
                  // options: Trainers?.map((trainee) => ({ label: trainee, value: trainee })),
                  value: !!classroomMaster?.trainers?.length
                    ? classroomMaster?.trainers?.map((trainee) => ({
                        label: trainee?.value,
                        value: trainee?.value,
                        ...trainee
                      }))
                    : null,
                  isDisabled: isDisabled
                }}
                isFullWidth={true}
                changeHandler={(e) =>
                  handleClassroomMasterChange({
                    trainers: e?.map((item, index) => ({
                      value: item?.value,
                      email: item?.email,
                      user_id: item?.user_id
                    }))
                  })
                }
                isLoading={trainerCandidates == null}
              />
              <div className={`${styles.aboutCheckbox}`}>
                <LabeledRadioCheckbox
                  type="checkbox"
                  label={''}
                  // value={''}
                  isChecked={classroomMaster?.isTrainerdecided}
                  // isDisabled={''}
                  changeHandler={(e) => {
                    handleClassroomMasterChange({ isTrainerdecided: e?.target?.checked });
                  }}
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
                  options: moderators?.map((mod, index) => ({
                    label: mod?.name,
                    value: mod?.name,
                    ...mod
                  })),
                  // options: Moderators?.map((trainee) => ({ label: trainee, value: trainee })),
                  value: !!classroomMaster?.moderators?.length
                    ? classroomMaster?.moderators?.map((mod) => ({
                        label: mod?.value,
                        value: mod?.value,
                        ...mod
                      }))
                    : null,
                  isDisabled: isDisabled
                }}
                isLoading={moderatorCandidates == null}
                isFullWidth={true}
                changeHandler={(e) =>
                  handleClassroomMasterChange({
                    moderators: e?.map((item, index) => ({
                      value: item?.value,
                      email: item?.email,
                      user_id: item?.user_id
                    }))
                  })
                }
              />
              <div className={`${styles.aboutCheckbox}`}>
                <LabeledRadioCheckbox
                  type="checkbox"
                  label={''}
                  // value={''}
                  isChecked={classroomMaster?.isModeratordecided}
                  // isDisabled={''}
                  changeHandler={(e) => {
                    handleClassroomMasterChange({ isModeratordecided: e?.target?.checked });
                  }}
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
                selectedDate={classroomMaster?.courseStartDate}
                minDate={new Date()}
                changeHandler={(date) => {
                  handleClassroomMasterChange({ courseStartDate: date });
                }}
                //   isDisabled={isPreview}
                isDisabled={isDisabled}
                styleClass={`${styles.datePicker}`}
              />
              <div className={`${styles.aboutCheckbox}`}>
                <LabeledRadioCheckbox
                  type="checkbox"
                  // value={isTrue}
                  isChecked={classroomMaster?.isStartDatedecided}
                  // isDisabled={''}
                  changeHandler={(e) => {
                    handleClassroomMasterChange({ isStartDatedecided: e?.target?.checked });
                  }}
                />
                <label>To be Decided</label>
              </div>
            </div>
            <div>
              <label>Course end date :</label>
              <InputDatePicker
                selectedDate={classroomMaster?.courseEndDate}
                minDate={
                  classroomMaster?.courseStartDate ? classroomMaster?.courseStartDate : new Date()
                }
                changeHandler={(date) => {
                  handleClassroomMasterChange({ courseEndDate: date });
                }}
                //   isDisabled={isPreview}
                isDisabled={isDisabled}
                styleClass={`${styles.datePicker}`}
              />
              <div className={`${styles.aboutCheckbox}`}>
                <LabeledRadioCheckbox
                  type="checkbox"
                  label={''}
                  // value={isTrue}
                  isChecked={classroomMaster?.isEndDatedecided}
                  // isDisabled={''}
                  changeHandler={(e) => {
                    console.log(e.target.checked, 'sd');
                    handleClassroomMasterChange({ isEndDatedecided: e?.target?.checked });
                  }}
                />
                <label>To be Decided</label>
              </div>
            </div>
          </div>

          <div
            className={`${styles.totalDurationLable} ${styles.twoColumnDisplay} ${styles.marginBetweenInputs}`}>
            <div>
              <label className={`${styles.durationLabel}`}>
                Total Duration : <small>(In Days)</small>
              </label>
              <LabeledInput
                inputOptions={{
                  inputName: 'name',
                  // label: 'Total Duration:',
                  placeholder: 'Auto pupulated',
                  value:
                    moment(classroomMaster?.courseEndDate).diff(
                      classroomMaster?.courseStartDate,
                      'day'
                    ) || 0,
                  isDisabled: true
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
                  value: courseMetaData?.duration,
                  isDisabled: true
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
        changeHandler={(e) => handleCourseMetaChange({ description: e?.target?.value })}
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
                setClassroomMaster((prev) => ({ ...prev, curriculum: e }));
              }}
              isReadOnly={isDisabled}
              placeholder="Enter instructions in less than 300 characters."
              value={classroomMaster?.curriculum}
            />
          </div>
        </div>
      )}

      <NextBtn />
    </>
  );
}
