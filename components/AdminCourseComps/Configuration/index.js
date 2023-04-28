import { UPDATE_COURSE_DATA } from '@/api/Mutations';
import ConfirmPopUp from '@/components/common/ConfirmPopUp';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import { COURSE_STATUS, COURSE_TYPES } from '@/constants/course.constants';
import { mutateData } from '@/helper/api.helper';
import { sanitizeFormData } from '@/helper/common.helper';
import { USER_LSP_ROLE } from '@/helper/constants.helper';
import { getUnixFromDate } from '@/helper/utils.helper';
import { CourseCurrentStateAtom, CourseMetaDataAtom } from '@/state/atoms/courses.atom';
import { FeatureFlagsAtom } from '@/state/atoms/global.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import styles from '../adminCourseComps.module.scss';
import DetailsBox from './DetailsBox';
import FreezeConfirmation from './FreezeConfirmation';
import SwitchBox from './SwitchBox';

export default function Configuration() {
  const setToastMessage = useRecoilCallback(({ set }) => (message = '', type = 'danger') => {
    set(ToastMsgAtom, { type, message });
  });
  const [courseCurrentState, setCourseCurrentState] = useRecoilState(CourseCurrentStateAtom);
  const [courseMetaData, setCourseMetaData] = useRecoilState(CourseMetaDataAtom);
  const userOrgData = useRecoilValue(UsersOrganizationAtom);
  const { isPublishCourseEditable } = useRecoilValue(FeatureFlagsAtom);

  const router = useRouter();

  const [freezeConfirmBox, setFreezeConfirmBox] = useState(null);
  const [showConfirmBox, setShowConfirmBox] = useState(null);
  const [unFreeze, setUnFreeze] = useState(null);

  const isVendor = userOrgData?.user_lsp_role?.toLowerCase()?.includes(USER_LSP_ROLE.vendor);
  const isClassroomCourse = courseMetaData?.type === COURSE_TYPES.classroom;

  const detailsInfo = [
    {
      id: 1,
      src: '/images/svg/adminCourse/edit-calendar.svg',
      head: 'Created on',
      detail: moment(+courseMetaData?.createdAt * 1000).format('lll'),
      displayForCourseTypes: Object.values(COURSE_TYPES),
    },
    {
      id: 2,
      src: '/images/svg/adminCourse/account-box.svg',
      head: 'Created By',
      detail: courseMetaData?.createdBy || 'NA',
      displayForCourseTypes: Object.values(COURSE_TYPES),
    },
    {
      id: 3,
      src: '/images/svg/adminCourse/edit-calendar.svg',
      head: 'Published on',
      detail: !!+courseMetaData?.publishDate
        ? moment(+courseMetaData?.publishDate * 1000).format('lll')
        : 'NA',
      displayForCourseTypes: Object.values(COURSE_TYPES).filter(
        (type) => type !== COURSE_TYPES.classroom,
      ),
    },
    {
      id: 4,
      src: '/images/svg/adminCourse/edit-calendar.svg',
      head: 'Live on',
      detail: !!+courseMetaData?.publishDate
        ? moment(+courseMetaData?.publishDate * 1000).format('lll')
        : 'NA',
      displayForCourseTypes: Object.values(COURSE_TYPES).filter(
        (type) => type !== COURSE_TYPES.classroom,
      ),
    },
    {
      id: 5,
      src: '/images/svg/adminCourse/event-available.svg',
      head: 'Published by',
      detail: '24.04.2023',
      detail: !!courseMetaData?.approvers?.[0]?.length ? courseMetaData?.approvers?.[0] : 'NA',
      displayForCourseTypes: Object.values(COURSE_TYPES).filter(
        (type) => type !== COURSE_TYPES.classroom,
      ),
    },
    {
      id: 6,
      src: '/images/svg/adminCourse/event-available.svg',
      head: 'Published for registration on',
      detail: '24.04.2023',
      displayForCourseTypes: [COURSE_TYPES.classroom],
    },
    {
      id: 7,
      src: '/images/svg/adminCourse/how-to-reg.svg',
      head: 'Published for registration by',
      detail: 'Harshad Gholap',
      displayForCourseTypes: [COURSE_TYPES.classroom],
    },
    {
      id: 8,
      src: '/images/svg/adminCourse/confirmation-number.svg',
      head: 'Published for booking on',
      detail: '26.04.2023',
      displayForCourseTypes: [COURSE_TYPES.classroom],
    },
    {
      id: 9,
      src: '/images/svg/adminCourse/publish.svg',
      head: 'Published for booking by',
      detail: 'ABC vendor',
      displayForCourseTypes: [COURSE_TYPES.classroom],
    },
    {
      id: 10,
      src: '/images/svg/adminCourse/event.svg',
      head: 'Registration start date',
      detail: '30.04.2023',
      displayForCourseTypes: [COURSE_TYPES.classroom],
    },
    {
      id: 11,
      src: '/images/svg/adminCourse/sensors.svg',
      head: 'Booking start date',
      detail: '28.04.2023',
      displayForCourseTypes: [COURSE_TYPES.classroom],
    },
    {
      id: 12,
      src: '/images/svg/adminCourse/event-busy.svg',
      head: 'Expired on',
      detail: !!+courseMetaData?.expiryDate
        ? moment(+courseMetaData?.expiryDate * 1000).format('lll')
        : 'NA',
      displayForCourseTypes: Object.values(COURSE_TYPES),
    },
  ];

  function getIsFreezeDisabled() {
    if (isPublishCourseEditable) return false;
    if ([COURSE_STATUS.publish, COURSE_STATUS.reject].includes(courseMetaData.status)) return true;
    if (isVendor && courseMetaData?.status === COURSE_STATUS.approvalPending) return true;

    return false;
  }

  return (
    <>
      {/* Freeze and expire*/}
      {!isClassroomCourse && (
        <>
          {/* freeze */}
          <div>
            <h4>Course Freeze</h4>

            <SwitchBox
              labeledInputProps={{
                label: 'Freeze',
                description:
                  'Once a course is frozen it is no longer editable and ready for approval/publishing',
                name: 'qaRequired',
                isDisabled: getIsFreezeDisabled(),
                isChecked: courseMetaData?.qaRequired || false,
                handleChange: (e) => {
                  const isFreeze = e.target.checked;
                  if (isFreeze) return setFreezeConfirmBox(true);

                  setUnFreeze(true);
                },
              }}
            />
          </div>

          {/* Expire */}
          {[COURSE_STATUS.publish, COURSE_STATUS.reject]?.includes(courseMetaData?.status) && (
            <div>
              <h4>Expire Course</h4>

              <SwitchBox
                labeledInputProps={{
                  label: 'Expire',
                  description: 'No one will be able to access the course after expiration',
                  name: 'expire',
                  isDisabled: courseMetaData?.status === COURSE_STATUS.reject,
                  isChecked: courseMetaData?.status === COURSE_STATUS.reject,
                  handleChange: () => setShowConfirmBox(true),
                }}
              />
            </div>
          )}
        </>
      )}

      {!!isClassroomCourse && (
        <>
          <div className={`${styles.configurationHead}`}>Genaral</div>
          <div className={`${styles.cofigurationSettingLabel}`}>
            these settings are applicable after completion of course
          </div>
          <div
            className={`${styles.configurationCourseContainer} ${styles.twoColumnDisplay} ${styles.marginBetweenInputs}`}>
            <div>
              <p>Course recording availble upto :</p>
              <LabeledDropdown
                dropdownOptions={{
                  inputName: 'percentage',
                  placeholder: 'Select no. of days',
                }}
              />
            </div>
            <div>
              <label>Course accessible to Learners upto : </label>
              <LabeledDropdown
                dropdownOptions={{
                  inputName: 'percentage',
                  placeholder: 'Select no. of days',
                }}
              />
            </div>
          </div>

          <div
            className={`${styles.configSettingContainer}  ${styles.marginBetweenInputs}  ${styles.twoColumnDisplay}`}>
            <div className={` ${styles.registrationBox}`}>
              <label>Registrations</label>
              <SwitchBox
                labeledInputProps={{
                  label: 'Open for registrations',
                  description: 'Once enabled, the course will be open for registrations',
                  name: 'qa_required',
                  // isDisabled: getIsFreezeDisabled(),
                  // isChecked: fullCourse?.qa_required || false,
                  // handleChange: (e) => {
                  //     const isFreeze = e.target.checked;
                  //     if (isFreeze) return setFreezeConfirmBox(true);

                  //     updateCourseMaster({ ...fullCourse, qa_required: isFreeze });
                  // }
                  // handleChange: () => setFreezeConfirmBox(true)
                }}
              />
            </div>
            <div className={` ${styles.bookingBox}`}>
              <label>Bookings</label>
              <SwitchBox
                labeledInputProps={{
                  label: 'Open for Bookings',
                  description: 'Once enabled, the course will be open for booking',
                  name: 'qa_required',
                  // isDisabled: getIsFreezeDisabled(),
                  // isChecked: fullCourse?.qa_required || false,
                  // handleChange: (e) => {
                  //     const isFreeze = e.target.checked;
                  //     if (isFreeze) return setFreezeConfirmBox(true);

                  //     updateCourseMaster({ ...fullCourse, qa_required: isFreeze });
                  // }
                  // handleChange: () => setFreezeConfirmBox(true)
                }}
              />
            </div>
          </div>
        </>
      )}

      {/* course details */}
      <p className={`${styles.configurationDetailHead}`}>Details</p>
      <div className={`${styles.configDetailContainer}`}>
        {detailsInfo.map((data) => {
          if (!data?.displayForCourseTypes?.includes(courseMetaData?.type)) return;

          return (
            <DetailsBox imgSrc={data.src} head={data.head} detail={data.detail} key={data.id} />
          );
        })}
      </div>

      {!!freezeConfirmBox && <FreezeConfirmation closePopUp={() => setFreezeConfirmBox(false)} />}

      {unFreeze && (
        <ConfirmPopUp
          title={'Are you sure about unfreezing this course?'}
          btnObj={{
            handleClickLeft: (e) => {
              const { duration, ..._courseData } = courseMetaData;
              const sendData = sanitizeFormData({
                ..._courseData,
                qaRequired: false,
                status: COURSE_STATUS.save,
              });

              e.currentTarget.disabled = true;
              mutateData(UPDATE_COURSE_DATA, sendData)
                .then(() => {
                  setCourseMetaData({ ...courseMetaData, qaRequired: false });
                  setCourseCurrentState({ ...courseCurrentState, isDisabled: false });
                })
                .catch((err) => setToastMessage('Course Unfreeze Error!'))
                .finally(() => setUnFreeze(false));
            },
            handleClickRight: () => setUnFreeze(false),
          }}
        />
      )}

      {showConfirmBox && (
        <ConfirmPopUp
          title={'Are you sure about expiring this course?'}
          btnObj={{
            handleClickLeft: (e) => {
              const { duration, ..._courseData } = courseMetaData;
              const sendData = sanitizeFormData({
                ..._courseData,
                status: COURSE_STATUS.reject,
                expiryDate: getUnixFromDate(),
              });

              e.currentTarget.disabled = true;
              mutateData(UPDATE_COURSE_DATA, sendData)
                .then(() => router.push('/admin/course/my-courses'))
                .catch(() => setToastMessage('Course Expire Error!'))
                .finally(() => setShowConfirmBox(false));
            },
            handleClickRight: () => setShowConfirmBox(false),
          }}
        />
      )}
    </>
  );
}
