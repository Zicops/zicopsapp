import styles from '../styles/CourseMaster.module.css'

const CourseDetails = () => {
    return (
        <div className={styles.course_master}>
          <div className={styles.row}>
            <label htmlFor="name1" className={styles.col_25}>Course Base Sub-category</label>
              <select className={styles.col_75} placeholder="Select the category of the course">
                <option>Select the base sub-category of the course</option>
              </select>
          </div>
          <div className={styles.row}>
            <label htmlFor="name3" className={styles.col_25}>Additional Categories / Sub-categories</label>
            <div className={styles.col_25}>
              <div className={styles.drag_category_area}>
                <div className={styles.inner_drag_srch}>
                  <input type="text" placeholder='Search'></input>
                </div>
                <div className={styles.inner_drag_ele}>
                  Java
                </div>
                <div className={styles.inner_drag_ele}>
                  Java
                </div>
                <div className={styles.inner_drag_ele}>
                  Java
                </div>
                <div className={styles.inner_drag_ele}>
                  Java
                </div>
                <div className={styles.inner_drag_ele}>
                  Java
                </div>
                <div className={styles.inner_drag_ele}>
                  Java
                </div>
              </div>
            </div>
            <div className={styles.col_10}>
              <img className={styles.handdrag} src='/images/handdrag.png'/>
            </div>
            <div className={styles.col_25}>
              <div className={styles.drop_category_area}>
                <div className={styles.wrap_drop}>
                  <div className={styles.Sr_no}>1</div>
                  <div className={styles.inner_drop_ele}>java</div>
                </div>
                <div className={styles.wrap_drop}>
                  <div className={styles.Sr_no}>2</div>
                  <div className={styles.inner_drop_ele}>python</div>
                </div>
                <div className={styles.wrap_drop}>
                  <div className={styles.Sr_no}>3</div>
                  <div className={styles.inner_drop_ele}>c++</div>
                </div>
                <div className={styles.wrap_drop}>
                  <div className={styles.Sr_no}>4</div>
                  <div className={styles.inner_drop_ele}>html</div>
                </div>
                <div className={styles.wrap_drop}>
                  <div className={styles.Sr_no}>5</div>
                  <div className={styles.inner_drop_ele}>css</div>
                </div>
              </div>
            </div>
            <div className={styles.col_15}>
              
            </div>
          </div>
          {/* <div className={styles.row}>
            <label htmlFor="name" className={styles.col_25}>Course Name</label>
            <input type="text" autoComplete="name" id="name" placeholder="Default Name to come here" className={styles.col_75} required />
          </div>
          <div className={styles.row}>
            <label htmlFor="name1" className={styles.col_25}>Course Summary</label>
            <textarea className={styles.col_75} rows="4" placeholder="Provide and outline of the course in less than 1000 characters..." />
          </div>
          <div className={styles.row}>
            <label htmlFor="name1" className={styles.col_25}>Key Takeaway</label>
            <textarea className={styles.col_75} rows="2" placeholder="What are the key takeaway from this course in 60 words" />
          </div> */}
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
                <input type="file" name="myfile" />
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
                <input type="file" name="myfile" />
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
            <textarea className={styles.col_75} rows="4" placeholder="Provide and outline of the course in less than 1000 characters..." />
          </div>
        
        </div>
    )
}

export default CourseDetails