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
import ChapterRow from './ChapterRow';

const ModuleRow = ( {mod} ) => {
    const { chapter, topic } = useContext(moduleContext);

    const [clickedChapter, setClickedChapter] = useState(0);
    const [clickedTopic, setClickedTopic] = useState(0);

    const thisModChapter = chapter.filter(obj => obj.moduleId === mod.id);
    const thisModTopics = topic.filter(obj => obj.moduleId === mod.id);

    const [chapterModal, setChapterModal] = useState(false);
    const closeChapterModal = () => setChapterModal(false);
    const [showChapter, setChapter] = useState(false);
  
    const [topicModal, setTopicModal] = useState(false);
    const closeTopicModal = () => setTopicModal(false);
    const [showTopic, setTopic] = useState(false);

    const openModalAddChapter = () => {
        setChapterModal(o => !o)
    }

    const editModalAddChapter = () => {
        setChapterModal(o => !o)
    }

    const openModalAddTopic = (e) => {
        setClickedTopic(0);
        setTopicModal(o => !o);
        mod.isChapter ? setClickedChapter(e.target.getAttribute('data-custom')) : '';
    }

    function editTopic(topic){
        setClickedTopic(topic);
        setTopicModal(o => !o);
    }
    return ( 
        <div className="row">
            <ModuleBox>
                <ModuleAdded type="module" text={"Module " + mod.sequence + ": " + mod.id } />
                    
                {mod.isChapter ?
                    <>
                        {thisModChapter.map( (chapter, index) => {
                            return <ChapterRow key={index} mod={mod} chap={chapter} edit={editModalAddChapter}/>
                        })}
                        <span className='buttongap' onClick={openModalAddChapter}>
                            <IconButton text="Add Chapter" styleClass="grey" />
                        </span>
                    </>                    
                    :
                    <>
                    {thisModTopics.map( (topic, index) => {
                        return <ModuleAdded key={index} type="topic" text={"Topic " + topic.sequence + ": " + topic.id + ": " + topic.name } edit={()=>editTopic(topic)}/>
                    })}
                    <span className="buttongap" onClick={openModalAddTopic}>
                        <IconButton text="Add Topic" data=""/>
                    </span>
                    </>    
                }
                    <Popup open={topicModal} closeOnDocumentClick={false} onClose={closeTopicModal}>
                        <AddTopicPopup set={setTopicModal} modId={(clickedTopic)?clickedTopic.moduleId:mod.id} chapId={clickedChapter} editdata={clickedTopic} show={setTopic} />
                    </Popup>
                    <Popup open={chapterModal} closeOnDocumentClick={false} onClose={closeChapterModal}>
                        <AddChapterPopup set={setChapterModal} modId={mod.id} show={setChapter}/>
                    </Popup>

            </ModuleBox>
        </div>
     );
}
 
export default ModuleRow;