import { useState, useContext, useEffect } from 'react';
import { courseContext } from '../../../state/contexts/CourseContext';
import { moduleContext } from '../../../state/contexts/ModuleContext';
import { useMutation } from '@apollo/client';
import { ADD_COURSE_CHAPTER } from '../../../API/Mutations'

const EditChapterPopup = ({set, show, modId}) => {
    const [chapterAddReady, setChapterAddReady] = useState(0);
    const { chapter, addAndUpdateChapter } = useContext(moduleContext);
    const { fullCourse } = useContext(courseContext);
    // const [createCourseChapter] = useMutation(ADD_COURSE_CHAPTER)

    const thisModChapter = chapter.filter(obj => obj.moduleId === modId);

    // const [newChapter, setNewChapter] = useState({
    //     name: '',
    //     description: '',
    //     moduleId: modId,
    //     courseId: fullCourse.id,
    //     sequence: thisModChapter.length + 1,
    // });
    const modalClose = () => set(false);

    const chapterAdd = () => {

        // createCourseChapter({
        //     variables : {
        //         ...newChapter
        //     }
        // }).then((d)=>{
        //     addAndUpdateChapter(d.data.addCourseChapter)
        // })

        show(true)
        set(false)
    }
    const inputHandler = (e) => {
        setNewChapter({
            ...newChapter,
            [e.target.name]: e.target.value,
        })
    }
    useEffect(()=>{
        if(newChapter.name !== '' && newChapter.description !== ''){
            setChapterAddReady(1);
        } else {
            setChapterAddReady(0);
        }
    }, [newChapter])
    return (
        <>
        <div className="add_chapter_popup" >
            <div className="row">
                <div className="chapter_add">
                    <div className="chapter_head">
                        <div className="chapter_title">
                            Chapter {newChapter.sequence}
                        </div>
                        <div className="chapter_cross_img">
                            <img src="/images/circular-cross.png" alt="" onClick={modalClose}/>
                        </div>
                    </div>
                    <div className="chapter_body">
                        <div className="row">
                            <label htmlFor="name" className="col_25" style={{color: '#ffffff'}}>Chapter Name</label>
                            <input type="text" autoComplete="name" id="name" placeholder="Default Name to come here"
                            name="name"
                            onChange={inputHandler}
                            value={newChapter.name}
                            className="col_75" required />
                        </div>
                        <div className="row">
                            <label htmlFor="description" className="col_25" style={{color: '#ffffff'}}>Chapter Description</label>
                            <textarea className="col_75" rows="4" placeholder="Provide and outline of the course in less than 1000 characters..." 
                            name="description"
                            onChange={inputHandler}
                            value={newChapter.description}/>
                        </div>
                    </div>
                    <div className="chapter_foot">
                        {/* <AddModuleFoot  set={set} show={show}/> */}
                        <div className="row">
                            <div className="col_25"></div>
                            <div className="col_75">
                                <div className="button_container">
                                    <button type="button" value="cancel" className="btn_cancel_add" onClick={modalClose}>Cancel</button>
                                    <button type="button" value="add" 
                                    className={chapterAddReady ? "btn_cancel_add" : "btn_cancel_add_disabled"} 
                                    onClick={chapterAdd} disabled={!chapterAddReady}>Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <style jsx>{`
            .add_chapter_popup{
                width: 800px;
                position: fixed; 
                top: 50%; 
                left: 57%; 
                transform: translate(-50%, -50%);
            }
            .chapter_add{
                width: 100%;
                padding:20px ;
                border-radius: 10px;
                background-color: #202222;
                opacity: 0.98;
                box-shadow: 0px 0px 20px 0px #eeeeee83,0px 0px 100px 20px #000000;
            }
            .chapter_head{
                /* border-bottom: 1px solid rgba(109, 207, 246, 0.247) ; */
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .chapter_title{
                color: #858f8f;
                font-size: 18px;
                font-weight: 700;
                text-transform: uppercase;
                margin: auto;
            }
            .chapter_cross_img img{
                width: 20px;
                cursor: pointer;
            }
            .chapter_body{
                min-height: 200px;
                padding: 10px;
                border:1px solid #202222;
                border-radius: 10px;
                max-height: 52vh;
                overflow: auto;
                color: #ffffff;
            }
            .chapter_foot{
                padding: 0 20px;
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
    )
}
export default EditChapterPopup