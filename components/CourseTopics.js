import Accordion from './small/Accordion';
import AddModules from './AddModules';
import AddChapter from './medium/AddChapter';
import AddModuleBox from './AddModuleBox';
import AddModuleBody from '../API/AddModuleBody';
import AddModuleFoot from '../API/AddModuleFoot';
import ModuleAdded from './small/ModuleAdded';
import AddTopic from './AddTopicOne';
import AddTopicTwo from './AddTopicTwo';
import IconButton from './small/IconButton';
import styles from '../styles/CourseMaster.module.css';


// const { title, content } = accordionData;
const CourseTopics = () => {

    const accordionData = [
      {
        title: 'Section 1',
        content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
        laborum cupiditate possimus labore, hic temporibus velit dicta earum
        suscipit commodi eum enim atque at? Et perspiciatis dolore iure
        voluptatem.`
      },
      {
        title: 'Section 2',
        content: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia veniam
        reprehenderit nam assumenda voluptatem ut. Ipsum eius dicta, officiis
        quaerat iure quos dolorum accusantium ducimus in illum vero commodi
        pariatur? Impedit autem esse nostrum quasi, fugiat a aut error cumque
        quidem maiores doloremque est numquam praesentium eos voluptatem amet!
        Repudiandae, mollitia id reprehenderit a ab odit!`
      },
      {
        title: 'Section 3',
        content: `Sapiente expedita hic obcaecati, laboriosam similique omnis architecto ducimus magnam accusantium corrupti
        quam sint dolore pariatur perspiciatis, necessitatibus rem vel dignissimos
        dolor ut sequi minus iste? Quas?`
      }
    ];
    // const bodyData = () => {
    //   return(
        
    //   )
    // }

    return (
        <div className={styles.course_master}>
          <div className={styles.row}>
            <div className={styles.add_module_button}>
              <button id="btn-add-module" className={styles.btn_add}>
                <span>
                  <img src="/images/plus.png" alt="" />
                </span>
                Add Module
              </button>
            </div>
          </div>
          {accordionData.map(({ title, content }) => (
          <Accordion title={title} content={content} />
          ))}
          <AddModuleBox title="Module1" body={<AddModuleBody/>} foot={<AddModuleFoot/>}/>
          <div className={styles.row}>
            <IconButton styleClass="black" text="Add Module" />
          </div>

          <AddModuleBox title="Module1" body={<><ModuleAdded type="module" text="Module1: xxxxxxxx"/> <div className={styles.row}><IconButton text="Add Chapter" /></div></>}/>
          <AddModuleBox title="Module2" body={
            <>
              <ModuleAdded type="module" text="Module1: xxxxxxxx" /> 
              <ModuleAdded type="chapter" text="Chapter1: xxxxxxxx" /> 
              <ModuleAdded type="topic" text="Topic1: xxxxxxxx" /> 
              <div className={styles.row}>
                <IconButton styleClass="lightblack" text="Add Topic" />
              </div>
              <div className={styles.row}>
                <IconButton styleClass="grey" text="Add Chapter" />
              </div>
            </>
          }/>
          <div className={styles.row}>
            <IconButton styleClass="black" text="Add Text Here" />
          </div>

          <AddChapter />
          <AddTopic />
          <AddTopicTwo />
        </div>
    )
}

export default CourseTopics