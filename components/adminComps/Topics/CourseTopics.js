import { useState, useContext } from 'react';
import IconButton from '../../small/IconButton';
import Popup from 'reactjs-popup';
import AddModulePopup from './AddModulePopup';
import AddChapterPopup from './AddChapterPopup';
import AddTopicPopup from './AddTopicPopup';
import { courseContext } from '../../../state/contexts/CourseContext';
import { moduleContext } from '../../../state/contexts/ModuleContext';
import ModuleBox from './ModuleBox';
import ModuleAdded from '../../small/ModuleAdded';

const CourseTopics2 = () => {
    const { fullCourse, setTab } = useContext(courseContext);
    const { module, chapter, topic } = useContext(moduleContext);

    console.log(module)

    const [openModal, setModal] = useState(false);
    const closeModal = () => setModal(false);
    const [showModule, setModule] = useState(false);

    const [chapterModal, setChapterModal] = useState(false);
    const closeChapterModal = () => setChapterModal(false);
    const [showChapter, setChapter] = useState(false);
  
    const [topicModal, setTopicModal] = useState(false);
    const closeTopicModal = () => setTopicModal(false);
    const [showTopic, setTopic] = useState(false);

    const openModalIfCourseAdded = () => {
        if( !fullCourse.id ) {
            setTab('tab1');
            setTimeout( () => alert('Add course first!') , 10);
        };
        setModal(o => !o)
    }

    const openModalAddChapter = () => {
        setChapterModal(o => !o)
    }

    const openModalAddTopic = () => {
        setTopicModal(o => !o)
    }
    return ( 
        <>
        <div>
            {module.id &&
            <div className="row">
                <ModuleBox>
                    <ModuleAdded type="module" text={"Module " + module.sequence + ": " + module.id } />
                    {chapter.id && 
                        <ModuleAdded type="chapter" text={"Chapter " + chapter.sequence + ": " + chapter.id } />
                        }
                    {topic.id && 
                        <ModuleAdded type="topic" text={"Topic " + topic.sequence + ": " + topic.id } />
                        }
                        <span className="buttongap" onClick={openModalAddTopic}>
                            <IconButton text="Add Topic" />
                        </span>
                        <Popup open={topicModal} closeOnDocumentClick={false} onClose={closeTopicModal}>
                            <AddTopicPopup set={setTopicModal} title={"Topic " + topic.sequence} show={setTopic}/>
                        </Popup>
                    {module.isChapter &&
                        <span className='buttongap' onClick={openModalAddChapter}>
                            <IconButton text="Add Chapter" styleClass="grey" />
                        </span>}
                        <Popup open={chapterModal} closeOnDocumentClick={false} onClose={closeChapterModal}>
                            <AddChapterPopup set={setChapterModal} title={"Chapter " + chapter.sequence} show={setChapter}/>
                        </Popup>
                </ModuleBox>
            </div>}
            <div className="row">         
                <span onClick={openModalIfCourseAdded}>
                    <IconButton text="Add Module" styleClass="black"/>
                </span>
                <Popup open={openModal} closeOnDocumentClick={false} onClose={closeModal}>
                    <AddModulePopup set={setModal} title={"Module " + module.sequence} show={setModule}/>
                </Popup>
            </div>

        </div>
        <style jsx>
            {`
            .row{
                padding: 30px;
            }
            .buttongap{
                margin: 10px 0;
            }
            `}
        </style>
        </>
     );
}
 
export default CourseTopics2;