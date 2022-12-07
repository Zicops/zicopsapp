import { COURSE_STATUS } from '@/helper/constants.helper';
import moment from 'moment';
import { useContext } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { courseContext } from '../../../state/contexts/CourseContext';
import RadioBox from '../common/RadioBox';
import SwitchBox from '../common/SwitchBox';
import styles from '../courseTabs.module.scss';
import useHandleTabs from '../Logic/useHandleTabs';
import CourseDetailsTable from './CourseDetailsTable';

export default function CourseConfiguration() {
  const courseContextData = useContext(courseContext);
  // const { publishDate, expireDate, setPublishDate, setExpireDate } =
  //   useHandleConfig(courseContextData);

  const { fullCourse, updateCourseMaster, handleChange } = useHandleTabs(courseContextData);

  // const [showConfirmBox, setShowConfirmBox] = useState(false);

  const isDisabled = fullCourse?.status === COURSE_STATUS.publish;

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
                'Once a course is frozen it is no longer available and reasy for approval/Publishing',
              name: 'qa_required',
              isDisabled: isDisabled,
              isChecked: fullCourse?.qa_required || false,
              changeHandler: handleChange
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
      {fullCourse?.status === COURSE_STATUS.publish && (
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
                changeHandler: () =>
                  updateCourseMaster({
                    ...fullCourse,
                    status:
                      fullCourse?.status === COURSE_STATUS.reject
                        ? COURSE_STATUS.publish
                        : COURSE_STATUS.reject
                  })
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
              { title: 'Created Date', value: moment(fullCourse?.created_on).format('lll') },
              { title: 'Published on', value: moment(fullCourse?.publish_date).format('lll') },
              { title: 'Live on', value: moment(fullCourse?.publish_date).format('lll') },
              { title: 'Created By', value: fullCourse?.created_by },
              { title: 'Published by', value: fullCourse?.created_by },
              { title: 'Expiring On', value: 'Perpetual' }
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
      {/* {showConfirmBox && (
        <ConfirmPopUp
          title={
            'Are you sure about deleting this course? This will delete the course permanently!'
          }
          btnObj={{
            handleClickLeft: async () => {
              const isDeleted = await deleteData(DELETE_COURSE, { id: fullCourse?.id });
              // console.log(isDeleted);
              setShowConfirmBox(false);

              if (!isDeleted?.deleteCourse)
                return setToastMsg({ type: 'danger', message: 'Course Delete Error' });

              router.push('/admin/course/my-courses');
            },
            handleClickRight: () => setShowConfirmBox(false)
          }}
        />
      )} */}
    </>
  );
}
