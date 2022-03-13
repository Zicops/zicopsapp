import { useEffect, useContext } from "react";
import { courseContext } from '../../state/contexts/CourseContext'
import { useMutation } from '@apollo/client';
import {ADD_COURSE, UPDATE_COURSE} from '../../API/Mutations'

const Admin_content_foot = () => {
    const { course, fullCourse, setTab, addCourseMaster, updateCourseMaster } = useContext(courseContext);
    const [createCourse ] = useMutation(ADD_COURSE)
    const [updateCourse ] = useMutation(UPDATE_COURSE)
    // console.log(fullCourse);
    // if (loading || loadingFull) console.log('Submitting...');
    // if (error) {
    //   alert('Submission error!');
    //   console.log(error.message);
    // }
    // if (errorFull) {
    //     alert('Submission error!');
    //     console.log(errorFull.message);
    // }
    // if (data) {
    //   addCourseMaster({
    //     ...course,
    //     id: data.addCourse.id,
    //     status: 'SAVED'
    //   });

    //   updateCourseMaster({
    //     ...fullCourse,
    //     id: data.addCourse.id,
    //     name: course.name,
    //     category: course.category,
    //     subcategory: course.subcategory,
    //     owner: course.owner,
    //     status: data.addCourse.status,
    //   });
    //   setTab('tab2');
    //   console.log(data);
    // }

    // if (dataFull) {
    //     updateCourseMaster({
    //         ...fullCourse,
    //         id : data.updateCourse.id,
    //         name : data.updateCourse.name,
    //         description : data.updateCourse.description,
    //         summary : data.updateCourse.summary,
    //         instructor : data.updateCourse.instructor,
    //         image : data.updateCourse.image,
    //         previewVideo : data.updateCourse.previewVideo,
    //         tileImage : data.updateCourse.tileImage,
    //         owner : data.updateCourse.owner,
    //         duration : data.updateCourse.duration,
    //         expertise_level : data.updateCourse.expertise_level,
    //         language : data.updateCourse.language,
    //         benefits : data.updateCourse.benefits,
    //         created_at : data.updateCourse.created_at,
    //         updated_at : data.updateCourse.updated_at,
    //         type : data.updateCourse.type,
    //         prequisites : data.updateCourse.prequisites,
    //         goodFor : data.updateCourse.goodFor,
    //         mustFor : data.updateCourse.mustFor,
    //         related_skills : data.updateCourse.related_skills,
    //         publish_date : data.updateCourse.publish_date,
    //         expiry_date : data.updateCourse.expiry_date,
    //         expected_completion : data.updateCourse.expected_completion,
    //         qa_required : data.updateCourse.qa_required,
    //         approvers : data.updateCourse.approvers,
    //         created_by : data.updateCourse.created_by,
    //         updated_by : data.updateCourse.updated_by,
    //         status : data.updateCourse.status,
    //         is_display : data.updateCourse.is_display,
    //         category : data.updateCourse.category,
    //         sub_category : data.updateCourse.sub_category,
    //         // sub_categories : {
    //         //     name : data.updateCourse.sub_categories.name,
    //         //     rank : data.updateCourse.sub_categories.rank,
    //         // }
    //     });
    //     console.log(dataFull);
    // }

    function saveCourse(){
    
        if(fullCourse.id == ''){
            // add course

            if(fullCourse.name !== '' && fullCourse.category !== '' && fullCourse.subcategory !== '' && fullCourse.owner !== ''){
                const { id, created_at, updated_at, sub_categories, ...sendData } = fullCourse;
                // console.log(sendData)
                createCourse({
                    variables: {
                        ...sendData,
                        status: 'SAVED'
                    }
                }).then((d) => {
                    if (typeof d !== 'undefined' && d.data.addCourse.id.length > 0) {
                        updateCourseMaster(d.data.addCourse);
                        // go to next tab
                        setTimeout( ()=>{
                        setTab('tab2');
                        }, 50)
                    }
                })
            } else {
                setTab('tab1')
                alert ('Please fill master details before saving!')
            }

        } else {
            //update course
            console.log('updating...')
            // const { prequisites, related_skills, expected_completion, ...updateData } = fullCourse;
            let data = {
            ...fullCourse
            }
            updateCourse({
                variables: data
            }).then( (d)=>{
                alert("Course Updated")
                console.log("Course updated")
                console.log(d)
            })
        }
    }


    return (
        <div className="content-panel">
            <div className="left-text">
                <h3>Status: {fullCourse.status}</h3>
            </div>
            <div className="right-text">
                <button>Cancel</button>
                <button type="submit" onClick={saveCourse}>Save</button>
            </div>
            <style jsx>{`
            .content-panel {
                margin: -75px 10px 10px 10px;
                color: var(--white);
                height: 65px;
                // box-shadow: -2px 2px 10px 0 #000000, 2px -2px 5px 0 #686868;
                background-color: #000000;
                border-radius: 0 0 10px 10px;

                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .left-text{
                margin-left: 50px;
                font-size: 14px;
            }
            .right-text{
                margin-right: 50px;
            }
            button{
                padding: 10px 20px;
                background-color: transparent;
                color: #858f8f;
                border-radius: 50px;
                min-width: 155px;
                margin:5px;
                font-family: 'Open Sans';
                font-size: 13px;
                font-weight: 800;
                cursor: pointer;
            }
            button:hover{
                box-shadow: 0 0 10px 0 #959595;
            }
            `}</style>
        </div>
    )
}

export default Admin_content_foot