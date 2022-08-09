import { useContext } from 'react';
import { useRecoilValue } from 'recoil';
import {
  filterAndSortChapter,
  filterAndSortTopics,
  filterModule,
  filterTopicContent
} from '../../../helper/data.helper';
import {
  ChapterAtom,
  ModuleAtom,
  TopicAtom,
  TopicContentAtom
} from '../../../state/atoms/module.atoms';
import { courseContext } from '../../../state/contexts/CourseContext';
import Dropdown from '../../common/Dropdown';
import Header from '../Header';
import useShowData from '../Logic/useShowData';
import ChapterRow from './ChapterRow';
import TopicBox from './TopicBox';

export default function CourseBodyTopics() {
  const courseContextData = useContext(courseContext);
  const {
    myRef,
    showActiveTab,
    activeCourseTab,
    setActiveCourseTab,
    getModuleOptions,
    handleModuleChange,
    selectedModule,
    setSelectedModule
  } = useShowData(courseContextData);

  const { fullCourse } = courseContextData;
  const chapterData = useRecoilValue(ChapterAtom);
  const topic = useRecoilValue(TopicAtom);
  const topicContent = useRecoilValue(TopicContentAtom);
  const moduleData = useRecoilValue(ModuleAtom);

  const options = getModuleOptions();
  const currentModule = filterModule(moduleData, selectedModule?.value);
  const isChapterPresent = currentModule?.isChapter;

  let filteredAndSortedData = [];
  if (isChapterPresent) {
    filteredAndSortedData = filterAndSortChapter(chapterData, selectedModule?.value);
  } else {
    filteredAndSortedData = filterAndSortTopics(topic, selectedModule?.value);
  }

  let topicIndex = 0;

  return (
    <>
      <Dropdown options={options} handleChange={handleModuleChange} value={selectedModule} />

      <Header
        title={currentModule?.name}
        description={currentModule?.description || 'this is a description.'}
        expertise={currentModule?.level?.split(',').join(' | ')}
      />

      {isChapterPresent && filteredAndSortedData
        ? filteredAndSortedData.map((chapter, index) => (
            <ChapterRow
              topics={topic}
              name={chapter.name}
              description={chapter.description}
              chapterIndex={index + 1}
              key={chapter.id}
              chapterId={chapter.id}
              moduleId={selectedModule.value}
              getModuleOptions={getModuleOptions}
              currrentModule={selectedModule}
              setSelectedModule={setSelectedModule}
            />
          ))
        : filteredAndSortedData.map((topic, index) => {
            const filteredTopicContent = filterTopicContent(topicContent, topic.id);

            return (
              <TopicBox
                key={topic.id}
                topicCount={index + 1}
                topic={topic}
                topicIndex={++topicIndex}
                topicContent={filteredTopicContent}
                moduleId={selectedModule?.value}
                getModuleOptions={getModuleOptions}
                currrentModule={selectedModule}
                setSelectedModule={setSelectedModule}
              />
            );
          })}
    </>
  );
}
