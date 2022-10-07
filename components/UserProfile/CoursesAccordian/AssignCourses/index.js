import CardContainer from '@/components/LearnerUserProfile/UserCoursesTab/CardContainer';
import { useState } from 'react';
import CoursesAccHead from '../../CoursesAccHead';

const AssignCourses = ({
  section,
  isHead = false,
  isFolder = false,
  isRemove = false,
  handleSubmit = () => {},
  handleClick = () => {},
  buttonText = '',
  type = null,
  assignedCourses = []
}) => {
  const [filters, setFilters] = useState({ searchQuery: '', cat: '', subCat: '', type: '' });
  let courseData = section.data;
  if (type === 'currentCourses')
    courseData = courseData.filter((courses) => courses.completedPercentage);

  // if (type === 'assignedCourses')
  //   courseData = courseData.filter((courses) => !courses.completedPercentage );

  if (type === 'assignCourses' && assignedCourses?.length) {
    courseData = courseData.filter(
      (courses) => assignedCourses?.findIndex((obj) => obj.id === courses.id) < 0
    );
  }

  return (
    <>
      {isHead && (
        <CoursesAccHead
          isFolder={isFolder}
          courseCount={assignedCourses?.filter((courses) => !courses.completedPercentage)?.length}
          handleClick={handleClick}
          getFilters={(f) => setFilters(f)}
        />
      )}

      <CardContainer
        isAdmin={true}
        hideTopBar={true}
        type={section.displayType}
        footerType={section.footerType}
        courseData={courseData?.filter((course) => {
          const nameFilter = course?.name
            ?.trim()
            ?.toLowerCase()
            ?.includes(filters?.searchQuery?.trim()?.toLowerCase());
          let langFilter = true,
            catFilter = true,
            subCatFilter = true,
            typeFilter = true;

          // if (filters?.lang)
          //   langFilter = course?.language
          //     ?.map((lang) => lang?.toLowerCase()?.trim())
          //     ?.includes(filters?.lang?.trim()?.toLowerCase());
          if (filters?.cat)
            catFilter = course?.category
              ?.trim()
              ?.toLowerCase()
              ?.includes(filters?.cat?.trim()?.toLowerCase());
          if (filters?.subCat)
            subCatFilter =
              course?.sub_categories?.findIndex((subCat) =>
                subCat?.name
                  ?.trim()
                  ?.toLowerCase()
                  ?.includes(filters?.subCat?.trim()?.toLowerCase())
              ) > 0 ||
              course?.sub_category
                ?.trim()
                ?.toLowerCase()
                ?.includes(filters?.subCat?.trim()?.toLowerCase());
          if (filters?.type)
            typeFilter = course?.type
              ?.trim()
              ?.toLowerCase()
              ?.includes(filters?.type?.trim()?.toLowerCase());

          return nameFilter && langFilter && catFilter && subCatFilter && typeFilter;
        })}
        handleSubmit={handleSubmit}
        buttonText={buttonText}
        isRemove={isRemove}
      />
    </>
  );
};

export default AssignCourses;
