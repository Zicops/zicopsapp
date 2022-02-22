import { useContext } from 'react';
import { ApolloProvider, useMutation, useQuery } from '@apollo/client';
import {qClient, GET_CATS_N_SUB_CATS} from '../../API/Queries'
import {UPLOAD_COURSE_IMAGE} from '../../API/Mutations'
import DragDrop from './DragDropContainer'
import { courseContext } from '../../state/contexts/CourseContext';
import styles from '../../styles/CourseMaster.module.css'


const CourseDetails = () => {
  const { course, addCourseMaster } = useContext(courseContext);
  // const [uploadImage, {loading, error, data}] = useMutation(UPLOAD_COURSE_IMAGE)
  console.log(course);

  const uploadCourseVideo = () => {

  }
  const uploadCourseImage = () => {
    uploadImage({ variables : {file, id}})
  }
    return (
        <div className={styles.course_master}>
          <div className={styles.row}>
            <label htmlFor="name1" className={styles.col_25}>Course Base Sub-category</label>
              <select className={styles.col_75} placeholder="Select the category of the course">
                <option>{course.subcategory}</option>
              </select>
          </div>
          <ApolloProvider client={qClient}>
          <DragDrop/>
          </ApolloProvider>
          <div className={styles.row}>
            <label htmlFor="name3" className={styles.col_25}>Level of Expertise</label>
            <div className={styles.col_25}>
              {/* <input type="checkbox" id="beginner" name="beginner" value="Beginner" className={styles.checkbox} />
              <label className={styles.checkbox_label} for="beginner"> Beginner</label> */}
              <label className={styles.checkbox_container}>
                <input type="checkbox" />
                <span className={styles.checkmark}></span>Beginner
              </label>
            </div>
            <div className={styles.col_25}>
              <label className={styles.checkbox_container}>
                <input type="checkbox" />
                <span className={styles.checkmark}></span>Competent
              </label>
            </div>
            <div className={styles.col_25}>
              <label className={styles.checkbox_container}>
                <input type="checkbox" />
                <span className={styles.checkmark}></span>Proficient
              </label>
            </div>
          </div>
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
                <input type="file" name="myfile" />
              </div>
              <div className={styles.preview_remove_links}>
                <a className={styles.preview}>Preview</a>
                <a className={styles.remove}>Remove</a>
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <label htmlFor="name1" className={styles.col_25}>Course Summary</label>
            <textarea className={styles.col_75} rows="4" placeholder={course.id + " Provide and outline of the course in less than 1000 characters..."} />
          </div>
        
        </div>
    )
}

export default CourseDetails