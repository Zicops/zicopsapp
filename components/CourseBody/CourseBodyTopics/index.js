import { useContext } from 'react';
import { useRecoilValue } from 'recoil';
import { filterAndSortChapter } from '../../../helper/data.helper';
import { ChapterAtom, TopicAtom } from '../../../state/atoms/module.atoms';
import { courseContext } from '../../../state/contexts/CourseContext';
import Dropdown from '../../common/Dropdown';
import Header from '../Header';
import useShowData from '../Logic/useShowData';
import ChapterRow from './ChapterRow';

export default function CourseBodyTopics() {
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
  } = useShowData(courseContextData);

  const { fullCourse } = courseContextData;
  const chapterData = useRecoilValue(ChapterAtom);
  const topic = useRecoilValue(TopicAtom);

  const filteredAndSortedData = filterAndSortChapter(chapterData, selectedModule?.value);

  const options = getModuleOptions();
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
          <ChapterRow
            topics={topic}
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
