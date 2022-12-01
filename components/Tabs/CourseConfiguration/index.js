import { COURSE_STATUS } from '@/helper/constants.helper';
import { useContext } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { courseContext } from '../../../state/contexts/CourseContext';
import SwitchButton from '../../common/FormComponents/SwitchButton';
import styles from '../courseTabs.module.scss';
import useHandleTabs from '../Logic/useHandleTabs';

export default function CourseConfiguration() {
  const courseContextData = useContext(courseContext);
  // const { publishDate, expireDate, setPublishDate, setExpireDate } =
  //   useHandleConfig(courseContextData);

  const { fullCourse, updateCourseMaster, handleChange } = useHandleTabs(courseContextData);

  // const [showConfirmBox, setShowConfirmBox] = useState(false);

  const isCoursePublished = fullCourse?.status === COURSE_STATUS.publish;

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

      {/* Quality Control Check */}
      <div className={`center-element-with-flex ${styles.marginBottom}`}>
        <label htmlFor="quality" className="w-25">
          Freeze Course
        </label>

        <div className="w-75">
          <SwitchButton
            // label="Freeze"
            inputName="qa_required"
            isDisabled={isCoursePublished}
            isChecked={fullCourse?.qa_required || false}
            handleChange={handleChange}
          />
        </div>
      </div>

      {/* visiblity */}
      <div className={`center-element-with-flex ${styles.marginBottom}`}>
        <label htmlFor="visible" className="w-25">
          Visibility in the Learning space
        </label>

        <div className="w-75">
          <SwitchButton
            // label="Display"
            inputName="is_display"
            isDisabled={isCoursePublished}
            isChecked={fullCourse?.is_display || false}
            handleChange={handleChange}
          />
        </div>

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
      </div>

      {/* disable course */}
      <div className={`center-element-with-flex ${styles.marginBottom}`}>
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
      </div>
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
