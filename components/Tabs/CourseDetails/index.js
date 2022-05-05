import { useContext } from 'react';
import { courseContext } from '../../../state/contexts/CourseContext';
import LabeledRadioCheckbox from '../../common/FormComponents/LabeledRadioCheckbox';
import DropdownSelect from '../common/DropdownSelect';
import NextButton from '../common/NextButton';
import useHandleTabs from '../Logic/useHandleTabs';
import DragDrop from './DragAndDrop';
import PreviewImage from './PreviewImage';

export default function CourseDetails() {
  const courseContextData = useContext(courseContext);
  const {
    fullCourse,
    fileData,
    handleChange,
    togglePreviewPopUp,
    previewFileData,
    removeSavedFile
  } = useHandleTabs(courseContextData);
  const { courseVideo, courseImage, courseTileImage } = courseContextData;

  return (
    <div className="course_master">
      <DropdownSelect
        data={[fullCourse.sub_category]}
        inputData={{
          inputName: 'course_sub_category',
          label: 'Course Base Sub-category',
          placeholder: 'Select Subcategory in Course Master Tab',
          value: fullCourse.sub_category,
          handleChange
        }}
      />

      <DragDrop contextData={courseContextData} />

      {/* Expertise Level */}
      <div className="row my_30">
        <label htmlFor="name3" className="col_25" style={{marginRight: '15px'}}>
          Level of Expertise
        </label>
        <div className="col_25">
          <LabeledRadioCheckbox
            type="checkbox"
            label="Beginner"
            name="expertise_level"
            value="Beginner"
            isChecked={fullCourse.expertise_level.includes('Beginner')}
            changeHandler={handleChange}
          />
        </div>
        <div className="col_25">
          <LabeledRadioCheckbox
            type="checkbox"
            label="Competent"
            name="expertise_level"
            value="Competent"
            isChecked={fullCourse.expertise_level.includes('Competent')}
            changeHandler={handleChange}
          />
        </div>
        <div className="col_25">
          <LabeledRadioCheckbox
            type="checkbox"
            label="Proficient"
            name="expertise_level"
            value="Proficient"
            isChecked={fullCourse.expertise_level.includes('Proficient')}
            changeHandler={handleChange}
          />
        </div>
      </div>

      {/* Upload Course Video */}
      <div className="row my_30">
        <label htmlFor="name3" className="col_25">
          Upload Preview of the course
        </label>
        <div className="col_25">
          <div className="upload_btn_wrapper">
            <button className="btn">
              <span className="input_icon">
                <span>
                  <img src="/images/upload.png" alt="" />
                </span>
              </span>
              Browse & upload
            </button>
            <input
              type="file"
              name="uploadCourseVideo"
              accept="video/mp4"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="preview_remove_links">
            <a
              className="preview"
              onClick={() => {
                if (fullCourse.previewVideo || courseVideo?.file) {
                  togglePreviewPopUp(
                    fileData.uploadCourseVideo,
                    courseVideo?.file || fullCourse.previewVideo,
                    true
                  );
                } else {
                  alert('No File detected, please upload');
                }
              }}>
              Preview
            </a>
            <a className="remove" onClick={() => removeSavedFile('uploadCourseVideo')}>
              Remove
            </a>
          </div>
        </div>
        <div className="col_50">
          <span>{fileData.uploadCourseVideo}</span>
        </div>
      </div>

      {/* Upload Course Image */}
      <div className="row my_30">
        <label htmlFor="name3" className="col_25">
          Course Display Image
        </label>
        <div className="col_25">
          <div className="upload_btn_wrapper">
            <button className="btn">
              <span className="input_icon">
                <span>
                  <img src="/images/upload.png" alt="" />
                </span>
              </span>
              Browse & upload
            </button>
            <input
              type="file"
              name="uploadCourseImage"
              accept=".jpeg, .png, .gif"
              onChange={handleChange}
            />
          </div>
          <div className="preview_remove_links">
            <a
              className="preview"
              onClick={() => {
                if (fullCourse.tileImage || courseTileImage?.file) {
                  togglePreviewPopUp(
                    fileData.uploadCourseImage,
                    courseTileImage?.file || fullCourse.tileImage
                  );
                } else {
                  alert('No File detected, please upload');
                }
              }}>
              Preview
            </a>
            <a className="remove" onClick={() => removeSavedFile('uploadCourseImage')}>
              Remove
            </a>
          </div>
        </div>
        <div className="col_50">
          <span>{fileData.uploadCourseImage}</span>
        </div>
      </div>

      {/* Upload Course Page Display Picture */}
      <div className="row my_30">
        <label htmlFor="name3" className="col_25">
          Course Page Display Picture
        </label>
        <div className="col_25">
          <div className="upload_btn_wrapper">
            <button className="btn">
              <span className="input_icon">
                <span>
                  <img src="/images/upload.png" alt="" />
                </span>
              </span>
              Browse & upload
            </button>
            <input type="file" name="myfile" accept=".jpeg, .png, .gif" onChange={handleChange} />
          </div>
          <div className="preview_remove_links">
            <a
              className="preview"
              onClick={() => {
                if (fullCourse.image || courseImage?.file) {
                  togglePreviewPopUp(fileData.myfile, courseImage?.file || fullCourse.image);
                } else {
                  alert('No File detected, please upload');
                }
              }}>
              Preview
            </a>
            <a className="remove" onClick={() => removeSavedFile('myfile')}>
              Remove
            </a>
          </div>
        </div>
        <div className="col_50">
          <span>{fileData.myfile}</span>
        </div>
      </div>

      {/* Course Summary */}
      <div className="row my_30">
        <label htmlFor="name1" className="col_25">
          Course Summary
        </label>
        <textarea
          name="summary"
          onChange={handleChange}
          className={`col_75 ${fullCourse.summary ? 'white' : ''}`}
          rows="4"
          value={fullCourse.summary}
          placeholder={' Provide and outline of the course in less than 1000 characters...'}
        />
      </div>

      <NextButton tabIndex={2} />

      {previewFileData && (
        <PreviewImage
          fileName={previewFileData.fileName}
          filePath={previewFileData.filePath}
          isVideo={previewFileData.isVideo}
          popUpData={{
            closeBtn: { name: 'Close', handleClick: togglePreviewPopUp },
            submitBtn: { name: 'Download' }
          }}
        />
      )}
    </div>
  );
}
// const CourseDetails = () => {
//   const { setTab, fullCourse, updateCourseMaster, courseVideo, setCourseVideo, courseImage, setCourseImage, courseTileImage, setCourseTileImage } = useContext(courseContext);
//   const [uploadImage] = useMutation(UPLOAD_COURSE_IMAGE);
//   const [uploadTileImage] = useMutation(UPLOAD_COURSE_TILE_IMAGE);
//   const [uploadPreview] = useMutation(UPLOAD_COURSE_PREVIEW);

