import { useState } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useMutation, useQuery } from '@apollo/client';
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
    let [inputField, setInputField] = useState({
      name: '',
      description: "This is static description",
      summary: "This is static summary",
      category: '',
      subcategory: '',
      owner: '',
      active: true,
      display: false,
      status: 'SAVED'
    })

    // added this course - c853ck517c478nrsgj10 / c853qel17c478nrsgj2g / c853t1t17c478nrsgj30 
    const [createCourse, {loading, error, data}] = useMutation(ADD_COURSE)

    if (loading) console.log('Submitting...');
    if (error) {
      alert('Submission error!');
      console.log(error.message);
    }
    if (data) {
      alert(data.addCourse.status);
      console.log(data);
    }
    const inputHandler = (e) => {
      setInputField({
        ...inputField,
        [e.target.name]: e.target.value,
      })
    }

    const formSubmit = () => {
      // console.log(inputField)
      createCourse({
        variables: {
          "name": inputField.name,
          "description": "Some Description from altair",
          "summary": "Some random summary",
          "category": inputField.category,
          "subcategory": inputField.subcategory,
          "owner": inputField.owner,
          "status": "SAVED"
        }
      })
    }

    return (
        <div className={styles.course_master}>
          {/* CourseMaster */}

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
            value={inputField.name}
            />
          </div>



          <ApolloProvider client={qClient}>
          <div className={styles.row}>
            <label htmlFor="category" className={styles.col_25}>Course Category</label>
            <CreateCatsDropdown inputHandler={inputHandler} inputField={inputField} />
          </div>
          <div className={styles.row}>
            <label htmlFor="subcategory" className={styles.col_25}>Select Base Sub-category</label>
            <CreateSubCatsDropdown inputHandler={inputHandler} inputField={inputField} />
          </div>
          </ApolloProvider>


          <div className={styles.row}>
            <label htmlFor="owner" className={styles.col_25}>Course Owner</label>
              <select 
              className={styles.col_75} 
              name="owner"
              onChange={inputHandler}
              value={inputField.owner}
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
                    <input className={styles.switch_input} type="checkbox" name="active" onChange={inputHandler}
            value={inputField.active}/>
                    <span className={styles.switch_label} data-on="On" data-off="Off"></span>
                    <span className={styles.switch_handle}></span>
                  </label>
                </div>
              </div>

              <div className={styles.col_25}>
                <div className={styles.active_button}>
                  <label htmlFor="display" className={styles.td_label}>Display</label>
                  <label className={styles.switch}>
                    <input className={styles.switch_input} type="checkbox" name="display" onChange={inputHandler}
            value={inputField.display}/>
                    <span className={styles.switch_label} data-on="On" data-off="Off"></span>
                    <span className={styles.switch_handle}></span>
                  </label>
                </div>
              </div>
            <div className={styles.col_25}></div>
          </div>

          <div className={styles.row}>
            <button type='button' onClick={formSubmit}>Next</button>
          </div>
          </form>
        </div>
    )
}

export default CourseMaster