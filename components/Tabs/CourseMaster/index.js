import { useContext } from 'react';
import { GET_CATS_N_SUB_CATS } from '../../../API/Queries';
import { getQueryData } from '../../../helper/api.helper';
import { courseContext } from '../../../state/contexts/CourseContext';
import DropdownSelect from '../common/DropdownSelect';
import NextButton from '../common/NextButton';
import TextInput from '../common/TextInput';
import useHandleTabs from '../Logic/useHandleTabs';

export default function CourseMaster() {
  const courseContextData = useContext(courseContext);
  const { fullCourse, handleChange } = useHandleTabs(courseContextData);
  const { data } = getQueryData(GET_CATS_N_SUB_CATS);

  return (
    <div className="course_master">
      <form>
        <TextInput
          inputName="name"
          label="Name"
          placeholder="Enter name of the course (Upto 160 characters)"
          onChange={handleChange}
          value={fullCourse.name}
        />

        <DropdownSelect
          data={data?.allCategories}
          inputData={{
            inputName: 'category',
            label: 'Course Category',
            placeholder: 'Select the category of the course',
            value: fullCourse.category,
            handleChange
          }}
        />

        <DropdownSelect
          data={data?.allSubCategories}
          inputData={{
            inputName: 'sub_category',
            label: 'Select Base Sub-category',
            placeholder: 'Select the category of the course',
            value: fullCourse.sub_category,
            handleChange
          }}
        />

        <DropdownSelect
          data={['Abhishek', 'Vaishnavi', 'Harshad', 'Puneet', 'Gokul']}
          inputData={{
            inputName: 'owner',
            label: 'Course Owner',
            placeholder: 'Select the owner of the course',
            value: fullCourse.owner,
            handleChange
          }}
        />

        {/* <GetCourseList id={editcourseId}/> */}

        <div className="row my_30">
          <div className="col_25"></div>
          <div className="col_25">
            <div className="active_button">
              <label htmlFor="active" className="td_label">
                Active
              </label>
              <label className="switch">
                <input
                  className="switch_input"
                  type="checkbox"
                  name="is_active"
                  onChange={handleChange}
                  checked={fullCourse.is_active || false}
                />
                <span className="switch_label" data-on="On" data-off="Off"></span>
                <span className="switch_handle"></span>
              </label>
            </div>
          </div>

          <div className="col_25">
            <div className="active_button">
              <label htmlFor="display" className="td_label">
                Display
              </label>
              <label className="switch">
                <input
                  className="switch_input"
                  type="checkbox"
                  name="is_display"
                  onChange={handleChange}
                  checked={fullCourse.is_display}
                />
                <span className="switch_label" data-on="On" data-off="Off"></span>
                <span className="switch_handle"></span>
              </label>
            </div>
          </div>
          <div className="col_25"></div>
        </div>

        <NextButton tabIndex={1}/>

        {/* <div className="row">
          <div className="col_75"></div>
          <div className="col_25"></div>
          <button type="button" className={nextBtn} onClick={() => saveCourseData(true, 1)}>
            <span>Next</span>
            <Image src="/images/bigarrowright.png" alt="" height={20} width={20} />
          </button>
        </div> */}
        {/* <div className="row">
          <div className="col_75"></div>
          <div className="col_25"></div>
          <button type="button" className="admin-next-btn" onClick={() => saveCourseData(true, 1)}>
            Next
          </button>
        </div> */}
      </form>
    </div>
  );
}

// TODO:
// function CreateCatsDropdown({ inputHandler, inputField }) {
//   return (
//     <select className="col_75" name="category" onChange={inputHandler} value={inputField.category}>
//       <option className="col_75" value="">
//         Select the category of the course
//       </option>
//       {data
//         ? data.allCategories.map((value, index) => (
//             <option key={index} className="col_75 white" value={value}>
//               {value}
//             </option>
//           ))
//         : null}
//     </select>
//   );
// }
// function CreateSubCatsDropdown({ inputHandler, inputField }) {
//   const { data } = useQuery(GET_CATS_N_SUB_CATS);
//   return (
//     <select
//       className="col_75"
//       name="sub_category"
//       onChange={inputHandler}
//       value={inputField.sub_category}>
//       <option className="col_75" value="">
//         Select the base sub-category of the course
//       </option>
//       {data
//         ? data.allSubCategories.map((cats, index) => (
//             <option key={index} className="col_75 white" value={cats}>
//               {cats}
//             </option>
//           ))
//         : null}
//     </select>
//   );
// }