//   let nameArr = (fullCourse.expertise_level.length > 0) ? fullCourse['expertise_level'].split(" , ") : [];
//   const [expertiseLevel, setExpertiseLevel] = useState(nameArr);

//   const inputHandler = (e) => {
//     updateCourseMaster({
//       ...fullCourse,
//       [e.target.name]: e.target.value,
//     })
//   }

//   const inputHandlerAddArr = (e) => {
//     const trimmedInput = e.target.value.trim();
//     if(e.target.checked == false){
//       deleteExpertiseLevel(trimmedInput)
//     } else if ( trimmedInput.length && !expertiseLevel.includes(trimmedInput) ) {
//         setExpertiseLevel(prevState => [...prevState, trimmedInput]);
//     }
//   }

//   const deleteExpertiseLevel = (trimmedInput) => {
//     setExpertiseLevel(prevState => prevState.filter( function(el) { return el !== trimmedInput; } ));
//   }

//   useEffect(() => {
//     updateCourseMaster({
//       ...fullCourse,
//       expertise_level: expertiseLevel.join(" , "),
//     })
//   }, [expertiseLevel])

//   const uploadCourseVideo = (e) => {
//     if(courseVideo.courseId){
//       let fileType = e.target.files[0].type;
//       if(fileType != "video/mp4" && fileType != "videp/mp4"){
//         document.getElementById("coursePreview").innerText = "Only mp4 is allowed!";
//         return;
//       }
//       document.getElementById("coursePreview").innerText = e.target.files[0].name;
//       setCourseVideo({
//         ...courseVideo,
//         upload: 1,
//         file: e.target.files[0]
//       });
//     } else {
//       setTab('tab1');
//       alert('Add Course Master First');
//     }
//   }

//   const uploadCourseImage = (e) => {
//     if(courseImage.courseId){
//       let fileType = e.target.files[0].type;
//       if(fileType != "image/jpeg" && fileType != "image/png" && fileType != "image/gif"){
//         document.getElementById("courseImage").innerText = "Only JPG, JPEG, PNG, GIF is allowed!";
//         return;
//       }
//       document.getElementById("courseImage").innerText = e.target.files[0].name;
//       setCourseImage({
//         ...courseImage,
//         upload: 1,
//         file: e.target.files[0]
//       });
//     } else {
//       setTab('tab1');
//       alert('Add Course Master First');
//     }
//   }

//   const uploadCourseTileImage = (e) => {
//     if(courseTileImage.courseId){
//       let fileType = e.target.files[0].type;
//         if(fileType != "image/jpeg" && fileType != "image/png" && fileType != "image/gif"){
//           document.getElementById("courseTileImage").innerText = "Only JPG, JPEG, PNG, GIF is allowed!";
//           return;
//         }
//         document.getElementById("courseTileImage").innerText = e.target.files[0].name;
//         setCourseTileImage({
//           ...courseTileImage,
//           upload: 1,
//           file: e.target.files[0]
//         });
//     } else {
//       setTab('tab1');
//       alert('Add Course Master First');
//     }
//   }

