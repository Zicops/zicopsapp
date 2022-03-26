import { useState, useEffect, useContext } from "react";
import { courseContext } from '../../state/contexts/CourseContext';
import { ApolloProvider, useMutation, useQuery } from '@apollo/client';
import { qClient, GET_CATS_N_SUB_CATS } from '../../API/Queries';
import { ADD_COURSE } from '../../API/Mutations';
import { useRouter } from 'next/router';

function CreateCatsDropdown({ inputHandler, inputField }) {
  const { data } = useQuery(GET_CATS_N_SUB_CATS);
  const router = useRouter();
  const {
    query: {courseId}
  } = router;
  const editcourseId = {courseId};
  console.log(editcourseId)
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

  const { fullCourse, setTab, updateCourseMaster, courseVideo, setCourseVideo, courseImage, setCourseImage, courseTileImage, setCourseTileImage } = useContext(courseContext);

  const [createCourse, { loading, error, data }] = useMutation(ADD_COURSE)

  if (loading) console.log('Submitting...');
  if (error) {
    alert('Submission error!');
    console.log(error.message);
  }
  if (data == '') {
    alert('Course Add Failed!');
    console.log('Course Add Failed!');
  }

  useEffect(()=>{
    // let editCourse = JSON.parse(window.localStorage.getItem('fullCourse'));
    // console.log(editCourse.course);
    // updateCourseMaster(editCourse.course);
  }, [])

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

  const courseMasterSubmit = async () => {
    if(fullCourse.id !== ''){
      // go to next tab
      setTab('tab2');
    } else {  
      if (fullCourse.name !== '' && fullCourse.category !== '' && fullCourse.subcategory !== '' && fullCourse.owner !== '') {
        
        const { id, created_at, updated_at, ...sendData } = fullCourse;
        // console.log(sendData)
        const d = await createCourse({
          variables: {
            ...sendData,
            status: 'SAVED'
          }
        })
        if (typeof d !== 'undefined' && d.data.addCourse.id.length > 0) {

          window.localStorage.setItem('addedCourseId', d.data.addCourse.id);
          // JSON.parse(window.localStorage.getItem('addedCourseId'));

          await updateCourseMaster(d.data.addCourse);

          await setCourseVideo({
            ...courseVideo,
            courseId: d.data.addCourse.id
          });
          await setCourseImage({
            ...courseImage,
            courseId: d.data.addCourse.id
          });
          await setCourseTileImage({
            ...courseTileImage,
            courseId: d.data.addCourse.id
          });
          // go to next tab
            setTimeout( ()=>{
              setTab('tab2');
            }, 50)
        }
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

      } else {
        alert('All Fields Required!')
      }
    }

  }



  return (
    <div className="course_master">
      <form>
        <div className="row my_30">
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
          <div className="row my_30">
            <label htmlFor="category" className="col_25">Course Category</label>
            <CreateCatsDropdown inputHandler={inputHandlerSelect} inputField={fullCourse} />
          </div>
          <div className="row">
            <label htmlFor="subcategory" className="col_25">Select Base Sub-category</label>
            <CreateSubCatsDropdown inputHandler={inputHandlerSelect} inputField={fullCourse} />
          </div>
        </ApolloProvider>


        <div className="row my_30">
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

        <div className="row my_30">
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

        <div className="row my_30">
          <button type='button' className="admin-next-btn" onClick={courseMasterSubmit}>Next</button>
        </div>
      </form>
    </div>
  )
}

export default CourseMaster