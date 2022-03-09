import { useState, useEffect, useContext } from 'react';
import { ApolloProvider, useMutation, useQuery } from '@apollo/client';
import {qClient, GET_CATS_N_SUB_CATS} from '../../API/Queries'
import {UPLOAD_COURSE_IMAGE, UPLOAD_COURSE_TILE_IMAGE, UPLOAD_COURSE_PREVIEW} from '../../API/Mutations'
import DragDrop from './DragDropContainer'
import { courseContext } from '../../state/contexts/CourseContext';
import styles from '../../styles/CourseMaster.module.css'


const CourseDetails = () => {
  const { course, setTab, fullCourse, updateCourseMaster } = useContext(courseContext);
  const [uploadImage] = useMutation(UPLOAD_COURSE_IMAGE);
  const [uploadTileImage] = useMutation(UPLOAD_COURSE_TILE_IMAGE);
  const [uploadPreview] = useMutation(UPLOAD_COURSE_PREVIEW);

  let nameArr = (fullCourse.expertise_level.length > 0) ? fullCourse['expertise_level'].split(" , ") : [];

  const [expertiseLevel, setExpertiseLevel] = useState(nameArr);

  console.log(fullCourse);
    // if (loading || loading1 || loading2) console.log('Submitting...');
    // if (error || error1 || error2) {
    //   alert('Submission error!');
    //   console.log(error.message);
    // }
    // if (data) {
    //   console.log(data);
    //   updateCourseMaster({
    //     ...fullCourse,
    //     image : data.uploadCourseImage.url,
    //   });
    //   console.log(fullCourse);
    // }
    // if (data1) {
    //   console.log(data1);
    //   updateCourseMaster({
    //     ...fullCourse,
    //     tileImage : data1.uploadCourseTileImage.url,
    //   });
    //   console.log(fullCourse);
    // }
    // if (data2) {
    //   console.log(data2);
    //   updateCourseMaster({
    //     ...fullCourse,
    //     previewVideo : data2.url,
    //   });
    //   console.log(fullCourse);
    // }
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
    console.log(JSON.stringify(fullCourse))
  }, [expertiseLevel])

  const uploadCourseVideo = (e) => {
    if(fullCourse.id){
      uploadPreview({
        variables: {
          file: e.target.files[0],
          courseId: fullCourse.id
        }
      }).then( (data) => {
          console.log(data);
      })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setTab('tab1');
      alert('Add Course First');
    }
  }
  const uploadCourseImage = (e) => {
    if(fullCourse.id){
      uploadImage({
        variables: {
          file: e.target.files[0],
          courseId: fullCourse.id
        }
      })
      .then( (data) => {
        updateCourseMaster({
          ...fullCourse,
          image : data.data.uploadCourseImage.url,
        });
      })
      .catch((err) => {
        console.log(err)
      });
    } else {
      setTab('tab1');
      alert('Add Course Master First');
    }
  }
  const uploadCourseTileImage = (e) => {
    if(fullCourse.id){
      uploadTileImage({
        variables: {
          file: e.target.files[0],
          courseId: fullCourse.id
        }
      })
        .then( (data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setTab('tab1');
      alert('Add Course First');
    }
  }

    return (
        <div className={styles.course_master}>
          <div className={styles.row}>
            <label htmlFor="name1" className={styles.col_25}>Course Base Sub-category</label>
              <select 
              className={styles.col_75}
              onChange={inputHandlerAddArr}
              value={(fullCourse.sub_category)?fullCourse.subcategory:'Select Subcategory in Course Master Tab'}
              >
                <option disabled hidden>Select Subcategory in Course Master Tab</option>
                <option> {fullCourse.sub_category}</option>
              </select>
          </div>
          <ApolloProvider client={qClient}>
          <DragDrop/>
          </ApolloProvider>

          {/* Expertise Level */}
          <div className={styles.row}>
            <label htmlFor="name3" className={styles.col_25}>Level of Expertise</label>
            <div className={styles.col_25}>
              {/* <input type="checkbox" id="beginner" name="beginner" value="Beginner" className={styles.checkbox} />
              <label className={styles.checkbox_label} for="beginner"> Beginner</label> */}
              <label className={styles.checkbox_container}>
                <input type="checkbox" 
                name='expertise_level'
                onChange={inputHandlerAddArr}
                value="Beginner" 
                checked={ expertiseLevel.includes("Beginner") ? 'checked' : false}
                />
                <span className={styles.checkmark}></span>Beginner
              </label>
            </div>
            <div className={styles.col_25}>
              <label className={styles.checkbox_container}>
                <input type="checkbox" 
                name='expertise_level'
                onChange={inputHandlerAddArr}
                value="Competent" 
                checked={ expertiseLevel.includes("Competent") ? "checked" : false}
                />
                <span className={styles.checkmark}></span>Competent
              </label>
            </div>
            <div className={styles.col_25}>
              <label className={styles.checkbox_container}>
                <input type="checkbox" 
                name='expertise_level'
                onChange={inputHandlerAddArr}
                value="Proficient" 
                checked={ expertiseLevel.includes("Proficient") ? "checked" : false}
                />
                <span className={styles.checkmark}></span>Proficient
              </label>
            </div>
          </div>
          {/* Upload Course Video */}
          <div className={styles.row}>
            <label htmlFor="name3" className={styles.col_25}>Upload Preview of the course</label>
            <div className={styles.col_75}>
              <div className={styles.upload_btn_wrapper}>
                <button className={styles.btn}>
                  <span className={styles.input_icon}>
                    <span>
                      <img src="/images/upload.png" alt="" />
                    </span>
                  </span>
                  Browse & upload
                </button>
                <input type="file" name="uploadCourseVideo" onChange={uploadCourseVideo}/>
              </div>
              <div className={styles.preview_remove_links}>
                <a className={styles.preview}>Preview</a>
                <a className={styles.remove}>Remove</a>
              </div>
            </div>
          </div>
          {/* Upload Course Image */}
          <div className={styles.row}>
            <label htmlFor="name3" className={styles.col_25}>Course Display Image</label>
            <div className={styles.col_75}>
              <div className={styles.upload_btn_wrapper}>
                <button className={styles.btn}>
                  <span className={styles.input_icon}>
                    <span>
                      <img src="/images/upload.png" alt="" />
                    </span>
                  </span>
                  Browse & upload
                </button>
                <input type="file" name="uploadCourseImage" onChange={uploadCourseImage}/>
              </div>
              <div className={styles.preview_remove_links}>
                <a className={styles.preview}>Preview</a>
                <a className={styles.remove}>Remove</a>
              </div>
            </div>
          </div>
          {/* Upload Course Page Display Picture */}
          <div className={styles.row}>
            <label htmlFor="name3" className={styles.col_25}>Course Page Display Picture</label>
            <div className={styles.col_75}>
              <div className={styles.upload_btn_wrapper}>
                <button className={styles.btn}>
                  <span className={styles.input_icon}>
                    <span>
                      <img src="/images/upload.png" alt="" />
                    </span>
                  </span>
                  Browse & upload
                </button>
                <input type="file" name="myfile" onChange={uploadCourseTileImage}/>
              </div>
              <div className={styles.preview_remove_links}>
                <a className={styles.preview}>Preview</a>
                <a className={styles.remove}>Remove</a>
              </div>
            </div>
          </div>
          {/* Course Summary */}
          <div className={styles.row}>
            <label htmlFor="name1" className={styles.col_25}>Course Summary</label>
            <textarea 
            name="summary"
            onChange={inputHandler}
            className={styles.col_75} 
            rows="4" 
            value={fullCourse.summary}
            placeholder={" Provide and outline of the course in less than 1000 characters..."} 
            />
          </div>
        
        </div>
    )
}

export default CourseDetails