//     return (
//         <div className="course_master">
//           <div className="row my_30">
//             <label htmlFor="name1" className="col_25">Course Base Sub-category</label>
//               <select
//               className="col_75"
//               onChange={inputHandlerAddArr}
//               value={(fullCourse.sub_category)?fullCourse.subcategory:'Select Subcategory in Course Master Tab'}
//               >
//                 <option disabled hidden>Select Subcategory in Course Master Tab</option>
//                 <option> {fullCourse.sub_category}</option>
//               </select>
//           </div>
//           <ApolloProvider client={queryClient}>
//           <DragDrop/>
//           </ApolloProvider>

//           {/* Expertise Level */}
//           <div className="row my_30">
//             <label htmlFor="name3" className="col_25">Level of Expertise</label>
//             <div className="col_25">
//               <label className="checkbox_container">
//                 <input type="checkbox"
//                 name='expertise_level'
//                 onChange={inputHandlerAddArr}
//                 value="Beginner"
//                 checked={ expertiseLevel.includes("Beginner") ? 'checked' : false}
//                 />
//                 <span className="checkmark"></span>Beginner
//               </label>
//             </div>
//             <div className="col_25">
//               <label className="checkbox_container">
//                 <input type="checkbox"
//                 name='expertise_level'
//                 onChange={inputHandlerAddArr}
//                 value="Competent"
//                 checked={ expertiseLevel.includes("Competent") ? "checked" : false}
//                 />
//                 <span className="checkmark"></span>Competent
//               </label>
//             </div>
//             <div className="col_25">
//               <label className="checkbox_container">
//                 <input type="checkbox"
//                 name='expertise_level'
//                 onChange={inputHandlerAddArr}
//                 value="Proficient"
//                 checked={ expertiseLevel.includes("Proficient") ? "checked" : false}
//                 />
//                 <span className="checkmark"></span>Proficient
//               </label>
//             </div>
//           </div>
//           {/* Upload Course Video */}
//           <div className="row my_30">
//             <label htmlFor="name3" className="col_25">Upload Preview of the course</label>
//             <div className="col_25">
//               <div className="upload_btn_wrapper">
//                 <button className="btn">
//                   <span className="input_icon">
//                     <span>
//                       <img src="/images/upload.png" alt="" />
//                     </span>
//                   </span>
//                   Browse & upload
//                 </button>
//                 <input type="file" name="uploadCourseVideo" onChange={uploadCourseVideo}/>
//               </div>
//               <div className="preview_remove_links">
//                 <a className="preview">Preview</a>
//                 <a className="remove">Remove</a>
//               </div>
//             </div>
//             <div className="col_50">
//               <span id="coursePreview">{(courseVideo.file) ? courseVideo.file.name : ''}</span>
//             </div>
//           </div>
//           {/* Upload Course Image */}
//           <div className="row my_30">
//             <label htmlFor="name3" className="col_25">Course Display Image</label>
//             <div className="col_25">
//               <div className="upload_btn_wrapper">
//                 <button className="btn">
//                   <span className="input_icon">
//                     <span>
//                       <img src="/images/upload.png" alt="" />
//                     </span>
//                   </span>
//                   Browse & upload
//                 </button>
//                 <input type="file" name="uploadCourseImage" onChange={uploadCourseImage}/>
//               </div>
//               <div className="preview_remove_links">
//                 <a className="preview">Preview</a>
//                 <a className="remove">Remove</a>
//               </div>
//             </div>
//             <div className="col_50">
//               <span id="courseImage">{(courseImage.file) ? courseImage.file.name : ''}</span>
//             </div>
//           </div>
//           {/* Upload Course Page Display Picture */}
//           <div className="row my_30">
//             <label htmlFor="name3" className="col_25">Course Page Display Picture</label>
//             <div className="col_25">
//               <div className="upload_btn_wrapper">
//                 <button className="btn">
//                   <span className="input_icon">
//                     <span>
//                       <img src="/images/upload.png" alt="" />
//                     </span>
//                   </span>
//                   Browse & upload
//                 </button>
//                 <input type="file" name="myfile" onChange={uploadCourseTileImage}/>
//               </div>
//               <div className="preview_remove_links">
//                 <a className="preview">Preview</a>
//                 <a className="remove">Remove</a>
//               </div>
//             </div>
//             <div className="col_50">
//             <span id="courseTileImage">{(courseTileImage.file) ? courseTileImage.file.name : ''}</span>
//             </div>
//           </div>
//           {/* Course Summary */}
//           <div className="row my_30">
//             <label htmlFor="name1" className="col_25">Course Summary</label>
//             <textarea
//             name="summary"
//             onChange={inputHandler}
//             className="col_75"
//             rows="4"
//             value={fullCourse.summary}
//             placeholder={" Provide and outline of the course in less than 1000 characters..."}
//             />
//           </div>

//         </div>
//     )
// }
