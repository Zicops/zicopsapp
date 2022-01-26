import Accordion from './small/Accordion';
import AddChapter from './medium/AddChapter';
import AddModuleBox, { ModalStatus } from './AddModuleBox';
import AddModuleBody from '../API/AddModuleBody';
import AddModuleFoot from '../API/AddModuleFoot';
import ModuleAdded from './small/ModuleAdded';
import AddTopic from './AddTopicOne';
import AddTopicTwo from './AddTopicTwo';
import IconButton from './small/IconButton';
import bodyData from '../API/DataAccordion';
import DisplayModal from './DisplayModal';
import Popup from 'reactjs-popup';

import React, { useState } from 'react';
import styles from '../styles/CourseMaster.module.css';


// const { title, content } = accordionData;
const CourseTopics = () => {

  const [openModal, setModal] = useState(false);
  const closeModal = () => setModal(false);
  const [showModule, setModule] = useState(false);

  const [chapterModal, setChapterModal] = useState(false);
  const closeChapterModal = () => setChapterModal(false);
  const [showChapter, setChapter] = useState(false);

  const [topicModal, setTopicModal] = useState(false);
  const closeTopicModal = () => setTopicModal(false);
  const [showTopic, setTopic] = useState(false);

  
     
    return (
        <div className={styles.course_master}>

        {showModule &&
        <AddModuleBox hideCross={true} title="Module1" body={
          <>
            <ModuleAdded type="module" text="Module1: xxxxxxxx" />
            {showChapter && 
            <>
            <ModuleAdded type="chapter" text="Chapter1: xxxxxxxx" /> 
            {showTopic && <ModuleAdded type="topic" text="Topic1: xxxxxxxx" />}
            <div className={styles.row}>
              <span onClick={() => setTopicModal(o => !o)}>
                <IconButton text="Add Topic" />
              </span>
              <Popup open={topicModal} closeOnDocumentClick={false} onClose={closeTopicModal}>
              {/* <div style={{ width: '800px', position: 'fixed', top: '40%', left: '57%', transform: 'translate(-50%, -50%)' }}> */}
                  {!showTopic && <AddTopic set={setTopicModal} show={setTopic} />}
                  {showTopic && <AddTopicTwo set={setTopicModal} show={setTopic} />}
                {/* </div> */}
              </Popup>
            </div>
            </>
            }
            
            <div className={styles.row}>
              <span onClick={() => setChapterModal(o => !o)}>
                <IconButton text="Add Chapter" styleClass="grey" />
              </span>
              <Popup open={chapterModal} closeOnDocumentClick={false} onClose={closeChapterModal}>
                <div style={{ width: '800px', position: 'fixed', top: '52%', left: '57%', transform: 'translate(-50%, -50%)' }}>
                  <AddChapter set={setChapterModal} show={setChapter}/>
                </div>
              </Popup>
            </div>
          </>
        } /> }
        


        <div className={styles.row}>         
          <span onClick={() => setModal(o => !o)}>
          <IconButton text="Add Module" styleClass="black"/>
          </span>
          <Popup open={openModal} closeOnDocumentClick={false} onClose={closeModal}>
            <div style={{ width: '800px', position: 'fixed', top: '52%', left: '57%', transform: 'translate(-50%, -50%)' }}>
              <AddModuleBox set={setModal} title="Module1" body={<AddModuleBody />} foot={<AddModuleFoot set={setModal} show={setModule}/>} />
            </div>
          </Popup>
        </div>

          {/* {bodyData.map( ({ index, title, content }) => (
              <Accordion key={index} title={title} content={content} />
          ))} */}
          

          
{/* 
          <AddTopicTwo /> */}
        </div>
    )
}

export default CourseTopics