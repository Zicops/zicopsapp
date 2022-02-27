import { useState, useContext } from "react";
import { courseContext } from '../../state/contexts/CourseContext'
import { ApolloProvider, useMutation, useQuery } from '@apollo/client';
import {qClient, GET_CATS_N_SUB_CATS} from '../../API/Queries'
import {ADD_COURSE} from '../../API/Mutations'
import styles from '../../styles/CourseMaster.module.css'

function CreateCatsDropdown({inputHandler, inputField}){
  const {data} = useQuery(GET_CATS_N_SUB_CATS);

  return(
    <select className={styles.col_75} 
    name="category"
    onChange={inputHandler}
    value={inputField.category}
    >
      <option value="">Select the category of the course</option>
      {(data) ? data.allCategories.map( ( value, index) => <option key={index} value={value}>{value}</option> ) : null}
    </select>
  )
}
function CreateSubCatsDropdown({inputHandler, inputField}){
  const {data} = useQuery(GET_CATS_N_SUB_CATS);
  return(
    <select className={styles.col_75} 
    name="subcategory"
    onChange={inputHandler}
    value={inputField.subcategory}
    >
      <option value="">Select the base sub-category of the course</option>
      {(data) ? data.allSubCategories.map( (cats, index) => <option key={index} value={cats}>{cats}</option> ) : null}
    </select>
  )
}
const CourseMaster = () => { 

  const { course, fullCourse, setTab, addCourseMaster, updateCourseMaster } = useContext(courseContext);

    // added this course - c853ck517c478nrsgj10 / c853qel17c478nrsgj2g / c853t1t17c478nrsgj30 
    const [createCourse, {loading, error, data}] = useMutation(ADD_COURSE)

    if (loading) console.log('Submitting...');
    if (error) {
      alert('Submission error!');
      console.log(error.message);
    }
    if (data) {
      alert(data.addCourse.id);
      addCourseMaster({
        ...course,
        id: data.addCourse.id,
        status: 'SAVED'
      });
      updateCourseMaster({
        ...fullCourse,
        id: data.addCourse.id,
        name: course.name,
        category: course.category,
        subcategory: course.subcategory,
        owner: course.owner,
        status: data.addCourse.status,
      });
      setTab('tab2');
      console.log(data);
    }

    const inputHandler = (e) => {
      addCourseMaster({
        ...course,
        status: 'SAVED',
        [e.target.name]: e.target.value,
      })
      updateCourseMaster({
        ...fullCourse,
        [e.target.name]: e.target.value,
      })
    }

    const courseMasterSubmit = () => {
      let data = {
        ...course,
        status: 'SAVED'
      }
      console.log(data)
      createCourse({
          variables: data
      })
    }

    return (
        <div className={styles.course_master}>

          <form action='' method='POST' onSubmit={(e)=>{
            e.preventDefault()
            alert('hi')
          }}>
          <div className={styles.row}>
            <label htmlFor="name" className={styles.col_25}>Name</label>
            <input 
            type="text" 
            name="name" 
            id="name" 
            placeholder="Enter name of the course (Upto 160 characters)" 
            className={styles.col_75} 
            required 
            onChange={inputHandler}
            value={course.name}
            />
          </div>



          <ApolloProvider client={qClient}>
          <div className={styles.row}>
            <label htmlFor="category" className={styles.col_25}>Course Category</label>
            <CreateCatsDropdown inputHandler={inputHandler} inputField={course} />
          </div>
          <div className={styles.row}>
            <label htmlFor="subcategory" className={styles.col_25}>Select Base Sub-category</label>
            <CreateSubCatsDropdown inputHandler={inputHandler} inputField={course} />
          </div>
          </ApolloProvider>


          <div className={styles.row}>
            <label htmlFor="owner" className={styles.col_25}>Course Owner</label>
              <select 
              className={styles.col_75} 
              name="owner"
              onChange={inputHandler}
              value={course.owner}
              >
                <option>Select the owner of the course</option>
                <option>Abhishek</option>
                <option>Puneet</option>
                <option>Gokul</option>
                <option>Vaishnavi</option>
              </select>
          </div>


          <div className={styles.row}>
            <div className={styles.col_25}></div>
              <div className={styles.col_25}>
                <div className={styles.active_button}>
                  <label htmlFor="active" className={styles.td_label}>Active</label>
                  <label className={styles.switch}>
                    <input className={styles.switch_input} type="checkbox" name="active"/>
                    <span className={styles.switch_label} data-on="On" data-off="Off"></span>
                    <span className={styles.switch_handle}></span>
                  </label>
                </div>
              </div>

              <div className={styles.col_25}>
                <div className={styles.active_button}>
                  <label htmlFor="display" className={styles.td_label}>Display</label>
                  <label className={styles.switch}>
                    <input className={styles.switch_input} type="checkbox" name="display"/>
                    <span className={styles.switch_label} data-on="On" data-off="Off"></span>
                    <span className={styles.switch_handle}></span>
                  </label>
                </div>
              </div>
            <div className={styles.col_25}></div>
          </div>

          <div className={styles.row}>
            <button type='button' style={{padding: '10px 35px', cursor: 'pointer'}} onClick={courseMasterSubmit}>Next</button>
          </div>
          </form>
        </div>
    )
}

export default CourseMaster