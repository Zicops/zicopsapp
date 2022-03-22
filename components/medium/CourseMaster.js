import { useState, useEffect, useContext } from "react";
import { courseContext } from '../../state/contexts/CourseContext'
import { ApolloProvider, useMutation, useQuery } from '@apollo/client';
import { qClient, GET_CATS_N_SUB_CATS } from '../../API/Queries'
import { ADD_COURSE } from '../../API/Mutations'

function CreateCatsDropdown({ inputHandler, inputField }) {
  const { data } = useQuery(GET_CATS_N_SUB_CATS);

  return (
    <select className="col_75"
      name="category"
      onChange={inputHandler}
      value={inputField.category}
    >
      <option className="col_75" value="">Select the category of the course</option>
      {(data) ? data.allCategories.map((value, index) => <option key={index} className="col_75 white" value={value}>{value}</option>) : null}
    </select>
  )
}
function CreateSubCatsDropdown({ inputHandler, inputField }) {
  const { data } = useQuery(GET_CATS_N_SUB_CATS);
  return (
    <select className="col_75"
      name="sub_category"
      onChange={inputHandler}
      value={inputField.sub_category}
    >
      <option className="col_75" value="">Select the base sub-category of the course</option>
      {(data) ? data.allSubCategories.map((cats, index) => <option key={index} className="col_75 white" value={cats}>{cats}</option>) : null}
    </select>
  )
}
const CourseMaster = () => { 

  const { fullCourse, setTab, updateCourseMaster } = useContext(courseContext);

  const [createCourse, { loading, error, data }] = useMutation(ADD_COURSE)

  if (loading) console.log('Submitting...');
  if (error) {
    alert('Submission error!');
    console.log(error.message);
  }
  // if (data) {
  //     updateCourseMaster({
  //       ...fullCourse,
  //       id: data.addCourse.id,
  //       status: data.addCourse.status,
  //     });
  //     console.log(fullCourse);
  //     setTab('tab2');
  // }

  // useEffect(() => { 
  //   console.log(data)

    // if (typeof data !== 'undefined' && data.addCourse.id.length > 0) {
      // useEffect(() => { 
        // if (typeof data !== 'undefined' && data.addCourse.id.length > 0) {
          // updateCourseMaster({
          //   ...fullCourse,
          //   id: data.addCourse.id,
          //   status: data.addCourse.status,
          // });
        // }
        // console.log(fullCourse);
      // },[fullCourse])
    // }
  // }, [data])

  const inputHandler = (e) => {
    updateCourseMaster({
      ...fullCourse,
      [e.target.name]: e.target.value,
    })
  }
  const inputHandlerSelect = (e) => {
    e.target.className=e.target.options[e.target.selectedIndex].className
    updateCourseMaster({
      ...fullCourse,
      [e.target.name]: e.target.value,
    })
  }

  const courseMasterSubmit = () => {
    if(fullCourse.id !== ''){
      // go to next tab
      setTab('tab2');
    } else {  
      if (fullCourse.name !== '' && fullCourse.category !== '' && fullCourse.subcategory !== '' && fullCourse.owner !== '') {
        
        // const { id, created_at, updated_at, sub_categories, ...sendData } = fullCourse;
        // // console.log(sendData)
        // createCourse({
        //   variables: {
        //     ...sendData,
        //     status: 'SAVED'
        //   }
        // }).then((d) => {
        //   if (typeof d !== 'undefined' && d.data.addCourse.id.length > 0) {
        //     updateCourseMaster(d.data.addCourse);
        //     // go to next tab
        //     setTimeout( ()=>{
        //       setTab('tab2');
        //     }, 50)
        //   }
        // })
        setTab('tab2');
      } else {
        alert('All Fields Required!')
      }
    }

  }



  return (
    <div className="course_master">
      <form>

        <div className="row">
          <label htmlFor="name" className="col_25">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter name of the course (Upto 160 characters)"
            className="col_75"
            required
            onChange={inputHandler}
            value={fullCourse.name}
          />
        </div>

        <ApolloProvider client={qClient}>
          <div className="row">
            <label htmlFor="category" className="col_25">Course Category</label>
            <CreateCatsDropdown inputHandler={inputHandlerSelect} inputField={fullCourse} />
          </div>
          <div className="row">
            <label htmlFor="subcategory" className="col_25">Select Base Sub-category</label>
            <CreateSubCatsDropdown inputHandler={inputHandlerSelect} inputField={fullCourse} />
          </div>
        </ApolloProvider>


        <div className="row">
          <label htmlFor="owner" className="col_25">Course Owner</label>
          <select
            className={(fullCourse.owner.length>0)?"col_75 white":"col_75"}
            name="owner"
            onChange={inputHandlerSelect}
            value={fullCourse.owner}
          >
            <option className="col_75" value="" hidden>Select the owner of the course</option>
            <option className="col_75 white">Abhishek</option>
            <option className="col_75 white">Vaishnavi</option>
            <option className="col_75 white">Harshad</option>
            <option className="col_75 white">Puneet</option>
            <option className="col_75 white">Gokul</option>
          </select>
        </div>

        <div className="row">
          <div className="col_25"></div>
          <div className="col_25">
            <div className="active_button">
              <label htmlFor="active" className="td_label">Active</label>
              <label className="switch">
                <input className="switch_input" type="checkbox" name="active" />
                <span className="switch_label" data-on="On" data-off="Off"></span>
                <span className="switch_handle"></span>
              </label>
            </div>
          </div>

          <div className="col_25">
            <div className="active_button">
              <label htmlFor="display" className="td_label">Display</label>
              <label className="switch">
                <input className="switch_input" type="checkbox" name="display" />
                <span className="switch_label" data-on="On" data-off="Off"></span>
                <span className="switch_handle"></span>
              </label>
            </div>
          </div>
          <div className="col_25"></div>
        </div>

        <div className="row">
          <button type='button' className="admin-next-btn" onClick={courseMasterSubmit}>Next</button>
        </div>
      </form>
    </div>
  )
}

export default CourseMaster