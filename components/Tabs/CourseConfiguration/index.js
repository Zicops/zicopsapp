import { UPDATE_COURSE } from '@/api/Mutations';
import ConfirmPopUp from '@/components/common/ConfirmPopUp';
import { COURSE_STATUS, USER_LSP_ROLE } from '@/helper/constants.helper';
import { getUnixFromDate } from '@/helper/utils.helper';
import { FullCourseDataAtom, getFullCourseDataObj } from '@/state/atoms/course.atoms';
import { FeatureFlagsAtom } from '@/state/atoms/global.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { useMutation } from '@apollo/client';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import { courseContext } from '../../../state/contexts/CourseContext';
import RadioBox from '../common/RadioBox';
import SwitchBox from '../common/SwitchBox';
import styles from '../courseTabs.module.scss';
import { IsCourseSavedAtom, isCourseUploadingAtom } from '../Logic/tabs.helper';
import useHandleTabs from '../Logic/useHandleTabs';
import CourseDetailsTable from './CourseDetailsTable';
import FreezeConfirmation from './FreezeConfirmation';

export default function CourseConfiguration() {
  const [updateCourse, { loading: courseUploading }] = useMutation(UPDATE_COURSE);

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [isLoading, setIsLoading] = useRecoilState(isCourseUploadingAtom);
  const [isCourseSaved, setIsCourseSaved] = useRecoilState(IsCourseSavedAtom);
  const [fullCourseData, setFullCourseData] = useRecoilState(FullCourseDataAtom);
  const userOrgData = useRecoilValue(UsersOrganizationAtom);
  const { isPublishCourseEditable } = useRecoilValue(FeatureFlagsAtom);

  const courseContextData = useContext(courseContext);
  const [freezeConfirmBox, setFreezeConfirmBox] = useState(null);
  const [showConfirmBox, setShowConfirmBox] = useState(null);
  const [unFreeze, setUnFreeze] = useState(null);
  const [disableBtn, setDisableBtn] = useState(null);
  const router = useRouter();

  // useEffect(() => {
  //   setIsLoading(courseUploading ? 'UPDATING...' : null);
  // }, [courseUploading]);

  const { fullCourse, updateCourseMaster, handleChange } = useHandleTabs(courseContextData);

  let isDisabled = fullCourse?.qa_required;
  if ([COURSE_STATUS.publish, COURSE_STATUS.reject].includes(fullCourse.status)) isDisabled = true;
  if (isPublishCourseEditable) isDisabled = false;

  function getIsFreezeDisabled() {
    if (isPublishCourseEditable) return false;
    if ([COURSE_STATUS.publish, COURSE_STATUS.reject].includes(fullCourse.status)) return true;
    if (
      userOrgData.user_lsp_role?.toLowerCase()?.includes(USER_LSP_ROLE.vendor) &&
      fullCourse?.status === COURSE_STATUS.approvalPending
    )
      return true;

    return false;
  }

  return (
    <>
      {/* visiblity */}
      <div>
        <h4>Access Control</h4>

        <div className={`w-100 ${styles.boxContainer}`}>
          <RadioBox
            labeledInputProps={{
              label: 'Open',
              name: 'display',
              isDisabled: isDisabled,
              description: 'Will be available to all users whether assigned or not',
              isChecked: fullCourse?.is_display,
              changeHandler: (e) => updateCourseMaster({ ...fullCourse, is_display: true })
            }}
          />
          <RadioBox
            labeledInputProps={{
              label: 'Closed',
              name: 'display',
              isDisabled: isDisabled,
              description: 'Will be available to only those assigned to the course',
              isChecked: !fullCourse?.is_display,
              changeHandler: (e) => updateCourseMaster({ ...fullCourse, is_display: false })
            }}
          />
        </div>

        {/* <div className="w-75">
          <SwitchButton
            // label="Display"
            inputName="is_display"
            isDisabled={isDisabled}
            isChecked={fullCourse?.is_display || false}
            handleChange={handleChange}
          />
        </div> */}
      </div>

      {/* Freeze */}
      <div>
        <h4>Course Freeze</h4>

        <div className={`w-100 ${styles.boxContainer}`}>
          <SwitchBox
            labeledInputProps={{
              label: 'Freeze',
              description:
                'Once a course is frozen it is no longer editable and ready for approval/publishing',
              name: 'qa_required',
              isDisabled: getIsFreezeDisabled(),
              isChecked: fullCourse?.qa_required || false,
              handleChange: (e) => {
                const isFreeze = e.target.checked;
                if (isFreeze) return setFreezeConfirmBox(true);

                setUnFreeze(true);
                // updateCourseMaster({ ...fullCourse, qa_required: isFreeze });
              }
              // handleChange: () => setFreezeConfirmBox(true)
            }}
          />
          <div className="w-50" style={{ margin: '15px' }}></div>
        </div>

        {/* <div className="w-75">
          <SwitchButton
            // label="Freeze"
            inputName="qa_required"
            isDisabled={isDisabled}
            isChecked={fullCourse?.qa_required || false}
            handleChange={handleChange}
          />
        </div> */}
      </div>

      {/* Expire */}
      {COURSE_STATUS.publish === fullCourse?.status && (
        <div>
          <h4>Expire Course</h4>

          <div className={`w-100 ${styles.boxContainer}`}>
            <SwitchBox
              labeledInputProps={{
                label: 'Expire',
                description: 'No one will be able to access the course after expiration',
                name: 'expire',
                isDisabled: fullCourse?.status === COURSE_STATUS.reject,
                isChecked: fullCourse?.status === COURSE_STATUS.reject,
                handleChange: () => setShowConfirmBox(true)
              }}
            />
            <div className="w-50" style={{ margin: '15px' }}></div>
          </div>

          {/* <div className="w-75">
          <SwitchButton
            // label="Freeze"
            inputName="qa_required"
            isDisabled={isDisabled}
            isChecked={fullCourse?.qa_required || false}
            handleChange={handleChange}
          />
        </div> */}
        </div>
      )}

      {/* course details */}
      {!!fullCourse?.id && (
        <div>
          <h4>Details</h4>

          <CourseDetailsTable
            data={[
              {
                title: 'Created Date',
                value: moment(+fullCourse?.created_at * 1000).format('lll')
              },
              {
                title: 'Published on',
                value: fullCourse?.publish_date
                  ? moment(+fullCourse?.publish_date * 1000).format('lll')
                  : 'N/A'
              },
              {
                title: 'Live on',
                value: fullCourse?.publish_date
                  ? moment(+fullCourse?.publish_date * 1000).format('lll')
                  : 'N/A'
              },
              { title: 'Created By', value: fullCourse?.created_by },
              {
                title: 'Published by',
                value: fullCourse?.approvers?.[0] ? fullCourse?.approvers?.[0] : 'N/A'
              },
              {
                title: 'Expired On',
                value: +fullCourse?.expiry_date
                  ? moment(+fullCourse?.expiry_date * 1000).format('lll')
                  : 'N/A'
              }
            ]}
          />
        </div>
      )}
      {!!freezeConfirmBox && <FreezeConfirmation closePopUp={() => setFreezeConfirmBox(false)} />}

      {unFreeze && (
        <ConfirmPopUp
          title={'Are you sure about unfreezing this course?'}
          btnObj={{
            leftIsDisable: disableBtn,
            rightIsDisable: disableBtn,
            handleClickLeft: () => {
              setDisableBtn(true);
              const { duration, ..._fullCourse } = fullCourse;
              const sendData = { ..._fullCourse, qa_required: false };

              updateCourse({ variables: sendData })
                .then(() => {
                  updateCourseMaster({ ...fullCourse, qa_required: false });
                  setFullCourseData(getFullCourseDataObj({ ...fullCourseData, qa_required: true }));
                  setIsCourseSaved(true);
                  setUnFreeze(false);
                })
                .catch((err) => {
                  setToastMsg({ type: 'danger', message: 'Course Unfreeze Error!' });
                })
                .finally(() => {
                  setDisableBtn(false);
                });
            },
            handleClickRight: () => setUnFreeze(false)
          }}
        />
      )}

      {showConfirmBox && (
        <ConfirmPopUp
          title={'Are you sure about expiring this course?'}
          btnObj={{
            handleClickLeft: async () => {
              // updateCourseMaster({
              //   ...fullCourse,
              //   status: e.target.checked ? COURSE_STATUS.reject : COURSE_STATUS.publish
              // });
              const { duration, status, ..._fullCourse } = fullCourse;
              console.log('var', sendData);
              const sendData = {
                ..._fullCourse,
                status: COURSE_STATUS.reject,
                expiry_date: getUnixFromDate()
              };

              await updateCourse({ variables: sendData });
              setShowConfirmBox(false);
              router.push('/admin/course/my-courses');
            },
            handleClickRight: () => setShowConfirmBox(false)
          }}
        />
      )}
    </>
  );
}
