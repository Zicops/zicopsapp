import { useContext } from 'react';
import { GET_CATS_N_SUB_CATS } from '../../../API/Queries';
import { getQueryData } from '../../../helper/api.helper';
import { changeHandler } from '../../../helper/common.helper';
import { courseContext } from '../../../state/contexts/CourseContext';
import LabeledDropdown from '../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../common/FormComponents/LabeledInput';
import DropdownSelect from '../common/DropdownSelect';
import NextButton from '../common/NextButton';
import TextInput from '../common/TextInput';
import useHandleTabs from '../Logic/useHandleTabs';

export default function CourseMaster() {
  const courseContextData = useContext(courseContext);
  const { fullCourse, updateCourseMaster, handleChange } = useHandleTabs(courseContextData);
  const { data } = getQueryData(GET_CATS_N_SUB_CATS);

  const allCatOptions = [];
  if (data?.allCategories)
    data.allCategories.map((val) => allCatOptions.push({ value: val, label: val }));
  const category_dropdown = {
    inputName: 'category',
    label: 'Course Category',
    placeholder: 'Select the category of the course',
    options: allCatOptions,
    value: { value: fullCourse?.category, label: fullCourse?.category },
    isDisabled: false,
    isSearchEnable: true,
    isMulti: false
  };
  const allSubcatOptions = [];
  if (data?.allSubCategories)
    data.allSubCategories.map((val) => allSubcatOptions.push({ value: val, label: val }));
  const subcategory_dropdown = {
    inputName: 'sub_category',
    label: 'Select Base Sub-category',
    placeholder: 'Select the sub-category of the course',
    options: allSubcatOptions,
    value: { value: fullCourse?.sub_category, label: fullCourse?.sub_category },
    isDisabled: false,
    isSearchEnable: true,
    isMulti: false
  };
  const allOwners = [
    { value: "Abhishek", label: "Abhishek" },
    { value: "Sonali", label: "Sonali" },
    { value: "Joy", label: "Joy" },
    { value: "Puneet", label: "Puneet" },
    { value: "Vaishnavi", label: "Vaishnavi" },
    { value: "Harshad", label: "Harshad" },
    { value: "Rishav", label: "Rishav" }
  ];
  const owner_dropdown = {
    inputName: 'owner',
    label: 'Course Owner',
    placeholder: 'Select the owner of the course',
    options: allOwners,
    value: { value: fullCourse?.owner, label: fullCourse?.owner },
    isDisabled: false,
    isSearchEnable: true,
    isMulti: false
  };
  const allLanguages = [
    { value: 'English', label: 'English' },
    { value: 'Hindi', label: 'Hindi' },
    { value: 'Marathi', label: 'Marathi' },
    { value: 'Bengali', label: 'Bengali' },
    { value: 'Telegu', label: 'Telegu' },
    { value: 'Tamil', label: 'Tamil' },
    { value: 'Kannada', label: 'Kannada' },
    { value: 'Punjabi', label: 'Punjabi' },
    { value: 'Assamese', label: 'Assamese' },
    { value: 'Orria', label: 'Orria' },
    { value: 'Bhojpuri', label: 'Bhojpuri' },
    { value: 'Maithili', label: 'Maithili' }
  ];
  const allSelectedLanguages = [];
  if (fullCourse?.language)
    fullCourse.language.map((val) => allSelectedLanguages.push({ value: val, label: val }));
  const language_dropdown = {
    inputName: 'language',
    label: 'Languages',
    placeholder: 'Select multiple language for the course',
    options: allLanguages,
    value: allSelectedLanguages,
    isDisabled: false,
    isSearchEnable: true,
    isMulti: true
  };
  return (
    <div className="course_master">
      <form>
        <LabeledInput
          inputOptions={{
            inputName: 'name',
            label: 'Name',
            placeholder: 'Enter name of the course (Upto 60 characters)',
            maxLength: 60,
            value: fullCourse.name
          }}
          changeHandler={handleChange}
        />
        <br />
        <LabeledDropdown
          dropdownOptions={category_dropdown}
          changeHandler={(e) =>
            changeHandler(e, fullCourse, updateCourseMaster, category_dropdown.inputName)
          }
        />
        <br />
        <LabeledDropdown
          dropdownOptions={subcategory_dropdown}
          changeHandler={(e) =>
            changeHandler(e, fullCourse, updateCourseMaster, subcategory_dropdown.inputName)
          }
        />
        <br />
        <LabeledDropdown
          dropdownOptions={owner_dropdown}
          changeHandler={(e) =>
            changeHandler(e, fullCourse, updateCourseMaster, owner_dropdown.inputName)
          }
        />
        <br />
        <LabeledDropdown
          dropdownOptions={language_dropdown}
          changeHandler={(e) =>
            changeHandler(e, fullCourse, updateCourseMaster, language_dropdown.inputName)
          }
        />
        
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
        <NextButton tabIndex={1} />
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
