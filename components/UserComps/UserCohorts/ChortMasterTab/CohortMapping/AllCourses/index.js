import CoursesAccHead from '@/components/UserProfile/CoursesAccHead';
import CardContainer from '@/components/LearnerUserProfile/UserCoursesTab/CardContainer';
import { useState } from 'react';

const AllCourses = ({ section, handleSubmit = () => {} , isLoading = false}) => {
  const [filters, setFilters] = useState({ searchQuery: '', cat: '', subCat: '', type: '' });
  const courseData = section?.data;
  return (
    <>
      <CoursesAccHead getFilters={(f) => setFilters(f)}/>
      <CardContainer
        hideTopBar={true}
        isAdmin={true}
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
        buttonText={'Assign'}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </>
  );
};

export default AllCourses;
