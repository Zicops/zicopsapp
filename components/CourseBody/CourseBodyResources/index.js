import { useContext } from 'react';
import { useRecoilValue } from 'recoil';
import { filterAndSortTopicsBasedOnModuleId } from '../../../helper/data.helper';
import { TopicAtom } from '../../../state/atoms/module.atoms';
import { courseContext } from '../../../state/contexts/CourseContext';
import Dropdown from '../../common/Dropdown';
import CourseResourcesOpen from '../../CourseResourcesOpen';
import Header from '../Header';
import ItemSlider from '../ItemSlider';
import useShowData from '../Logic/useShowData';

export default function CourseBodyResources() {
  const courseContextData = useContext(courseContext);
  const {
    myRef,
    showActiveTab,
    activeCourseTab,
    setActiveCourseTab,
    getModuleOptions,
    moduleData,
    handleModuleChange,
    selectedModule,
    showResources,
    filteredResources,
    isResourceShown
  } = useShowData(courseContextData);

  const options = getModuleOptions();

  const { fullCourse } = courseContextData;
  const topicData = useRecoilValue(TopicAtom);
  // const { chapter: chapterData, topic, topicContent } = moduleContextData;

  const filteredAndSortedData = filterAndSortTopicsBasedOnModuleId(
    topicData,
    selectedModule?.value
  );

  return (
    <>
      <Dropdown options={options} handleChange={handleModuleChange} value={selectedModule} />
      <Header
        title={fullCourse.name}
        expertise={fullCourse.expertise_level?.split(',').join(' | ')}
      />

      <ItemSlider
        key={selectedModule?.value}
        itemsArr={filteredAndSortedData}
        showResources={showResources}
        isResourceShown={isResourceShown}
      />

      <CourseResourcesOpen resources={filteredResources} isResourceShown={isResourceShown} />
    </>
  );
}
