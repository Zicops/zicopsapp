import useHandleTopicContent from '@/components/AdminCourseComps/Logic/useHandleTopicContent';
import { TopicContentListAtom } from '@/state/atoms/courses.atom';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styles from '../../../adminCourseComps.module.scss';
import ResourceForm from '../ResourceForm';
import TopicAccordian from '../TopicAccordian';
import TopicQuiz from '../TopicQuiz';
import BingeForm from './BingeForm';
import SubtitleForm from './SubtitleForm';
import TopicContentForm from './TopicContentForm';

export default function TopicContent({ topData = null }) {
  const topicContentList = useRecoilValue(TopicContentListAtom);

  const {
    isFormVisible,
    toggleForm,
    topicContentFormData,
    handleChange,
    handleMp4FileInput,
    handleSubmit,
  } = useHandleTopicContent(topData);

  const [isAccordionDisabled, setIsAccordionDisabled] = useState(null);

  const topicAccordians = [
    {
      id: 'sub',
      title: 'Subtitles',
      body: <SubtitleForm topData={topData} />,
    },
    {
      id: 'binge',
      title: 'Binge It',
      body: <BingeForm />,
    },
    {
      id: 'quiz',
      title: 'Quiz',
      body: (
        <TopicQuiz
          topData={topData}
          setIsAccordionDisabled={(val) => setIsAccordionDisabled(!!val ? 'quiz' : '')}
        />
      ),
    },
    {
      id: 'res',
      title: 'Resources',
      body: <ResourceForm topData={topData} />,
    },
  ];

  const isDisabled = false;

  return (
    <>
      <div className={styles.editTopicAccordianContainer}>
        <TopicContentForm
          topicContentState={topicContentFormData}
          isFormVisible={isFormVisible}
          toggleForm={toggleForm}
          handleChange={handleChange}
          handleMp4FileInput={handleMp4FileInput}
          handleSubmit={handleSubmit}
          isDisabled={isDisabled}
        />

        {topicAccordians.map((item) => (
          <TopicAccordian
            key={item?.title}
            title={item.title}
            isDisabled={!topicContentList?.length || isAccordionDisabled === item?.id}>
            {item.body}
          </TopicAccordian>
        ))}
      </div>
    </>
  );
}
