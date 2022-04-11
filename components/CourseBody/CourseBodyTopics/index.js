import { Skeleton } from '@mui/material';
import { useContext } from 'react';
import { filterAndSortChapter } from '../../../helper/data.helper';
import { courseContext } from '../../../state/contexts/CourseContext';
import { moduleContext } from '../../../state/contexts/ModuleContext';
import Dropdown from '../../common/Dropdown';
import useShowData from '../Logic/useShowData';
import Chapter from './Chapter';
import Header from '../Header';

export default function CourseBodyTopics() {
  const moduleContextData = useContext(moduleContext);
  const courseContextData = useContext(courseContext);
  const {
    myRef,
    showActiveTab,
    activeCourseTab,
    setActiveCourseTab,
    getModuleOptions,
    moduleData,
    handleModuleChange,
    selectedModule
  } = useShowData(courseContextData, moduleContextData);

  const options = getModuleOptions();

  const { fullCourse } = courseContextData;
  const { chapter: chapterData, topic, topicContent } = moduleContextData;

  const filteredAndSortedData = filterAndSortChapter(chapterData, selectedModule?.value);

  // if (options[0].value === '')
  //   return <Skeleton sx={{ bgcolor: 'dimgray' }} variant="rectangular" width={300} height={200} />;

  return (
    <>
      <Dropdown options={options} handleChange={handleModuleChange} value={selectedModule} />

      <Header
        title={fullCourse.name}
        expertise={fullCourse.expertise_level?.split(',').join(' | ')}
      />

      {filteredAndSortedData &&
        filteredAndSortedData.map((chapter, index) => (
          <Chapter
            topics={topic}
            topicContent={topicContent}
            name={chapter.name}
            description={chapter.description}
            index={index + 1}
            key={chapter.name}
            chapterId={chapter.id}
            moduleId={selectedModule.value}
          />
        ))}
    </>
  );
}
