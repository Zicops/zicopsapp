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
          const nameFilter = course?.name
            ?.trim()
            ?.toLowerCase()
            ?.includes(searchQuery?.trim()?.toLowerCase());
          let langFilter = true,
            catFilter = true,
            subCatFilter = true,
            typeFilter = true;

          if (filters?.lang)
            langFilter = course?.language
              ?.trim()
              ?.toLowerCase()
              ?.includes(filters?.lang?.trim()?.toLowerCase());
          if (filters?.category)
            catFilter = course?.category
              ?.trim()
              ?.toLowerCase()
              ?.includes(filters?.category?.trim()?.toLowerCase());
          if (filters?.subCategory)
            subCatFilter =
              course?.sub_categories?.findIndex((subCat) =>
                subCat?.name
                  ?.trim()
                  ?.toLowerCase()
                  ?.includes(filters?.subCategory?.trim()?.toLowerCase())
              ) > 0 ||
              course?.sub_category
                ?.trim()
                ?.toLowerCase()
                ?.includes(filters?.subCategory?.trim()?.toLowerCase());
          if (filters?.type)
            typeFilter = course?.type
              ?.trim()
              ?.toLowerCase()
              ?.includes(filters?.type?.trim()?.toLowerCase());

          return nameFilter && langFilter && catFilter && subCatFilter && typeFilter;
        })}
        lastItemRef={lastItemRef}
      />
    </div>
  );
}
