import { useRouter } from 'next/router';
import useHandleSearch from './Logic/useHandleSearch';
import SearchBody from './SearchBody';
import SearchBookmarks from './SearchBookmarks';
import SearchHeader from './SearchHeader';

export default function Search() {
  const { courses, lastItemRef, filters, setFilters, clearAllFilters } = useHandleSearch();
  const router = useRouter();
  const searchQuery = router.query?.searchQuery || '';

  return (
    <div
      style={{
        backgroundColor: 'var(--tile-bg)',
        paddingTop: '70px',
        minHeight: '90vh'
      }}>
      <SearchHeader filters={filters} setFilters={setFilters} clearAllFilters={clearAllFilters} />
      <SearchBookmarks />
      <SearchBody
        courses={courses?.filter((course) => {
          const nameFilter = course?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase());
          let langFilter = true,
            catFilter = true,
            subCatFilter = true,
            typeFilter = true;

          if (filters?.lang) langFilter = course?.language?.includes(filters?.lang);
          if (filters?.category) catFilter = course?.category?.includes(filters?.category);
          if (filters?.subCategory)
            subCatFilter =
              course?.sub_categories?.findIndex((subCat) =>
                subCat?.name?.includes(filters?.subCategory)
              ) > 0;
          if (filters?.type) typeFilter = course?.type?.includes(filters?.type);

          if (nameFilter && langFilter && catFilter && subCatFilter && typeFilter)
            console.log(course);

          return nameFilter && langFilter && catFilter && subCatFilter && typeFilter;
        })}
        lastItemRef={lastItemRef}
      />
    </div>
  );
}
