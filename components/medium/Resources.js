import { useState, useContext, useRef } from 'react';
import QuizLoop from '../small/QuizLoop';
import QuizAdded from '../small/QuizAdded';
import IconButton from '../small/IconButton'
import styles from '../../styles/CourseMaster.module.css';
import { moduleContext } from '../../state/contexts/ModuleContext';
import { useMutation } from '@apollo/client';
import { UPLOAD_TOPIC_RESOURCE } from '../../API/Mutations'

const Resources = ({topic}) => {
    const [buttonOn, setButtonOn] = useState(0);
    const resInput = useRef(null)
    const { resources, addResourcesToTopic } = useContext(moduleContext);
    const [res, addRes] = useState({
        courseId : topic.courseId,
        name : '',
        type : '',
        topicId : topic.id,
        url : '',
    });
    const [uploadResource] = useMutation(UPLOAD_TOPIC_RESOURCE);

    const inputHandler = (e) => { 
        addRes({
            ...res,
            [e.target.name]: e.target.value,
        })
    }
    const inputHandlerFile = (e) => {
        // console.log(e.target.files[0])
        document.getElementById("resourceFile").innerText = e.target.files[0].name;
        addRes((prevState) => ({
            ...prevState,
            file: e.target.files[0]
        }) );
    }

    const addResource = () => {
        console.log(res)
        uploadResource({
            variables: res
        }).then((data) => {
            console.log(data);
            if(data.data.uploadTopicResource.success){
                // addResourcesToTopic({
                //     ...data,
                // });

            }
        }).catch((err) => {
                console.log(err);
            });
    }
    return (
        <>
            {/* <QuizAdded index="Doc 1" text="How to read this topic?" type="PDF"/>
            <QuizAdded index="Doc 2" text="Help Chart Cheetsheet" type="Excel"/> */}
            
            {buttonOn ?
            <>
            <div className={styles.center_row}>
                <select 
                name="type"
                onChange={inputHandler}
                value={resources.type}
                >
                    <option hidden>Select Resources Type</option>
                    <option >PDF</option>
                    <option >EXCEL</option>
                    <option >DOC</option>
                </select>
            </div>
            <div className="row" style={{
                'justifyContent': 'center',
                'alignItems': 'center',
                marginTop: '10px',
                padding: '0px',
            }}>

                    <input type="text" autoComplete="name" id="name" placeholder="Enter document name" required 
                    name="name"
                    onChange={inputHandler}
                    value={res.name}
                    />

                    <div className={styles.upload_btn_wrapper} style={{}}>
                        <button className={styles.btn}>
                            <span className={styles.input_icon}>
                                <span>
                                    <img src="/images/upload.png" alt="" />
                                </span>
                            </span>
                            Browse & upload
                        </button>
                        <input type="file" name="file"
                        onChange={inputHandlerFile} />
                        
                    </div>
                    
            </div>
            <div id="resourceFile" style={{textAlign: 'center'}}>{resInput.current}</div>
            <div className="row" style={{
                'justifyContent': 'center',
                marginTop: '10px',
                padding: '0px',
            }}>
                
                <button type="button" onClick={()=>setButtonOn(!buttonOn)} style={{
                    padding: '10px 20px',
                    borderRadius: '30px',
                    backgroundColor: 'transparent',
                    border: 'solid 3px #868f8f',
                    color: '#868f8f',
                    margin: '10px',
                    cursor: 'pointer',
                }}>Cancel</button>
                <button type="button" onClick={addResource} style={{
                    padding: '10px 20px',
                    borderRadius: '30px',
                    backgroundColor: 'transparent',
                    border: 'solid 1px #868f8f',
                    color: '#868f8f',
                    margin: '10px',
                    cursor: 'pointer',
                }}>Add</button>
            </div>
            </> : null
            }
            <div className="row my_30">
                <IconButton styleClass="black" text="Add Resources" onClick={()=>setButtonOn(!buttonOn)}/>
            </div>
        </>
    )
}
            
export default Resources