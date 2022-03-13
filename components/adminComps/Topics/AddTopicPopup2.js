import ContentAdded from "../../small/ContentAdded";
import Accordion from "../../small/Accordion";
import Binge from "../../medium/Binge";
import Quiz from "../../medium/Quiz";
import Resources from "../../medium/Resources";
import { useContext } from 'react';
import { useMutation } from '@apollo/client';
import { UPLOAD_TOPIC_CONTENT_SUBTITLE } from '../../../API/Mutations'
import { moduleContext } from '../../../state/contexts/ModuleContext';

const AddTopicPopup2 = () => {
    const [uploadCourseContentSubtitle] = useMutation(UPLOAD_TOPIC_CONTENT_SUBTITLE)
    const { topic, topicContent, addUpdateTopicContent } = useContext(moduleContext);


    const uploadSubtitle = (e) => {
        document.getElementById('subtitle').innerText = e.target.files[0].name;
        uploadCourseContentSubtitle({
            variables: {
                file: e.target.files[0],
                courseId: topic.courseId,
                topicId: topic.id,
            }
        }).then( (d)=> {
            console.log(d)
        })
    }
    return ( 
        <>
            <div className="chapter_body">
                <div className="row">
                    <div className="topic_title">
                        Content
                    </div>
                </div>
                <div className="row">
                    <div className="col_25"></div>
                    <div className="col_50">
                        <div className="checkbox_mark">
                            <label className="checkbox_container">
                                <input type="checkbox" />
                                <span className="checkmark"></span>is Default
                            </label>
                        </div>
                    </div>
                    <div className="col_25"></div>
                </div>
                <div className="form_row">
                    <label htmlFor="name1" className="col_25">Select Language</label>
                    <select className="col_75">
                        <option>Language of the content</option>
                        <option>English</option>
                        <option>Hindi</option>
                        <option>Bengali</option>
                        <option>Marathi</option>
                    </select>
                </div>
                <div className="form_row">
                    <label htmlFor="name1" className="col_25">Type of content</label>
                    <select className="col_75">
                        <option>Type of content</option>
                        <option>SCORM</option>
                        <option>TinCan</option>
                        <option>Web HTML5</option>
                        <option>Mp4</option>
                        <option>CMi5</option>
                    </select>
                </div>
                <div className="form_row">
                    <label htmlFor="name3" className="col_25">Upload Content</label>
                    <div className="col_75">
                        <div className="upload_btn_wrapper">
                            <button className="btn">
                                <span className="input_icon">
                                    <span>
                                        <img src="/images/upload.png" alt="" />
                                    </span>
                                </span>
                                Browse & upload
                            </button>
                            <input type="file" name="myfile" />
                        </div>
                        {/* <div className={styles.preview_remove_links}>
                                <a className={styles.preview}>Preview</a>
                                <a className={styles.remove}>Remove</a>
                            </div> */}
                    </div>
                </div>
                <div className="form_row">
                    <label htmlFor="name1" className="col_25">Duration</label>
                    <input className="col_75" type="time" name="duration" />
                </div>
                <div className="form_row">
                    <label htmlFor="name3" className="col_25">Upload Subtitle</label>
                    <div className="col_75">
                        <div className="upload_btn_wrapper">
                            <button className="btn">
                                <span className="input_icon">
                                    <span>
                                        <img src="/images/upload.png" alt="" />
                                    </span>
                                </span>
                                Browse & upload
                            </button>
                            <input type="file" name="subtitle" onChange={uploadSubtitle}/>
                            <div id="subtitle"></div>
                        </div>
                        {/* <div className={styles.preview_remove_links}>
                                <a className={styles.preview}>Preview</a>
                                <a className={styles.remove}>Remove</a>
                            </div> */}
                    </div>
                </div>
                <div className="form_row">
                    <button type="button" value="add" className="button_single" >Add</button>
                </div>
                <ContentAdded />
                <Accordion title="Binge it" content={<Binge />} />
                <Accordion title="Quiz" content={<Quiz />} />
                <Accordion title="Resources" content={<Resources />} />
            </div>
            <style jsx>
                {`
                .module_foot{
                    padding: 30px;
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
                `}
            </style>
        </>
     );
}
 
export default AddTopicPopup2;