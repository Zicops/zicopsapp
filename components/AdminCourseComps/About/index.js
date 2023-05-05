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
  CourseMetaDataAtom,
} from '@/state/atoms/courses.atom';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { courseTabs } from '../Logic/adminCourseComps.helper';
import useHandleCourseData from '../Logic/useHandleCourseData';
import NextBtn from '../NextBtn';
import styles from '../adminCourseComps.module.scss';
import BulletPointInput from './BulletPointInput';
import useHandleTrainerData from '@/components/TrainingManagementComps/Logic/useHandleTrainerData';

export default function About() {
  const { error, isDisabled } = useRecoilValue(CourseCurrentStateAtom);
  const courseMetaData = useRecoilValue(CourseMetaDataAtom);
  const [classroomMaster, setClassroomMaster] = useRecoilState(ClassroomMasterAtom);
  const {
    handleCourseMetaChange,
    getTrainersAndModerators,
    handleClassroomMasterChange,
    moderatorCandidates,
  } = useHandleCourseData();

  const { getPaginatedTrainers } = useHandleTrainerData();

  const [title, settitle] = useState('');
  const [typeMOderator, settypeModerator] = useState('internal');

  useEffect(() => {
    if (moderatorCandidates?.length) return;

    getTrainersAndModerators().catch((err) => console.log(err));
  }, []);

  const [trainersList, setTrainersList] = useState([]);

  useEffect(() => {
    getPaginatedTrainers()?.then((data) => {
      setTrainersList(data || []);
    });
  }, []);

  function showDropdown(title) {
    if (title === '') return <></>;
    const obj = dropDown?.find((data) => data.title === title);
    return obj.component;
  }

  let trainers = trainersList?.map(getUserListObject);
  let moderators = moderatorCandidates?.map(getUserListObject);

  function getUserListObject(user) {
    return {
      name: user?.first_name + ' ' + user?.last_name,
      isSelected: false,
      email: user?.email,
      user_id: user?.id,
      photo: user?.photo_url,
    };
  }

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
      ),
    },
  ];

  const isClassroomCourse = courseMetaData?.type === COURSE_TYPES.classroom;

  const customDropdownStyleObj = {
    placeholderStyles: { color: '#747474' },
    optionStyles: {
      background: 'var(--black)',
      color: 'var(--white)',
      '&:hover': {
        background: styles.darkTwo,
      },
    },
    // menuStyles: { background: 'var(--red)' },
    // dropdownIndicatorStyles: {
    //   color: 'var(--white)',
    //   '&:hover': {
    //     svg: { fill: 'var(--background_body)' }
    //   }
    // }
  };

  return (
    <>
      <div className={`${styles.aboutHead}`}>Course overview</div>
      {!!isClassroomCourse && (
        <>
          <div className={` ${styles.twoColumnDisplay} ${styles.marginBetweenInputs}`}>
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
                    label: (
                      <div className={`${styles.trainerOptions}`}>
                        {/*<div>
                          <LabeledRadioCheckbox type="checkbox" />
                        </div>*/}
                        <div className={`${styles.trainerImage}`}>
                          <img src={trainee.photo} />
                        </div>
                        <div className={`${styles.nameEmailTrainer}`}>
                          <p>{trainee.name}</p>
                          <p className={`${styles.email}`}>{trainee.email}</p>
                        </div>
                      </div>
                    ),
                    value: trainee.name,
                    ...trainee,
                  })),
                  // options: Trainers?.map((trainee) => ({ label: trainee, value: trainee })),
                  value: !!classroomMaster?.trainers?.length
                    ? classroomMaster?.trainers?.map((trainee) => ({
                        label: trainee?.value,
                        value: trainee?.value,
                        ...trainee,
                      }))
                    : null,
                  isDisabled: isDisabled || classroomMaster?.isTrainerdecided,
                }}
                isFullWidth={true}
                changeHandler={(e) =>
                  handleClassroomMasterChange({
                    trainers: e?.map((item, index) => ({
                      value: item?.value,
                      email: item?.email,
                      user_id: item?.user_id,
                    })),
                  })
                }
                isLoading={trainersList == null}
                customDropdownStyles={customDropdownStyleObj}
              />

              <LabeledRadioCheckbox
                type="checkbox"
                label={'To be Decided'}
                isDisabled={classroomMaster?.isBooking}
                isChecked={classroomMaster?.isTrainerdecided}
                changeHandler={(e) => {
                  handleClassroomMasterChange({ isTrainerdecided: e?.target?.checked });
                }}
              />
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
                    label: (
                      <div className={`${styles.trainerOptions}`}>
                        {/*<div>
                        <LabeledRadioCheckbox type="checkbox" />
                      </div>*/}
                        <div className={`${styles.trainerImage}`}>
                          <img src={mod.photo} />
                        </div>
                        <div>
                          <p>{mod.name}</p>
                          <p>{mod.email}</p>
                        </div>
                      </div>
                    ),
                    value: mod?.name,
                    ...mod,
                  })),
                  value: !!classroomMaster?.moderators?.length
                    ? classroomMaster?.moderators?.map((mod) => ({
                        label: mod?.value,
                        value: mod?.value,
                        ...mod,
                      }))
                    : null,
                  isDisabled: isDisabled || classroomMaster?.isModeratordecided,
                }}
                isLoading={moderatorCandidates == null}
                isFullWidth={true}
                changeHandler={(e) =>
                  handleClassroomMasterChange({
                    moderators: e?.map((item, index) => ({
                      value: item?.value,
                      email: item?.email,
                      user_id: item?.user_id,
                    })),
                  })
                }
                customDropdownStyles={customDropdownStyleObj}
                isDisplayButton={true}
              />

              <LabeledRadioCheckbox
                type="checkbox"
                label={'To be Decided'}
                isDisabled={classroomMaster?.isBooking}
                isChecked={classroomMaster?.isModeratordecided}
                changeHandler={(e) => {
                  handleClassroomMasterChange({
                    isModeratordecided: e?.target?.checked,
                    moderators: [],
                  });
                }}
              />
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
                isDisabled={isDisabled || classroomMaster?.isStartDatedecided}
              />

              <LabeledRadioCheckbox
                type="checkbox"
                label="To be Decided"
                isDisabled={classroomMaster?.isBooking}
                isChecked={classroomMaster?.isStartDatedecided}
                changeHandler={(e) => {
                  handleClassroomMasterChange({
                    isStartDatedecided: e?.target?.checked,
                    courseStartDate: null,
                  });
                }}
              />
            </div>
            <div>
              <label>Course End date :</label>
              <InputDatePicker
                selectedDate={classroomMaster?.courseEndDate}
                minDate={
                  classroomMaster?.courseStartDate ? classroomMaster?.courseStartDate : new Date()
                }
                changeHandler={(date) => {
                  handleClassroomMasterChange({ courseEndDate: date });
                }}
                isDisabled={isDisabled || classroomMaster?.isEndDatedecided}
              />

              <LabeledRadioCheckbox
                type="checkbox"
                label="To be Decided"
                isDisabled={classroomMaster?.isBooking}
                isChecked={classroomMaster?.isEndDatedecided}
                changeHandler={(e) => {
                  handleClassroomMasterChange({
                    isEndDatedecided: e?.target?.checked,
                    courseEndDate: null,
                  });
                }}
              />
            </div>
          </div>

          {/*  course and learning duration */}
          <div className={`${styles.twoColumnDisplay} ${styles.marginBetweenInputs}`}>
            <LabeledInput
              inputOptions={{
                inputName: 'name',
                label: (
                  <>
                    Total Duration : <small>(In Days)</small>
                  </>
                ),
                placeholder: 'Auto pupulated',
                value:
                  moment(classroomMaster?.courseEndDate).diff(
                    classroomMaster?.courseStartDate,
                    'day',
                  ) || 0,
                isDisabled: true,
              }}
              isColumnWise={true}
            />

            <div>
              <LabeledInput
                inputOptions={{
                  inputName: 'name',
                  label: (
                    <>
                      Learning Duration : <small> (In Minutes)</small>
                    </>
                  ),
                  placeholder: 'Auto populated',
                  value: Math.floor((courseMetaData?.duration || 0) / 60),
                  isDisabled: true,
                }}
                isColumnWise={true}
              />
              <div className={`${styles.durationDiscription}`}>
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
          isDisabled: isDisabled,
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

      <NextBtn switchTabName={courseTabs?.topics?.name} />
    </>
  );
}
