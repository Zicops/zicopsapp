import { useState, useContext, useEffect } from 'react';
import { courseContext } from '../../../state/contexts/CourseContext';
import { moduleContext } from '../../../state/contexts/ModuleContext';
import { useMutation } from '@apollo/client';
import { ADD_COURSE_TOPIC } from '../../../API/Mutations'
import ModuleAdded from '../../small/ModuleAdded';
import AddTopicPopup2 from './AddTopicPopup2';

const AddTopicPopup = ({set, show}) => {
    const { module, chapter, topic, addAndUpdateTopic } = useContext(moduleContext);
    const { fullCourse } = useContext(courseContext);
    const [addTopicReady, setAddTopicReady] = useState(0);
    const [createCourseTopic] = useMutation(ADD_COURSE_TOPIC)
    console.log(topic);

    const modalClose = () => set(false);
    const topicAdd = () => {

        // alert(addModuleReady)

        const { id, ...topicData } = topic;
        createCourseTopic({
            variables: {
                ...topicData,
                courseId: fullCourse.id,
                moduleId: module.id,
                chapterId: chapter.id
            }
        }).then((d)=>{
            // console.log(d.data.addCourseTopic);
            addAndUpdateTopic(d.data.addCourseTopic)
        })

        show(true)
        // set(false)
    }
     

    const inputHandler = (e) => {
        addAndUpdateTopic({
            ...topic,
            [e.target.name]: e.target.value,
        })
    }
    
    useEffect(()=>{
        if(topic.name !== '' && topic.type !== '' && module.description !== ''){
            setAddTopicReady(1);
        } else {
            setAddTopicReady(0);
        }
    }, [topic])
    return (
        <>
        <div className="add_module_popup" >
            
            <div className="row">
                <div className="module_add">
                    <div className="module_head">
                        <div className="module_title">
                        Topic {topic.sequence}
                        </div>
                        <div className="cross_img">
                            <img src="/images/circular-cross.png" alt="" onClick={modalClose} />
                        </div>
                    </div>
                    <div className="module_body">
                    {topic.id && 
                    <div className="topicAdded">
                    <ModuleAdded type="module" text={"Topic " + topic.sequence + ": " + topic.name } />
                    <AddTopicPopup2/>
                    </div>}
                    {!topic.id && 
                        <>
                        <div className="form_row">
                            <label htmlFor="name" className="col_25" style={{ color: '#ffffff' }}>Topic Name</label>
                            <input type="text" autoComplete="name" id="name" placeholder="Enter topic name ( in less than 20 characters )" className="col_75" required 
                            name="name"
                            onChange={inputHandler}
                            value={topic.name}/>
                        </div>
                        <div className="form_row">
                            <label htmlFor="description" className="col_25" style={{ color: '#ffffff' }}>Description</label>
                            <textarea className="col_75" rows="4" name="description" placeholder="Brief description in less than 60 characters"
                            onChange={inputHandler}
                            value={topic.description}/>
                        </div>
                        <div className="form_row">  
                            <label htmlFor="name1" className="col_25" style={{ color: '#ffffff' }}>Topic Type</label>
                            <select className="col_75"
                            name="type"
                            onChange={inputHandler}
                            value={topic.type}
                            >
                                <option hidden>Select topic type</option>
                                <option>Content</option>
                                <option>Lab</option>
                                <option>Assessment</option>
                            </select>
                        </div>
                        </>
                    }
                    </div>
                    {/* {!topic.id && 
                    <> */}
                    <div className="module_foot">
                        <div className="form_row">
                            <div className="col_25"></div>
                            <div className="col_75">
                                <div className="button_container">
                                    <button type="button" value="cancel" className="btn_cancel_add" onClick={modalClose}>Cancel</button>
                                    <button type="button" value="add" 
                                    className={addTopicReady ? "btn_cancel_add" : "btn_cancel_add_disabled"} 
                                    onClick={topicAdd} disabled={!addTopicReady}>Design</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* </>} */}
                </div>
            </div>
            }
        </div>
        <style jsx>{`
        .add_module_popup{
            width: 800px;
            position: fixed; 
            top: 50%; 
            left: 57%; 
            transform: translate(-50%, -50%);
        }
        .module_add{
            width: 100%;
            padding:20px ;
            border-radius: 10px;
            background-color: rgb(4, 4, 4);
            opacity: 0.95;
            box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.34),-5px -5px 5px 0px rgba(247, 241, 241, 0.16);
        }
        .module_head{
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .module_title{
            color: #858f8f;
            font-size: 18px;
            font-weight: 700;
            text-transform: uppercase;
            margin: auto;
            margin-bottom: 15px;
        }
        .cross_img img{
            width: 20px;
            cursor: pointer;
        }
        .chapter_section{
            display: flex;
        }
        .radio_btn input{
            width: 20px;
            height: 20px;
            border-color: tomato;
        }
        .chapter{
            padding-left: 20px;
            width: 400px;
          }
        .chapter .chapter_head{
              font-size: 15px;
              color: white;
              text-transform: capitalize;
            }
        .chapter .chapter_desc{
            font-size: 13px;
            color:#858f8f ;
            word-wrap: wrap;
            padding-top: 5px;
        }
        .module_foot{
            padding: 10px;
            margin: auto;
        }
        .btn_cancel_add{
            width: 150px;
            height: 40px;
            background-color:#202222;
            border:2px solid #858f8f ;
            color:#858f8f;
            cursor: pointer;
            margin-right: 15px;
            text-transform: capitalize;
            font-size: 15px;
        }
        .btn_cancel_add_disabled{
            width: 150px;
            height: 40px;
            background-color:#202222;
            border:2px solid #858f8f ;
            color:#858f8f;
            cursor: no-drop;
            margin-right: 15px;
            text-transform: capitalize;
            font-size: 15px;
            opacity: 0.5;
        }
        .btn_cancel_add:hover{
            border-color: #ffffff; 
            color:#ffffff;
            background-color: #1a1a1a;
        }
      `}</style>
        </>
    );
}

export default AddTopicPopup;