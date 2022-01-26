import AddModuleFoot from '../API/AddModuleFoot';
import AddTopicFoot from '../API/AddTopicFoot';
import ContentAdded from './small/ContentAdded';
import Accordion from './small/Accordion';
import Binge from './medium/Binge';
import Quiz from './medium/Quiz';
import Resources from './medium/Resources';
import styles from '../styles/CourseMaster.module.css';
import ModuleAdded from './small/ModuleAdded';

const AddTopicTwo = ({set, show}) => {
    const modalClose = () => set(false);
    return (
        <div style={{ width: '900px', height: '300px', position: 'fixed', top: '30%', left: '57%', transform: 'translate(-50%, -50%)' }}>
        <div className={styles.row}>
            <div className={styles.topic_add}>
                <div className={styles.chapter_head}>
                    <div className={styles.chapter_title}>
                        Topic 1
                    </div>
                    <div className={styles.chapter_cross_img}>
                        <img src="/images/circular-cross.png" alt=""  onClick={modalClose}/>
                    </div>
                </div>
                <ModuleAdded type="module" text="Topic: Introduction to design thinking"/>
                <div className={styles.chapter_body}>
                    <div className={styles.row}>
                        <div className={styles.topic_title}>
                            Content
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.col_25}></div>
                        <div className={styles.col_50}>
                            <div className={styles.checkbox_mark}>
                                <label className={styles.checkbox_container}>
                                    <input type="checkbox" />
                                    <span className={styles.checkmark}></span>is Default
                                </label>
                            </div>
                        </div>
                        <div className={styles.col_25}></div>
                    </div>
                    <div className={styles.form_row}>
                        <label htmlFor="name1" className={styles.col_25}>Select Language</label>
                        <select className={styles.col_75}>
                            <option>Language of the content</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <div className={styles.form_row}>
                        <label htmlFor="name1" className={styles.col_25}>Type of content</label>
                        <select className={styles.col_75}>
                            <option>Type of content</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <div className={styles.form_row}>
                        <label htmlFor="name3" className={styles.col_25}>Upload Content</label>
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
                            {/* <div className={styles.preview_remove_links}>
                                <a className={styles.preview}>Preview</a>
                                <a className={styles.remove}>Remove</a>
                            </div> */}
                        </div>
                    </div>
                    <div className={styles.form_row}>
                        <label htmlFor="name1" className={styles.col_25}>Duration</label>
                        <input className={styles.col_75} type="time" name="duration"/>
                    </div>
                    <div className={styles.form_row}>
                        <label htmlFor="name3" className={styles.col_25}>Upload Subtitle</label>
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
                            {/* <div className={styles.preview_remove_links}>
                                <a className={styles.preview}>Preview</a>
                                <a className={styles.remove}>Remove</a>
                            </div> */}
                        </div>
                    </div>
                    <div className={styles.form_row}>
                        <button type="button" value="add" className={styles.button_single}>Add</button>
                    </div>
                    <ContentAdded />
                    <Accordion title="Binge it" content={<Binge />} />
                    <Accordion title="Quiz" content={<Quiz />} />
                    <Accordion title="Resources" content={<Resources />} />
                </div>
                <div className={styles.row}>
                    <AddTopicFoot />
                </div>
            </div>
        </div>
        </div>
    )
}
export default AddTopicTwo