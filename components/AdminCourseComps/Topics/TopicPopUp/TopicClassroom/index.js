import useHandleTopicClassroom from '@/components/AdminCourseComps/Logic/useHandleTopicClassroom';
import ZicopsButton from '@/components/common/ZicopsButton';
import { TopicClassroomAtom } from '@/state/atoms/courses.atom';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styles from '../../../adminCourseComps.module.scss';
import ResourceForm from '../ResourceForm';
import TopicAccordian from '../TopicAccordian';
import TopicQuiz from '../TopicQuiz';
import ClassroomForm from './ClassroomForm';
import VcSetting from './VcSetting';

export default function TopicClassroom({ topData = null, closePopUp = () => {} }) {
  const topicClassroom = useRecoilValue(TopicClassroomAtom);

  const [isAccordionDisabled, setIsAccordionDisabled] = useState(null);

  const {
    isSubmitDisabled,
    accordionOpenState,
    setAccordionOpenState,
    handleTopicClassroomChange,
    handleSubmit,
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
      ),
    },
    {
      id: 2,
      title: 'Quizzes',
      body: (
        <TopicQuiz
          topData={topData}
          setIsAccordionDisabled={(val) => setIsAccordionDisabled(!!val ? 2 : null)}
        />
      ),
    },
    {
      id: 3,
      title: 'Resources',
      body: <ResourceForm topData={topData} />,
    },
    // {
    //   id: 4,
    //   title: 'Assignments',
    //   body: '<Classroom />',
    // },
    {
      id: 5,
      title: 'VC Setting',
      body: <VcSetting handleChange={handleTopicClassroomChange} />,
    },
  ];

  return (
    <>
      <div className={styles.editTopicAccordianContainer}>
        {topicAccordians.map((item) => (
          <TopicAccordian
            key={item?.id}
            title={item.title}
            isOpen={accordionOpenState === item?.id ? false : null}
            isDisabled={isAccordionDisabled === item?.id}>
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
          handleClick={() => {
            handleSubmit()
              .catch((err) => console.log(err))
              .finally(() => closePopUp(true));
          }}
          display={!!topicClassroom?.id ? 'Update' : 'Save'}
        />
      </div>
    </>
  );
}
