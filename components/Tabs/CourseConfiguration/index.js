import { DELETE_COURSE } from '@/api/Mutations';
import ConfirmPopUp from '@/components/common/ConfirmPopUp';
import { useContext, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { courseContext } from '../../../state/contexts/CourseContext';
import SwitchButton from '../../common/FormComponents/SwitchButton';
import InputDatePicker from '../../common/InputDatePicker';
import styles from '../courseTabs.module.scss';
import useHandleTabs from '../Logic/useHandleTabs';
import useHandleConfig from './Logic/useHandleConfig';

export default function CourseConfiguration() {
  const courseContextData = useContext(courseContext);
  const { publishDate, expireDate, setPublishDate, setExpireDate } =
    useHandleConfig(courseContextData);

    const { fullCourse, updateCourseMaster, handleChange } = useHandleTabs(courseContextData);

    const [showConfirmBox, setShowConfirmBox] = useState(false);

  return (
    <>
      <div className={`center-element-with-flex ${styles.marginBottom}`}>
        {/* publis date */}
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

        {/* expiry date */}
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
      </div>

      {/* Quality Control Check */}
      <div className={`center-element-with-flex ${styles.marginBottom}`}>
        <label htmlFor="quality" className="w-25">
          Quality Control Check
        </label>

        <div className="w-75">
          <SwitchButton
            inputName="quality"
            // isChecked={false}
            // handleChange={handleChange}
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
            inputName="visible"
            // isChecked={false}
            // handleChange={handleChange}
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
      {showConfirmBox && (
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
      )}
    </>
  );
}
