import { UPDATE_COURSE } from '@/api/Mutations';
import ConfirmPopUp from '@/components/common/ConfirmPopUp';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import { COURSE_STATUS } from '@/helper/constants.helper';
import { getUnixFromDate } from '@/helper/utils.helper';
import { FullCourseDataAtom, getFullCourseDataObj } from '@/state/atoms/course.atoms';
import { useMutation } from '@apollo/client';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import { courseContext } from '../../../state/contexts/CourseContext';
import RadioBox from '../common/RadioBox';
import SwitchBox from '../common/SwitchBox';
import { isCourseUploadingAtom } from '../Logic/tabs.helper';
import useHandleTabs from '../Logic/useHandleTabs';
import CourseDetailsTable from './CourseDetailsTable';
import FreezeConfirmation from './FreezeConfirmation';
import styles from '../courseTabs.module.scss';
import { FeatureFlagsAtom } from '@/state/atoms/global.atom';

export default function CourseConfiguration() {
  const [updateCourse, { loading: courseUploading }] = useMutation(UPDATE_COURSE);

  const [isLoading, setIsLoading] = useRecoilState(isCourseUploadingAtom);
  const { isPublishCourseEditable } = useRecoilValue(FeatureFlagsAtom);

  const courseContextData = useContext(courseContext);
  const [freezeConfirmBox, setFreezeConfirmBox] = useState(null);
  const [showConfirmBox, setShowConfirmBox] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(courseUploading ? 'UPDATING...' : null);
  }, [courseUploading]);
  // const { publishDate, expireDate, setPublishDate, setExpireDate } =
  //   useHandleConfig(courseContextData);

  const { fullCourse, updateCourseMaster, handleChange } = useHandleTabs(courseContextData);

  // const [showConfirmBox, setShowConfirmBox] = useState(false);

  let isDisabled = fullCourse?.qa_required;
  if ([COURSE_STATUS.publish, COURSE_STATUS.reject].includes(fullCourse.status)) isDisabled = true;
  if (isPublishCourseEditable) isDisabled = false;

  return (
    <>
      {/* <div className={`center-element-with-flex ${styles.marginBottom}`}>
        {/* publis date *
        <>
          <label htmlFor="publish_date" className={`w-25`}>
            Publish Date
          </label>
          <div className={`w-25`}>
            <InputDatePicker
              selectedDate={publishDate}
              minDate={new Date()}
              changeHandler={(d) => setPublishDate(d)}
            />
          </div>
        </>

        {/* expiry date *
        <>
          <label htmlFor="expire_date" className={`w-25`}>
            Expire Date
          </label>
          <div className={`w-25`}>
            <InputDatePicker
              selectedDate={expireDate}
              minDate={publishDate}
              changeHandler={(d) => setExpireDate(d)}
            />
          </div>
        </>
      </div> */}

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
        <h4>Freeze your account</h4>

        <div className={`w-100 ${styles.boxContainer}`}>
          <SwitchBox
            labeledInputProps={{
              label: 'Freeze',
              description:
                'Once a course is frozen it is no longer available and ready for approval/Publishing',
              name: 'qa_required',
              isDisabled: +fullCourse?.duration === 0 ? true : isDisabled,
              isChecked: fullCourse?.qa_required || false,
              handleChange: (e) => {
                const isFreeze = e.target.checked;
                if (isFreeze) return setFreezeConfirmBox(true);

                updateCourseMaster({ ...fullCourse, qa_required: isFreeze });
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
      {isDisabled && (
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
      {/* disable course */}
      {/* <div className={`center-element-with-flex ${styles.marginBottom}`}>
        <label htmlFor="visible" className="w-25">
          Expire Course
        </label>

        <div className="w-75">
          <SwitchButton
            // label="Display"
            inputName="expire_course"
            isChecked={fullCourse?.status === COURSE_STATUS.reject || false}
            isDisabled={isCoursePublished}
            handleChange={() =>
              updateCourseMaster({
                ...fullCourse,
                status:
                  fullCourse?.status === COURSE_STATUS.reject
                    ? COURSE_STATUS.save
                    : COURSE_STATUS.reject
              })
            }
          />
        </div>
      </div> */}
      {/* <div className={`center-element-with-flex ${styles.marginBottom}`}>
        <SwitchButton
          label="Active"
          inputName="is_active"
          isChecked={fullCourse?.is_active}
          handleChange={(e) => {
            if (!fullCourse?.is_active)
              return updateCourseMaster({ ...fullCourse, is_active: true });

            setShowConfirmBox(true);
          }}
        />
        <SwitchButton
          label="Display"
          inputName="is_display"
          isChecked={fullCourse?.is_display || false}
          handleChange={handleChange}
        />
      </div> */}
      {!!freezeConfirmBox && <FreezeConfirmation closePopUp={() => setFreezeConfirmBox(false)} />}

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
