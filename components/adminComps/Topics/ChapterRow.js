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

const ChapterRow = ( {mod, chap , edit} ) => {
    const { topic } = useContext(moduleContext);
    const [clickedChapter, setClickedChapter] = useState(0);
    const [clickedTopic, setClickedTopic] = useState(0);

    const thisChapterTopics = topic.filter(obj => obj.chapterId === chap.id);

    const [chapterModal, setChapterModal] = useState(false);
    const closeChapterModal = () => setChapterModal(false);
    const [showChapter, setChapter] = useState(false);
  
    const [topicModal, setTopicModal] = useState(false);
    const closeTopicModal = () => setTopicModal(false);
    const [showTopic, setTopic] = useState(false);

    const openModalAddChapter = () => {
        setChapterModal(o => !o)
    }

    const openModalAddTopic = (e) => {
        setClickedTopic(0);
        setClickedChapter(e.target.getAttribute('data-custom'));
        console.log(clickedChapter)
        setTopicModal(o => !o);
    }
    function editChapter(chap){
        setClickedChapter(chap);
        setChapterModal(o => !o);
    }
    function editTopic(topic){
        setClickedTopic(topic);
        setTopicModal(o => !o);
    }
    return ( 
            <>
                <ModuleAdded type="chapter" text={"Chapter " + chap.sequence + ": " + chap.id } edit={()=>editChapter(chap)}/>
                
                {thisChapterTopics.map( (topic, index) => 
                    <ModuleAdded key={index} type="topic" text={"Topic " + topic.sequence + ": " + topic.id + ": " + topic.name  } edit={()=>editTopic(topic)}/>
                )}

                <span className="buttongap" onClick={openModalAddTopic}>
                    <IconButton text="Add Topic" data={chap.id}/>
                </span>

                <Popup open={topicModal} closeOnDocumentClick={false} onClose={closeTopicModal}>
                    <AddTopicPopup set={setTopicModal} modId={(clickedTopic)?clickedTopic.moduleId:mod.id} chapId={clickedChapter} editdata={clickedTopic} show={setTopic} />
                </Popup>
                <Popup open={chapterModal} closeOnDocumentClick={false} onClose={closeChapterModal}>
                    <AddChapterPopup set={setChapterModal} modId={clickedChapter.moduleId} editdata={clickedChapter} show={setChapter}/>
                </Popup>

            </>
     );
}
 
export default ChapterRow;