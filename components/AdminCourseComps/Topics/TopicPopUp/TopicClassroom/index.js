import useHandleTopicClassroom from '@/components/AdminCourseComps/Logic/useHandleTopicClassroom';
import ZicopsButton from '@/components/common/ZicopsButton';
import { TopicClassroomAtom } from '@/state/atoms/courses.atom';
import { useRecoilValue } from 'recoil';
import styles from '../../../adminCourseComps.module.scss';
import TopicAccordian from '../TopicAccordian';
import ClassroomForm from './ClassroomForm';
import VcSettings from './VcSettings';

export default function TopicClassroom({ topData = null, closePopUp = () => {} }) {
  const topicClassroom = useRecoilValue(TopicClassroomAtom);

  const {
    isSubmitDisabled,
    accordionOpenState,
    setAccordionOpenState,
    handleTopicClassroomChange,
    addUpdateTopicClassroom
  } = useHandleTopicClassroom(topData);

  const topicAccordians = [
    {
      id: 1,
      title: 'Classroom',
      body: (
        <ClassroomForm
          handleChange={handleTopicClassroomChange}
          closeAccordion={() => setAccordionOpenState(1)}
          topData={topData}
        />
      )
    },
    {
      title: 'Quizzes',
      body: 'Quiz'
    },
    {
      title: 'Resources',
      body: 'Quiz'
    },
    {
      title: 'Assignments',
      body: '<Classroom />'
    },
    {
      title: 'VC Setting',
      body: (
        <VcSettings
          handleChange={handleTopicClassroomChange}
          closeAccordion={() => setAccordionOpenState(1)}
        />
      )
    }
  ];

  return (
    <>
      <div className={styles.editTopicAccordianContainer}>
        {topicAccordians.map((item) => (
          <TopicAccordian
            key={item?.title}
            title={item.title}
            isOpen={accordionOpenState === item?.id ? false : null}>
            {item.body}
          </TopicAccordian>
        ))}
      </div>

      <div className="center-element-with-flex">
        <ZicopsButton
          customClass={styles.addTopicFormBtn}
          handleClick={closePopUp}
          isDisabled={isSubmitDisabled}
          display="Cancel"
        />
        <ZicopsButton
          customClass={`${styles.addTopicFormBtn} ${styles.addBtn}`}
          isDisabled={isSubmitDisabled}
          handleClick={addUpdateTopicClassroom}
          display={!!topicClassroom?.id ? 'Update' : 'Save'}
        />
      </div>
    </>
  );
}
