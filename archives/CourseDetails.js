import { useState, useEffect, useContext } from 'react';
import { ApolloProvider, useMutation, useQuery } from '@apollo/client';
import {queryClient, GET_CATS_N_SUB_CATS} from '../API/Queries'
import {UPLOAD_COURSE_IMAGE, UPLOAD_COURSE_TILE_IMAGE, UPLOAD_COURSE_PREVIEW} from '../API/Mutations'
import DragDrop from './DragDropContainer'
import { courseContext } from '../state/contexts/CourseContext';


const CourseDetails = () => {
  const { setTab, fullCourse, updateCourseMaster, courseVideo, setCourseVideo, courseImage, setCourseImage, courseTileImage, setCourseTileImage } = useContext(courseContext);
  const [uploadImage] = useMutation(UPLOAD_COURSE_IMAGE);
  const [uploadTileImage] = useMutation(UPLOAD_COURSE_TILE_IMAGE);
  const [uploadPreview] = useMutation(UPLOAD_COURSE_PREVIEW);

  let nameArr = (fullCourse.expertise_level.length > 0) ? fullCourse['expertise_level'].split(" , ") : [];
  const [expertiseLevel, setExpertiseLevel] = useState(nameArr);

  const inputHandler = (e) => {
    updateCourseMaster({
      ...fullCourse,
      [e.target.name]: e.target.value,
    })
  }

  const inputHandlerAddArr = (e) => {
    const trimmedInput = e.target.value.trim();
    if(e.target.checked == false){
      deleteExpertiseLevel(trimmedInput)
    } else if ( trimmedInput.length && !expertiseLevel.includes(trimmedInput) ) {
        setExpertiseLevel(prevState => [...prevState, trimmedInput]);
    }
  }

  const deleteExpertiseLevel = (trimmedInput) => {
    setExpertiseLevel(prevState => prevState.filter( function(el) { return el !== trimmedInput; } ));
  }

  useEffect(() => { 
    updateCourseMaster({
      ...fullCourse,
      expertise_level: expertiseLevel.join(" , "),
    })
  }, [expertiseLevel])

  const uploadCourseVideo = (e) => {
    if(courseVideo.courseId){
      let fileType = e.target.files[0].type;
      if(fileType != "video/mp4" && fileType != "videp/mp4"){
        document.getElementById("coursePreview").innerText = "Only mp4 is allowed!";
        return;
      }
      document.getElementById("coursePreview").innerText = e.target.files[0].name;
      setCourseVideo({
        ...courseVideo,
        upload: 1,
        file: e.target.files[0]
      });
    } else {
      setTab('tab1');
      alert('Add Course Master First');
    }
  }

  const uploadCourseImage = (e) => {
    if(courseImage.courseId){
      let fileType = e.target.files[0].type;
      if(fileType != "image/jpeg" && fileType != "image/png" && fileType != "image/gif"){
        document.getElementById("courseImage").innerText = "Only JPG, JPEG, PNG, GIF is allowed!";
        return;
      }
      document.getElementById("courseImage").innerText = e.target.files[0].name;
      setCourseImage({
        ...courseImage,
        upload: 1,
        file: e.target.files[0]
      });
    } else {
      setTab('tab1');
      alert('Add Course Master First');
    }
  }


  const uploadCourseTileImage = (e) => {
    if(courseTileImage.courseId){
      let fileType = e.target.files[0].type;
        if(fileType != "image/jpeg" && fileType != "image/png" && fileType != "image/gif"){
          document.getElementById("courseTileImage").innerText = "Only JPG, JPEG, PNG, GIF is allowed!";
          return;
        }
        document.getElementById("courseTileImage").innerText = e.target.files[0].name;
        setCourseTileImage({
          ...courseTileImage,
          upload: 1,
          file: e.target.files[0]
        });
    } else {
      setTab('tab1');
      alert('Add Course Master First');
    }  
  }


    return (
        <div className="course_master">
          <div className="row my_30">
            <label htmlFor="name1" className="col_25">Course Base Sub-category</label>
              <select 
              className="col_75"
              onChange={inputHandlerAddArr}
              value={(fullCourse.sub_category)?fullCourse.subcategory:'Select Subcategory in Course Master Tab'}
              >
                <option disabled hidden>Select Subcategory in Course Master Tab</option>
                <option> {fullCourse.sub_category}</option>
              </select>
          </div>
          <ApolloProvider client={queryClient}>
          <DragDrop/>
          </ApolloProvider>

          {/* Expertise Level */}
          <div className="row my_30">
            <label htmlFor="name3" className="col_25">Level of Expertise</label>
            <div className="col_25">
              <label className="checkbox_container">
                <input type="checkbox" 
                name='expertise_level'
                onChange={inputHandlerAddArr}
                value="Beginner" 
                checked={ expertiseLevel.includes("Beginner") ? 'checked' : false}
                />
                <span className="checkmark"></span>Beginner
              </label>
            </div>
            <div className="col_25">
              <label className="checkbox_container">
                <input type="checkbox" 
                name='expertise_level'
                onChange={inputHandlerAddArr}
                value="Competent" 
                checked={ expertiseLevel.includes("Competent") ? "checked" : false}
                />
                <span className="checkmark"></span>Competent
              </label>
            </div>
            <div className="col_25">
              <label className="checkbox_container">
                <input type="checkbox" 
                name='expertise_level'
                onChange={inputHandlerAddArr}
                value="Proficient" 
                checked={ expertiseLevel.includes("Proficient") ? "checked" : false}
                />
                <span className="checkmark"></span>Proficient
              </label>
            </div>
          </div>
          {/* Upload Course Video */}
          <div className="row my_30">
            <label htmlFor="name3" className="col_25">Upload Preview of the course</label>
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
                <input type="file" name="uploadCourseVideo" onChange={uploadCourseVideo}/>
              </div>
              <div className="preview_remove_links">
                <a className="preview">Preview</a>
                <a className="remove">Remove</a>
              </div>
            </div>
            <div className="col_50">
              <span id="coursePreview">{(courseVideo.file) ? courseVideo.file.name : ''}</span>
            </div>
          </div>
          {/* Upload Course Image */}
          <div className="row my_30">
            <label htmlFor="name3" className="col_25">Course Display Image</label>
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
                <input type="file" name="uploadCourseImage" onChange={uploadCourseImage}/>
              </div>
              <div className="preview_remove_links">
                <a className="preview">Preview</a>
                <a className="remove">Remove</a>
              </div>
            </div>
            <div className="col_50">
              <span id="courseImage">{(courseImage.file) ? courseImage.file.name : ''}</span>
            </div>
          </div>
          {/* Upload Course Page Display Picture */}
          <div className="row my_30">
            <label htmlFor="name3" className="col_25">Course Page Display Picture</label>
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
                <input type="file" name="myfile" onChange={uploadCourseTileImage}/>
              </div>
              <div className="preview_remove_links">
                <a className="preview">Preview</a>
                <a className="remove">Remove</a>
              </div>
            </div>
            <div className="col_50">
            <span id="courseTileImage">{(courseTileImage.file) ? courseTileImage.file.name : ''}</span>
            </div>
          </div>
          {/* Course Summary */}
          <div className="row my_30">
            <label htmlFor="name1" className="col_25">Course Summary</label>
            <textarea 
            name="summary"
            onChange={inputHandler}
            className="col_75" 
            rows="4" 
            value={fullCourse.summary}
            placeholder={" Provide and outline of the course in less than 1000 characters..."} 
            />
          </div>
        
        </div>
    )
}

export default CourseDetails