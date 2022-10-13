import { useHandleCatSubCat } from '@/helper/hooks.helper';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useHandleSearch from './Logic/useHandleSearch';
import SearchBody from './SearchBody';
import SearchBookmarks from './SearchBookmarks';
import SearchHeader from './SearchHeader';
import SearchSubCat from './SearchSubCat';

export default function Search() {
  const { courses, isLoading, lastItemRef, filters, setFilters, clearAllFilters, bookmarkData } =
    useHandleSearch();
  const { catSubCat, setActiveCatId } = useHandleCatSubCat(filters.category);

  const router = useRouter();
  const searchQuery = router.query?.searchQuery || '';
  const [showBookMark, setShowBookmark] = useState(false);
  const [showSubCat, setShowSubCat] = useState(false);

  useEffect(() => {
    // console.log(isPref);
    const { isPref, cat } = router.query;
    if (cat) setShowSubCat(true);
    if (searchQuery) setShowBookmark(true);

    // setFilters(prevValue => ({...prevValue , subCategory:searchQuery}))
    return;
  }, [router.query]);

  return (
    <div
      style={{
        backgroundColor: 'var(--tile-bg)',
        paddingTop: '70px',
        minHeight: '90vh'
      }}>
      <SearchHeader
        filters={filters}
        setFilters={setFilters}
        clearAllFilters={clearAllFilters}
        catSubCat={catSubCat}
        setActiveCatId={setActiveCatId}
      />

      {showBookMark && <SearchBookmarks data={bookmarkData} />}

      {showSubCat && (
        <SearchSubCat
          data={catSubCat?.subCat?.map((s) => ({
            ...s,
            name: s?.Name,
            img: s?.ImageUrl,
            handleClick: (subCat) => setFilters({ ...filters, subCategory: subCat })
          }))}
        />
      )}
      <SearchBody courses={courses} isLoading={isLoading} lastItemRef={lastItemRef} />
    </div>
  );
}
